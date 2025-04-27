import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Battle from "./pages/Battle";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import Character1 from "./pages/Character1";
import { salvarPlayer, atualizarPlayer, buscarPlayer } from "./services/playerService";
import Home from "./pages/Home";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [playerId, setPlayerId] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerMoney, setPlayerMoney] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerExp, setPlayerExp] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [equippedItems, setEquippedItems] = useState({
    shirt: null,
    pants: null,
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const existingPlayerId = localStorage.getItem("playerId");
        if (existingPlayerId) {
          const player = await buscarPlayer(existingPlayerId);
          if (player) {
            setPlayerId(player._id);
            setPlayerHealth(player.health);
            setPlayerMoney(player.money);
            setPlayerLevel(player.level);
            setPlayerExp(player.exp);
            setInventory(player.inventory);
            setEquippedItems(player.equippedItems);
          }
        } else {
          const newPlayer = await salvarPlayer({
            health: 100,
            money: 0,
            level: 1,
            exp: 0,
            inventory: [],
            equippedItems: { shirt: null, pants: null },
          });
          setPlayerId(newPlayer._id);
          localStorage.setItem("playerId", newPlayer._id);
        }
      } catch (error) {
        console.error("Erro ao buscar ou salvar player:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, []);

  useEffect(() => {
    const storedMoney = localStorage.getItem("playerMoney");
    const storedInventory = localStorage.getItem("inventory");

    if (storedMoney) setPlayerMoney(Number(storedMoney));
    if (storedInventory) setInventory(JSON.parse(storedInventory));
  }, []);

  const savePlayerToDB = async () => {
    const playerData = {
      health: playerHealth,
      money: playerMoney,
      level: playerLevel,
      exp: playerExp,
      inventory: inventory,
      equippedItems: equippedItems,
    };

    const savedPlayer = await salvarPlayer(playerData);
    if (savedPlayer && savedPlayer._id) {
      setPlayerId(savedPlayer._id);
      localStorage.setItem("playerId", savedPlayer._id);
    }
  };

  const updatePlayerData = async (updatedFields) => {
    if (!playerId) return;

    try {
      await atualizarPlayer(playerId, updatedFields);
      console.log("Player updated successfully on MongoDB!");
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Carregando jogador...
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/battle"
            element={
              <Battle
                playerHealth={playerHealth}
                setPlayerHealth={setPlayerHealth}
                playerMoney={playerMoney}
                setPlayerMoney={setPlayerMoney}
                playerLevel={playerLevel}
                setPlayerLevel={setPlayerLevel}
                playerExp={playerExp}
                setPlayerExp={setPlayerExp}
                inventory={inventory}
                setInventory={setInventory}
                savePlayerToDB={savePlayerToDB}
                playerId={playerId}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                playerMoney={playerMoney}
                setPlayerMoney={setPlayerMoney}
                inventory={inventory}
                setInventory={setInventory}
                playerId={playerId}
                updatePlayerData={updatePlayerData}
              />
            }
          />
          <Route
            path="/character"
            element={
              <Character1
                playerHealth={playerHealth}
                playerMoney={playerMoney}
                playerLevel={playerLevel}
                playerExp={playerExp}
                inventory={inventory}
                equippedItems={equippedItems}
                setEquippedItems={setEquippedItems}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
