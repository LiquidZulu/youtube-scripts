import { makeScene2D, Img, Txt, Rect, Ray, Circle } from "@motion-canvas/2d";
import {
  waitFor,
  createRef,
  createSignal,
  SimpleSignal,
  Reference,
  chain,
  all,
} from "@motion-canvas/core";
import { SquigglyBorder } from "../components";
import { vectorSum } from "../util";

import aeroplane from "../assets/aeroplane.png";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  type TGuess = {
    target: number;
    current: SimpleSignal<number>;
    ref: { rect: Reference<Rect>; txt: Reference<Txt>; ray: Reference<Ray> };
  };

  type TGuesses = {
    [key: string]: TGuess;
  };

  const sortGuesses: (g: TGuesses) => Array<[string, TGuess]> = (g: TGuesses) =>
    Object.entries(g).sort((a, b) => +(a[1].current() < b[1].current()));

  const sortGuessRects: (g: TGuesses) => void = (g: TGuesses) => {
    for (let [key, guess] of sortGuesses(g)) {
      guess.ref.rect().moveToTop();
      guess.ref.ray().moveToTop();
      guess.ref.txt().text(Math.floor(guess.current() * 100) + "%");
    }
  };

  const guesses: TGuesses = {
    Dog: {
      target: 0.32,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
    Aeroplane: {
      target: 0.93,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
    Kettle: {
      target: 0.22,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
    Bottle: {
      target: 0.13,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
    Frog: {
      target: 0.18,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
    "Murray Rothbard": {
      target: 0.1,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
    Car: {
      target: 0.29,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
    Coffee: {
      target: 0.28,
      current: createSignal(0.5 - Math.random() / 2),
      ref: {
        rect: createRef<Rect>(),
        txt: createRef<Txt>(),
        ray: createRef<Ray>(),
      },
    },
  };

  const guessList = createRef<Rect>();

  view.add(
    <Img
      shadowBlur={64}
      shadowColor={0}
      shadowOffset={[0, 32]}
      src={aeroplane}
      width={720}
      height={720}
      x={-720 / 2 - 64}
    />
  );

  const squigglyBorder = new SquigglyBorder({
    runtime: createSignal(5),
    rayColor: createSignal({ r: 0xff, g: 0xff, b: 0xff, a: 1 }),
    corners: createSignal({
      bottomLeft: [-720 / 2 - 64 - 720 / 2, 720 / 2],
      bottomRight: [-720 / 2 - 64 + 720 / 2, 720 / 2],
      topLeft: [-720 / 2 - 64 - 720 / 2, -720 / 2],
      topRight: [-720 / 2 - 64 + 720 / 2, -720 / 2],
    }),
  });

  for (let ray of squigglyBorder.rays) {
    view.add(
      <Ray
        ref={ray.ref}
        lineWidth={squigglyBorder.rayWidth}
        stroke={squigglyBorder.rayColor}
        from={vectorSum([ray.from, squigglyBorder.offsetsList()[0][ray.id[0]]])}
        to={vectorSum([ray.to, squigglyBorder.offsetsList()[0][ray.id[1]]])}
      />
    );
  }

  view.add(
    <Rect
      layout
      direction={"column"}
      lineWidth={5}
      stroke={0xffffff}
      width={720}
      height={720}
      x={720 / 2 + 64}
      gap={16 + 57.6}
      paddingTop={138}
      paddingLeft={32}
    >
      {Object.keys(guesses).map((key) => (
        <Ray
          end={0}
          start={createSignal(() => guesses[key].current())}
          ref={guesses[key].ref.ray}
          opacity={0.2}
          stroke={0xaaaaaa}
          lineWidth={57.6}
          fromX={-720 / 2 + 32}
          toX={720 / 2 - 32}
        />
      ))}
    </Rect>
  );

  view.add(
    <Rect
      layout
      direction={"column"}
      lineWidth={5}
      stroke={0xffffff}
      width={720}
      height={720}
      x={720 / 2 + 64}
    >
      <Rect>
        <Txt
          marginTop={16}
          fontFamily={"Cubano"}
          fill={0xffffff}
          width={720}
          textAlign={"center"}
        >
          Guesses
        </Txt>
      </Rect>
      <Ray
        marginTop={8}
        marginLeft={32}
        lineWidth={4}
        stroke={0xaaaaaa}
        fromX={-720 / 2 + 32}
        toX={720 / 2 - 32}
      />
      <Rect
        ref={guessList}
        marginLeft={32}
        marginTop={32}
        gap={16}
        layout
        direction={"column"}
      >
        {Object.keys(guesses).map((key) => (
          <Rect ref={(guesses as any)[key].ref.rect} direction={"row"} layout>
            <Txt minWidth={535} fill={0xdddddd} text={key} />
            <Txt
              ref={(guesses as any)[key].ref.txt}
              marginLeft={32}
              fill={0xffffff}
              text={createSignal(
                () => Math.floor((guesses as any)[key].current() * 100) + "%"
              )}
            />
          </Rect>
        ))}
      </Rect>
    </Rect>
  );

  for (let i = 0; i < 256; ++i) {
    const initClamp = 0.6;
    const clamp =
      initClamp / (i + 1) < (i < 100 ? 0.05 : 0.01)
        ? i < 100
          ? 0.05
          : 0.01
        : initClamp / (i + 1);
    const duration = 0.1;
    const direction = i < 10 ? -1 : 1;
    let toYield = [];

    for (let key of Object.keys(guesses)) {
      if (guesses[key].current() - clamp < 0)
        toYield.push(
          guesses[key].current(
            guesses[key].current() + Math.random() * clamp,
            duration
          )
        );
      else if (guesses[key].current() + clamp > 1)
        toYield.push(
          guesses[key].current(
            guesses[key].current() - Math.random() * clamp,
            duration
          )
        );
      else
        guesses[key].current() < guesses[key].target
          ? toYield.push(
              guesses[key].current(
                guesses[key].current() + direction * Math.random() * clamp,
                duration
              )
            )
          : toYield.push(
              guesses[key].current(
                guesses[key].current() - direction * Math.random() * clamp,
                duration
              )
            );
    }

    sortGuessRects(guesses);
    yield* all(
      all(...toYield),
      squigglyBorder.animate(
        squigglyBorder.offsetsList()[i % squigglyBorder.offsetsList().length],
        createSignal(duration * (squigglyBorder.rays.length + 1))
      )
    );
  }
});
