import { Box, Grid, GridProps, LinearProgress, Typography } from '@mui/material';

import { percent } from '~/utils/percent';
import { mergeSx } from '~/utils/styles';

import { styles, getBarStyles } from './StatusBar.styles';

export const StatusBar = ({ name, value, max, barColor, ...rest }: StatusBarProps) => {
  const progressValue = percent.toPercent(value, max);

  return (
    <Box sx={styles.root}>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={mergeSx(
          styles.bar,
          getBarStyles({ color: barColor }),
        )}
      />


      <Grid
        {...rest}
        container
        justifyContent="space-between"
        sx={styles.textContainer}
      >
        <Grid item>
          <Typography sx={styles.text}>{name}</Typography>
        </Grid>

        <Grid item>
          <Typography sx={styles.text}>{value}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export interface StatusBarProps extends Omit<GridProps, 'container' | 'justifyContent'> {
  name: string;
  value: number;
  max: number;
  barColor?: string | undefined;
}
