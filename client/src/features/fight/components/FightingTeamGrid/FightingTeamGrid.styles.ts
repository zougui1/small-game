import { makeStyles } from '~/utils/styles';
import { Timings } from '~/features/fight/utils/game';

const attackingOffset = '200px';
const attackedOffset = '90px';

const attackingTimings = `${Timings.attackedDuration}ms`;
const attackedTimings = `${Timings.attackedDuration}ms ${Timings.attackedDelay}ms`;

export const styles = makeStyles({
  attacking: {
    transition: `transform ${attackingTimings}`,

    '&.player': {
      transform: `translateX(${attackingOffset})`,
    },

    '&.enemy': {
      transform: `translateX(-${attackingOffset})`,
    },
  },

  attacked: {
    transition: `transform ${attackedTimings}`,

    '&.player': {
      transform: `translateX(-${attackedOffset})`,
    },

    '&.enemy': {
      transform: `translateX(${attackedOffset})`,
    },
  },
});
