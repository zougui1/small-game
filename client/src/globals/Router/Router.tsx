import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Header } from '~/globals/Header';
import { Guard } from '~/components/navigation/Guard';

import { styles } from './Router.styles';
import { routes } from './routes';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <Box sx={styles.container}>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Guard guards={route.guards || []}>
                  {route.element}
                </Guard>
              }
            />
          ))}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
