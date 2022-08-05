import { makeStyles } from '~/utils/styles';

const marginTop = '64px';

export const styles = makeStyles({
  container: {
    marginTop,
    height: `calc(100vh - ${marginTop})`,
    overflow: 'auto',
  },
});
