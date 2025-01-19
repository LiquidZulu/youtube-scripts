import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Video,
  Txt as MCTxt,
  Shape,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  waitUntil,
  useDuration,
  easeInCubic,
  Reference,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import randImg from "../assets/rand.png";
import einsteinImg from "../assets/einstein.png";
import darwinImg from "../assets/darwin.png";
import { flashAround, getLocalPos, interleaver } from "mcas/lib";
import blackholeVid from "../assets/blackhole.mp4";
import { Quote } from "mcas/lib";
import quotes from "../assets/TIK.org-quotes";
import rand from "../assets/cards/ayn-rand.jpg";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  // What I disagree with him on, is his attempted analogising of Rand to Darwin and Einstein. Notice that he said "Darwin's theories in biology" and "Einstein's theories in physics" rather than "evolution" or "general relativity." Because the theories of evolution and general relativity are decidedly /not/ closed upon the deaths of their originators. We know /for sure/ that further discoveries need to be made in the theory of general relativity, because it cannot account for quantum gravity or dark matter. It is also possible to make further discoveries under the broad umbrella of the theory of evolution, but I know far less about biology so I cannot say exactly what that would consist of.

  const people = createRefArray<Img | Txt>();
  const quote = createRef<Txt>();
  const darwin = createRef<Txt>();
  const einstein = createRef<Txt>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={128}>
      <Rect gap={64} alignItems="center">
        {[darwinImg, randImg, einsteinImg]
          .map((x) => (
            <Img
              opacity={0}
              ref={people}
              src={x}
              height={200}
              shadowBlur={50}
              shadowColor="000000aa"
              shadowOffsetY={25}
            />
          ))
          .reduce(
            interleaver((_) => (
              <Txt
                opacity={0}
                ref={people}
                fontFamily="cubano"
                fontSize={70}
                fill="white"
              >
                =
              </Txt>
            )),
            [],
          )}
      </Rect>
      <Txt
        opacity={0}
        ref={quote}
        fill="white"
        textWrap
        width={1600}
        textAlign="center"
      >
        "So there's{" "}
        <Txt ref={darwin}>Darwin's theories in evolutionary biology</Txt>, and
        they're Darwin's theories, and they end when he stops writing and dies.
        Then those are his theories in biology. Or{" "}
        <Txt ref={einstein}>Einstein's theories in physics</Txt>. They're
        closed, again, when he dies or stops writing. And that was the
        perspective that ARI adopted and its a perspective I certainly agree
        with. But if you ask: is philosophy open or closed? I think it's a
        different answer. Philosophy is open. So Objectivism and{" "}
        <Txt fill={colors.zinc500}>[...]</Txt> truths in philosophy are not
        synonyms."
      </Txt>
    </Rect>,
  );

  yield* all(
    ...people.map((person, i) =>
      delay(
        0.1 * i,
        fadein(() => person),
      ),
    ),
    delay(0.2, fadein(quote)),
  );

  yield* waitUntil("indicate darwin");
  yield* all(
    flashAround(() => people[0]),
    flashAround(darwin),
    darwin().fill(colors.fuchsia400, 1),
  );

  yield* waitUntil("indicate einstein");
  yield* all(
    flashAround(() => people[2]),
    flashAround(einstein),
    einstein().fill(colors.fuchsia400, 1),
  );

  yield* waitUntil("evolution");
  yield* darwin().text("evolution", 1);

  yield* waitUntil("general relativity");
  yield* einstein().text("general relativity", 1);

  yield* waitUntil("not closed");
  yield* all(darwin().fill("white", 1), einstein().fill("white", 1));

  yield* waitUntil("out");

  yield* all(
    ...people.map((person, i) =>
      delay(
        0.1 * i,
        fadeout(() => person),
      ),
    ),
    delay(0.2, fadeout(quote)),
    view.fill("#030014", 1),
  );

  const video = createRef<Video>();

  view.add(<Video loop ref={video} src={blackholeVid} />);

  video().play();

  yield* all(
    video().opacity(0).opacity(1, 1.5),
    video().scale(0.6).scale(1, useDuration("blackhole zoom")),
  );

  yield* video().position([0, -1080 * 2], 1);

  video().pause();

  const theories = createRef<Txt>();

  view.add(
    <Txt
      ref={theories}
      fontFamily="oswald"
      fontSize={80}
      fill={colors.purple500}
      glow
    />,
  );

  yield* theories().text(`"AYN RAND'S THEORIES IN PHILOSOPHY"`, 1);

  yield* waitUntil("other words");

  const left = createRefArray<Txt>();
  const right = createRefArray<Txt>();
  const ray = createRef<Ray>();
  const leftCont = createRef<Rect>();
  const rightCont = createRef<Rect>();
  const philosophy = createRef<Txt>();
  const biology = createRef<Txt>();
  const physics = createRef<Txt>();

  view.add(
    <Rect layout justifyContent="space-evenly" width={1920} alignItems="center">
      <Rect ref={leftCont} direction="column" alignItems="center" gap={64}>
        <Txt
          opacity={0}
          ref={left}
          fontFamily="oswald"
          fontSize={50}
          fill={colors.purple500}
          glow
        >
          "AYN RAND'S THEORIES IN <Txt ref={philosophy}>PHILOSOPHY</Txt>"
        </Txt>
        <Txt
          opacity={0}
          ref={left}
          fontFamily="oswald"
          fontSize={50}
          fill={colors.purple500}
          glow
        >
          "DARWIN'S THEORIES IN <Txt ref={biology}>BIOLOGY</Txt>"
        </Txt>
        <Txt
          opacity={0}
          ref={left}
          fontFamily="oswald"
          fontSize={50}
          fill={colors.purple500}
          glow
        >
          "EINSTEIN'S THEORIES IN <Txt ref={physics}>PHYSICS</Txt>"
        </Txt>
      </Rect>
      <Ray
        end={0}
        ref={ray}
        lineWidth={20}
        shadowBlur={50}
        shadowColor={colors.purple500}
        stroke={colors.purple500}
        fromY={-1080 / 2}
        toY={1080 / 2}
      />
      <Rect ref={rightCont} direction="column" alignItems="center" gap={64}>
        <Txt
          opacity={0}
          ref={right}
          fontFamily="oswald"
          fontSize={50}
          fill={colors.purple500}
          glow
        >
          OBJECTIVISM
        </Txt>
        <Txt
          opacity={0}
          ref={right}
          fontFamily="oswald"
          fontSize={50}
          fill={colors.purple500}
          glow
        >
          THE THEORY OF EVOLUTION
        </Txt>
        <Txt
          opacity={0}
          ref={right}
          fontFamily="oswald"
          fontSize={50}
          fill={colors.purple500}
          glow
        >
          THE THEORY OF GENERAL RELATIVITY
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(
    theories().fontSize(left[0].fontSize(), 1),
    theories().position(getLocalPos(left[0].absolutePosition()), 1),
    chain(
      waitUntil("obism"),
      fadein(() => right[0]),
    ),
  );
  theories().opacity(0);
  left[0].opacity(1);

  yield* waitUntil("evolutionn");

  yield* all(
    fadein(() => left[1]),
    fadein(() => right[1]),
    chain(
      waitUntil("general relativityy"),
      all(
        fadein(() => left[2]),
        fadein(() => right[2]),
      ),
    ),
  );

  yield* waitUntil("ray");
  yield* ray().end(1, 1);

  // Indeed, nobody is debating over whether "Ayn Rand's theories in philosophy" is open or closed---clearly, whatever beliefs Ayn Rand holds on philosophy is a closed set the instant she dies. But the word "Objectivism"--much like the words "evolution" and "general relativity"--does not refer to whatever beliefs she happens to hold. It refers to the essential theory that she was forwarding.

  yield* waitUntil("non analogous");

  const flash = <T extends Shape>(node: T) =>
    flashAround(() => node, null, null, null, {
      shadowBlur: 20,
      shadowColor: colors.purple500,
      stroke: colors.purple500,
      lineWidth: 4,
    });

  const waitFlash = <T extends Shape>(eventName: string, ref: Reference<T>) =>
    chain(waitUntil(eventName), flash(ref()));

  yield* all(
    flash(right[1]),
    delay(useDuration("wait for it!"), flash(right[2])),
  );

  yield* chain(
    waitFlash("philosophy", leftCont),
    waitFlash("bilogy", biology),
    waitFlash("physics", physics),
    all(
      waitFlash("evo", () => right[1]),
      waitFlash("gen", () => right[2]),
    ),
    waitFlash("obi", () => right[0]),
  );

  // The theories of evolution and general relativity are not terms analogous to "philosophy"--the proper analogy there would be "biology" and "physics"--evolution and general relativity, on the other hand, are specific theories in their respective fields, like how Objectivism is a specific theory about philosophy.

  yield* waitUntil("outt");

  video().play();
  video().position(0);
  video().opacity(0);

  const q = createRef<Quote>();

  view.add(
    <Quote
      ref={q}
      card={rand}
      quoteText={quotes[17] as any}
      citationText={quotes[17].citation}
    />,
  );

  yield* all(
    chain(
      waitUntil("show quote"),
      all(
        q().show(),
        q().scrollText("quoteshowing"),
        video().filters.blur(50, 1),
        video().filters.brightness(0.2, 1),
      ),
    ),
    ray().start(1, 1),
    delay(
      0.1,
      all(
        ...left.map((item, i) =>
          delay(
            0.1 * i,
            fadeout(() => item),
          ),
        ),
      ),
    ),
    delay(
      0.2,
      all(
        ...right.map((item, i) =>
          delay(
            0.1 * i,
            fadeout(() => item),
          ),
        ),
      ),
    ),
    delay(
      0.4,
      all(
        video().opacity(1, 1.5),
        video().scale(0.6).scale(1, useDuration("blackhole zoomm")),
      ),
    ),
  );

  yield* all(video().opacity(0, 1), q().hide(), q().opacity(0, 0.5));
});
