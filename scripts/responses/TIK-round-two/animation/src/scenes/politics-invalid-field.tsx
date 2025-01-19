import { makeScene2D, Rect, Ray, Img, Circle, Path } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  easeInOutBack,
  waitUntil,
  sequence,
  delay,
  useRandom,
  spawn,
  Color,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, Quote } from "mcas/lib";
import peikoffHead from "../assets/peikoff.png";
import quotes from "../assets/TIK.org-quotes";
import peikoff from "../assets/cards/leonard-peikoff.webp";
import rand from "../assets/cards/ayn-rand.jpg";
import wavyCircle from "../assets/wavy-circle";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  // So then, why is it that I think the anarcho-capitalist legal theory as formulated by myself is the proper implication of prior Objectivist philosophy? The reason is that I think Ayn Rand and her legion followers were all answering the wrong question when it came time to formulate the politics. Namely: I think politics is not a valid field of philosophy---law is.

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();
  const cont = createRef<Rect>();
  view.add(
    <Rect position={[0, 122]} layout direction="column" gap={64} ref={cont}>
      <Txt
        fontSize={60}
        glow
        fontFamily="Oswald"
        fill={colors.purple500}
        ref={title}
        textWrap
        width={1400}
        textAlign="center"
      />
      <ArrowList ref={list}>
        <Txt>
          Ayn Rand and her followers were all answering the wrong question.
        </Txt>
        <Txt>Politics is not a valid field of philosophy---law is.</Txt>
      </ArrowList>
    </Rect>,
  );

  yield* title().text(
    "why is anarcho-capitalism the proper implication of prior objectivist philosophy?".toUpperCase(),
    1,
  );

  yield* list().next("wrong question", null, cont().position(0, 1));
  yield* list().next("politics invalid");

  yield* waitUntil("peikoff");

  const peikoffCont = createRef<Rect>();

  view.add(
    <Rect ref={peikoffCont} position={[0, 1080]}>
      <Img
        src={peikoffHead}
        position={[-550, 55]}
        height={1080 * 0.9}
        shadowBlur={50}
        shadowColor={colors.purple500}
      />
    </Rect>,
  );

  yield* all(
    sequence(0.1, fadeout(title), list().hideAll()),
    peikoffCont().position(0, 1),
  );

  yield* waitUntil("peikoff quote");

  const peikoffQuoteCont = createRef<Rect>();
  const peikoffQuote = createRef<Txt>();
  const whatTheGovernmentDoes = createRef<Txt>();

  view.add(
    <Rect ref={peikoffQuoteCont}>
      <Txt
        ref={peikoffQuote}
        position={[300, 0]}
        fontSize={60}
        textAlign="center"
        width={1000}
        textWrap
        fontFamily="oswald"
      >
        <Txt glow fill={colors.purple500}>
          "<Txt fill={colors.purple900}>[...]</Txt> what is right or wrong
        </Txt>{" "}
        <Txt glow fill={colors.purple500} ref={whatTheGovernmentDoes}>
          in terms of what the government does
        </Txt>
        <Txt glow fill={colors.purple500}>
          , what society does?
          {
            `"` /* my syntax highlighter was getting confused by this character for some reason */
          }
        </Txt>
      </Txt>
    </Rect>,
  );

  yield* fadein(peikoffQuote);

  yield* waitUntil("quote1 in");

  const quote = createRef<Quote>();

  view.add(
    <Quote
      ref={quote}
      card={peikoff}
      quoteText={quotes[18] as any}
      citationText={quotes[18].citation}
    />,
  );

  yield* sequence(
    0.3,
    all(
      peikoffCont().position([-1920, 0], 1),
      peikoffQuoteCont().position([1920, 0], 1),
    ),
    all(quote().show(), quote().scrollText("quote")),
  );
  yield* all(quote().hide(), quote().opacity(0, 0.5));

  const quote1 = createRef<Quote>();

  view.add(
    <Quote
      ref={quote1}
      card={rand}
      quoteText={quotes[19] as any}
      citationText={quotes[19].citation}
    />,
  );

  yield* all(quote1().show(), quote1().scrollText("quote1"));
  yield* all(
    quote1().hide(),
    quote1().opacity(0, 0.5),
    peikoffCont().position(0, 1),
    peikoffQuoteCont().position(0, 1),
  );

  // Peikoff states the question that politics is trying to answer as: "what is right or wrong in terms of what the government does, what society does,"[fn:55] or that:
  //  #+begin_quote
  //  Politics, like ethics, is a normative branch of philosophy. Politics defines the principles of a proper social system, including the proper functions of government.[fn:56]
  //#+end_quote

  //    This is, once again, the fallacy of the frozen abstraction. Allow me to highlight this with respect to another example from Rand:

  //  #+begin_quote
  //  Objectivists will often hear a question such as: "What will be done about the poor or the handicapped in a free society?" [...] Observe that he does not ask: "Should anything be done?" but: "What will be done?"---as if the collectivist premise had been tacitly accepted and all that remains is a discussion of the means to implement it.[fn:57]
  //#+end_quote

  yield* waitUntil("grafted onto problem statement");
  yield* whatTheGovernmentDoes().fill(colors.red500, 1);

  // In the case of politics, the Randians have grafted the premise that there should be a government onto the very problem-statement. This poisons every piece of analysis they provide from this point on. Their formulation doesn't even consider the question "should there be a government?" it asks "how should the government be run?"

  yield* waitUntil("collectivist deviation");

  const random = useRandom(319813);
  const path = createRef<Path>();

  const pathColor = createSignal(new Color(colors.purple500));
  const circColor = createSignal(new Color(colors.purple500));

  view.add(
    <Path
      ref={path}
      position={[-950, -840]}
      scale={2}
      scaleX={2.5}
      data={wavyCircle[0]}
      stroke={pathColor}
      lineWidth={8}
      shadowBlur={50}
      shadowColor={pathColor}
      end={0}
    />,
  );

  const bounds = { x: [-250, 270], y: [-350, 250] };
  const circles = createRefArray<Circle>();

  for (let i = 0; i < 20; ++i) {
    view.add(
      <Circle
        ref={circles}
        position={[
          random.nextFloat(...bounds.x),
          random.nextFloat(...bounds.y),
        ]}
        width={30}
        height={30}
        fill={circColor}
        shadowBlur={25}
        shadowColor={circColor}
      />,
    );
  }

  circles[7].position([circles[7].position().x + 100, circles[7].position().y]);

  const initialPositions = circles.map((circle) => circle.position());
  const currentDir = new Array(circles.length)
    .fill([0, 0])
    .map((_) => [0, 0].map((__) => (random.nextInt(-1, 1) + 0.5) * 2));

  const waveAmount = 1;
  const waveBounds = 15;
  const stayDir = 98;

  let currentCircle = 0;

  function* waveCircle() {
    const j = currentCircle % wavyCircle.length;
    if (j == 0) currentCircle++;

    path().data(wavyCircle[currentCircle++ % wavyCircle.length]);
    yield* waitFor(1 / 60);
  }

  function* moveDots() {
    for (let k = 0; k < circles.length; ++k) {
      let dir = [0, 0].map((_) => (random.nextInt(-1, 1) + 0.5) * 2);
      const amount = [0, 0].map((_) => random.nextFloat(0, waveAmount));

      if (random.nextInt(0, 100) < stayDir) {
        dir = currentDir[k];
      }

      if (
        Math.abs(circles[k].position().x) + Math.abs(amount[0]) >
        Math.abs(initialPositions[k].x) + waveBounds
      ) {
        dir[0] *= -1;
      }

      if (
        Math.abs(circles[k].position().y) + Math.abs(amount[1]) >
        Math.abs(initialPositions[k].y) + waveBounds
      ) {
        dir[1] *= -1;
      }

      currentDir[k] = dir;

      circles[k].position([
        circles[k].position().x + amount[0] * dir[0],
        circles[k].position().y + amount[1] * dir[1],
      ]);
    }

    yield* waitFor(1 / 60);
  }

  let doAnimation = true;

  yield spawn(function* () {
    while (doAnimation) {
      yield* all(waveCircle(), moveDots());
    }
  });

  for (let circ of circles) {
    circ.scale(0);
  }

  yield* all(
    peikoffCont().position([-1920, 0], 1),
    peikoffQuoteCont().position([1920, 0], 1),
    delay(
      0.4,
      all(
        path().end(1, 1),
        sequence(0.05, ...circles.map((circ) => popin(() => circ))),
      ),
    ),
  );

  yield* waitUntil("good");
  yield* pathColor(new Color(colors.green500), 1);

  yield* waitUntil("bad");
  yield* pathColor(new Color(colors.red500), 0.4);

  yield* waitUntil("proper");
  yield* pathColor(new Color(colors.green500), 0.4);

  yield* waitUntil("improper");
  yield* pathColor(new Color(colors.red500), 0.4);

  yield* waitUntil("back");
  yield* pathColor(new Color(colors.purple500), 1);

  yield* waitUntil("out");
  yield* all(
    path().start(1, 1),
    sequence(0.05, ...circles.map((circ) => popout(() => circ))),
  );

  doAnimation = false;

  // This snuck premise is a collectivist deviation. "Society" or "the government" cannot do right or wrong---those are collective terms. Rand and all of her followers on this front reify "society" as something that can be good or bad, proper or improper. But society is not an entity, it cannot act. We might as well make a new branch of philosophy called murderology, which asks the question: "how should men act, including what are the proper methods of murder? Murder is a value to men only if it is the right kind of murder, after all!" This is a gross deviation not only from the proper Objectivist line, but from philosophy itself. None of the other branches are defined in such a crude fashion.
});
