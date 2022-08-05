import { makeStyles } from '~/utils/styles';

export const styles = makeStyles({
  root: {
    paddingRight: '46px',
  },

  closeButton: {
    padding: 1,
    position: 'absolute',
    right: 8,
    top: 8,
    color: theme => theme.palette.grey[500],
  },
});
