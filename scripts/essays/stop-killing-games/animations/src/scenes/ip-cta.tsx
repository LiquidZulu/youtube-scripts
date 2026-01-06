import { makeScene2D, Rect, Ray, Img, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  easeOutSine,
  delay,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  sceneVar,
  SuggestedVideo,
} from "mcas";
import * as colors from "mcas/colors";
import thumb from "../assets/ip-thumb.jpg";
import guide from "../assets/information-guide.png";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const skgblue = sceneVar("skgblue");

  const vid = createRef<SuggestedVideo>();

  view.add(
    <Rect width={408} scale={3} layout>
      <SuggestedVideo
        ref={vid}
        thumbnail={thumb}
        title="Why Artists Shouldn't Own Their Art"
        channelName="LiquidZulu"
        views={33000}
        age="2 years ago"
      />
    </Rect>,
  );

  yield* popin(vid);

  yield* waitUntil("information");

  const indicate = createRef<Circle>();
  view.add(
    <Circle
      ref={indicate}
      size={30}
      fill={skgblue}
      position={[915, -504]}
      opacity={0}
    />,
  );

  const a = createRef<Ray>();
  view.add(
    <Ray
      ref={a}
      lineWidth={18}
      stroke="white"
      from={[589, -275]}
      to={[860, -468]}
      endArrow
    />,
  );

  yield* all(
    delay(
      0.4,
      all(
        indicate().scale(3, 0.8, easeOutSine),
        indicate().opacity(0.5, 0).to(0, 0.5),
      ),
    ),
    chain(a().end(0).end(1, 0.6), a().start(1, 0.6)),
  );

  yield* waitFor(3);
});
