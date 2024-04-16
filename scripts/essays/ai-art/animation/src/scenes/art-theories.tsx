import { makeScene2D, Txt, Rect, Ray, Layout } from "@motion-canvas/2d";
import {
  waitFor,
  chain,
  createRef,
  createSignal,
  createRefArray,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const [ref_p1, ref_MSp2, ref_Op2, ref_Mc, ref_Sc] = new Array(5).map((x) =>
    createRef<Txt>()
  );

  const [ref_p1_MSp2, ref_MSp2_Mc, ref_MSp2_Sc, ref_p1_Op2] = new Array(4).map(
    (x) => createRef<Ray>()
  );

  const ref_layer = new Array(5).map((x) => createRef<Rect>());

  view.fill(0x202228);

  const stage = createSignal(0);
  const colours = {
    M: 0x8e8dbe,
    S: 0xa9e4ef,
    O: 0x81f495,
  };

  view.add(
    <Layout
      direction="column"
      position={[-(1920 / 2) + 100, -(1080 / 2) + 80]}
      layout
    >
      <Txt
        opacity={createSignal(() => stager(stage(), 2, 0, 1))}
        fill={colours.M}
        fontSize={30}
      >
        Materialism
      </Txt>
      <Txt
        opacity={createSignal(() => stager(stage(), 4, 0, 1))}
        fill={colours.S}
        fontSize={30}
      >
        Spiritualism
      </Txt>
      <Txt
        opacity={createSignal(() => stager(stage(), 5, 0, 1))}
        fill={colours.O}
        fontSize={30}
      >
        Objectivism
      </Txt>
    </Layout>
  );

  const stager = (
    currentStage: number,
    triggerStage: number,
    initial: number,
    final: number
  ) => {
    const threshold = 1;

    if (final == initial) return final;

    if (currentStage < triggerStage - threshold) return initial;

    if (currentStage >= triggerStage) return final;

    const amountTween = currentStage - (triggerStage - threshold);
    const distanceTween = amountTween * Math.abs(final - initial);
    return final > initial ? distanceTween : initial - distanceTween;
  };

  view.add(
    <Rect gap={50} direction="column" alignItems="center" layout>
      <Rect ref={ref_layer[0]} layout>
        <Txt
          marginTop={createSignal(() => stager(stage(), 2, 440, 0))}
          ref={ref_p1}
          fontFamily="Mononoki"
          fontSize={40}
          opacity={createSignal(() => stager(stage(), 1, 0, 1))}
          fill={0xffffff}
        >
          (p1) Art is an end in itself.
        </Txt>
      </Rect>
      <Rect gap={100} ref={ref_layer[1]} layout>
        <Ray
          marginLeft={createSignal(() => stager(stage(), 5, 90, 0))}
          opacity={createSignal(() => stager(stage(), 2, 0, 1))}
          ref={ref_p1_MSp2}
          lineWidth={8}
          endArrow
          stroke={"white"}
          toX={createSignal(() => stager(stage(), 5, 0, -100))}
          toY={createSignal(() => stager(stage(), 2, 0, 200))}
        />
        <Ray
          opacity={createSignal(() => stager(stage(), 5, 0, 1))}
          ref={ref_p1_Op2}
          lineWidth={8}
          endArrow
          stroke={"white"}
          toX={createSignal(() => stager(stage(), 5, 0, 100))}
          toY={createSignal(() => stager(stage(), 5, 0, 200))}
        />
      </Rect>
      <Rect gap={100} ref={ref_layer[2]} layout>
        <Layout
          marginLeft={createSignal(() => stager(stage(), 5, 725, 0))}
          opacity={createSignal(() => stager(stage(), 2, 0, 1))}
        >
          <Txt
            textAlign="center"
            ref={ref_MSp2}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={"("}
          />
          <Txt
            textAlign="center"
            ref={ref_MSp2}
            fontFamily="Mononoki"
            fontSize={40}
            fill={colours.M}
            text={"M"}
          />
          <Txt
            maxWidth={createSignal(() => stager(stage(), 4, 0, 22.5))}
            opacity={createSignal(() => stager(stage(), 4, 0, 1))}
            textAlign="center"
            ref={ref_MSp2}
            fontFamily="Mononoki"
            fontSize={40}
            fill={colours.S}
            text={"S"}
          />
          <Txt
            textAlign="center"
            ref={ref_MSp2}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={"p2) Art is disconnected to\nman's happiness on Earth."}
          />
        </Layout>
        <Layout opacity={createSignal(() => stager(stage(), 5, 0, 1))}>
          <Txt
            textAlign="center"
            ref={ref_Op2}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={"("}
          />
          <Txt
            textAlign="center"
            ref={ref_Op2}
            fontFamily="Mononoki"
            fontSize={40}
            fill={colours.O}
            text={"O"}
          />
          <Txt
            textAlign="center"
            ref={ref_Op2}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={
              "p2) Art has a real, practical\npurpose for man and\nhis life on Earth."
            }
          />
        </Layout>
      </Rect>
      <Rect
        marginLeft={createSignal(() => {
          const currentStage = stage();

          if (currentStage <= 3) return 190;
          if (currentStage <= 4) {
            return (currentStage - 3) * (750 - 190) + 190;
          }

          return stager(currentStage, 5, 750, 190);
        })}
        gap={100}
        ref={ref_layer[3]}
        layout
      >
        <Ray
          ref={ref_MSp2_Mc}
          lineWidth={8}
          endArrow
          stroke={"white"}
          opacity={createSignal(() => stager(stage(), 3, 0, 1))}
          toX={createSignal(() =>
            stager(stage(), 3, 0, stager(stage(), 4, 0, -100))
          )}
          toY={createSignal(() => stager(stage(), 3, 0, 200))}
        />
        <Ray
          ref={ref_MSp2_Sc}
          lineWidth={8}
          endArrow
          stroke={"white"}
          opacity={createSignal(() => stager(stage(), 4, 0, 1))}
          toX={createSignal(() => stager(stage(), 4, 0, 100))}
          toY={createSignal(() => stager(stage(), 4, 0, 200))}
        />
        <Rect marginLeft={createSignal(() => stager(stage(), 4, 0, 650))} />
      </Rect>
      <Rect gap={100} ref={ref_layer[4]} layout>
        <Layout
          marginLeft={createSignal(() => stager(stage(), 5, 730, 0))}
          opacity={createSignal(() => stager(stage(), 3, 0, 1))}
        >
          <Txt
            textAlign="center"
            ref={ref_Mc}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={"("}
          />
          <Txt
            textAlign="center"
            ref={ref_Mc}
            fontFamily="Mononoki"
            fontSize={40}
            fill={colours.M}
            text={"M"}
          />
          <Txt
            textAlign="center"
            ref={ref_Mc}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={"c) Art is pointless."}
          />
        </Layout>
        <Layout opacity={createSignal(() => stager(stage(), 4, 0, 1))}>
          <Txt
            textAlign="center"
            ref={ref_Sc}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={"("}
          />
          <Txt
            textAlign="center"
            ref={ref_Sc}
            fontFamily="Mononoki"
            fontSize={40}
            fill={colours.S}
            text={"S"}
          />
          <Txt
            textAlign="center"
            ref={ref_Sc}
            fontFamily="Mononoki"
            fontSize={40}
            fill={0xffffff}
            text={"c) Art is for a spiritual\nsuper-reality."}
          />
        </Layout>

        <Rect marginLeft={createSignal(() => stager(stage(), 4, 0, 500))} />
      </Rect>
    </Rect>
  );

  const waitTime = 15;

  yield* chain(
    stage(1, 1),
    waitFor(waitTime),
    stage(2, 1),
    waitFor(waitTime),
    stage(3, 1),
    waitFor(waitTime),
    stage(4, 1),
    waitFor(waitTime),
    stage(5, 1),
    waitFor(waitTime),
    stage(1, 2),
    stage(0, 1)
  );
});
