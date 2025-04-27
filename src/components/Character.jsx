import React from 'react';

const Character = ({ playerHealth, playerMoney, playerLevel, playerExp, inventory }) => {
  // Função para calcular a porcentagem de experiência para a barra de exp
  const expPercentage = (playerExp / (playerLevel * 100)) * 100;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Character Information</h2>

      {/* Nome do personagem */}
      <div className="mb-4">
        <h3 className="text-xl">Character Name: <span className="font-semibold">Hero</span></h3>
      </div>

      {/* Nível e Experiência */}
      <div className="mb-4">
        <p className="text-lg">Level: <span className="font-semibold">{playerLevel}</span></p>
        <p className="text-lg">Experience: <span className="font-semibold">{playerExp}</span></p>
        
        {/* Barra de experiência */}
        <div className="w-full bg-gray-300 h-2 mb-4">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${expPercentage}%` }}
          />
        </div>
      </div>

      {/* Vida do jogador com barra visual */}
      <div className="mb-4">
        <p className="text-lg">Health: <span className="font-semibold">{playerHealth}</span></p>

        <div className="w-full bg-gray-300 h-2">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${(playerHealth / 100) * 100}%` }} // Considerando que a vida máxima é 100
          />
        </div>
      </div>

      {/* Dinheiro */}
      <div className="mb-4">
        <p className="text-lg">Money: <span className="font-semibold">{playerMoney} Gold</span></p>
      </div>

      {/* Inventário */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">Inventory:</h3>
        <ul>
          {inventory.length > 0 ? (
            inventory.map((item, index) => (
              <li key={index} className="text-sm">
                {item.item} {item.amount && `(${item.amount})`} {/* Exibir o item e quantidade, se disponível */}
              </li>
            ))
          ) : (
            <p>Your inventory is empty.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Character;
