import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { API } from '../../api';
import { FormTextField, PasswordField } from '../../components/fields';
import { formContainerStyle } from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const formSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[0-9]/, 'Password must include at least one number')
        .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
        .regex(/[a-z]/, 'Password must include at least one lowercase letter'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});
type FormSchema = z.infer<typeof formSchema>;

export const SignUpPage = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: { username: '', email: '', password: '', firstName: '', lastName: '' },
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async (data: FormSchema) => {
        if (isSubmitted) {
            return;
        }
        setIsSubmitted(true);

        await API.user.create(data);

        navigate('/logIn');
    };

    return (
        <Box sx={formContainerStyle}>
            <Typography variant="h2">Sign Up</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                <FormTextField label="Username" name="username" control={control} />
                <FormTextField label="Email" name="email" control={control} />
                <PasswordField control={control} />
                <Box sx={{ display: 'flex', gap: '2vh' }}>
                    <FormTextField label="First Name" name="firstName" control={control} />
                    <FormTextField label="Last Name" name="lastName" control={control} />
                </Box>
            </Box>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={!isValid}>
                Sign Up
            </Button>
        </Box>
    );
};
