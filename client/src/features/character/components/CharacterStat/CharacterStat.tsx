import { Typography } from '@mui/material';

export const CharacterStat = ({ name, value }: CharacterStatProps) => {
  return (
    <Typography>
      {name}: {value}
    </Typography>
  );
}

export interface CharacterStatProps {
  name: string;
  value: string | number | string[];
}
