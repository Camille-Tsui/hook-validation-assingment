import { View, Text, StyleSheet } from "react-native";

export default function Confirmation () {
    return(
        <View style={styles.container}>
            <Text>Account Created for Name!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})