import BattleComponent from '@/src/battle/BattleComponent'; // Ajustez le chemin selon l'emplacement exact de votre fichier

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-white text-2xl font-bold mb-4 font-mono">Mon Projet Pokémon - Next.js</h1>
      <BattleComponent />
    </main>
  );
}
