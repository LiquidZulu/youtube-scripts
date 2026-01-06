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
import { McasTxt as Txt, popin, popout, fadein, fadeout, after } from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const [metaphysics, epistemology, ethics] = [
    colors.red500,
    colors.amber500,
    colors.lime500,
  ];

  const branches = createRefArray<Txt>();
  const elaborations = createRefArray<Txt>();

  const title = createRef<Txt>();

  view.add(
    <Txt
      ref={title}
      position={[0, -600]}
      fontFamily="oswald"
      glow
      fill="red"
      fontSize={200}
    />,
  );

  view.add(
    <Rect position={[0, 200]} layout direction="column" gap={64}>
      <Txt fontSize={200} fontFamily="ProggyClean CE Nerd Font">
        <Txt
          fontWeight={999}
          writeOn={0}
          ref={branches}
          glow
          fill={metaphysics}
        >
          Metaphysics
        </Txt>
        <Txt writeOn={0} ref={elaborations} glow>
          ---what is there?
        </Txt>
      </Txt>
      <Txt fontSize={200} fontFamily="ProggyClean CE Nerd Font">
        <Txt
          fontWeight={999}
          writeOn={0}
          ref={branches}
          glow
          fill={epistemology}
        >
          Epistemology
        </Txt>
        <Txt writeOn={0} ref={elaborations} glow>
          ---how do I know?
        </Txt>
      </Txt>
      <Txt fontSize={200} fontFamily="ProggyClean CE Nerd Font">
        <Txt fontWeight={999} writeOn={0} ref={branches} glow fill={ethics}>
          Ethics
        </Txt>
        <Txt writeOn={0} ref={elaborations} glow>
          ---what should I do about it?
        </Txt>
      </Txt>
    </Rect>,
  );

  yield* title().text("bundled philosophy".toUpperCase(), 1);

  yield* after("m branch", branches[0].writeOn(1, 0.5));
  yield* after("m elaboration", elaborations[0].writeOn(1, 0.5));

  yield* after("e branch", branches[1].writeOn(1, 0.5));
  yield* after("e elaboration", elaborations[1].writeOn(1, 0.5));

  yield* after("eth branch", branches[2].writeOn(1, 0.5));
  yield* after("eth elaboration", elaborations[2].writeOn(1, 0.5));

  yield* waitUntil("end");
});
