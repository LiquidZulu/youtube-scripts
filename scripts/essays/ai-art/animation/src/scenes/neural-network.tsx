import { makeScene2D, Circle, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createSignal,
  Reference,
  SimpleSignal,
  SignalValue,
  Color,
} from "@motion-canvas/core";
import { Length, PossibleCanvasStyle } from "@motion-canvas/2d/lib/partials";
import seedrandom from "seedrandom";
import { default as dognoiseDog } from "../assets/dognoise-dog.png";
import { default as dognoiseNoise } from "../assets/dognoise-noise.png";

const themes = {
  hackerman: {
    ray: [new Color(0x354020), new Color(0x00ff00)],

    bg: new Color(0x202228),
    node: {
      outline: new Color(0xffffff),
      fill: new Color(0x202228),
    },
  },
  redgreen: {
    ray: [new Color(0xff6470), new Color(0x4ec9b0)],
    bg: new Color(0x202228),
    node: {
      outline: new Color(0xffffff),
      fill: new Color(0x202228),
    },
  },
  darkarts: {
    ray: [new Color(0x006156), new Color(0x004d44)],
    bg: new Color(0x202228),
    node: {
      outline: new Color(0x903027),
      fill: new Color(0x202228),
    },
  },
};

const colours = themes.redgreen;

const nn_node = (props: {
  ref: Reference<Circle>;
  x?: SignalValue<number>;
  y?: SignalValue<number>;
  width?: SignalValue<Length>;
  height?: SignalValue<Length>;
  stroke?: SignalValue<PossibleCanvasStyle>;
  lineWidth?: SignalValue<number>;
  fill?: SignalValue<PossibleCanvasStyle>;
}) => (
  <Circle
    ref={props.ref}
    x={props.x ?? 0}
    y={props.y ?? 0}
    width={props.width ?? 50}
    height={props.height ?? 50}
    stroke={props.stroke ?? colours.node.outline}
    lineWidth={props.lineWidth ?? 5}
    fill={props.fill ?? colours.node.fill}
  />
);

export default makeScene2D(function* (view) {
  view.fill(colours.bg);

  const layers = [1, 6, 7, 7, 6, 1];
  let nodeRefs: Reference<Circle>[][] = [];
  let rayRefs: Reference<Ray>[][] = [];
  for (let layer of layers) {
    nodeRefs.push(new Array(layer).fill(createRef<Circle>()));
    rayRefs.push(new Array(layer).fill(createRef<Ray>()));
  }

  type TWeights = SimpleSignal<number>[][][];

  let weightsSeed = createSignal(Math.random());
  let weights: SimpleSignal<number>[][][] = [];
  let goalWeights: SimpleSignal<number>[][][] = [];
  const nn_delta = createSignal(1);

  const nn_distance = (current: TWeights, goal: TWeights): number => {
    let distances = [];
    for (let i = 0; i < current.length; ++i) {
      for (let j = 0; j < current[i].length; ++j) {
        for (let k = 0; k < current[i][j].length; ++k) {
          distances.push(Math.abs(current[i][j][k]() - goal[i][j][k]()));
        }
      }
    }
    return distances.reduce(
      (avg, value, _, { length }) => avg + value / length,
      0
    );
  };

  for (let i = 0; i < layers.length - 1; ++i) {
    weights.push([]);
    goalWeights.push([]);
    for (let j = 0; j < layers[i]; ++j) {
      weights[i].push([]);
      goalWeights[i].push([]);
      for (let k = 0; k < layers[i + 1]; ++k) {
        goalWeights[i][j].push(createSignal(Math.random()));
        weights[i][j].push(
          createSignal(() => {
            const deltaClamp = nn_delta();
            const delta =
              seedrandom(`${i}${j}${k}${weightsSeed()}`)() / deltaClamp;

            // keep it within range
            if (goalWeights[i][j][k]() + delta > 1)
              return goalWeights[i][j][k]() - delta;
            if (goalWeights[i][j][k]() - delta < 0)
              return goalWeights[i][j][k]() + delta;
            return delta * deltaClamp > 1 / 2
              ? goalWeights[i][j][k]() - delta
              : goalWeights[i][j][k]() + delta;
          })
        );
      }
    }
  }

  const offsets = [200, 100];

  for (let i = 0; i < layers.length; ++i) {
    for (let j = 0; j < layers[i]; ++j) {
      view.add(
        nn_node({
          ref: nodeRefs[i][j],
          x: (i - layers.length / 2 + 1 / 2) * offsets[0],
          y: (j - layers[i] / 2 + 1 / 2) * offsets[1],
        })
      );
    }
  }

  for (let i = 0; i < layers.length - 1; ++i) {
    for (let j = 0; j < layers[i]; ++j) {
      for (let k = 0; k < layers[i + 1]; ++k) {
        const origin = [
          (i - layers.length / 2 + 1 / 2) * offsets[0],
          (j - layers[i] / 2 + 1 / 2) * offsets[1],
        ];

        const destination = [
          origin[0] + offsets[0],
          (k - layers[i + 1] / 2 + 1 / 2) * offsets[1],
        ];
        view.add(
          <Ray
            zIndex={-1}
            ref={rayRefs[i][j]}
            lineWidth={3}
            stroke={createSignal(() =>
              colours.ray[0].lerp(colours.ray[1], weights[i][j][k]())
            )}
            fromX={origin[0]}
            fromY={origin[1]}
            toX={destination[0]}
            toY={destination[1]}
          />
        );
      }
    }
  }

  const imgRef = {
    input: createRef<Img>(),
    output: createRef<Img>(),
    inputnoise: createRef<Img>(),
    outputnoise: createRef<Img>(),
  };
  view.add(
    <>
      <Img
        ref={imgRef.input}
        src={dognoiseDog}
        width={400}
        x={(-layers.length / 2) * offsets[0]}
      />
      <Img
        ref={imgRef.output}
        src={dognoiseDog}
        width={400}
        x={(+layers.length / 2) * offsets[0]}
      />
      <Img
        ref={imgRef.inputnoise}
        src={dognoiseNoise}
        width={400}
        x={(-layers.length / 2) * offsets[0]}
        opacity={0.7}
      />
      <Img
        ref={imgRef.outputnoise}
        src={dognoiseNoise}
        width={400}
        x={(+layers.length / 2) * offsets[0]}
        opacity={createSignal(() => nn_distance(weights, goalWeights) * 2)}
      />
    </>
  );

  yield* all(weightsSeed(4, 10), nn_delta(4, 10));
});
