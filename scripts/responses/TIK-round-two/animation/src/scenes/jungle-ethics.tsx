import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

// Moving on from TIK now, I must address those who would seek to call anarchism chaotic by conflating it with the law of the jungle---the idea that anything goes as far as law is concerned. Recall above that anarchism must be opposed to legal authoritarianism---the theory that the correct way to resolve conflicts is by appealing to some authority. Notice then that the law of the jungle in its many forms therefore cannot be anarchist. If the claim is that might makes right, then the mighty justify their claim by demonstrating that they are the authority on law by virtue of having the biggest stick in the land. Certainly, this is not anarchist in the slightest. Anarchism does not mean no laws, having no laws is impossible---anarchism rather means that those laws are natural and peaceful.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const jungle = createRef<Txt>();
  const anarchism = createRef<Txt>();
  const list = createRef<ArrowList>();
  const titleCont = createRef<Rect>();

  view.add(
    <Rect
      ref={titleCont}
      layout
      direction="column"
      alignItems="center"
      gap={64}
      position={[0, 243]}
    >
      <Txt
        ref={title}
        fontFamily="Oswald"
        fill="white"
        textWrap
        width={1100}
        textAlign="center"
        fontSize={80}
      >
        THE CONFLATION OF{" "}
        <Txt ref={jungle} glow={0}>
          JUNGLE ETHICS
        </Txt>{" "}
        WITH{" "}
        <Txt ref={anarchism} glow={0}>
          ANARCHISM
        </Txt>
      </Txt>
      <ArrowList ref={list}>
        <Txt>
          <Txt glow fill={colors.red500}>
            The Law of the Jungle
          </Txt>
          : anything goes as far as law is concerned.
        </Txt>
        <Txt>
          <Txt glow fill={colors.yellow500}>
            Anarchism
          </Txt>
          :{" "}
          <Txt glow fill={colors.red500}>
            legal authoritarianism
          </Txt>{" "}
          is incorrect.
        </Txt>
        <Txt>
          If{" "}
          <Txt glow fill={colors.red500}>
            might makes right
          </Txt>
          , then the mighty are{" "}
          <Txt glow fill={colors.red500}>
            legal authorities
          </Txt>
          .
        </Txt>
        <Txt>
          <Txt glow fill={colors.yellow500}>
            Anarchism
          </Txt>
          : law is inherent in nature.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* fadein(title);

  yield* waitUntil("law of jungle");
  yield* all(
    titleCont().position(0, 1),
    list().next(),
    jungle().glow(1, 1),
    jungle().fill(colors.red500, 1),
  );

  yield* waitUntil("anarchism thesis");
  yield* all(
    list().next(),
    anarchism().glow(1, 1),
    anarchism().fill(colors.yellow500, 1),
  );

  yield* waitUntil("might makes right");
  yield* list().next();

  yield* waitUntil("natural law");
  yield* list().next();

  yield* waitUntil("ancom");

  // This provides a retort also to the various other primitive, brutish, and/or stupid varieties of supposed-anarchist thought: chief among them the "anarcho-communists." The term itself is a clear contradiction. Communism holds that total metaphysical, epistemic, ethical, aesthetic, and legal authority lies with the collective---and that accordingly the proper way to resolve conflicts is for the individual to be crushed under the boot and be made to be a complete slave to the whims of the egregore. The communist cannot, therefore, appeal to any naturalistic understanding of which individual ought be given precedence in some conflict, as he does not recognise the individual as being a self-sufficient existent in the first place.

  const ancom = createRef<Txt>();
  const ancomCont = createRef<Txt>();
  const ancomList = createRef<ArrowList>();

  view.add(
    <Rect
      ref={ancomCont}
      layout
      direction="column"
      alignItems="center"
      gap={64}
      position={[0, 1080 + 385]}
    >
      <Txt ref={ancom} fontFamily="oswald" fill="white" fontSize={80}>
        ANARCHO-COMMUNISM
      </Txt>
      <ArrowList ref={ancomList}>
        <Txt textWrap maxWidth={1300}>
          Contradiction: communism holds that total{" "}
          <Txt fill={colors.zinc500}>metaphysical</Txt>,{" "}
          <Txt fill={colors.teal500}>epistemic</Txt>,{" "}
          <Txt fill={colors.yellow500}>ethical</Txt>,{" "}
          <Txt fill={colors.purple500}>aesthetic</Txt>, and{" "}
          <Txt fill={colors.amber500}>legal</Txt> authority lies with the
          collective.
        </Txt>
        <Txt textWrap maxWidth={1300}>
          Accordingly, the proper way to resolve conflicts is for the individual
          to be crushed under the boot and be made to be a complete slave to the
          whims of the egregore.
        </Txt>
        <Txt textWrap maxWidth={1300}>
          The communist cannot appeal to any naturalistic understanding of which
          individual ought be given precedence in a conflict, as the communist
          denies the existence of the individual.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* all(
    titleCont().position([0, -1080], 1),
    ancomCont().position([0, 385], 1),
  );

  yield* waitUntil("contradiction");
  yield* all(ancomCont().position([0, 250], 1), ancomList().next());

  yield* waitUntil("egregore");
  yield* all(ancomCont().position([0, 150], 1), ancomList().next());

  yield* waitUntil("denies individual");
  yield* all(ancomCont().position(0, 1), ancomList().next());

  yield* waitUntil("end");
  yield* all(
    fadeout(ancom),
    ...ancomList().items.map((item, i) =>
      delay(0.2 * (i + 1), ancomList().hide(item)),
    ),
  );
});
