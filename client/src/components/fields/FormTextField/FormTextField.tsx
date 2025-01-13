import { TextField, TextFieldProps } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import { FormTextFieldProps } from './types';

export const FormTextField = <T extends FieldValues>({ name, control, label, ...props }: FormTextFieldProps<T>) => {
    const textFieldProps: TextFieldProps = {
        autoComplete: 'off',
        color: 'primary',
        size: 'small',
        ...props,
        InputProps: {
            style: { borderRadius: '10px' },
            ...props.InputProps,
        },
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : ''}
                    {...props}
                    {...textFieldProps}
                />
            )}
        />
    );
};
