import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, ButtonProps, Divider, Typography, useTheme } from '@mui/material';
import { GoogleLogin, GoogleLoginProps } from '@react-oauth/google';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { z } from 'zod';
import { FormTextField, PasswordField } from '../../components/fields';
import { PopUpAlert } from '../../components/PopUpAlert';
import { useAPI, useAuth } from '../../hooks';
import { LogInInfo } from '../../types';
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

    const onSubmit = async (request: () => Promise<LogInInfo>) => {
        try {
            const { accessToken, refreshToken, user } = await request();
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

    const googleLoginProps: GoogleLoginProps = {
        onSuccess: ({ credential }) => onSubmit(() => API.user.googleLogIn(credential)),
        shape: 'pill',
        width: 250,
    };
    const logInButtonProps: ButtonProps = {
        onClick: handleSubmit(({ password, username }) => onSubmit(() => API.user.logIn(username, password))),
        variant: 'contained',
        disabled: !isValid,
    };

    return (
        <Box sx={formContainerStyle}>
            <Typography variant="h2">Log In</Typography>
            <GoogleLogin {...googleLoginProps} />
            <Divider sx={{ width: '20%' }}>Or continue with username and password</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                <FormTextField label="Username" name="username" control={control} />
                <PasswordField control={control} />
            </Box>
            <Button {...logInButtonProps}>Log In</Button>
            <NavLink to="/signUp" style={{ color: palette.primary.main }}>
                Don't have an account?
            </NavLink>
            <PopUpAlert isShowAlert={isShowAlert} setIsShowAlert={setIsShowAlert} alertContent={alertContent} />
        </Box>
    );
};
