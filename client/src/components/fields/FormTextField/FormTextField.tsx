import { TextField, TextFieldProps } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import { FormTextFieldProps } from './types';

export const FormTextField = <T extends FieldValues>({ name, control, onChange, ...props }: FormTextFieldProps<T>) => {
    const textFieldProps: TextFieldProps = {
        autoComplete: 'off',
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
                    onChange={(event) => {
                        const newValue = event.target.value;

                        field.onChange(newValue);
                        onChange?.(newValue);
                    }}
                    error={!!error}
                    helperText={error ? error.message : ''}
                    {...props}
                    {...textFieldProps}
                />
            )}
        />
    );
};
