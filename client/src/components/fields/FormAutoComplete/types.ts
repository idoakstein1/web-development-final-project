import { AutocompleteProps } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';
import { ValueSet } from '../../../types';

export type FormAutoCompleteProps<T extends FieldValues, DisableClearable extends boolean | undefined> = Omit<
    AutocompleteProps<ValueSet, false, DisableClearable, false>,
    'name' | 'renderInput'
> & {
    name: Path<T>;
    control: Control<T>;
    label?: string;
};
