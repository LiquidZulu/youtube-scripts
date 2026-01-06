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
  ArrowList,
  after,
  flash,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const title = createRef<Txt>();
  const cont = createRef<Rect>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={170} ref={cont}>
      <Txt ref={title} glow fontFamily="oswald" fill="red" fontSize={200} />
      <ArrowList
        in={(text: Txt, ray: Ray) => {
          text.opacity(1);
          text.children()[0].fontFamily("ProggyClean CE Nerd Font");

          return all(ray.end(1, 1), text.children()[0].writeOn(1, 1));
        }}
        ref={list}
        fontSize={130}
        fontFamily="ProggyClean CE Nerd Font"
        shadowColor="#E4E0DA"
        shadowBlur={64}
        width={3550}
        hGap={128}
      >
        <Txt fill="#E4E0DA" writeOn={0}>
          The correct standard <Txt.i>isn't</Txt.i> what "works best" for the
          LP.
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0}>
          We must be first and foremost adherents of the{" "}
          <Txt.i>philosophy</Txt.i> of libertarianism---stick to the NAP as a
          moral absolute. Be principled and courageous.
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0}>
          The fundamental strategic question is which approach is capable of
          convincing people <Txt.i>of libertarianism</Txt.i>.
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0}>
          Pragmatism cannot convert people <Txt.i>to libertarianism</Txt.i>{" "}
          because it is the opposite of principles.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  const principledAndCourageous = createRef<Rect>();

  view.add(
    <Rect
      ref={principledAndCourageous}
      width={1680}
      height={150}
      position={[305, 45]}
    />,
  );

  yield* all(
    title().text("smith contra pragmatism".toUpperCase(), 1),
    list().next(),
  );

  yield* waitUntil("philosophy of libertarianism");
  cont().position([0, -24]);
  yield* list().next();

  yield* after(
    "principled and courageous",
    flash(principledAndCourageous, "red"),
  );

  yield* waitUntil("fundamental strategic question");
  cont().position([0, -40]);
  yield* list().next();

  yield* waitUntil("pragmatism opposite of principles");
  cont().position([0, -56]);
  yield* list().next();

  yield* waitUntil("end");
});
