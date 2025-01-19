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
import { ArrowList, Browser } from "mcas/lib";
import wikiImg from "../assets/poe-wiki.png";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();
  const cont = createRef<Rect>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect
      position={[0, 187]}
      ref={cont}
      layout
      direction="column"
      gap={64}
      alignItems="center"
    >
      <Txt fontSize={70} fill="white" ref={title}>
        My open-Objectivism
        <Txt ref={colon} opacity={0}>
          :
        </Txt>
      </Txt>
      <ArrowList ref={list}>
        <Txt>
          <Txt fontFamily="oswald" fill={colors.red500} glow>
            NOT
          </Txt>
          : true philosophy.
        </Txt>
        <Txt>
          <Txt fontFamily="oswald" fill={colors.red500} glow>
            NOT
          </Txt>
          : whatever beliefs in philosophy were held by Ayn Rand.
        </Txt>
        <Txt>
          <Txt fill={colors.purple500}>Objectivism</Txt> is the philosophy of
          the primacy of existence.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  // I hold to a different sort of open Objectivism than that of Kelley or Hicks. Namely: I don't hold that Objectivism means true philosophy, /or/ that it means whatever beliefs in philosophy are held by Ayn Rand---in my view, Objectivism is the philosophy of the primacy of existence.

  yield* fadein(title);

  yield* waitUntil("not true philosophy");

  yield* all(list().next(), cont().position(0, 1), colon().opacity(1, 1));

  yield* list().next("closed");

  yield* list().next("mine");

  yield* waitUntil("out");

  yield* all(fadeout(title), delay(0.1, list().hideAll()));

  // The primacy of existence is basically the view that existence is the most fundamental fact. That /first/ one must have it that existence exists, /then/ one can recognise that they are conscious of it. To explain this view, it is worth contrasting it with the opposing view---the primacy of consciousness. One form of this is found in Descartes' /cogito ergo sum/---I think, /therefore/ I am. The starting point for Descartes is an "I think," not an "it is." Another form of it is found in the religious viewpoint that reality requires a cause, and that this cause must be the consciousness they call God. This is also the primacy of consciousness---supernatural thoughts are held as the fundamental which comes before reality.

  const poe = createRef<Txt>();
  const poc = createRef<Txt>();
  const poeList = createRef<ArrowList>();
  const pocList = createRef<ArrowList>();
  const pCont = createRef<Rect>();
  const ray = createRef<Ray>();
  const fontSize = 42;

  view.add(
    <Rect
      position={[500, 350]}
      ref={pCont}
      layout
      justifyContent="space-evenly"
      width={1920}
      height={1080}
    >
      <Rect direction="column" alignItems="center" gap={32} paddingTop={32}>
        <Txt opacity={0} fontSize={60} ref={poe} fill="white">
          The Primacy of Existence:
        </Txt>
        <ArrowList ref={poeList}>
          <Txt textWrap maxWidth={1920 / 2 - 200} fontSize={fontSize}>
            Existence is the most fundamental fact.
          </Txt>
          <Txt textWrap maxWidth={1920 / 2 - 200} fontSize={fontSize}>
            <Txt.i>First</Txt.i> one must have it that existence exists,{" "}
            <Txt.i>then</Txt.i> one can recognise that they are conscious of it.
          </Txt>
        </ArrowList>
      </Rect>
      <Ray
        end={0}
        ref={ray}
        lineWidth={20}
        stroke="white"
        fromY={-1080 / 2}
        toY={1080 / 2}
      />
      <Rect
        direction="column"
        height={1080}
        alignItems="center"
        gap={32}
        paddingTop={32}
      >
        <Txt opacity={0} fontSize={60} ref={poc} fill="white">
          The Primacy of Consciousness:
        </Txt>
        <ArrowList ref={pocList}>
          <Txt textWrap maxWidth={1920 / 2 - 200} fontSize={fontSize}>
            <Txt.i>Consciousness</Txt.i> has metaphysical primacy.
          </Txt>
          <Txt textWrap maxWidth={1920 / 2 - 200} fontSize={fontSize}>
            Example: Descartes' <Txt.i>cogito ergo sum</Txt.i>---I think,{" "}
            <Txt.i>therefore</Txt.i> I am.
          </Txt>
          <Txt textWrap maxWidth={1920 / 2 - 200} fontSize={fontSize}>
            The starting point for Descartes is an "I think," not an "it is."
          </Txt>
          <Txt textWrap maxWidth={1920 / 2 - 200} fontSize={fontSize}>
            Example: reality requires a cause, and this cause is the
            consciousness called God.
          </Txt>
          <Txt textWrap maxWidth={1920 / 2 - 200} fontSize={fontSize}>
            Supernatural thoughts are held as the fundamental which comes before
            reality.
          </Txt>
        </ArrowList>
      </Rect>
    </Rect>,
  );

  yield* all(fadein(poe), poeList().next());

  yield* poeList().next("first blah blah");

  yield* waitUntil("contrast");

  yield* chain(
    pCont().position(0, 1),
    all(ray().end(1, 1), fadein(poc), pocList().next()),
  );

  // To explain this view, it is worth contrasting it with the opposing view---the primacy of consciousness. One form of this is found in Descartes' /cogito ergo sum/---I think, /therefore/ I am. The starting point for Descartes is an "I think," not an "it is." Another form of it is found in the religious viewpoint that reality requires a cause, and that this cause must be the consciousness they call God. This is also the primacy of consciousness---supernatural thoughts are held as the fundamental which comes before reality.

  yield* pocList().next("cogito ergo sum");
  yield* pocList().next("starting point for descartes");
  yield* pocList().next("other example");
  yield* pocList().next("supernatural thoughts");

  yield* waitUntil("poe out");

  yield* all(
    fadeout(poe),
    delay(0.1, poeList().hideAll()),
    delay(0.1, ray().start(1, 1)),
    delay(0.2, all(fadeout(poc), delay(0.1, pocList().hideAll()))),
  );

  const browser = createRef<Browser>();

  view.add(
    <Browser
      ref={browser}
      hyperlink="https://liquidzulu.github.io/brain/note/the-primacy-of-existence-vs-the-primacy-of-consciousness/"
    >
      <Img src={wikiImg} width={1000} position={[0, 5]} />
    </Browser>,
  );

  yield* popin(browser);
  yield* waitUntil("end");
  yield* popout(browser);
});
