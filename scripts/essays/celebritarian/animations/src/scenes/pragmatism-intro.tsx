import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  ArrowList,
  after,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  /* view.add(
   *   <Rect layout direction="column" gap={32}>
   *     <Txt fontFamily="NovaMono for Powerline" fill="white" fontSize={80}>
   *       <Txt.b>NovaMono for Powerline</Txt.b>: The quick brown fox jumped over
   *       the lazy dog.
   *     </Txt>
   *     <Txt fontFamily="ProFont IIx Nerd Font" fill="white" fontSize={80}>
   *       <Txt.b>ProFont IIx Nerd Font</Txt.b>: The quick brown fox jumped over
   *       the lazy dog.
   *     </Txt>
   *     <Txt fontFamily="ProggyClean CE Nerd Font" fill="white" fontSize={80}>
   *       <Txt.b>ProggyClean CE Nerd Font</Txt.b>: The quick brown fox jumped over
   *       the lazy dog.
   *     </Txt>
   *     <Txt fontFamily="Recoleta" fill="white" fontSize={80}>
   *       <Txt.b>Recoleta</Txt.b>: The quick brown fox jumped over the lazy dog.
   *     </Txt>
   *     <Txt fontFamily="Terminess Nerd Font" fill="white" fontSize={80}>
   *       <Txt.b>Terminess Nerd Font</Txt.b>: The quick brown fox jumped over the
   *       lazy dog.
   *     </Txt>
   *   </Rect>,
   * ); */

  const title = createRef<Txt>();
  const titlecont = createRef<Rect>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={170}>
      <Rect ref={titlecont}>
        <Txt ref={title} glow fontFamily="oswald" fill="red" fontSize={200} />
      </Rect>
      <ArrowList
        in={(text: Txt, ray: Ray) => {
          const currentText = text.text();

          text.text("");
          text.opacity(1);

          return all(ray.end(1, 1), text.text(currentText, 1));
        }}
        ref={list}
        fontSize={130}
        fontFamily="ProggyClean CE Nerd Font"
        shadowColor="#E4E0DA"
        shadowBlur={64}
      >
        <Txt fill="#E4E0DA" textWrap={false}>
          Reject "theoretical" arguments and general principles.
        </Txt>
        <Txt fill="#E4E0DA" textWrap={false}>
          We must be "practical" and address the problem of the day.
        </Txt>
        <Txt fill="#E4E0DA" textWrap={false}>
          The proper attitude: try and see in each and every case.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* list().next("theory");
  yield* list().next("be practical");
  yield* list().next("proper attitude");
  yield* after(
    "title",
    all(
      titlecont().height(192, 1),
      title().text("pragmatism".toUpperCase(), 1),
    ),
  );

  yield* waitFor(3);
  yield* sequence(0.1, title().text("", 1), list().hideAll());
});
