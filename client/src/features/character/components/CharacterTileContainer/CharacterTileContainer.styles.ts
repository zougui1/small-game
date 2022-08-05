import { makeStyles } from '~/utils/styles';

const tileBorders = '1px solid gold';

export const styles = makeStyles({
  root: {
    border: tileBorders,
    transition: 'filter 0.05s',

    '&:hover': {
      filter: 'brightness(1.15)',
    },

    '& > *:not(:last-of-type)': {
      borderBottom: tileBorders,
    },
  },
});
