import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import z from 'zod';
import { API } from '../../api';
import { FormTextField, PasswordField } from '../../components/fields';
import { PopUpAlert } from '../../components/PopUpAlert';
import { formContainerStyle } from './styles';

const formSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[0-9]/, 'Password must include at least one number')
        .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
        .regex(/[a-z]/, 'Password must include at least one lowercase letter'),
});
type FormSchema = z.infer<typeof formSchema>;

export const SignUpPage = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: { username: '', email: '', password: '' },
    });
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState<string | undefined>();

    const onSubmit = async (data: FormSchema) => {
        try {
            await API.user.create(data);

            navigate('/logIn');
        } catch (error) {
            if (isAxiosError(error)) {
                setAlertContent(error.response?.data.message);
            }
            setIsShowAlert(true);
        }
    };

    return (
        <Box sx={formContainerStyle}>
            <Typography variant="h2">Sign Up</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                <FormTextField label="Username" name="username" control={control} />
                <FormTextField label="Email" name="email" control={control} />
                <PasswordField control={control} />
            </Box>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={!isValid}>
                Sign Up
            </Button>
            <NavLink to="/logIn" style={{ color: palette.primary.main }}>
                Already have an account?
            </NavLink>
            <PopUpAlert isShowAlert={isShowAlert} setIsShowAlert={setIsShowAlert} alertContent={alertContent} />
        </Box>
    );
};
