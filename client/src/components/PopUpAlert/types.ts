import { AlertColor } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export type PopUpAlertProps = {
    isShowAlert: boolean;
    setIsShowAlert: Dispatch<SetStateAction<boolean>>;
    alertContent?: string;
    alertSeverity?: AlertColor;
};
