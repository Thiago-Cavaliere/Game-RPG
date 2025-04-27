// Character1.jsx
import React from "react";

const Character1 = ({
  playerHealth,
  playerMoney,
  playerLevel,
  playerExp,
  inventory,
  setInventory,
  equippedItems,
  setEquippedItems,
}) => {
  const expPercentage = (playerExp / (playerLevel * 100)) * 100;

  const handleEquip = (itemName) => {
    // Exemplo simples: se o item contém "Shirt" ou "Armor" -> é camisa
    // se contém "Pants" ou "Calça" -> é calça
    if (
      itemName.toLowerCase().includes("shirt") ||
      itemName.toLowerCase().includes("armor") ||
      itemName.toLowerCase().includes("camisa")
    ) {
      setEquippedItems((prev) => ({ ...prev, shirt: itemName }));
    } else if (
      itemName.toLowerCase().includes("pants") ||
      itemName.toLowerCase().includes("calça")
    ) {
      setEquippedItems((prev) => ({ ...prev, pants: itemName }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Character Information</h2>

      {/* Personagem */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-32 h-48 relative border-2 border-gray-400 rounded-lg flex flex-col items-center justify-center bg-gray-100">
          {/* Camisa */}
          <div className="w-20 h-12 bg-blue-500 rounded-t-lg mt-2 flex items-center justify-center">
            <p className="text-xs text-white text-center">
              {equippedItems.shirt || "Basic Shirt"}
            </p>
          </div>
          {/* Calça */}
          <div className="w-16 h-16 bg-gray-700 mt-1 rounded-b-lg flex items-center justify-center">
            <p className="text-xs text-white text-center">
              {equippedItems.pants || "Basic Pants"}
            </p>
          </div>
        </div>
      </div>

      {/* Level e Experiência */}
      <div className="mb-4">
        <p className="text-lg">
          Level: <span className="font-semibold">{playerLevel}</span>
        </p>
        <p className="text-lg">
          Experience: <span className="font-semibold">{playerExp}</span>
        </p>
        <div className="w-full bg-gray-300 h-2 mb-4">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${expPercentage}%` }}
          />
        </div>
      </div>

      {/* Vida */}
      <div className="mb-4">
        <p className="text-lg">
          Health: <span className="font-semibold">{playerHealth}</span>
        </p>
        <div className="w-full bg-gray-300 h-2">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${(playerHealth / 100) * 100}%` }}
          />
        </div>
      </div>

      {/* Dinheiro */}
      <div className="mb-4">
        <p className="text-lg">
          Money: <span className="font-semibold">{playerMoney} Gold</span>
        </p>
      </div>

      {/* Inventário */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Inventory:</h3>
        <ul className="space-y-2">
          {inventory.length > 0 ? (
            inventory.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-200 p-2 rounded-md"
              >
                <span>
                  {item.item} {item.amount && `(${item.amount})`}
                </span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEquip(item.item)}
                >
                  Equipar
                </button>
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

export default Character1;
