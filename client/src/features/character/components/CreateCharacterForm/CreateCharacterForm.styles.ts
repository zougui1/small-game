import { makeStyles } from '~/utils/styles';

export const styles = makeStyles({
  content: {
    marginTop: 1,
    display: 'flex',
    flexDirection: 'column',

    '& > *:not(:first-of-type)': {
      marginTop: 3,
    },
  },
});
