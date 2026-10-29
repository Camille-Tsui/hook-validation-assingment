import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { Control, Controller, FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { TextInput, Text, Button, Alert, StyleSheet } from "react-native";
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
import { router } from 'expo-router';


const signupScheama = z.object({
    firstName: z.string().trim().min(2,"First name is required").max(30, "First name too long"),
    lastName: z.string().trim().min(2,"Last name is required").max(30, "Last name too long"),
    email: z.string().trim().min(1, "email required").email('Invalid email adress'),
    password: z.string().min(8, "Password must have atleast 8 characters"),
    confirmPassword: z.string(),
})
.refine ((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupScheama>;
type SavedFormData = Omit<SignupFormData, "password" | "confirmPassword">;

type FieldProps = {
  control: Control<SignupFormData>;
  name: FieldPath<SignupFormData>;
  placeholder: string;
  secure?: boolean;
  email?: boolean;
};


function Field({ control, name, placeholder, secure, email }: FieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={styles.feild}
            placeholder={placeholder}
            secureTextEntry={secure}
            keyboardType={email ? "email-address" : "default"}
            autoCapitalize={email || secure ? "none" : "sentences"}
            autoCorrect={!(email || secure)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </>
      )}
    />
  );
}

export default function SignUpForm() {

    const [savedFormData, setSavedFormData] = useState<SavedFormData | null>(null,);

  
  const { control, register, setValue, watch, handleSubmit, formState: {errors} } = useForm<SignupFormData>({
    resolver: zodResolver(signupScheama),
     defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    },   
  });

  const saveFormData = async (data: SavedFormData) => {
    try {
      await AsyncStorage.setItem("signupFormData", JSON.stringify(data));
      setSavedFormData(data);
    } catch (error) {
      console.error("Failed to save form data:", error);
    }
  };


  // const onSubmit = (data) => {
  //   Alert.alert('Form Data', JSON.stringify(data));
  //   router.replace('/Confirmation')
  // };

    const onSubmit = async ({password, confirmPassword,...safe}: SignupFormData) => {
      try {
        console.log("onSubmit fired", safe);
        const msg = JSON.stringify(safe, null, 2);
        //Alert.alert("Valid", msg);;
        await saveFormData(safe);
        // hadd to add this cuz i was getting error without
        setTimeout(() => {
          router.replace('/Confirmation')
        }, 0);
      } catch (error) {
        console.error("submission failed", error);
      }
  };

  return (
      
    <View style={styles.container}>
      <Field control={control} name="firstName" placeholder="First Name" />
      <Field control={control} name="lastName" placeholder="Last Name" />
      <Field control={control} name="email" placeholder="Email" email/>
      <Field control={control} name="password" placeholder="Password" secure />
      <Field control={control} name="confirmPassword" placeholder="Confirm password" secure />



      <Button title="Sign Up" onPress={ handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        width:'80%',
        marginTop: 50 
    },
    feild: {
        width: '100%',
        borderWidth: 1,
        padding: 10,
        marginBlock: 5,
    },
    error: {
        color: "red",
        marginBottom: 15,
    }
})