import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useTypedSelector } from '../redux/store';
import { closeNotification } from '../redux/slices/notificationSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Notification: React.FC = () => {
  const { open, severity, message, autoHideDuration } = useTypedSelector(
    ({ notification }) => notification,
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      key={message}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
