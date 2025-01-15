import Close from '@mui/icons-material/Close';
import { Alert, AlertProps, Collapse, IconButton } from '@mui/material';
import { PopUpAlertProps } from './types';

export const PopUpAlert = ({ isShowAlert, setIsShowAlert, alertContent, alertSeverity }: PopUpAlertProps) => {
    const alertProps: AlertProps = {
        severity: alertSeverity || 'error',
        action: (
            <IconButton size="small" onClick={() => setIsShowAlert(false)}>
                <Close />
            </IconButton>
        ),
        sx: { display: 'flex', alignItems: 'center' },
    };

    return (
        <Collapse in={isShowAlert} sx={{ margin: 1 }}>
            <Alert {...alertProps}>{alertContent || 'something went wrong'}</Alert>
        </Collapse>
    );
};
