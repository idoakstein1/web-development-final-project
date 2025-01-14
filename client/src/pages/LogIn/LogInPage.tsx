import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { API } from '../../api';
import { FormTextField, PasswordField } from '../../components/fields';
import { useAuth } from '../../hooks';
import { formContainerStyle } from './styles';
import { useNavigate } from 'react-router';

const formSchema = z.object({
    username: z.string().nonempty('Username cannot be empty'),
    password: z.string().nonempty('Password cannot be empty'),
});
type FormSchema = z.infer<typeof formSchema>;

export const LogInPage = () => {
    const navigate = useNavigate();
    const { setAccessToken, setRefreshToken, setUser } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: { username: '', password: '' },
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async ({ username, password }: FormSchema) => {
        if (isSubmitted) {
            return;
        }
        setIsSubmitted(true);

        const { accessToken, refreshToken, user } = await API.user.logIn(username, password);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);

        navigate('/');
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
        </Box>
    );
};
