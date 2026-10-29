import { Pressable, View } from "react-native";
import { Control, Controller, FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { TextInput, Text } from "react-native";
import z from "zod";



// const signupScheama = z.object({
//     firstName: z.string().min(1, "First name required"),
// })

// type SignUpFormData = z.infer<typeof signupScheama>;
// //type SavedFormData = Omit<SignUpFormData, >;

// type FieldProps = {
//     control: Control<SignUpFormData>;
//     name: FieldPath<SignupFormData>;
//     placeholder: string;
//     secure?: boolean;
//     email?: boolean;
// }

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
//             placeholder={placeholder}
//             secureTextEntry={secure}
//             keyboardType={email ? "email-address" : "default"}
//             autoCapitalize={email || secure ? "none" : "sentences"}
//             autoCorrect={!(email || secure)}
//             onChangeText={onChange}
//             onBlur={onBlur}
//             value={value}
//           />
//           {error && <Text>{error.message}</Text>}
//         </>
//       )}
//     />
//   );
// }

type FormFields = {
    email: string;
};


export default function SignUpForm() {
    const {register, handleSubmit} = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    };

    return (
        <View>

            <TextInput {...register("email")} placeholder="Email" />

            <Pressable onPress={handleSubmit(onSubmit)}>
                <Text>Submit</Text>
            </Pressable>
        </View>
    )
}