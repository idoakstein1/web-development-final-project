import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { User } from '../../../types';
import { FormTextField, FormTextFieldProps } from '../FormTextField';

export const PasswordField = ({ control, ...props }: Omit<FormTextFieldProps<User>, 'name' | 'label'>) => {
    const [showPassword, setShowPassword] = useState(false);

    const passwordFieldProps: FormTextFieldProps<User> = {
        name: 'password',
        label: 'Password',
        control,
        type: showPassword ? 'text' : 'password',
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            ),
        },
        ...props,
    };

    return <FormTextField {...passwordFieldProps} />;
};
