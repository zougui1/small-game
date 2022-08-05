import express, { Router } from 'express';

import { character } from '../controllers/character';
import { characterSchema, partialCharacterSchema } from '../schemas/character';
import { validateBody } from '../utils/server';

const router: Router = express.Router();

router.get('/', async (req, res) => {
  const characters = await character.find();
  res.status(200).json(characters);
});

router.get('/:id', async (req, res) => {
  const foundCharacter = await character.findById(req.params.id);

  if (foundCharacter) {
    res.status(200).json(foundCharacter);
  } else {
    res.status(404).json({ message: 'not found' });
  }
});

router.post('/', validateBody(characterSchema), async (req, res) => {
  await character.create(req.body);
  res.status(201).json({ message: 'ok' });
});

router.patch('/:id', validateBody(partialCharacterSchema), async (req, res) => {
  await character.updateById(req.params.id, req.body);
  res.status(204).json({ message: 'ok' });
});

router.delete('/:id', async (req, res) => {
  await character.deleteById(req.params.id);
  res.status(204).json({ message: 'ok' });
});

export default router;
