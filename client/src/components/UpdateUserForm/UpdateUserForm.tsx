import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { API } from '../../api';
import { useAuth } from '../../hooks';
import { FormTextField } from '../fields';
import { PopUpAlert } from '../PopUpAlert';
import { dialogContentStyle } from './styles';
import { UpdateUserFormProps } from './types';

const formSchema = (currentUsername: string, currentEmail: string) =>
    z
        .object({
            username: z.string().min(3, 'Username must be at least 3 characters long'),
            email: z.string().email('Invalid email address'),
        })
        .refine((data) => data.username !== currentUsername || data.email !== currentEmail, {
            message: 'You must update at least one field (username or email)',
        });
type FormSchema = z.infer<ReturnType<typeof formSchema>>;

export const UpdateUserForm = ({ setIsFormOpen }: UpdateUserFormProps) => {
    const { user, setUser, accessToken } = useAuth();
    const { email: currentEmail, username: currentUsername } = user || { email: '', username: '' };
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema(currentUsername, currentEmail)),
        mode: 'onChange',
        defaultValues: { username: currentUsername, email: currentEmail },
    });
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState<string | undefined>();

    const closeDialog = () => setIsFormOpen(false);
    const onSubmit = async (data: FormSchema) => {
        try {
            const newUser = await API.user.updateUser(currentUsername, data, accessToken || '');
            setUser(newUser);
            closeDialog();
        } catch (error) {
            if (isAxiosError(error)) {
                setAlertContent(error.response?.data.message);
            }
            setIsShowAlert(true);
        }
    };

    return (
        <Dialog open={true}>
            <DialogTitle>Update User</DialogTitle>
            <Divider />
            <DialogContent sx={dialogContentStyle}>
                <FormTextField control={control} name="username" label="Username" />
                <FormTextField control={control} name="email" label="Email" />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={closeDialog} color="error" variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} color="success" variant="contained" disabled={!isValid}>
                    Update
                </Button>
            </DialogActions>
            <PopUpAlert isShowAlert={isShowAlert} setIsShowAlert={setIsShowAlert} alertContent={alertContent} />
        </Dialog>
    );
};
