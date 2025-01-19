import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Color,
  Reference,
  PossibleColor,
  delay,
  waitUntil,
  spawn,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import wikiImg from "../assets/obist-innovation-wiki.png";
import wikiImg2 from "../assets/meaning-objectivity-wiki.png";
import { Browser, SquigglyBorder } from "mcas/lib";
import aristotleImg from "../assets/aristotle.jpg";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  // In metaphysics, the most fundamental branch of philosophy, we have it that according to Rand's legal and intellectual heir, Leonard Peikoff, "[...] the essence of metaphysics [...] is the step-by-step development of the corollaries of the existence axiom."[fn:48] So the /essence/ of the /Objectivist/ approach to metaphysics according to its de-facto living leader is the development of the fact that existence exists and that it is not subject to change by thought.

  type TBox = {
    title: Reference<Txt>;
    content: Reference<Txt>;
    cont: Reference<Rect>;
    color: Color;
  };

  const mkBox = (color: PossibleColor) =>
    ({
      title: createRef<Txt>(),
      content: createRef<Txt>(),
      cont: createRef<Rect>(),
      color: new Color(color),
    }) as TBox;

  const metaphysics = mkBox("white");
  const epistemology = mkBox("cyan");
  const cont = createRef<Rect>();

  function hideBox({ title, content, cont }: TBox, duration?: number) {
    if (!!duration) {
      return all(
        title().opacity(0, duration),
        content().opacity(0, duration),
        delay(0.4, cont().start(1, duration)),
        cont().fill("00000000", duration),
      );
    }

    title().opacity(0);
    content().opacity(0);
    cont().end(0);
    cont().fill("00000000");
  }

  function* showBox({ title, content, cont, color }: TBox) {
    yield* all(
      cont().end(1, 1),
      fadein(title),
      delay(0.2, fadein(content)),
      delay(0, cont().fill(color.alpha(0.1), 2)),
    );
  }

  view.add(
    <Rect
      ref={cont}
      layout
      justifyContent="space-evenly"
      width="100%"
      position={[453, 0]}
    >
      <Rect
        gap={64}
        padding={64}
        direction="column"
        alignItems="center"
        width={800}
        fill={new Color("white").alpha(0.1)}
        stroke="white"
        lineWidth={5}
        ref={metaphysics.cont}
      >
        <Txt
          glow
          fontFamily="Oswald"
          fill="white"
          ref={metaphysics.title}
          fontSize={60}
        >
          METAPHYSICS
        </Txt>
        <Txt
          ref={metaphysics.content}
          textWrap
          width="100%"
          textAlign="center"
          fill="white"
          fontSize={40}
        >
          "<Txt fill={colors.zinc400}>[...]</Txt> the essence of metaphysics{" "}
          <Txt fill={colors.zinc400}>[...]</Txt> is the step-by-step development
          of the corollaries of the existence axiom."
        </Txt>
      </Rect>
      <Rect
        gap={64}
        padding={64}
        direction="column"
        alignItems="center"
        width={800}
        fill={new Color("cyan").alpha(0.1)}
        stroke="cyan"
        lineWidth={5}
        ref={epistemology.cont}
      >
        <Txt
          glow
          fontFamily="Oswald"
          fill="cyan"
          ref={epistemology.title}
          fontSize={60}
        >
          EPISTEMOLOGY
        </Txt>
        <Txt
          ref={epistemology.content}
          textWrap
          width="100%"
          textAlign="center"
          fill="white"
          fontSize={40}
        >
          To be <Txt.i>objective</Txt.i> is to appeal to reality. Objectivity is
          the recognition of reality on the premise that existence has primacy
          over consciousness.
        </Txt>
      </Rect>
    </Rect>,
  );

  hideBox(metaphysics);
  hideBox(epistemology);

  yield* showBox(metaphysics);

  yield* waitUntil("epistemology");
  yield* chain(cont().position(0, 1), showBox(epistemology));

  yield* waitUntil("out");

  yield* all(hideBox(metaphysics, 1), delay(0.2, hideBox(epistemology, 1)));

  // The basic approach underlying this carries on up to the epistemology---the philosophy of knowledge. What it means to be /objective/ in epistemology, according to standard Objectivism, is to appeal to reality. It is the recognition of reality. This is so because existence has primacy over consciousness. Every single doctrine found within the Objectivist epistemology is based on the premise that reality exists independently of you, and that the role of your consciousness is merely to discover facts about it, or--if you choose to--obscure those facts.

  // I could go on, but I think you get the point---the /essence/ of Objectivism is this consistent application of the primacy of existence to every philosophical issue. This is a uniquely Objectivist viewpoint, and is in fact what Objectivists mean when they tell you to be objective[fn:49]--the very namesake of the philosophy--namely: that objectivity means adherence to the primacy of existence. Even Aristotle was not fully consistent in this approach. He failed to explicitly identify and apply the primacy of existence---the most fundamental thing in his metaphysics is not that existence exists, but rather that the Prime Mover thinks about his own thoughts.

  const essence = createRef<Txt>();

  view.add(
    <Txt
      fontSize={60}
      fill="white"
      ref={essence}
      width={1600}
      textWrap
      textAlign="center"
    >
      The <Txt.i>essence</Txt.i> of Objectivism is the consistent application of
      the primacy of existence to every philosophical issue.
    </Txt>,
  );

  yield* fadein(essence);

  yield* waitUntil("unique to objectivism");

  const browser = createRef<Browser>();
  const content = createRef<Img>();

  view.add(
    <Browser
      opacity={0}
      ref={browser}
      position={[0, 520]}
      hyperlink="https://liquidzulu.github.io/brain/note/the-primacy-of-existence-as-an-objectivist-innovation/"
    >
      <Img src={wikiImg} width={1000} ref={content} />
    </Browser>,
  );

  yield* all(
    essence().position([0, -420], 1),
    delay(0.4, browser().opacity(1, 1)),
    delay(0.4, browser().scale(0.8).scale(1, 1)),
    browser().position([0, 100], 1),
  );

  yield* waitUntil("meaning of objectivity");

  yield* all(
    browser()
      .hyperlink("https://liquidzulu.github.io/", 0.5)
      .to(
        "https://liquidzulu.github.io/brain/note/the-meaning-of-objectivity/",
        0.5,
      ),
    chain(
      content().opacity(0, 0.5),
      content().src(wikiImg2, 0),
      content().opacity(1, 0.5),
    ),
  );

  yield* waitUntil("highlight");

  const highlight = createSignal(0);
  const highlightRays = createRefArray<Ray>();

  const mkRay = (from: number, to: number, y: number) =>
    browser().add(
      <Ray
        ref={highlightRays}
        position={[0, -browser().position().y]}
        layout={false}
        lineWidth={14}
        fromX={from}
        toX={to}
        fromY={y}
        toY={y}
        opacity={0.2}
        stroke={colors.purple500}
      />,
    );

  mkRay(192, 283, 45);
  mkRay(-283, 15, 62);

  for (let i = 0; i < highlightRays.length; ++i) {
    highlightRays[i].end(
      createSignal(() => highlight() * highlightRays.length - i),
    );
  }

  yield* highlight(1, 1);

  yield* waitUntil("aristotle");

  yield* all(fadeout(essence), delay(0.2, fadeout(browser)));

  // Even Aristotle was not fully consistent in this approach. He failed to explicitly identify and apply the primacy of existence---the most fundamental thing in his metaphysics is not that existence exists, but rather that the Prime Mover thinks about his own thoughts.

  const squiggly = createRef<SquigglyBorder>();
  const aristotle = createRef<Img>();
  const aCont = createRef<Rect>();

  view.add(
    <Rect ref={aCont} shadowBlur={50} shadowColor="000000aa" shadowOffsetY={25}>
      <SquigglyBorder ref={squiggly}>
        <Img ref={aristotle} src={aristotleImg} height={700} />
      </SquigglyBorder>
    </Rect>,
  );

  let wiggle = true;

  spawn(function* () {
    while (wiggle) {
      yield* squiggly().wiggle();
    }
  });

  yield* popin(aCont);

  yield* waitUntil("end");

  yield* popout(aCont);

  wiggle = false;
});
