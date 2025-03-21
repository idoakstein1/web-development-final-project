import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAPI, useAuth } from '../../hooks';
import { FormTextField, PhotoUpload } from '../fields';
import { PopUpAlert } from '../PopUpAlert';
import { dialogContentStyle } from './styles';
import { UpdateUserFormProps } from './types';

const formSchema = (currentUsername: string) =>
    z
        .object({
            username: z.string().min(3, 'Username must be at least 3 characters long'),
            profilePicture: z
                .instanceof(File, { message: 'Please upload a valid file' })
                .refine(({ type }) => ['image/jpeg', 'image/png'].includes(type), {
                    message: 'Only JPEG or PNG files are allowed',
                })
                .optional(),
        })
        .refine(({ username, profilePicture }) => username !== currentUsername || !!profilePicture);
type FormSchema = z.infer<ReturnType<typeof formSchema>>;

export const UpdateUserForm = ({ setIsFormOpen }: UpdateUserFormProps) => {
    const API = useAPI();
    const queryClient = useQueryClient();
    const { user, setUser } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema(user.username)),
        mode: 'onChange',
        defaultValues: { username: user.username },
    });
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState<string | undefined>();

    const closeDialog = () => setIsFormOpen(false);
    const onSubmit = async (data: FormSchema) => {
        try {
            const newUser = await API.user.updateUser(user.username, data);
            setUser(newUser);
            queryClient.invalidateQueries({ queryKey: ['userPosts', user._id] });
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
                <PhotoUpload control={control} name="profilePicture" preview="avatar" />
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
