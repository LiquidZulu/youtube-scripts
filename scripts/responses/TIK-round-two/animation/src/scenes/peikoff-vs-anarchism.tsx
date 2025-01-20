import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Video,
  Shape,
  Node,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
  waitUntil,
  Reference,
  easeInOutBack,
  spawn,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { after, ArrowList, flashAround, Quote, SquigglyBorder } from "mcas/lib";
import quotes from "../assets/TIK.org-quotes";
import peikoff from "../assets/cards/leonard-peikoff.webp";
import rothbard from "../assets/rothbard.mp4";
import rand from "../assets/rand.mp4";

export default makeScene2D(function* (view) {
  const quote = createRef<Quote>();

  view.add(
    <Quote
      ref={quote}
      card={peikoff}
      quoteText={quotes[23] as any}
      citationText={quotes[23].citation}
    />,
  );

  yield* all(quote().show(), quote().scrollText("quote"));

  yield* all(
    quote().hide(),
    quote().opacity(0, 0.5),
    view.fill("#030014", 0.5),
  );

  const claims = createRefArray<Txt>();
  const ray = createRef<Ray>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} layout gap={64} alignItems="center">
      <Txt opacity={0} ref={claims} textAlign="center" fill="white">
        "There should be{"\n"}no government."
      </Txt>
      <Ray
        end={0}
        ref={ray}
        lineWidth={18}
        endArrow
        stroke={colors.purple500}
        toX={300}
      />
      <Txt
        opacity={0}
        ref={claims}
        textWrap
        width={800}
        fill="white"
        textAlign="center"
        fontSize={40}
      >
        "Every man should defend himself by using physical force against others
        whenever he feels like it, with no objective standards of justice,
        crime, or proof."
      </Txt>
    </Rect>,
  );

  yield* sequence(
    0.1,
    fadein(() => claims[0]),
    ray().end(1, 1),
    fadein(() => claims[1]),
  );

  const flash = <T extends Node = Node>(eventName: string, ref: Reference<T>) =>
    after(
      eventName,
      flashAround(
        ref,
        null,
        null,
        { modWidth: createSignal(10), modHeight: createSignal(10) },
        {
          lineWidth: 6,
          stroke: colors.purple500,
          shadowBlur: 20,
          shadowColor: colors.purple500,
        },
      ),
    );

  yield* flash("indicate anarchism", () => claims[0]);
  yield* after("does not imply", ray().opacity(0.2, 1)),
    yield* flash("indicate implication", () => claims[1]);

  yield* waitUntil("rothie");

  const rothie = createRef<Rect>();
  const squig = createRef<SquigglyBorder>();
  const video = createRef<Video>();

  view.add(
    <Rect ref={rothie} position={[0, 1080]}>
      <Video
        ref={video}
        play
        src={rothbard}
        height={1080 * (2 / 3)}
        shadowBlur={50}
        shadowColor="black"
        shadowOffsetY={25}
      />
      <SquigglyBorder
        ref={squig}
        stroke={colors.purple500}
        shadowBlur={20}
        shadowColor={colors.purple500}
      >
        <Shape size={{ x: 960, y: 720 }} />
      </SquigglyBorder>
    </Rect>,
  );

  let wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* squig().wiggle();
    }
  });

  yield* all(
    cont().position([0, -1080], 1, easeInOutBack),
    rothie().position(0, 1, easeInOutBack),
  );

  yield* waitUntil("false alternative");

  const alternatives = createRefArray<Txt>();

  view.add(
    <Rect layout alignItems="center" gap={64}>
      <Txt
        scale={0}
        ref={alternatives}
        textAlign="center"
        fontSize={70}
        textWrap
        width={650}
        fill="white"
      >
        There should be a monopoly on force.
      </Txt>
      <Txt
        scale={0}
        ref={alternatives}
        glow
        fill={colors.red500}
        fontFamily="cubano"
      >
        OR
      </Txt>
      <Txt
        scale={0}
        ref={alternatives}
        textAlign="center"
        fontSize={70}
        textWrap
        width={650}
        fill="white"
      >
        Everybody should just use whatever force they want at their whim.
      </Txt>
    </Rect>,
  );

  yield* popout(rothie);
  wiggle = false;
  yield* all(
    sequence(0.1, ...alternatives.map((x) => popin(() => x))),
    flash("monopoly on force", () => alternatives[0]),
    flash("the other one", () => alternatives[2]),
  );

  yield* waitUntil("the other quote");
  yield* sequence(0.1, ...alternatives.map((x) => popout(() => x)));

  // This is a near-explicit straw man attack on anarchism. Anarchism is the view that there should be no government--if government means a monopoly force-user--but that does not even come close to implying "that every man should defend himself by using physical force against others whenever he feels like it, with no objective standards of justice, crime, or proof." What an absolutely absurd claim that is on its face. I would be somewhat willing to excuse utter nonsense like this if it were written in a time prior to Murray Rothbard, but it wasn't---Peikoff is just openly endorsing the false alternative that either there should be a monopoly on force, or everyone should just use whatever force they want at their whim. I'm frankly shocked that he never once considered whether individual men could discover and apply philosophy on their own when it comes to the question of when the use of force is licit. Peikoff continues:

  const quote1 = createRef<Quote>();

  view.add(
    <Quote
      ref={quote1}
      card={peikoff}
      quoteText={quotes[24] as any}
      citationText={quotes[24].citation}
    />,
  );

  yield* all(quote1().show(), quote1().scrollText("quote1"));

  yield* all(
    quote1().hide(),
    quote1().opacity(0, 0.5),
    view.fill("#030014", 0.5),
  );

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list}>
      <Txt textWrap maxWidth={1400}>
        The underlying premise <Txt.i>is not</Txt.i> that a man may do{" "}
        <Txt.i>anything</Txt.i> he wants simply because he wants it.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        The underlying premise is that a man may defend himself if he wishes, or
        delegate this defense to anybody he sees fit.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        This does not imply that people may engage in random acts of violence or
        use arbitrary means to defend their property.
      </Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* list().next("underlying premise");
  yield* list().next("does not mean arbitrary violence");
  yield* list().hideAll("out");

  video().src(rand);

  wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* squig().wiggle();
    }
  });

  yield* popin(rothie);
  yield* after("vidout", fadeout(rothie));
  wiggle = false;

  const border = createRef<Rect>();

  view.add(
    <Rect
      end={0}
      ref={border}
      lineWidth={16}
      stroke={colors.purple500}
      shadowBlur={50}
      shadowColor={colors.purple500}
      width={920}
      height={530}
      position={[0, -12]}
      radius={30}
    />,
  );

  yield* border().end(1, 1);
  yield* waitUntil("end");

  // Again, the underlying premise is decidedly /not/ that a man may do /anything/ he wants simply because he wants it---the underlying premise is that a man may defend himself if he wishes or delegate this defense to anybody he sees fit. Nowhere in this claim is there any implication that people may engage in random acts of violence or use arbitrary means to defend their property. That is a patent absurdity and false alternative presented to us by the people who are supposed to have as their banner that they check premises and never accept false alternatives.

  // The collectivist poison that Rand grafted onto her politics has yielded legion derivative errors, not least of which is her support of intellectual "property." If you want to know why that is wrong, you have to watch this video[fn:78] where I explain that every form of IP is an anathema to the objective principles of law.
});
