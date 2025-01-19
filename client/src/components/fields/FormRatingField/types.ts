import { RatingProps } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

export type FormRatingFieldProps<T extends FieldValues> = Omit<RatingProps, 'name'> & {
    name: Path<T>;
    control: Control<T>;
};
