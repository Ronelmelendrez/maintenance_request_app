const db = require("./connection");

const addSenderIdColumn = async () => {
  try {
    await db.connect();

    console.log("Checking if sender_id column exists...");

    // Check if column already exists
    const tableInfo = await db.all("PRAGMA table_info(messages)");
    const hasSenderId = tableInfo.some((col) => col.name === "sender_id");

    if (hasSenderId) {
      console.log("sender_id column already exists");
      return;
    }

    console.log("Adding sender_id column to messages table...");

    // Add the column
    await db.run(`
      ALTER TABLE messages 
      ADD COLUMN sender_id INTEGER
    `);

    console.log("Updating existing messages with sender_id...");

    // Update existing admin messages to use the first admin's ID
    await db.run(`
      UPDATE messages 
      SET sender_id = (SELECT id FROM users WHERE role = 'admin' LIMIT 1)
      WHERE sender = 'admin' AND sender_id IS NULL
    `);

    // Update existing homeowner messages
    await db.run(`
      UPDATE messages 
      SET sender_id = (
        SELECT r.user_id 
        FROM maintenance_requests r 
        WHERE r.id = messages.request_id
      )
      WHERE sender = 'homeowner' AND sender_id IS NULL
    `);

    // Make sender_id NOT NULL
    // Note: SQLite doesn't support ALTER COLUMN, so we need to recreate the table
    console.log("Recreating messages table with constraints...");

    await db.run(`
      CREATE TABLE IF NOT EXISTS messages_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id TEXT NOT NULL,
        sender TEXT NOT NULL CHECK(sender IN ('admin', 'homeowner')),
        sender_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (request_id) REFERENCES maintenance_requests(id),
        FOREIGN KEY (sender_id) REFERENCES users(id)
      )
    `);

    await db.run(`
      INSERT INTO messages_new (id, request_id, sender, sender_id, message, created_at)
      SELECT id, request_id, sender, sender_id, message, created_at
      FROM messages
    `);

    await db.run(`DROP TABLE messages`);
    await db.run(`ALTER TABLE messages_new RENAME TO messages`);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
    throw error;
  }
};

if (require.main === module) {
  addSenderIdColumn()
    .then(() => {
      console.log("Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

module.exports = addSenderIdColumn;
