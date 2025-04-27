// services/playerService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/player";

export const salvarPlayer = async (playerData) => {
  try {
    const response = await axios.post(API_URL, playerData);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar player:", error);
  }
};

export const atualizarPlayer = async (playerId, playerData) => {
  try {
    const response = await axios.put(`${API_URL}/${playerId}`, playerData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar player:", error);
  }
};

export const buscarPlayer = async (playerId) => {
  try {
    const response = await axios.get(`${API_URL}/${playerId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar player:", error);
  }
};
