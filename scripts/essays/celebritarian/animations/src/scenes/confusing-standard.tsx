import { makeScene2D, Rect, Ray, Img, Camera } from "@motion-canvas/2d";
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
  ArrowList,
  fixCamera,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const list = createRef<ArrowList>();
  const camera = createRef<Camera>();

  view.add(
    <Camera ref={camera} position={[0, -300]}>
      <Rect layout direction="column" gap={128} alignItems="center">
        <Txt uppercase glow fill="red" fontFamily="oswald" fontSize={200}>
          dave's confusing standard
        </Txt>
        <ArrowList
          in={(text: Txt, ray: Ray) => {
            text.opacity(1);
            text.children()[0].fontFamily("ProggyClean CE Nerd Font");

            return all(ray.end(1, 1), text.children()[0].writeOn(1, 1));
          }}
          ref={list}
          fontSize={130}
          fontFamily="ProggyClean CE Nerd Font"
          width={2800}
          hGap={128}
          shadowBlur={80}
          shadowColor="white"
        >
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            Dave: taxpayers don't <Txt.i>own</Txt.i> government property as a
            group.
          </Txt>
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            But then what is it that is still owned by individual taxpayers if
            not the <Txt.i>money</Txt.i> that was taken from them?
          </Txt>
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            No chain of title-transfer to yield anything else.
          </Txt>
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            Dave: given you can't perfectly divvy up everything that has been
            stolen, open borders should not be done because 95%+ of American
            people don't want it.
          </Txt>
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            Is that a valid standard anywhere else?
          </Txt>
        </ArrowList>
      </Rect>
    </Camera>,
  );
  fixCamera(view, camera);

  yield* list().next();
  yield* list().next("what is still owned?");
  yield* list().next("no chain of title-transfer");
  yield* list().next(
    "cant be divvied up",
    undefined,
    camera().position([0, 300], 1),
  );
  yield* list().next("is that valid elsewhere?");
  yield* waitUntil("end");
});
