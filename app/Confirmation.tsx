import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SavedFormData = {
    firstName: string;
    lastName: string;
    email: string;
};

export default function Confirmation () {
    const [savedData, setSavedData] = useState<SavedFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadFormData();
    }, []);

    // load the saved data
    const loadFormData = async () => {
    try {
      const value = await AsyncStorage.getItem("signupFormData");
      
      if (value !== null) {
        setSavedData(JSON.parse(value) as SavedFormData);
      }
    } catch (error) {
      console.error("Failed to load form data:", error);
    } finally {
      setIsLoading(false);
    }
  };

    return(
        <View style={styles.container}>
            {savedData ? 
                <Text>Account Created for {savedData.firstName}!</Text>
             : 
            <Text>Data didnt load correctly</Text>// display if there is no saved data
            }
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