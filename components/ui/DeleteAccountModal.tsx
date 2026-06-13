import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native'

import { Colors } from '@/constants/theme';


// ─── Delete Account Modal ─────────────────────────────────────────────────────
export default function DeleteAccountModal({ visible, onClose, onConfirm }: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          {/* Close X */}
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Delete Account</Text>
          <Text style={styles.modalBody}>
            Are you sure about deleting your account?
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalBtnYes} onPress={onConfirm}>
              <Text style={styles.modalBtnYesText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={onClose}>
              <Text style={styles.modalBtnCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 280,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 14,
    padding: 4,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.main.red,
    marginBottom: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  modalBody: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtnYes: {
    backgroundColor: Colors.main.red,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  modalBtnYesText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  modalBtnCancel: {
    backgroundColor: Colors.main.primarycolor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  modalBtnCancelText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
})