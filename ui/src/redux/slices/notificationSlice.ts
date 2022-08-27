import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error';
  message: string;
  autoHideDuration: number | null;
}

type NotificationPayload = Partial<NotificationState>;

const initialState: NotificationState = {
  open: false,
  severity: 'info',
  message: '',
  autoHideDuration: 4500,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification: (state, action: PayloadAction<NotificationPayload>) => {
      state.open = true;
      state.message = action.payload.message || initialState.message;
      state.severity = action.payload.severity || initialState.severity;
      state.autoHideDuration = action.payload.autoHideDuration || initialState.autoHideDuration;
    },
    errorNotification: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload
        ? `Ha ocurrido un error: ${action.payload}`
        : 'Ha ocurrido un error inesperado. Favor volver a intentar.';
      state.severity = 'error';
      state.open = true;
    },
    closeNotification: (state) => {
      state.open = false;
    },
  },
});

export const { closeNotification, errorNotification, notification } = notificationSlice.actions;
