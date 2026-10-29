import { Pressable, View } from "react-native";
import { Control, Controller, FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { TextInput, Text, Button, Alert, StyleSheet } from "react-native";
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
import { router } from 'expo-router';

// TODO:
// create confirmation page
// refactor to use react hook form better


const signupScheama = z.object({
    firstName: z.string().trim().min(2,"First name is required").max(10, "First name too long"),
    lastName: z.string().trim().min(2,"Last name is required").max(10, "Last name too long"),
    email: z.string().trim().min(1, "email required").email('Invalid email adress'),
    password: z.string().min(8, "Password must have atleast 8 characters"),
    confirmPassword: z.string(),
})
.refine ((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type FormFields = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// type FieldProps = {
//   control: Control<SignupFormData>;
//   name: FieldPath<SignupFormData>;
//   placeholder: string;
//   secure?: boolean;
//   email?: boolean;
// };

// type SignupFormData = z.infer<typeof signupScheama>;
// type SavedFormData = Omit<SignupFormData, "password" | "confirmPassword">;

// function Field({ control, name, placeholder, secure, email }: FieldProps) {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({
//         field: { onChange, onBlur, value },
//         fieldState: { error },
//       }) => (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder={placeholder}
//             secureTextEntry={secure}
//             keyboardType={email ? "email-address" : "default"}
//             autoCapitalize={email || secure ? "none" : "sentences"}
//             autoCorrect={!(email || secure)}
//             onChangeText={onChange}
//             onBlur={onBlur}
//             value={value}
//           />
//           {error && <Text style={styles.errorText}>{error.message}</Text>}
//         </>
//       )}
//     />
//   );
// }

export default function SignUpForm() {
    
    // form hook
  const { control, register, setValue, watch, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(signupScheama),
     defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    },   
  });

  // register feilds
  register('firstName');
  register('lastName');
  register('email'); 
  register('password');
  register('confirmPassword');

  const onSubmit = (data) => {
    Alert.alert('Form Data', JSON.stringify(data));
    router.replace('/Confirmation')
  };


  return (
      
    <View style={styles.container}>
        {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => ( */}

{/*     
        <Controller
      control={control}
      name="firstName"
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
      <TextInput
        placeholder="First Name"
        value={watch('firstName')}
        onChangeText={(text) => setValue('firstName', text)}
        style={styles.feild}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
        </>
      )}
    /> */}

    {/* First Name */}
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
        keyboardType="email-address"
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
        secureTextEntry={true}
        style={styles.feild}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Confirm Password */}
        <TextInput
        placeholder="Confirm password"
        value={watch('confirmPassword')}
        onChangeText={(text) => setValue('confirmPassword', text)}
        secureTextEntry={true}
        style={styles.feild}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

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