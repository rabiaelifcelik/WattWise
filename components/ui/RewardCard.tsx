import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';

import { CoffeeIcon, CartIcon } from '../icons';
import { Colors } from '@/constants/theme';

interface Reward {
  id: string;
  icon: 'coffee' | 'cart';
  points: number;
  description: string;
}

export default function RewardCard({
  reward,
  userPoints,
  onRedeem,
}: {
  reward: Reward;
  userPoints: number;
  onRedeem: (points: number) => void;
}) {
  const canRedeem = userPoints >= reward.points;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (canRedeem) {
      Alert.alert(
        'Redeem Reward',
        `Redeem "${reward.description}" for ${reward.points} pts?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Redeem',
            onPress: () => {
              onRedeem(reward.points); // update points in parent
              setModalVisible(true);  // show success modal
            },
          },
        ]
      );
    } else {
      Alert.alert('Not Enough Points', `You need ${reward.points} pts to redeem this reward.`);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.85}>
        {reward.icon === 'coffee' ? <CoffeeIcon /> : <CartIcon />}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{reward.points} pts</Text>
        </View>
        <Text style={styles.description}>{reward.description}</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalBody}>
              You have acquired the offer successfully.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnCancelText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    flex: 1,
  },
  badge: {
    backgroundColor: '#111',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 6,
    marginBottom: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
  },

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
    color: Colors.main.primarycolor,
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

});