type Props = {
  word: string
  guessedLetters: string[]
  reveal?: boolean
}

export default function HangmanWord({
  word,
  guessedLetters,
  reveal = false
}: Props) {

  return (
    <div className="flex gap-3 text-3xl font-bold uppercase">
      {word.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)

        return (
  <span
    key={index}
    className="border-b-4 border-white w-9 text-center inline-block text-3xl"
  >
    <span className={isGuessed || reveal ? "visible" : "invisible"}>
      {letter}
    </span>
  </span>
)
      })}
    </div>
  )
}