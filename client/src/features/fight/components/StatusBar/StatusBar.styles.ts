import { linearProgressClasses, SxProps, Theme } from '@mui/material';

import { makeStyles } from '~/utils/styles';

export const styles = makeStyles({
  root: {
    position: 'relative',

    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    },
  },

  bar: {
    top: 10,
    height: '10px',
    borderRadius: 2,
    backgroundColor: '#000',
  },

  textContainer: {
    paddingX: 1,
  },

  text: {
    textShadow: [
      '0 0 1px #000',
      '2px 0 1px #000',
      '0 2px 1px #000',
      '0 2px 1px #000',
      '2px 2px 1px #000',
      '0 0 3px #000',
    ].join(', '),
  },
});

export const getBarStyles = ({ color }: { color: string | undefined }): SxProps<Theme> | undefined => {
  if (!color) {
    return undefined;
  }

  return {
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: color,
    },
  };
}
