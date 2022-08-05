import React from 'react';
import type { DialogProps } from '~/components/layout/Dialog';

export interface DialogOptions {
  /**
   * @default false
   */
  defaultIsOpen?: boolean | undefined;
  body: React.ReactNode;
  title: React.ReactNode;
  props?: Omit<DialogProps, 'buttons' | 'title' | 'children' | 'open' | 'onClose'> | undefined;
  buttons?: DialogProps['buttons'] | undefined;
  id?: string | undefined;
  onClose?: (() => void) | undefined;
}
