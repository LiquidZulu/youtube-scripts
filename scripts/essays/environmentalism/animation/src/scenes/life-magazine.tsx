import { makeScene2D, Rect, Ray, Img, Video, Node } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  spring,
  SmoothSpring,
  waitUntil,
  easeInOutBack,
  easeOutBack,
  Vector2,
  Vector2Signal,
  delay,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  after,
  flash,
  flashAround,
  Quote,
} from "mcas";
import * as colors from "mcas/colors";
import coverImg from "../assets/life-vintage-magazine-nov-19-1965-4273181183.webp";
import randVid from "../assets/rand.mp4";
import randCard from "../assets/cards/ayn-rand.jpg";
import quotes from "../assets/quotes";

export default makeScene2D(function* (view) {
  view.fill(colors.bggreen);

  const cover = createRef<Img>();

  view.add(
    <Img
      position={1080}
      src={coverImg}
      ref={cover}
      height={800}
      shadowBlur={50}
      shadowOffsetY={25}
      shadowColor="000000aa"
    />,
  );

  yield* after(
    "magazine in",
    spring(SmoothSpring, 1080, 0, 0.1, (value) => {
      cover().position([0, value]);
    }),
  );

  const quote = createRef<Txt>();
  const miraculous = createRef<Txt>();

  view.add(
    <Txt ref={quote} position={[360, 0]} justify width={900} fontSize={40}>
      "It shouldn’t happen every evening, but a crisis like the lights going out
      has its good points. In the first place, it deflates human smugness about
      our{" "}
      <Txt ref={miraculous} fontWeight={900}>
        miraculous
      </Txt>{" "}
      technology, which, at least in the area of power distribution and control,
      now stands revealed as utterly flawed
      <Txt fill={colors.zinc500}>[...]</Txt> and it is somehow delicious to
      contemplate the fact that all our beautiful brains and all those wonderful
      plans and all that marvellous equipment has combined to produce a system
      that is unreliable."
    </Txt>,
  );

  quote().scale(0);

  yield* after(
    "quote in",
    spring(SmoothSpring, 0, -550, 0.1, (value) => {
      cover().position([value, 0]);
    }),
    popin(quote),
  );

  // We should not continue to conquer nature with our "miraculous" technology, they tell us, but rather we must restrict our growth, restrict our births, restrict our very minds. "Miraculous" is an important word here---on the environmentalist thesis, production is an evil that should be abolished. They cry out that we must engage in "sustainable" development and "sustainable" innovation.

  yield* after(
    "miraculous",
    flashAround(
      miraculous,
      null,
      null,
      {
        modPos: createSignal(
          new Vector2({ x: 1045.2083282470703, y: 448 }),
        ) as any as Vector2Signal,
        modLineWidth: createSignal(2),
        color: colors.green500,
      },
      {
        shadowBlur: 10,
        shadowColor: colors.green500,
      },
    ),
  );

  yield* waitUntil("rand in");

  const wipe = createRef<Rect>();
  const rand = createRef<Rect>();

  view.add(
    <Node cache>
      <Rect
        fill="white"
        ref={wipe}
        width={Math.sqrt(1920 ** 2 + 1080 ** 2) * 2}
        position={[1920 / 2, 1080 / 2]}
        rotation={-30}
      />
      <Rect
        ref={rand}
        compositeOperation="source-in"
        width={1920}
        height={1080}
        fill="black"
      >
        <Video height="100%" src={randVid} loop play />
      </Rect>
    </Node>,
  );

  yield* wipe().height(wipe().width(), 1);

  const shortQuote = createRef<Txt>();

  view.add(
    <Txt
      ref={shortQuote}
      position={[-450, -100]}
      glow
      fill={colors.red500}
      fontFamily="oswald"
      maxWidth={600}
      textAlign="center"
    />,
  );

  yield* after(
    "shortquote in",
    shortQuote().text(
      `"A restricted technology is a\ncontradiction in terms."`,
      1,
    ),
  );

  yield* waitUntil("quote happens");

  const randQuote = createRef<Quote>();

  view.add(
    <Quote
      ref={randQuote}
      quoteText={quotes[0]}
      citationText={quotes[0].citation}
      card={randCard}
    />,
  );

  yield* all(
    fadeout(shortQuote),
    delay(0.5, all(randQuote().show(), randQuote().scrollText("quote scroll"))),
    rand().filters.brightness(0.2, 1),
    rand().filters.blur(50, 1),
    rand().scale(1.2, 1),
  );

  yield* all(
    randQuote().hide(),
    rand().filters.brightness(1, 1),
    rand().filters.blur(0, 1),
    rand().scale(1, 1),
  );

  yield* waitUntil("end");
});
