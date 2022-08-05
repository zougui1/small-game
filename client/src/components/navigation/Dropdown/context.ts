import type { PayloadAction } from '@reduxjs/toolkit';

import { createSliceContext } from '@zougui/common.react-store';

export interface DropdownState {
  anchorEl: Element | null,
  ids: {
    button: string | undefined,
    menu: string | undefined,
  },
}

export const initialState: DropdownState = {
  anchorEl: null,
  ids: {
    button: undefined,
    menu: undefined,
  },
};

const sliceContext = createSliceContext({
  name: 'DropdownContext',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Element>) => {
      state.anchorEl = action.payload as any;
    },
    close: state => {
      state.anchorEl = null;
    },
    updateId: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.ids.button = `${id}-button`;
      state.ids.menu = `${id}-menu`;
    },
  },
});

export const {
  useSelector: useDropdownSelector,
  useActions: useDropdownActions,
  Provider: DropdownProvider,
} = sliceContext;

export const dropdownActions = sliceContext.slice.actions;
