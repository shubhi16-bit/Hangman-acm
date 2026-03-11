type Props = {
  mistakes: number
}

const HEAD = (
  <div className="w-12 h-12 border-4 border-white rounded-full absolute top-12 right-[-14px]" />
)

const BODY = (
  <div className="w-1 h-24 bg-white absolute top-24 right-2" />
)

const RIGHT_ARM = (
  <div className="w-16 h-1 bg-white absolute top-32 right-[-49px] rotate-[-30deg]" />
)

const LEFT_ARM = (
  <div className="w-16 h-1 bg-white absolute top-32 right-1 rotate-[30deg]" />
)

const RIGHT_LEG = (
  <div className="w-16 h-1 bg-white absolute top-[215px] right-[-38px] rotate-[60deg]" />
)

const LEFT_LEG = (
  <div className="w-16 h-1 bg-white absolute top-[215px] right-[-5px] rotate-[-60deg]" />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

export default function HangmanDrawing({ mistakes }: Props) {
  return (
    <div className="relative">

      {/* Body parts */}
      {BODY_PARTS.slice(0, mistakes)}

      {/* Rope */}
      <div className="h-12 w-1 bg-white absolute top-0 right-2 ml-[120px]" />

      {/* Top bar */}
      <div className="h-1 w-32 bg-white ml-[120px]" />

      {/* Vertical pole */}
      <div className="h-[320px] w-1 bg-white ml-[120px]" />

      {/* Base */}
      <div className="h-1 w-64 bg-white" />

    </div>
  )
}