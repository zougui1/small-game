import { DialogContextProvider } from './context';
import { RenderDialogs } from './RenderDialogs';

export const DialogProvider = ({ children }: DialogProviderProps) => {
  return (
    <DialogContextProvider>
      {children}
      <RenderDialogs />
    </DialogContextProvider>
  );
}

export interface DialogProviderProps {
  children?: React.ReactNode;
}
