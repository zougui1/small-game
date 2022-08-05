import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux';

import { Router } from '~/globals/Router';
import { theme } from '~/theme';
import { store } from '~/store';
import { queryClient } from '~/api/react';
import { DialogProvider } from '~/hooks/dialog';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <DialogProvider>
            <CssBaseline />
            <Router />
            <ReactQueryDevtools  />
          </DialogProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
