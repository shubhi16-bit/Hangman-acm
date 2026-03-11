import { useState, useEffect } from "react"
import HangmanDrawing from "./components/hangmandrawing"
import HangmanWord from "./components/hangmanword"
import Keyboard from "./components/keyboard"
import { words } from "./words"

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordObj, setWordObj] = useState(() => getRandomWord())
  const wordToGuess = wordObj.word
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [showHintPopup, setShowHintPopup] = useState(false)

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const mistakes = incorrectLetters.length
  const maxMistakes = 6

  const isLoser = mistakes >= maxMistakes

  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  function addGuessedLetter(letter: string) {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(current => [...current, letter])
  }

  function resetGame() {
  setGuessedLetters([])
  setWordObj(getRandomWord())
  setShowHintPopup(false)
}

  // keyboard letter input
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (!key.match(/^[a-z]$/)) return
      if (isLoser || isWinner) return

      event.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [guessedLetters, isLoser, isWinner])

  // hint popup trigger
  useEffect(() => {
    if (mistakes === 3) {
      setShowHintPopup(true)

      setTimeout(() => {
        setShowHintPopup(false)
      }, 2000)
    }
  }, [mistakes])

  // restart with enter
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Enter" && (isWinner || isLoser)) {
        resetGame()
      }
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [isWinner, isLoser])

  useEffect(() => {
  setShowHintPopup(false)
}, [wordObj])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">

      {/* Header */}
      <header className="w-full flex items-center justify-between mb-10">
        <img src="/acm-logo.png" alt="ACM Logo" className="h-12" />
        <h1 className="text-3xl font-bold">Challenge</h1>
      </header>

      

      <div className="flex-1 flex items-center justify-center">


      {/* Main horizontal layout */}
      <div className="flex w-full max-w-5xl justify-center gap-24 items-start">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center gap-12 w-1/2">

          <HangmanDrawing mistakes={mistakes} />

          <div className="w-[260px] h-[60px] flex items-center justify-center text-center">
  {mistakes >= 3 && (
    <div className="bg-indigo-900/60 border border-indigo-400 text-white px-4 py-2 rounded-lg w-full break-words">
      Hint: {wordObj.hint}
    </div>
  )}
</div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center gap-16 w-1/2 mt-2">

          <div className="h-16 flex items-center justify-center">
            <HangmanWord
              word={wordToGuess}
              guessedLetters={guessedLetters}
              reveal={isLoser}
            />
          </div>

          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter(letter =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />

          <p className="text-sm">
            Wrong guesses left: {maxMistakes - mistakes}
          </p>

        </div>
      </div>

      {/* Hint Popup */}
      {showHintPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-indigo-900/60 border border-indigo-500 text-white px-6 py-4 rounded-xl shadow-lg text-center animate-fade w-[320px]">
            <h2 className="text-lg font-bold mb-2">Hint Unlocked</h2>
            <p>{wordObj.hint}</p>
          </div>
        </div>
      )}

      {/* Win / Lose Popup */}
{(isWinner || isLoser) && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-indigo-950/80 border border-indigo-500 px-10 py-8 rounded-2xl shadow-xl text-center w-[380px] backdrop-blur-md">

      {isWinner && (
        <>
          <h2 className="text-2xl font-bold text-blue-300 mb-3">
            Correct Answer!
          </h2>
          <p className="mb-5 text-slate-200">Great job, explorer 🚀</p>
        </>
      )}

      {isLoser && (
        <>
          <h2 className="text-2xl font-bold text-fuchsia-300 mb-3">
            Try Again?
          </h2>
          <p className="mb-5 text-slate-200">
            Word: <span className="font-bold text-white">{wordToGuess}</span>
          </p>
        </>
      )}

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-white font-semibold"
      >
        Restart
      </button>

      <p className="text-xs mt-3 text-slate-400">
        Press Enter to restart
      </p>

    </div>
  </div>
)}

    </div>
    </div>
  )
}

export default App