import { Control, FieldValues, Path } from 'react-hook-form';

export type PhotoUploadProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
};
