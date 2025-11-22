import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { borderRadius, colors, shadows, spacing } from "../../config/theme";
import { UserRole } from "../../types";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface LoginFormProps {
  onLogin: (role: UserRole) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>("homeowner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(activeTab);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.loginBackground}>
        <View style={styles.overlay} />

        <View style={styles.loginHeader}>
          <Text style={styles.headerTitle}>PRIMA CAMELLA</Text>
          <Text style={styles.headerSubtitle}>BUTUAN</Text>
        </View>

        <View style={styles.loginCard}>
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.welcomeSubtext}>Login to continue</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "homeowner" && styles.tabActive,
              ]}
              onPress={() => setActiveTab("homeowner")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "homeowner" && styles.tabTextActive,
                ]}
              >
                Homeowner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "admin" && styles.tabActive]}
              onPress={() => setActiveTab("admin")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "admin" && styles.tabTextActive,
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.forgotPassword}>
              <TouchableOpacity>
                <Text style={styles.forgotLink}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Log In"
              onPress={handleLogin}
              variant="accent"
              style={styles.loginButton}
            />

            <View style={styles.signupTextContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loginBackground: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: spacing.xl,
    minHeight: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  loginHeader: {
    zIndex: 2,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 3,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 3,
  },
  loginCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    zIndex: 2,
    ...shadows.large,
  },
  welcomeBox: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  tabContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.white,
  },
  form: {
    width: "100%",
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: spacing.xl,
  },
  forgotLink: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  signupTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  signupLink: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: "600",
  },
});
