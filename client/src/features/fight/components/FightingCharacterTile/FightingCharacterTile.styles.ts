import { SxProps, Theme } from '@mui/material';

import { percent } from '~/utils/percent';
import { makeStyles } from '~/utils/styles';

const badHealthPercent = 60;
const criticalHealthPercent = 30;

export const styles = makeStyles({
  root: {
    height: '100px',
  },

  pictureContainer: {
    maxHeight: '100%',
  },

  statsContainer: {
    padding: '8px 12px',
  },

  badHealth: {
    color: theme => theme.palette.warning.dark,
  },

  criticalHealth: {
    color: theme => theme.palette.error.dark,
  },
});

export const getHealthStyles = ({ health, maxHealth }: { health: number; maxHealth: number }): SxProps<Theme> | undefined => {
  const healthPercent = percent.toPercent(health, maxHealth);
  const isHealthBad = healthPercent <= badHealthPercent;
  const isHealthCritical = healthPercent <= criticalHealthPercent;

  if (isHealthCritical) {
    return styles.criticalHealth;
  }

  if (isHealthBad) {
    return styles.badHealth;
  }
}
