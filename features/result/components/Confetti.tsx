"use client";
import { ComponentProps, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiManager(
  props: ComponentProps<typeof Confetti>
) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  // Get the size of the window
  useEffect(
    () =>
      setSize({
        width: ref.current!.offsetWidth,
        height: ref.current!.offsetHeight,
      }),
    [setSize]
  );
  return (
    <div className="fixed bottom-0 left-0 w-full h-full -z-10" ref={ref}>
      <Confetti
        width={size.width}
        height={size.height}
        recycle={false}
        confettiSource={{
          x: Math.round(size.width / 2),
          y: size.height,
          h: 0,
          w: 10,
        }}
        initialVelocityY={75}
        initialVelocityX={{
          min: -30,
          max: 30,
        }}
        numberOfPieces={350}
        gravity={2}
        {...props}
      />
    </div>
  );
}
