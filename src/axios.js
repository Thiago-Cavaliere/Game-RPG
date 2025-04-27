import axios from "axios";

// Função para salvar o jogador
const salvarPlayer = async (playerData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/player",
      playerData
    );
    console.log("Player salvo:", response.data);
  } catch (error) {
    console.error("Erro ao salvar player:", error);
  }
};

// Função para atualizar o jogador
const atualizarPlayer = async (playerId, playerData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/player/${playerId}`,
      playerData
    );
    console.log("Player atualizado:", response.data);
  } catch (error) {
    console.error("Erro ao atualizar player:", error);
  }
};

// Exportando as funções para usá-las em outros arquivos
export { salvarPlayer, atualizarPlayer };
