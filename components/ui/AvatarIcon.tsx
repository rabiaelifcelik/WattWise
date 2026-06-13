import {View, StyleSheet} from 'react-native'


// ─── Avatar Icon ──────────────────────────────────────────────────────────────
export default function AvatarIcon() {
  return (
    <View style={styles.avatarCircle}>
      {/* Head */}
      <View style={styles.avatarHead} />
      {/* Body / shoulders */}
      <View style={styles.avatarBody} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: '#222',
      alignItems: 'center',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      marginBottom: 10,
    },
  avatarHead: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#888',
    marginBottom: 2,
  },
  avatarBody: {
    width: 50,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#888',
  },
})



