import React from "react";
import swordImage from "../assets/sword.png";
import shieldImage from "../assets/shield.png";
import armorImage from "../assets/armor.png";
import goldImage from "../assets/moedas.png";
import expImage from "../assets/EXP.png";

const Inventory = ({ inventory }) => {
  // Mapeando as imagens de cada item
  const itemImages = {
    Sword: swordImage,
    Shield: shieldImage,
    Armor: armorImage,
    Gold: goldImage,
    Exp: expImage,
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Inventory</h2>
      {inventory.length > 0 ? (
        <ul className="space-y-4">
          {inventory.map((item, index) => (
            <li key={index} className="flex items-center space-x-4 bg-gray-100 p-3 rounded shadow">
              {itemImages[item.item] && (
                <img
                  src={itemImages[item.item]}
                  alt={item.item}
                  className="w-10 h-10"
                />
              )}
              <span className="font-semibold text-gray-700">
                {item.item === "Gold" && `+${item.amount} Gold`}
                {item.item === "Exp" && `+${item.amount} Exp`}
                {item.item !== "Gold" && item.item !== "Exp" && item.item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your inventory is empty.</p>
      )}
    </div>
  );
};

export default Inventory;
