import { Grid, Typography } from '@mui/material';

export const FightOver = ({ message }: FightOverProps) => {
  return (
    <Grid container justifyContent="center">
      <Grid item sx={{ marginTop: 3 }}>
        <Typography variant="h3">{message}</Typography>
      </Grid>
    </Grid>
  );
}

export interface FightOverProps {
  message: string;
}
