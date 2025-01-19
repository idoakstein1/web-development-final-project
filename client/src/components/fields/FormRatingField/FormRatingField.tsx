import { Controller, FieldValues } from 'react-hook-form';
import { FormRatingFieldProps } from './types';
import { Rating } from '@mui/material';

export const FormRatingField = <T extends FieldValues>({ name, control, ...props }: FormRatingFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <Rating
                {...field}
                value={Number(field.value) || 0}
                onChange={(_, newValue) => field.onChange(newValue)}
                {...props}
            />
        )}
    />
);
