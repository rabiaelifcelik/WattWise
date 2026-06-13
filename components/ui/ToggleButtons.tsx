import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ToggleButtons({ range, setRange }: any) {
  return (
    <View style={styles.row}>
      {[3, 6, 12].map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.button, range === item && styles.active]}
          onPress={() => setRange(item)}
        >
          <Text style={range === item && { color: '#fff' }}>
            {item} Months
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginVertical: 15 },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 10
  },
  active: { backgroundColor: '#0f7c82' }
});