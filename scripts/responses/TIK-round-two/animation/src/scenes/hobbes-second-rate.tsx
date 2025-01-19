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
import { McasTxt as Txt, popin, popout, fadein, fadeout, a } from "mcas";
import * as colors from "mcas/colors";
import hobbesImg from "../assets/hobbes.jpg";
import platoImg from "../assets/plato.jpg";
import { flashAround } from "mcas/lib";

// He constructed his philosophy using the methods found in geometry. That is: he would start with basic axioms, which are then used to produce lemmas, and draw further implications, until you have an entire system. The axioms he chose were the basic premises of modern science. He was second-rate in this sense---unlike better philosophers, he merely accepted the principles that were proliferated by others without questioning them.

// The Platonists would tell him that the mind is supernatural, he would accept this on its face, and by that token reject the faculty of consciousness.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const hobbes = createRef<Img>();

  view.add(
    <Img
      ref={hobbes}
      width={600}
      position={[0, 80]}
      src={hobbesImg}
      shadowColor="#000000aa"
      shadowBlur={100}
      shadowOffsetY={50}
    />,
  );

  yield* hobbes().position([-500, 0], 1);

  const axioms = createRefArray<Txt>();
  const nums = createRefArray<Txt>();
  const implication = createRef<Txt>();
  const ray = createRef<Ray>();
  const cont = createRef<Rect>();
  const axiomsCont = createRef<Rect>();

  view.add(
    <Rect
      ref={cont}
      layout
      direction="column"
      position={[400, 200]}
      alignItems="center"
      gap={64}
    >
      <Rect ref={axiomsCont} direction="column" gap={32}>
        {[
          "Et id dolorum non dolor nemo animi vero velit.",
          "Illum maxime labore consequatur tempora.",
          "Ipsum quidem minus nihil quibusdam.",
        ].map((lipsum, i) => (
          <Rect gap={12}>
            <Txt
              fontSize={32}
              fill={colors.zinc600}
              text={`${i + 1}.`}
              fontFamily="mononoki"
              opacity={0}
              ref={nums}
            />
            <Txt ref={axioms} fontSize={32} fill="white" text={lipsum} />
          </Rect>
        ))}
      </Rect>
      <Ray
        ref={ray}
        end={0}
        lineWidth={16}
        endArrow
        stroke="white"
        to={[0, 200]}
      />
      <Txt ref={implication} fill="white" fontSize={32}>
        ∴ In quae deserunt dolore neque atque. Nam sunt{"\n"}repudiandae et
        quasi. Excepturi deleniti rerum et{"\n"}numquam porro.
      </Txt>
    </Rect>,
  );

  let implicationInitial = implication().text();
  let axiomsInitial = axioms.map((axiom) => axiom.text());

  implication().text("\n\n");
  for (let axiom of axioms) {
    axiom.text("");
  }

  yield* waitUntil("axioms");

  yield* all(
    ...axioms.map((axiom, i) =>
      delay(
        0.2 * i,
        all(
          axiom.text(axiomsInitial[i], 1),
          fadein(() => nums[i]),
        ),
      ),
    ),
  );

  yield* waitUntil("lemmas");

  yield* all(
    cont().position([400, 0], 1),
    ray().end(1, 1),
    delay(0.4, implication().text(implicationInitial, 1)),
  );

  yield* waitUntil("indicate axioms");

  yield* flashAround(axiomsCont);

  yield* waitUntil("platonists");

  const plato = createRef<Img>();

  view.add(
    <Img
      height={732}
      ref={plato}
      src={platoImg}
      position={[380, -1080]}
      shadowColor="#000000aa"
      shadowBlur={100}
      shadowOffsetY={50}
    />,
  );

  yield* all(cont().position([400, 1080], 1), plato().position([380, 0], 1));

  yield* waitUntil("out");

  yield* all(hobbes().position([-1300, 0], 1), plato().position([1300, 0], 1));
});
