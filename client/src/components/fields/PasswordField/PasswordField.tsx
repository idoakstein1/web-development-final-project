import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { FormTextField, FormTextFieldProps } from '../FormTextField';

export const PasswordField = <T extends FieldValues>({
    control,
    ...props
}: Omit<FormTextFieldProps<T>, 'name' | 'label'>) => {
    const [showPassword, setShowPassword] = useState(false);

    const passwordFieldProps: FormTextFieldProps<T> = {
        name: 'password' as Path<T>,
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
