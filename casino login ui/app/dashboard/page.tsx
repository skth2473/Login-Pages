import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Celebration message */}
        <div className="text-6xl mb-6">🎰</div>

        <h1 className="text-4xl font-black text-yellow-400 drop-shadow-lg mb-4">
          JACKPOT!
        </h1>

        <p className="text-xl text-yellow-300 mb-2">Welcome to the Casino VIP Lounge</p>

        <p className="text-gray-400 mb-8">
          You&apos;ve successfully unlocked exclusive access. Enjoy the high roller experience!
        </p>

        {/* Stats display */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-900/50 to-black border-2 border-red-500 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">💰</div>
            <p className="text-sm text-gray-300 mt-2">Chips Earned</p>
            <p className="text-xl font-bold text-yellow-300">5,000</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-black border-2 border-purple-500 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">🏆</div>
            <p className="text-sm text-gray-300 mt-2">Status</p>
            <p className="text-xl font-bold text-yellow-300">VIP</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-300 text-gray-900 font-black rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-400/50">
            Play Games
          </button>

          <Link
            href="/"
            className="block w-full py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/50"
          >
            Logout
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-3">
          <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></div>
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse animation-delay-200"></div>
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
}
