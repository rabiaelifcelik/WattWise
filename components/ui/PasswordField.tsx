import { View, Text, TextInput, StyleSheet} from "react-native"


interface PasswordFieldProps{
    label: string,
    value: string,
    error?: string,
    onChangeText: (text:string) => void,
}

export default function PasswordField({
    label,
    value,
    error,
    onChangeText
}: PasswordFieldProps) {

    return (
        <View>
        <Text>{label}</Text>
        <TextInput style={[styles.input, error && styles.errorInput]}
            placeholder="new password"
            placeholderTextColor={error? "#e4afaf" : "#aaa"}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={value}
            onChangeText={onChangeText}
        />

        </View>

    )
}

const styles = StyleSheet.create( {
    // User-name Input
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 14,
        fontSize: 14,
        color: '#111',
        marginBottom: 12,
        backgroundColor: '#fafafa',
        textAlign: 'left'
    },

    errorInput: {
        backgroundColor: 'rgb(252, 207, 207)',
        borderColor: 'rgb(185, 21, 21)',
        color: '#000000'
    },

})
