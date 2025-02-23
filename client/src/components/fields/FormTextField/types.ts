import { TextFieldProps } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

export type FormTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'onChange'> & {
    name: Path<T>;
    control: Control<T>;
    onChange?: (value: string) => void;
};
