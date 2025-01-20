import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Circle,
  Video,
  Shape,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  linear,
  useDuration,
  sequence,
  spawn,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import gee from "../assets/gee.jpg";
import binswanger from "../assets/harry binswanger.jpg";
import {
  after,
  ArrowList,
  flashAround,
  sinFactory,
  SquigglyBorder,
} from "mcas/lib";
import editing from "../assets/editing.mp4";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const title = createRef<Txt>();
  view.add(
    <Txt
      fontSize={80}
      glow
      fontFamily="Oswald"
      fill={colors.purple500}
      ref={title}
    />,
  );

  yield* title().text("VIRTUE vs CRIME", 1);
  yield* waitUntil("indebted");
  yield* title().position([0, -400], 1);

  const avis = createRefArray<Circle>();
  const sin = sinFactory(20, -20, 0.2);
  const sinProgress = createSignal(0);

  view.add(
    <Rect position={[0, 50]}>
      {...[gee, binswanger].map((x, i) => (
        <Circle
          scale={0}
          position={() => [[-350, 350][i], sin(i / 2)(sinProgress())]}
          ref={avis}
          width={400}
          ratio={1}
          clip
          lineWidth={32}
          stroke="white"
          shadowBlur={50}
          shadowColor="black"
          shadowOffsetY={25}
        >
          <Img src={x} width={400} layout={false} />
        </Circle>
      ))}
    </Rect>,
  );

  yield* all(
    sinProgress(10, useDuration("sin wave"), linear),
    after(
      "gee",
      popin(() => avis[0]),
    ),
    after(
      "binswanger",
      popin(() => avis[1]),
    ),
    after(
      "latter",
      flashAround(
        () => avis[1],
        2,
        0.6,
        {
          modHeight: () => 16,
          modWidth: () => 16,
        },
        {
          lineWidth: avis[1].lineWidth() / 2,
          stroke: colors.purple500,
          shadowBlur: 50,
          shadowColor: colors.purple500,
          radius: 9999,
        },
      ),
    ),
    after(
      "people out",
      sequence(0.2, ...avis.map((avi) => fadeout(() => avi))),
    ),
  );

  // There is a certain subtle poison to address here that I have encountered more heavily since the initial writing of this script. I should note that I am indebted in my analysis here to Gee from Proheretics and Harry Binswanger---though the latter would almost certainly denounce this entire video.

  const squig = createRef<SquigglyBorder>();
  const vid = createRef<Rect>();
  let wiggle = true;

  view.add(
    <Rect ref={vid} position={[0, 80]}>
      <Video play src={editing} width={1600} />
      <SquigglyBorder
        ref={squig}
        stroke={colors.purple500}
        shadowBlur={50}
        shadowColor={colors.purple500}
      >
        <Shape width={1600} height={675} />
      </SquigglyBorder>
    </Rect>,
  );

  yield spawn(function* () {
    while (wiggle) {
      yield* squig().wiggle();
    }
  });

  yield* popin(vid);
  yield* waitUntil("claim");
  yield* popout(vid);

  wiggle = false;

  const claim = createRef<Txt>();

  view.add(
    <Txt
      ref={claim}
      width={1600}
      fontSize={60}
      textWrap
      fontFamily="oswald"
      glow
      fill={colors.purple500}
      textAlign="center"
    />,
  );

  yield* claim().text(
    `The non-aggression principle no longer applies in "emergency circumstances," or those that are "metaphysically abnormal."`,
    1,
  );

  yield* waitFor(10);

  // I am writing this section and including it after I have already began editing because I believe it has to be included. Namely, the claim that the non-aggression principle no longer applies in so-called "emergency circumstances," or those that are "metaphysically abnormal;" concretised as "the lifeboat scenario."
});
