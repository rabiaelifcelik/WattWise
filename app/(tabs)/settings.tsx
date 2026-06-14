import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Appearance,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useUser } from "@/contexts/UserContext";

// Import Components
import AvatarIcon from "@/components/ui/AvatarIcon";
import DeleteAccountModal from "@/components/ui/DeleteAccountModal";

import { useExpense } from "@/contexts/ExpenseContext";
import {exportCSV} from "@/scripts/download-csv";

// ─── Setting Row ──────────────────────────────────────────────────────────────
function SettingRow({
  label,
  rightElement,
  onPress,
}: {
  label: string;
  rightElement: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : 1}
    >
      <Text style={styles.settingLabel}>{label}</Text>
      {rightElement}
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { user } = useUser();

  const { electricityExpenses, waterExpenses } = useExpense();

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(false);
    Alert.alert("Account Deleted", "Your account has been deleted.");
    router.push("../(auth)/signin");
  };

  const handleEditProfile = () => {
    Alert.alert("Hey! Are you sure about editing?");
    router.push("../(pages)/edit-user");
  };

  const toggleSwitch = () => setDarkMode((previousState) => !previousState);

  // add this
  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === "dark") {
      setDarkMode(true); // true means dark
    } else {
      setDarkMode(false); // false means light
    }
  }, []);

  const handleExport = async () => {
    try {
        await exportCSV(
          electricityExpenses,
          waterExpenses
        );
    } catch (error) {
        console.error("Failed to export CSV:", error);
      }
  };
  

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.appTitle}>WattWise</Text>
        {/* Avatar */}
        <View style={styles.profileSection}>
          <AvatarIcon />
          <Text style={styles.userName}>{user.name}</Text>
          <TouchableOpacity
            style={styles.editProfileRow}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileText}>Edit profile</Text>
            <IconSymbol
              size={23}
              name="square.and.pencil"
              color={Colors.main.primarycolor}
            />
          </TouchableOpacity>
        </View>

        {/* Settings rows */}
        <View style={styles.settingsList}>
          <SettingRow
            label="Change password"
            rightElement={
              <IconSymbol size={28} name="chevron.right" color="#ffffff" />
            }
            onPress={() => router.push("../(pages)/change-password")}
          />
          <SettingRow
            label="My coupons"
            rightElement={
              <IconSymbol size={28} name="chevron.right" color="#ffffff" />
            }
            onPress={() => router.push("../(pages)/my-coupons")}
          />
          <SettingRow
            label="Dark mode"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={() => {
                  setDarkMode(!darkMode);
                }}
                trackColor={{ false: "rgba(255,255,255,0.3)", true: "#4caf50" }}
                thumbColor="#ffffff"
                ios_backgroundColor="rgba(255,255,255,0.3)"
              />
            }
          />
          <SettingRow
            label="Download data"
            rightElement={
              <IconSymbol size={28} name="arrow.down.to.line" color="#ffffff" />
            }
            onPress={handleExport}
          />
          <SettingRow
            label="Log out"
            rightElement={
              <IconSymbol
                size={28}
                name="rectangle.portrait.and.arrow.right"
                color="#ffffff"
              />
            }
            onPress={() => router.push("../(auth)/signin")}
          />
        </View>

        {/* Delete account */}
        <TouchableOpacity
          style={styles.deleteRow}
          onPress={() => setDeleteModalVisible(true)}
        >
          <IconSymbol size={28} name="trash" color={Colors.main.red} />
          <Text style={styles.deleteText}>Delete account</Text>
        </TouchableOpacity>
      </View>

      {/* Delete modal */}
      <DeleteAccountModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginTop: 16,
    marginBottom: 20,
  },

  // Profile
  profileSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  editProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  editProfileText: {
    fontSize: 16,
    color: Colors.main.primarycolor,
    fontWeight: "500",
  },

  // Settings list
  settingsList: {
    gap: 8,
  },
  settingRow: {
    backgroundColor: Colors.main.primarycolor,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLabel: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },

  // Delete account
  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
  },
  deleteText: {
    color: Colors.main.red,
    fontSize: 20,
    fontWeight: "600",
  },
});
