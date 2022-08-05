import { AppBar, Toolbar, Grid } from '@mui/material';

import { Link } from '~/components/navigation/Link';

export const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Grid container spacing={4}>
          <Grid item>
            <Link to="/characters">Characters</Link>
          </Grid>

          <Grid item>
            <Link to="/fight-config">Start fight</Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
