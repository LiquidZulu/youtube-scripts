import { makeScene2D, Rect, Ray, Img, Video, Shape } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  spawn,
  waitUntil,
  easeInOutBounce,
  easeInOutElastic,
  loopUntil,
  easeInBack,
  easeInOutBack,
  useDuration,
  sequence,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import onkar from "../assets/onkar.mp4";
import { Browser, fadeinup, SquigglyBorder } from "mcas/lib";
import randImg from "../assets/rand.png";
import biddle from "../assets/ayn rand said isnt an argument.png";
import course from "../assets/course.png";
import streamVid from "../assets/stream.mp4";
import rothbardVid from "../assets/rothbard.mp4";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const video = createRef<Video>();
  const squiggly = createRefArray<SquigglyBorder>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont}>
      <Video play width={1920 * (2 / 3)} ref={video} src={onkar} />
      <SquigglyBorder
        ref={squiggly}
        stroke={colors.purple500}
        shadowBlur={20}
        shadowColor={colors.purple500}
      >
        <Shape width={1920 * (2 / 3)} height={1080 * (2 / 3)} />
      </SquigglyBorder>
    </Rect>,
  );

  let wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* all(...squiggly.map((x) => x.wiggle()));
    }
  });

  cont().scale(0);
  yield* popin(cont);

  yield* waitUntil("rand as closed objectivist");

  const rand = createRef<Img>();

  view.add(
    <Img
      position={[0, 1080]}
      ref={rand}
      src={randImg}
      width={700}
      shadowBlur={60}
      shadowColor={colors.purple500}
    />,
  );

  yield* all(
    cont().position([0, -1080], 1, easeInOutBack),
    rand().position(0, 1, easeInOutBack),
  );

  yield* waitUntil("rand said so is not an argument");

  const browser = createRef<Browser>();
  const page = createRef<Img>();

  view.add(
    <Browser
      position={[1920, 0]}
      ref={browser}
      shadowOffset={0}
      shadowBlur={50}
      shadowColor={colors.purple500}
      hyperlink={
        "https://theobjectivestandard.com/2016/04/ayn-rand-said-is-not-an-argument/"
      }
    >
      <Img ref={page} position={[0, 5]} src={biddle} width={1000} />
    </Browser>,
  );

  const stream = createRef<Video>();
  const streamCont = createRef<Rect>();

  view.add(
    <Rect ref={streamCont} position={[0, 1080]}>
      <Video play width={1920 * (2 / 3)} ref={stream} src={streamVid} />
      <SquigglyBorder
        ref={squiggly}
        stroke={colors.purple500}
        shadowBlur={20}
        shadowColor={colors.purple500}
      >
        <Shape width={1920 * (2 / 3)} height={1080 * (2 / 3)} />
      </SquigglyBorder>
    </Rect>,
  );

  yield* all(
    rand().position([-1920, 0], 1, easeInOutBack),
    browser().position(0, 1, easeInOutBack),
    browser().scroll(0.4, useDuration("scroll")),
    chain(
      waitUntil("stream"),
      all(
        browser().position([0, -1080], 1, easeInOutBack),
        streamCont().position(0, 1, easeInOutBack),
      ),
    ),
  );

  browser().hyperlink("https://liquidzulu.github.io/libertarian-ethics/");
  browser().scroll(0);
  page().src(course);

  yield* waitUntil("my innovations");

  yield* all(
    browser().position(0, 1, easeInOutBack),
    streamCont().position([0, 1080], 1, easeInOutBack),
    browser().scroll(1, useDuration("course scroll")),
  );

  const obismDoesntMean = createRef<Txt>();
  view.add(
    <Txt
      fontFamily="oswald"
      fontSize={70}
      textWrap
      width={1600}
      textAlign="center"
      fill={colors.purple500}
      glow
      ref={obismDoesntMean}
    />,
  );

  yield* chain(
    popout(browser),
    obismDoesntMean().text(
      "THIS IS PRECISELY BECAUSE OBJECTIVISM DOES NOT MEAN WHATEVER BELIEFS IN PHILOSOPHY AYN RAND HELD",
      1,
    ),
  );

  yield* waitUntil("broader abstraction");

  const broader = createRef<Txt>();
  view.add(
    <Rect position={[0, 125]}>
      <Txt
        fontFamily="oswald"
        fontSize={50}
        textWrap
        width={1600}
        textAlign="center"
        fill={colors.purple500}
        glow
        ref={broader}
      >
        \because I hold that Objectivism is a broader abstraction, I am
        perfectly free to hold <Txt.i>both</Txt.i> that there are correct
        Objectivist stances that Ayn Rand did not hold <Txt.i>whilst</Txt.i> not
        pinning these positions onto Ayn Rand.
      </Txt>
    </Rect>,
  );

  yield* all(fadeinup(broader), obismDoesntMean().position([0, -100], 1));

  yield* waitUntil("out");
  yield* sequence(0.2, fadeout(obismDoesntMean), fadeout(broader));

  // This quoted text was specifically selected by Onkar Ghate, before anybody tries accusing me of omitting important information. Regardless, I do agree with the closed Objectivists that this is evidence that Rand would have been a closed Objectivist if she were alive for the debates. But, that Ayn Rand would take that position does not imply that it is the correct position. "Ayn Rand said so" isn't an argument. At least the open Objectivism that I present is not a philosophical hodgepodge---it is the properly integrated form of the theory. And I am making no attempts to represent any discoveries I have made as being discoveries made by Ayn Rand, she deserves no credit for the numerous innovations in legal theory I have made. This is precisely because /Objectivism does not mean whatever beliefs in philosophy Ayn Rand held/. /Because/ I hold that Objectivism is a broader abstraction, I am perfectly free to hold both that there are correct Objectivist stances that Ayn Rand did not hold /whilst/ not pinning these positions onto Ayn Rand.

  const roth = createRef<Video>();
  const rothCont = createRef<Rect>();

  view.add(
    <Rect ref={rothCont}>
      <Video play height={1080 * (2 / 3)} ref={roth} src={rothbardVid} />
      <SquigglyBorder
        ref={squiggly}
        stroke={colors.purple500}
        shadowBlur={20}
        shadowColor={colors.purple500}
      >
        <Shape width={1440 * (2 / 3)} height={1080 * (2 / 3)} />
      </SquigglyBorder>
    </Rect>,
  );

  yield* popin(rothCont);
  yield* waitUntil("end");
  yield* popout(rothCont);

  wiggle = false;

  // I give proper credit for the discovery of the correct legal theory /on Objectivist terms/ to Murray Rothbard, and then to myself and other contributors for completing it. /This does not require that Objectivism means whatever beliefs in philosophy Ayn Rand held/.
});
