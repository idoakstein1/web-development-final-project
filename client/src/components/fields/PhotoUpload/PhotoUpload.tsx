import { FileUpload } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { PhotoUploadProps } from './types';

export const PhotoUpload = <T extends FieldValues>({ name, control }: PhotoUploadProps<T>) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Button variant="contained" sx={{ gap: 1 }} component="label">
                        Select Photo
                        <FileUpload />
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            hidden
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    setPreviewUrl(URL.createObjectURL(file));
                                    field.onChange(file);
                                }
                            }}
                        />
                    </Button>
                    {previewUrl && <Box component="img" src={previewUrl} sx={{ width: 300 }} />}
                    {error && <Typography color="error">{error.message}</Typography>}
                </Box>
            )}
        />
    );
};
