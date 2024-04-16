import { makeScene2D, Ray, Txt, Rect, RayProps } from "@motion-canvas/2d";
import {
  waitFor,
  createSignal,
  createRef,
  SimpleSignal,
  Reference,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const units = {
    B: 1,
    kB: 10 ** 3,
    MB: 10 ** 6,
    GB: 10 ** 9,
    TB: 10 ** 12,
  };

  const humanise = (quantity: SimpleSignal<number, void>) =>
    createSignal(() => {
      const unitsArr = Object.entries(units);

      for (let i = 0; i < unitsArr.length - 1; ++i) {
        const [unit, factor] = unitsArr[i];
        const nextFactor = unitsArr[i + 1][1];

        if (modelSize() < nextFactor) {
          return `${(quantity() / factor).toFixed(0)} ${unit}`;
        }
      }

      const [fUnit, fFactor] = unitsArr.pop();

      return `${(quantity() / fFactor).toFixed(0)} ${fUnit}`;
    });

  const getPercentage = (p: number, decimals?: number) =>
    `${(p * 100).toFixed(decimals ?? 0)}%`;

  const maxSize = 64 * units.GB;
  const initSize = 32 * units.MB;
  const modelSize = createSignal(initSize);
  const replicationRate = createSignal(() => (1 - modelSize() / maxSize) * 0.2);

  const model = createRef<Ray>();
  const replication = createRef<Ray>();

  const ray: RayProps = {
    lineWidth: 200,
    toY: -700,
    stroke: "green",
  };

  view.add(
    <Rect gap={420} layout>
      <Rect gap={32} alignItems="center" direction="column">
        <Ray {...ray} ref={model} opacity={0.2} />
        <Rect gap={8} alignItems="center" direction="column">
          <Txt text="Training Dataset" fill="white" fontFamily="Mononoki" />
          <Txt
            text={humanise(modelSize)}
            fill={0x606060}
            fontFamily="Mononoki"
          />
        </Rect>
      </Rect>
      <Rect gap={32} alignItems="center" direction="column">
        <Ray {...ray} ref={replication} opacity={0.2} />
        <Rect gap={8} alignItems="center" direction="column">
          <Txt text="Replication Rate" fill="white" fontFamily="Mononoki" />
          <Txt
            text={createSignal(() => getPercentage(replicationRate()))}
            fill={0x606060}
            fontFamily="Mononoki"
          />
        </Rect>
      </Rect>
    </Rect>
  );

  view.add(
    <Txt
      y={500}
      fontFamily="Mononoki"
      fontSize={32}
      fill={0x505050}
      text="*figures not even remotely to scale"
    />
  );

  (
    [
      [model, createSignal(() => modelSize() / maxSize)],
      [replication, replicationRate],
    ] as [Reference<Ray>, SimpleSignal<number, void>][]
  ).forEach(([bar, end]) => {
    view.add(
      <Ray
        {...ray}
        end={end}
        position={bar()
          .absolutePosition()
          .transformAsPoint(view.worldToLocal())}
      />
    );
  });

  yield* modelSize(maxSize * 0.9, 4);
  yield* modelSize(maxSize * 0.2, 3);
  yield* modelSize(maxSize * 0.7, 3);
  yield* modelSize(maxSize * 0.01, 5);
  yield* modelSize(maxSize * 0.8, 2);
  yield* modelSize(initSize, 3);
});
