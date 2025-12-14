const db = require("../database/connection");

class Message {
  static async create({ request_id, sender, sender_id, message }) {
    const result = await db.run(
      `
      INSERT INTO messages (request_id, sender, sender_id, message, created_at)
      VALUES (?, ?, ?, ?, datetime('now', 'localtime'))
    `,
      [request_id, sender, sender_id, message]
    );

    return this.findById(result.id);
  }

  static async findById(id) {
    return await db.get("SELECT * FROM messages WHERE id = ?", [id]);
  }

  static async findByRequestId(request_id) {
    const messages = await db.all(
      `SELECT 
        m.*,
        u.name as sender_name,
        u.profile_image as sender_avatar,
        m.sender as sender_role
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id
      WHERE m.request_id = ? 
      ORDER BY m.created_at ASC`,
      [request_id]
    );
    return messages;
  }

  static async delete(id) {
    await db.run("DELETE FROM messages WHERE id = ?", [id]);
    return true;
  }

  static async deleteByRequestId(request_id) {
    await db.run("DELETE FROM messages WHERE request_id = ?", [request_id]);
    return true;
  }

  static async getUnreadCountByRequest(request_id, userRole) {
    // Count messages sent by the opposite role
    const oppositeSender = userRole === "admin" ? "homeowner" : "admin";
    const result = await db.get(
      `SELECT COUNT(*) as count FROM messages 
       WHERE request_id = ? AND sender = ?`,
      [request_id, oppositeSender]
    );
    return result.count || 0;
  }

  static async hasUnreadMessages(userRole) {
    // Get all requests with unread messages for this user role
    const oppositeSender = userRole === "admin" ? "homeowner" : "admin";
    const result = await db.all(
      `SELECT DISTINCT request_id, COUNT(*) as unread_count
       FROM messages 
       WHERE sender = ?
       GROUP BY request_id`,
      [oppositeSender]
    );
    return result;
  }
}

module.exports = Message;
