import React from "react";
import swordImage from "../../public/character/espada.png"; // <-- exemplo de imagem da espada
import shieldImage from "../../public/character/escudo.png"; // <-- exemplo de imagem do escudo
import armorImage from "../../public/character/armadura.png"; // <-- exemplo de imagem da armadura

const Shop = ({
  playerMoney,
  setPlayerMoney,
  inventory,
  setInventory,
  playerId,
  updatePlayerData,
}) => {
  const handlePurchase = async (itemCost, itemName) => {
    if (playerMoney >= itemCost) {
      const newMoney = playerMoney - itemCost;
      const newInventory = [...inventory, { item: itemName }];

      setPlayerMoney(newMoney);
      setInventory(newInventory);

      // Atualizar no backend (MongoDB)
      await updatePlayerData({
        money: newMoney,
        inventory: newInventory,
      });

      // Salvar também no localStorage
      localStorage.setItem("playerMoney", newMoney);
      localStorage.setItem("inventory", JSON.stringify(newInventory));

      console.log("Compra realizada e dados atualizados!");
    } else {
      alert("You don't have enough money!");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Shop</h2>
      <div>
        <p>Your Money: {playerMoney} gold</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Sword */}
        <div className="border p-4 rounded shadow flex flex-col items-center">
          <img src={swordImage} alt="Sword" className="w-24 h-24 mb-2" />
          <button
            onClick={() => handlePurchase(50, "Sword")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Sword (50 Gold)
          </button>
        </div>

        {/* Shield */}
        <div className="border p-4 rounded shadow flex flex-col items-center">
          <img src={shieldImage} alt="Shield" className="w-24 h-24 mb-2" />
          <button
            onClick={() => handlePurchase(100, "Shield")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Shield (100 Gold)
          </button>
        </div>

        {/* Armor */}
        <div className="border p-4 rounded shadow flex flex-col items-center">
          <img src={armorImage} alt="Armor" className="w-24 h-24 mb-2" />
          <button
            onClick={() => handlePurchase(200, "Armor")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Armor (200 Gold)
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Your Inventory:</h3>
        <ul className="list-disc ml-6">
          {inventory.length > 0 ? (
            inventory.map((item, index) => <li key={index}>{item.item}</li>)
          ) : (
            <p>Your inventory is empty.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
