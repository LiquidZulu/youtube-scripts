import { makeScene2D, Rect, Img, Ray, Txt } from "@motion-canvas/2d";
import {
  waitFor,
  createSignal,
  createRef,
  Reference,
  PossibleColor,
  SimpleSignal,
  all,
  chain,
} from "@motion-canvas/core";

import cme from "../assets/youtubers/callmeezekiel.png";
import lz from "../assets/youtubers/liquidzulu.png";
import mentis from "../assets/youtubers/mentiswave.png";
import mises from "../assets/youtubers/misesmedia.png";
import smd from "../assets/youtubers/stephenmichaeldavis.png";
import tik from "../assets/youtubers/tik.png";

import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  type TYoutuber = {
    velocity: SimpleSignal<number>;
    color: SimpleSignal<PossibleColor>;
    subs: SimpleSignal<number>;
    pic: string;
    ref: {
      rect: Reference<Rect>;
      ray: Reference<Ray>;
    };
  };

  const youtubers: { [key: string]: TYoutuber } = {
    LiquidZulu: {
      velocity: createSignal(20),
      color: createSignal(0xff0000),
      subs: createSignal(3.9),
      pic: lz,
      ref: {
        rect: createRef<Rect>(),
        ray: createRef<Ray>(),
      },
    },
    MentisWave: {
      velocity: createSignal(4),
      color: createSignal(0xff0000),
      subs: createSignal(42.2),
      pic: mentis,
      ref: {
        rect: createRef<Rect>(),
        ray: createRef<Ray>(),
      },
    },
    TIKhistory: {
      velocity: createSignal(2),
      color: createSignal(0xff0000),
      subs: createSignal(334.0),
      pic: tik,
      ref: {
        rect: createRef<Rect>(),
        ray: createRef<Ray>(),
      },
    },
    misesmedia: {
      velocity: createSignal(0.1),
      color: createSignal(0xff0000),
      subs: createSignal(160.0),
      pic: mises,
      ref: {
        rect: createRef<Rect>(),
        ray: createRef<Ray>(),
      },
    },
    "Stephen\nMichael Davis": {
      velocity: createSignal(6),
      color: createSignal(0xff0000),
      subs: createSignal(20.7),
      pic: smd,
      ref: {
        rect: createRef<Rect>(),
        ray: createRef<Ray>(),
      },
    },
    CallMeEzekiel: {
      velocity: createSignal(4),
      color: createSignal(0xff0000),
      subs: createSignal(100.0),
      pic: cme,
      ref: {
        rect: createRef<Rect>(),
        ray: createRef<Ray>(),
      },
    },
  };

  const getMaxYter = (yters: { [key: string]: TYoutuber }) =>
    Object.values(yters).reduce(
      (accumulator, current) =>
        accumulator.subs() > current.subs() ? accumulator : current,
      { subs: createSignal(0) }
    );

  const getBar = (youtuber: TYoutuber) =>
    createSignal(
      () => (youtuber.subs() / getMaxYter(youtubers).subs()) * conf.bar.max
    );

  const getSortedYoutubers = (yters: { [key: string]: TYoutuber }) =>
    Object.entries(yters).sort((a, b) => +(a[1].subs() < b[1].subs()));

  const sortYoutubeRects = (yters: { [key: string]: TYoutuber }) => {
    for (let [_, yter] of getSortedYoutubers(yters)) {
      yter.ref.rect().moveToTop();
    }
  };

  const conf = {
    bar: {
      max: 650,
      width: 200,
    },
  };

  view.add(
    <Rect gap={80} layout>
      {Object.entries(youtubers).map(([k, v]) => (
        <Rect
          height={970}
          scale={0}
          ref={v.ref.rect}
          alignItems="center"
          justifyContent="end"
          direction="column"
          gap={16}
          layout
        >
          <Rect gap={16} alignItems="center" direction="column" layout>
            <Img width={conf.bar.width} src={v.pic} />
            <Txt textAlign="center" fontSize={32} fill={0xffffff} text={k} />
            <Txt
              fontFamily="mononoki"
              textAlign="center"
              fontSize={28}
              fill={0x909090}
              text={createSignal(() => v.subs().toFixed(1) + "k subs")}
            />
          </Rect>
          <Ray
            ref={v.ref.ray}
            lineWidth={conf.bar.width}
            stroke={v.color}
            fromY={0}
            toY={getBar(v)}
          />
        </Rect>
      ))}
    </Rect>
  );

  sortYoutubeRects(youtubers);

  {
    let toYield = [];
    const yters = getSortedYoutubers(youtubers);
    for (let i = 0; i < yters.length; ++i) {
      yters[i][1].ref.ray().to([0, 0]);
      toYield.push(chain(waitFor(0.1 * i), popin(yters[i][1].ref.rect)));
    }
    yield* all(...toYield);
  }
  {
    let toYield = [];
    for (let youtuber of Object.values(youtubers)) {
      toYield.push(
        youtuber.ref.ray().to(
          createSignal(() => [0, getBar(youtuber)()] as [number, number]),
          1
        )
      );
    }
    yield* all(...toYield);
  }

  for (let i = 0; i < 250; ++i) {
    let toYield = [];
    for (let youtuber of Object.values(youtubers)) {
      const growth = Math.sqrt((youtuber.subs() * youtuber.velocity()) / 500);
      toYield.push(
        youtuber.subs(youtuber.subs() + (growth > 1000 ? 1000 : growth), 0.05)
      );
    }
    yield* all(...toYield);
    sortYoutubeRects(youtubers);
  }
});
