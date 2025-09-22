import React, { useState, useEffect, useRef } from "react";
import Phaser from "phaser";

export default function SimplePythonGame({ initialLevel = 0, onComplete }) {
  const [userCode, setUserCode] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(initialLevel); 
  const [levelCompleted, setLevelCompleted] = useState(false); // New state
  const gameRef = useRef(null);

  const initGame = () => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }

    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 300,
      parent: "phaser-game",
      physics: { default: "arcade", arcade: { gravity: { y: 300 }, debug: false } },
      scene: { preload, create, update },
    };

    gameRef.current = new Phaser.Game(config);

    function preload() {
      this.load.image("hero", "https://i.ibb.co/0Jmshvb/hero.png");
      this.load.image("obstacle", "https://i.ibb.co/5YbXLQ2/enemy.png");
      this.load.image("bg", "https://i.ibb.co/PrYQ5dH/bg.png");
    }

    function create() {
      this.add.image(300, 150, "bg");
      this.hero = this.physics.add.sprite(100, 250, "hero").setScale(0.5);
      this.hero.setCollideWorldBounds(true);

      if (level >= 1) {
        this.obstacle = this.physics.add.sprite(500, 250, "obstacle").setScale(0.5);
        this.heroJump = () => this.hero.setVelocityY(-250);

        this.physics.add.collider(this.hero, this.obstacle, () => {
          setMessage("💥 You hit the obstacle! Try again.");
        });
      }
    }

    function update() {
      this.hero.setVelocityX(100); 
    }
  };

  useEffect(() => {
    initGame();
    setLevelCompleted(false); // Reset when level changes
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [level]);

  const handleSubmit = () => {
    if (level === 0) {
      if (userCode.includes('print("Hello World")')) {
        setScore(score + 1);
        setMessage("🎉 Great! You learned how to print in Python.");
        setLevelCompleted(true); // Level completed, show next button
      } else {
        setMessage('❌ Try again! Use print("Hello World").');
      }
    } else if (level === 1) {
      if (userCode.includes("if")) {
        setScore(score + 1);
        setMessage("🎉 Good job! Hero jumped over the obstacle!");
        const scene = gameRef.current.scene.scenes[0];
        scene.heroJump();
        setLevelCompleted(true);
      } else {
        setMessage("❌ Try again! Include an `if` statement.");
      }
    } else {
      setMessage("✨ More levels coming soon!");
    }
  };

  const handleNextLevel = () => {
    const nextLevel = level + 1;
    setLevel(nextLevel);
    onComplete(); // Notify parent to unlock next level globally
    setUserCode("");
    setMessage("");
  };

  const handleRetry = () => {
    setScore(0);
    setUserCode("");
    setMessage("Game reset! Back to Level 0.");
    setLevel(0);
    setLevelCompleted(false);
    initGame();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">🐍 Python Playground Game</h2>
      <p className="mb-2 text-white/80">
        {level === 0 && 'Level 0: Learn your first Python code → print("Hello World")'}
        {level === 1 && "Level 1: Use an if-statement to make the hero jump over obstacles!"}
        {level >= 2 && "More levels coming soon... 🚀"}
      </p>

      <div id="phaser-game" className="w-full h-[300px] mb-4 rounded-xl overflow-hidden shadow-lg"></div>

      <p className="text-yellow-300 font-bold">Score: {score}</p>
      <p className="text-blue-400 font-semibold">Current Level: {level}</p>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="// Write your Python code here..."
        className="w-full h-24 px-3 py-2 mb-2 bg-gray-900 border-2 border-purple-600 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
        >
          Submit Code
        </button>

        {levelCompleted && (
          <button
            onClick={handleNextLevel}
            className="bg-green-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition"
          >
            Next Level ➡
          </button>
        )}

        <button
          onClick={handleRetry}
          className="bg-red-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>

      {message && <p className="mt-2 text-green-400 font-semibold">{message}</p>}
    </div>
  );
}
