const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Criar novo jogador
router.post('/', async (req, res) => {
  try {
    console.log('Recebendo novo jogador:', req.body);
    const newPlayer = new Player(req.body);
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer); // Retorna o jogador salvo
  } catch (err) {
    console.error('Erro ao criar jogador:', err);
    res.status(500).json({ error: 'Erro ao criar jogador' });
  }
});

// Buscar jogador pelo ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }
    res.json(player);
  } catch (err) {
    console.error('Erro ao buscar jogador:', err);
    res.status(500).json({ error: 'Erro ao buscar jogador' });
  }
});

// Atualizar jogador
router.put('/:id', async (req, res) => {
  try {
    console.log('Atualizando jogador ID:', req.params.id, 'com dados:', req.body);
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o documento atualizado
    );
    if (!updatedPlayer) {
      return res.status(404).json({ error: 'Jogador não encontrado para atualização' });
    }
    res.json(updatedPlayer);
  } catch (err) {
    console.error('Erro ao atualizar jogador:', err);
    res.status(500).json({ error: 'Erro ao atualizar jogador' });
  }
});

module.exports = router;
