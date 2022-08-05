import { Grid, Typography } from '@mui/material';

export const FightConfigSection = ({ title, children }: FightConfigSectionProps) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid container item justifyContent="center" alignItems="center">
        <Typography variant="h3">
          {title}
        </Typography>
      </Grid>

      <Grid container item>
        {children}
      </Grid>
    </Grid>
  );
}

export interface FightConfigSectionProps {
  title: string;
  children?: React.ReactNode;
}
