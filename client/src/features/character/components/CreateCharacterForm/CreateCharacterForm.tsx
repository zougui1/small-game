import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { Form } from '~/components/form/Form';
import { ReactCharacter } from '~/features/character/api/react';
import { useConst } from '~/hooks';

import { styles } from './CreateCharacterForm.styles';
import { getRandomspells, getRandomDefaultStats, getRandomPicture } from './utils';
import { characterSchema, CharacterData } from './schema';

export const CreateCharacterForm = ({ onCreated }: CreateCharacterFormProps) => {
  const createMutation = ReactCharacter.v1.useCreate({
    onSuccess: onCreated,
  });

  const createCharacter = (data: CharacterData) => {
    createMutation.mutate(data);
  }

  const defaultValues = useConst(() => {
    return {
      ...getRandomDefaultStats(),
      picture: getRandomPicture(),
      spells: getRandomspells(),
    };
  });

  return (
    <Form
      schema={characterSchema}
      onSubmit={createCharacter}
      defaultValues={defaultValues}
    >
      <Box sx={styles.content}>
        <Form.TextField label="Name" name="name" />
        <Form.TextField label="Picture" name="picture" />
        <Form.TextField label="HP" name="maxHealthPoints" />
        <Form.TextField label="Strength" name="strength" />
        <Form.TextField label="mana" name="mana" />
        <Form.TextField
          label="Critical chance"
          name="criticalChance"
          helperText="Percentage"
        />
        <Form.TextField
          label="Critical damage"
          name="criticalDamage"
          helperText="Percentage of damage added"
        />

        {createMutation.error && (
          <Typography>{(createMutation.error as any).message}</Typography>
        )}

        {createMutation.isLoading ? (
            <CircularProgress />
          ): (
          <Button variant="contained" type="submit">Create character</Button>
        )}
      </Box>
    </Form>
  )
}

export interface CreateCharacterFormProps {
  onCreated?: (() => void) | undefined;
}
