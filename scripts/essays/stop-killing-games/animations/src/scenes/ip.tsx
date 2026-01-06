import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  easeInOutBack,
  easeOutBack,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  after,
  ArrowList,
  flash,
  sceneVar,
} from "mcas";
import * as colors from "mcas/colors";
import vid from "../assets/kinsella.mp4";
import coverImg from "../assets/aip.jpg";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const skgblue = sceneVar("skgblue");

  const v = createRef<Video>();

  view.add(<Video src={vid} ref={v} play />);

  yield* waitUntil("against IP");

  const c = createRef<Img>();

  view.add(
    <Img
      ref={c}
      src={coverImg}
      height={800}
      shadowColor="black"
      shadowBlur={40}
      shadowOffsetY={18}
    />,
  );

  yield* all(v().filters.blur(40, 1), popin(c));

  // The very concept of "property" comes about due to scarcity, that is if you are there using a stick to spearfish, I can't use that same stick to stoke my fire at the same time. Your action excludes my action and vice versa. It is from this fact that we need property rights to decide who should be allowed to use the stick. To say that you own the stick means that you should be allowed to keep spearfishing and I should not stop you.

  yield* after("details", v().opacity(0, 1), c().position([-600, 0], 1));

  const l = createRef<ArrowList>();

  view.add(
    <ArrowList ref={l} position={[320, 0]}>
      <Txt maxWidth={1100} textWrap>
        "Property" comes about due to scarcity: if you are using a stick, I
        can't use that same stick at the same time.
      </Txt>
      <Txt maxWidth={1100} textWrap>
        One action excludes the other.
      </Txt>
      <Txt maxWidth={1100} textWrap>
        Property rights determine who should be allowed to use the stick.
      </Txt>
      <Txt maxWidth={1100} textWrap>
        You own the stick \longrightarrow you should be allowed to use it.
      </Txt>
    </ArrowList>,
  );

  yield* l().next("property from scarcity");
  yield* l().next("action excludes");
  yield* l().next("determines who is allowed");
  yield* l().next("own the stick implies");

  yield* after(
    "none of this",
    flash(() => l().children()[0], skgblue),
  );

  yield* waitUntil("end");
});
