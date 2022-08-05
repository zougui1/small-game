import type { PayloadAction } from '@reduxjs/toolkit';

import { createSliceContext } from '@zougui/common.react-store';

import type { DialogOptions } from './types';

export interface DialogData extends Omit<DialogOptions, 'defaultIsOpen'> {
  id: string;
  isOpen: boolean;
}

export interface DialogState {
  dialogs: Record<string, DialogData>;
}

export const initialState: DialogState = {
  dialogs: {},
};

const context = createSliceContext({
  name: 'DialogContext',
  initialState,
  reducers: {
    addDialog: (state, action: PayloadAction<{ id: string } & DialogOptions>) => {
      const {
        id,
        defaultIsOpen,
      } = action.payload;

      if (state.dialogs[id]) {
        console.warn(`A dialog with id "${id}" already exists.`);
        return;
      }

      state.dialogs[id] = {
        ...action.payload,
        isOpen: defaultIsOpen ?? false,
        // typescript error. the proxified type doesn't like
        // some of the props used for the buttons
      } as any;
    },

    updateDialog: (state, action: PayloadAction<{ id: string } & Partial<DialogOptions>>) => {
      const {
        id,
        defaultIsOpen,
      } = action.payload;
      const dialog = state.dialogs[id];

      if(!dialog) {
        return;
      }

      state.dialogs[id] = {
        ...dialog,
        ...action.payload,
        // typescript error. the proxified type doesn't like
        // some of the props used for the buttons
      } as any;
    },

    removeDialog: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.dialogs[id];
    },

    openDialog: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const dialog = state.dialogs[id];

      if (dialog) {
        dialog.isOpen = true;
      }
    },

    closeDialog: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const dialog = state.dialogs[id];

      if (dialog) {
        dialog.isOpen = false;
      }
    },
  },
});

export const {
  useSelector: useDialogSelector,
  useActions: useDialogActions,
  Provider: DialogContextProvider,
} = context;
