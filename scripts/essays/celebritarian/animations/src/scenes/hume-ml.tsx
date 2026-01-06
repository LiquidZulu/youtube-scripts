import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  interleaver,
  after,
} from "mcas";
import * as colors from "mcas/colors";
import humeImg from "../assets/hume.jpg";
import kantImg from "../assets/kant.jpg";
import hegelImg from "../assets/hegel.png";
import marxImg from "../assets/marx.png";

export default makeScene2D(function* (view) {
  view.fill(0);

  const conts = createRefArray<Rect>();
  const portraits = createRefArray<Img>();
  const rays = createRefArray<Ray>();

  function* pIn(index: number) {
    let animations = [];

    animations.push(conts[index].end(1, 1));
    animations.push(portraits[index].opacity(1, 1));

    if (index > 0) {
      animations.push(rays[index - 1].end(1, 1));
    }

    yield* all(...animations);
  }

  view.add(
    <Rect layout gap={64} alignItems="center">
      {...[humeImg, kantImg, hegelImg, marxImg]
        .map((x) => (
          <Rect
            shadowBlur={50}
            shadowColor="red"
            end={0}
            ref={conts}
            lineWidth={50}
            stroke="red"
            clip
            width={600}
            height={900}
            justifyContent="center"
          >
            <Img opacity={0} height="100%" ref={portraits} src={x} />
          </Rect>
        ))
        .reduce(
          interleaver((_) => (
            <Ray
              shadowBlur={50}
              shadowColor="red"
              end={0}
              ref={rays}
              lineWidth={25}
              arrowSize={30}
              endArrow
              toX={170}
              stroke="red"
            />
          )),
          [],
        )}
    </Rect>,
  );

  yield* all(
    pIn(0),
    after("kant", pIn(1)),
    after("hegel", pIn(2)),
    after("marx", pIn(3)),
  );

  yield* all(rays[2].opacity(0.2, 1), conts[3].opacity(0.2, 1));

  yield* waitUntil("end");
});
