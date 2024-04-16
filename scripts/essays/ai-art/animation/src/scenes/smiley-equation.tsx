import {
  makeScene2D,
  Circle,
  Txt,
  Rect,
  Spline,
  Knot,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  PossibleVector2,
} from "@motion-canvas/core";
import seedrandom from "seedrandom";

const seeded = [
  seedrandom("blahblahblah"),
  seedrandom("anothah one"),
  seedrandom("and again"),
];

export default makeScene2D(function* (view) {
  view.fill(0x202228);
  let params = [
    createSignal<number>(seeded[0]()),
    createSignal<number>(seeded[1]()),
    createSignal<number>(seeded[2]()),
  ];
  let initParams = [params[0](), params[1](), params[2]()];
  let trueParams = [Math.random(), Math.random(), Math.random()];

  view.add(
    <Rect layout>
      <Rect alignItems="center" layout>
        <Txt fontSize={100} fill={0xffffff} text="f(" marginRight={20} />
        <Txt
          fontSize={100}
          fill={0xff0000}
          text={createSignal(() => `${Math.abs(params[0]()).toFixed(2)}`)}
        />
        <Txt fontSize={100} fill={0xffffff} text=", " marginRight={20} />
        <Txt
          fontSize={100}
          fill={0x00ff00}
          text={createSignal(() => `${Math.abs(params[1]()).toFixed(2)}`)}
        />
        <Txt fontSize={100} fill={0xffffff} text=", " marginRight={20} />
        <Txt
          fontSize={100}
          fill={0x0000ff}
          text={createSignal(() => `${Math.abs(params[2]()).toFixed(2)}`)}
          marginRight={20}
        />
        <Txt fontSize={100} fill={0xffffff} text=") = " />
      </Rect>
      <Rect layout>
        <Circle
          layout
          margin={50}
          width={200}
          height={createSignal(() => 200 + (trueParams[1] - params[1]()) * 20)}
          stroke={"black"}
          lineWidth={10}
          fill={"yellow"}
        >
          <Rect marginLeft={55} marginTop={50}>
            <Circle
              fill="black"
              width={createSignal(
                () => 20 + (trueParams[0] - params[0]()) * 15
              )}
              height={createSignal(
                () => 30 + (trueParams[2] - params[2]()) * 30
              )}
              marginRight={createSignal(
                () => 50 + (trueParams[1] - params[1]()) * 24
              )}
            />
            <Circle fill="black" width={20} height={30} />
          </Rect>
          <Rect
            marginTop={createSignal(
              () => 120 + (trueParams[1] - params[1]()) * 27
            )}
            marginLeft={createSignal(
              () => -115 + (trueParams[2] - params[2]()) * 70
            )}
            layout
          >
            <Spline lineWidth={10} stroke={"black"}>
              <Knot
                position={createSignal(
                  () =>
                    [
                      -70 + (trueParams[2] - params[2]()) * 13,
                      220 + (trueParams[1] - params[1]()) * 42,
                    ] as PossibleVector2
                )}
              />
              <Knot
                position={createSignal(
                  () =>
                    [
                      0 + (trueParams[0] - params[0]()) * 37,
                      250 + (trueParams[1] - params[1]()) * 58,
                    ] as PossibleVector2
                )}
              />
              <Knot
                position={createSignal(
                  () =>
                    [
                      70 + (trueParams[0] - params[0]()) * 12,
                      220 + (trueParams[2] - params[2]()) * 62,
                    ] as PossibleVector2
                )}
              />
            </Spline>
          </Rect>
        </Circle>
      </Rect>
    </Rect>
  );

  yield* chain(
    all(
      params[0](Math.abs(trueParams[0] - 0.8), 1),
      params[1](Math.abs(trueParams[1] - 0.3), 1),
      params[2](Math.abs(trueParams[2] + 0.7), 1)
    ),
    all(
      params[0](Math.abs(trueParams[0] + 0.6), 1),
      params[1](Math.abs(trueParams[1] - 0.5), 1),
      params[2](Math.abs(trueParams[2] - 0.6), 1)
    ),
    all(
      params[0](Math.abs(trueParams[0] - 0.2), 1),
      params[1](Math.abs(trueParams[1] + 1), 1),
      params[2](Math.abs(trueParams[2] - 0.7), 1)
    ),
    all(
      params[0](Math.abs(trueParams[0]), 1),
      params[1](Math.abs(trueParams[1]), 1),
      params[2](Math.abs(trueParams[2]), 1)
    ),
    all(
      params[0](initParams[0], 1),
      params[1](initParams[1], 1),
      params[2](initParams[2], 1)
    )
  );
});
