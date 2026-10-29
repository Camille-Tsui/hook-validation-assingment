import { Pressable, View } from "react-native";
import { Control, Controller, FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { TextInput, Text, Button, Alert, StyleSheet } from "react-native";
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";




//Need to also add white space detection
const signupScheama = z.object({
    firstName: z.string().min(2,"First name is required").max(10, "First name too long"),
    lastName: z.string().min(2,"Last name is required").max(10, "Last name too long"),
    email: z.string().min(1, "email required").email('Invalid email adress'),
    password: z.string().min(8, "Password must have atleast 8 characters"),
    confirmPassword: z.string(),
})
.refine ((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
}) // I dont think confirm password is working yet

type FormFields = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function SignUpForm() {
    // form hook
  const { register, setValue, watch, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(signupScheama),
  });

  // register feilds
  register('firstName');
  register('lastName');
  register('email'); 
  register('password');
  register('confirmPassword');

  const onSubmit = (data) => {
    Alert.alert('Form Data', JSON.stringify(data));
  };

  return (
    <View style={styles.container}>

    {/* First name */}
      <TextInput
        placeholder="First Name"
        value={watch('firstName')}
        onChangeText={(text) => setValue('firstName', text)}
        style={styles.feild}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

    {/* Last name */}
      <TextInput
        placeholder="Last Name"
        value={watch('lastName')}
        onChangeText={(text) => setValue('lastName', text)}
        style={styles.feild}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

        {/* email */}
      <TextInput
        placeholder="Email"
        value={watch('email')} 
        onChangeText={(text) => setValue('email', text)} 
        style={styles.feild}
      />
      {
        errors.email && <Text style={styles.error}>{errors.email.message}</Text>
      }

      {/* Password */}
        <TextInput
        placeholder="Password"
        value={watch('password')}
        onChangeText={(text) => setValue('password', text)}
        style={styles.feild}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Confirm Password */}
        <TextInput
        placeholder="Confirm password"
        value={watch('confirmPassword')}
        onChangeText={(text) => setValue('confirmPassword', text)}
        style={styles.feild}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        width:'80%',
        padding: 20,
        paddingTop: 50 
    },
    feild: {
        width: '100%',// figure out how to make it dynamic
        borderWidth: 1,
        padding: 10,
    },
    error: {
        color: "red",
        marginBottom: 15,
    }
})