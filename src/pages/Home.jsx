import React from "react";
import { Link } from "react-router-dom"; // importa Link!

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-[80vh] text-center bg-gray-900 text-white">
      <h2 className="text-4xl font-extrabold text-blue-500 mb-4 animate-pulse">
        Welcome, Adventurer!
      </h2>
      <h6>
        Este é um protótipo inicial do RPG Game, em fase ALFA. Muitos recursos
        ainda estão em desenvolvimento.
      </h6>
      <p className="text-lg text-gray-400 mb-8 max-w-xl">
        Your epic journey begins now. Train your character, conquer powerful
        enemies, and become a legend in this world of magic and battles!
      </p>
      <div className="space-x-4">
        <Link
          to="/character"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Create Your Character
        </Link>
        <Link
          to="/battle"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Start a Battle
        </Link>
      </div>
    </div>
  );
};

export default Home;
