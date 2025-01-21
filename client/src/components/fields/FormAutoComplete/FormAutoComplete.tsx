import {
    Autocomplete,
    AutocompleteProps,
    AutocompleteRenderInputParams,
    TextField,
    TextFieldProps,
} from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import { ValueSet } from '../../../types';
import { FormAutoCompleteProps } from './types';

export const FormAutoComplete = <T extends FieldValues, DisableClearable extends boolean | undefined>({
    control,
    name,
    options,
    label,
    ...props
}: FormAutoCompleteProps<T, DisableClearable>) => {
    const autoCompleteProps: Partial<AutocompleteProps<ValueSet, false, DisableClearable, false>> = {
        autoComplete: false,
        size: 'small',
        disableClearable: true as DisableClearable,
        ...props,
    };
    const textFieldProps = (params: AutocompleteRenderInputParams): TextFieldProps => ({
        ...params,
        autoComplete: 'off',
        label: label,
        InputProps: {
            style: { borderRadius: '10px' },
            ...params.InputProps,
        },
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    {...autoCompleteProps}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    options={options}
                    getOptionLabel={({ name }) => name}
                    getOptionKey={({ id }) => id}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...textFieldProps(params)} />}
                />
            )}
        />
    );
};
