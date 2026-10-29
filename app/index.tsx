import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from '../components/SignUpForm';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
      <SignUpForm/>
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
});
