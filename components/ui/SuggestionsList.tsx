import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SuggestionsList() {
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <Text style={styles.title}>Suggestions</Text>

      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.card}>
          <Text style={{ color: '#fff' }}>
            Close the tap while brushing teeth
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, marginBottom: 10 },
  card: {
    backgroundColor: '#0f7c82',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  }
});