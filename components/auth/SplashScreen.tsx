import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../config/theme";
import { Button } from "../common/Button";

interface SplashScreenProps {
  onGetStarted: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <View style={styles.overlay} />

        <View style={styles.logoContainer}>
          <View style={styles.logoTriangle} />
          <View style={styles.logoContent}>
            <Text style={styles.logoIcon}>👑</Text>
            <Text style={styles.logoText}>Camella</Text>
            <Text style={styles.logoSubtext}>PRIMA BUTUAN</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>MAINTENANCE</Text>
          <Text style={styles.title}>REQUESTS AND</Text>
          <Text style={styles.title}>TRACKING</Text>
        </View>

        <View style={styles.bottomSection}>
          <Button
            title="GET STARTED"
            onPress={onGetStarted}
            variant="primary"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    zIndex: 1,
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    alignItems: "stretch",
    zIndex: 10,
    height: 80,
  },
  logoTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 80,
    borderTopColor: colors.white,
    borderLeftWidth: 40,
    borderLeftColor: "transparent",
  },
  logoContent: {
    backgroundColor: colors.white,
    padding: spacing.md,
    paddingHorizontal: spacing.xl,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    letterSpacing: 1,
  },
  logoSubtext: {
    fontSize: 10,
    color: colors.secondary,
    letterSpacing: 2,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    zIndex: 2,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    letterSpacing: 3,
    lineHeight: 43,
    marginVertical: 4,
  },
  bottomSection: {
    padding: 50,
    paddingHorizontal: 40,
    zIndex: 2,
    alignItems: "center",
  },
});
