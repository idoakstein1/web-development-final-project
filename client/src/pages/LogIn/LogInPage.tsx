import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { z } from 'zod';
import { FormTextField, PasswordField } from '../../components/fields';
import { PopUpAlert } from '../../components/PopUpAlert';
import { useAPI, useAuth } from '../../hooks';
import { formContainerStyle } from './styles';

const formSchema = z.object({
    username: z.string().nonempty('Username cannot be empty'),
    password: z.string().nonempty('Password cannot be empty'),
});
type FormSchema = z.infer<typeof formSchema>;

export const LogInPage = () => {
    const API = useAPI();
    const { setAccessToken, setRefreshToken, setUser } = useAuth();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: { username: '', password: '' },
    });
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState<string | undefined>();

    const onSubmit = async ({ username, password }: FormSchema) => {
        try {
            const { accessToken, refreshToken, user } = await API.user.logIn(username, password);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setUser(user);

            navigate('/');
        } catch (error) {
            if (isAxiosError(error)) {
                setAlertContent(error.response?.data.message);
            }
            setIsShowAlert(true);
        }
    };

    return (
        <Box sx={formContainerStyle}>
            <Typography variant="h2">Log In</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                <FormTextField label="Username" name="username" control={control} />
                <PasswordField control={control} />
            </Box>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={!isValid}>
                Log In
            </Button>
            <NavLink to="/signUp" style={{ color: palette.primary.main }}>
                Don't have an account?
            </NavLink>
            <PopUpAlert isShowAlert={isShowAlert} setIsShowAlert={setIsShowAlert} alertContent={alertContent} />
        </Box>
    );
};
