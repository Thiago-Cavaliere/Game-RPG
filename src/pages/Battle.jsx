import React, { useState, useEffect, useRef } from "react";
import { salvarPlayer } from "../axios"; // Importa a função salvarPlayer

const monsters = [
  { name: "Rato", baseHealth: 50, damage: 5, image: "/monsters/rato.jpg" },
  {
    name: "Morcego",
    baseHealth: 80,
    damage: 8,
    image: "/monsters/morcego.png",
  },
  {
    name: "Goblin",
    baseHealth: 120,
    damage: 12,
    image: "/monsters/goblin.png",
  },
  { name: "Orc", baseHealth: 180, damage: 18, image: "/monsters/orc.png" },
  {
    name: "Dragão",
    baseHealth: 250,
    damage: 25,
    image: "/monsters/dragao.png",
  },
];

const getMonster = (playerLevel) => {
  const index = Math.min(
    Math.floor((playerLevel - 1) / 2),
    monsters.length - 1
  );
  const monster = monsters[index];
  const health = monster.baseHealth + playerLevel * 10;
  return { ...monster, health };
};

const getHealthPercentage = (current, max) => (current / max) * 100;
const getHealthColor = (percentage) => {
  if (percentage > 60) return "bg-green-500";
  if (percentage > 30) return "bg-yellow-400";
  return "bg-red-500";
};

const Battle = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerMoney, setPlayerMoney] = useState(0);
  const [playerExp, setPlayerExp] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [inventory, setInventory] = useState([]);

  const [currentMonster, setCurrentMonster] = useState(getMonster(1));
  const [enemyHealth, setEnemyHealth] = useState(currentMonster.health);

  const [autoAttacking, setAutoAttacking] = useState(false);
  const intervalRef = useRef(null);

  const expToNextLevel = playerLevel * 100;
  const playerIsDead = playerHealth <= 0;

  const handleAttack = () => {
    if (playerIsDead) return;

    const damageToEnemy = 10;
    const newEnemyHealth = enemyHealth - damageToEnemy;
    setEnemyHealth(newEnemyHealth > 0 ? newEnemyHealth : 0);

    const monsterDamage = currentMonster.damage;
    const newPlayerHealth = playerHealth - monsterDamage;
    setPlayerHealth(newPlayerHealth > 0 ? newPlayerHealth : 0);

    if (newEnemyHealth <= 0) {
      dropMoney();
      gainExp();
      resetEnemy();
    }

    if (newPlayerHealth <= 0) {
      stopAutoAttack();
    }
  };

  const dropMoney = () => {
    const droppedMoney = Math.floor(Math.random() * 50) + 10;
    setPlayerMoney((prev) => prev + droppedMoney);
    setInventory((prev) => [...prev, { item: "Gold", amount: droppedMoney }]);
  };

  const gainExp = () => {
    const gainedExp = Math.floor(Math.random() * 30) + 20;
    const totalExp = playerExp + gainedExp;

    if (totalExp >= expToNextLevel) {
      const overflowExp = totalExp - expToNextLevel;
      setPlayerLevel((lvl) => lvl + 1);
      setPlayerExp(overflowExp);
    } else {
      setPlayerExp(totalExp);
    }

    setInventory((prev) => [...prev, { item: "EXP", amount: gainedExp }]);
  };

  const resetEnemy = () => {
    const newMonster = getMonster(playerLevel);
    setCurrentMonster(newMonster);
    setEnemyHealth(newMonster.health);
  };

  const startAutoAttack = () => {
    if (!autoAttacking && !playerIsDead) {
      setAutoAttacking(true);
    }
  };

  const stopAutoAttack = () => {
    setAutoAttacking(false);
  };

  const healPlayer = () => {
    setPlayerHealth(100);
  };

  useEffect(() => {
    if (autoAttacking && !playerIsDead && enemyHealth > 0) {
      intervalRef.current = setInterval(() => {
        handleAttack();
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [autoAttacking, playerIsDead, enemyHealth]);

  // Função para salvar o jogador no banco de dados
  const salvarJogador = async () => {
    try {
      await salvarPlayer({
        health: playerHealth,
        money: playerMoney,
        level: playerLevel,
        exp: playerExp,
        inventory: inventory,
        equippedItems: { shirt: null, pants: null }, // Atualize conforme o seu estado real de equipamentos
      });
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
    }
  };

  useEffect(() => {
    if (playerMoney > 0) {
      salvarJogador(); // Chama a função para salvar o jogador após ganhar dinheiro
    }
  }, [playerMoney]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Battle Time!</h2>

      <div className="bg-gray-100 p-4 rounded shadow mb-4">
        <p>
          <strong>Level:</strong> {playerLevel}
        </p>
        <p>
          <strong>EXP:</strong> {playerExp} / {expToNextLevel}
        </p>
        <p>
          <strong>Gold:</strong> {playerMoney}
        </p>

        <div className="mt-2">
          <p className="font-semibold">Player HP</p>
          <div className="w-full bg-gray-300 h-4 rounded">
            <div
              className={`h-4 rounded ${getHealthColor(
                getHealthPercentage(playerHealth, 100)
              )}`}
              style={{ width: `${getHealthPercentage(playerHealth, 100)}%` }}
            ></div>
          </div>
        </div>

        {playerIsDead && (
          <div className="mt-4 text-red-600 font-bold">
            Você morreu!
            <button
              onClick={healPlayer}
              className="ml-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Curar e Voltar
            </button>
          </div>
        )}
      </div>

      <div className="my-6 text-center">
        <h3 className="text-lg font-semibold mb-2">
          {currentMonster.name} (Level {playerLevel})
        </h3>
        <img
          src={currentMonster.image}
          alt={currentMonster.name}
          className="w-32 h-32 mx-auto mb-2"
        />

        <div className="mb-4">
          <p className="font-semibold">{currentMonster.name} HP</p>
          <div className="w-full bg-gray-300 h-4 rounded">
            <div
              className={`h-4 rounded ${getHealthColor(
                getHealthPercentage(enemyHealth, currentMonster.health)
              )}`}
              style={{
                width: `${getHealthPercentage(
                  enemyHealth,
                  currentMonster.health
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleAttack}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            disabled={playerIsDead}
          >
            Atacar Manual
          </button>
          <button
            onClick={startAutoAttack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={autoAttacking || playerIsDead}
          >
            Atacar Automaticamente
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Inventory:</h3>
        <ul>
          {inventory.length > 0 ? (
            inventory.map((item, index) => (
              <li key={index}>
                {item.amount} {item.item}
              </li>
            ))
          ) : (
            <p>Seu inventário está vazio.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Battle;
