import {
  makeScene2D,
  CubicBezier,
  Img,
  Txt,
  Layout,
  Rect,
} from "@motion-canvas/2d";
import {
  createRef,
  createSignal,
  PossibleVector2,
  waitFor,
  all,
  chain,
} from "@motion-canvas/core";

import bobRoss from "../assets/efficient-vs-inefficient/bob-ross.png";
import consumer from "../assets/efficient-vs-inefficient/consumer.png";
import fingerPainting from "../assets/efficient-vs-inefficient/finger-painting.png";
import moneybag from "../assets/efficient-vs-inefficient/moneybag.png";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const bezierHeight = 100;
  const moneyTravelDuration = 1;
  const moneyPerPerson = 100;
  let moneyAnimations = [];

  const sellerList = [bobRoss, fingerPainting];

  const sellers = new Map([
    [bobRoss, { ref: createRef<Img>(), active: createSignal(1) }],
    [fingerPainting, { ref: createRef<Img>(), active: createSignal(1) }],
  ]);

  let consumers = [
    [createSignal(1), createSignal(0)],
    [
      sellers.get(bobRoss).active,
      createSignal(() => {
        if (sellers.get(bobRoss).active() == 1) return 0;

        return 1 - sellers.get(bobRoss).active();
      }),
    ],
    [createSignal(1), createSignal(0)],
    [sellers.get(bobRoss).active, sellers.get(fingerPainting).active],
    [sellers.get(bobRoss).active, sellers.get(fingerPainting).active],
    [
      sellers.get(bobRoss).active,
      createSignal(() => {
        if (sellers.get(bobRoss).active() == 1) return 0;

        return 1 - sellers.get(bobRoss).active();
      }),
    ],
    [createSignal(0), sellers.get(fingerPainting).active],
  ].map((prefs) => ({
    money: new Array(moneyPerPerson),
    preferences: prefs,
    refs: {
      self: createRef<Img>(),
      beziers: [
        { active: prefs[0], ref: createRef<CubicBezier>() },
        {
          active: prefs[1],
          ref: createRef<CubicBezier>(),
        },
      ],
    },
  }));

  for (let i = 0; i < consumers.length; ++i) {
    view.add(
      <Img
        ref={consumers[i].refs.self}
        y={400}
        src={consumer}
        width={200}
        x={(consumers.length / 2 - consumers.length + 1 / 2) * 250 + 250 * i}
      />
    );
  }

  view.add(
    <>
      {Array.from(sellers).map(
        (
          [src, _]: [string, any],
          i: number,
          { length }: { length: number }
        ) => (
          <>
            <Rect
              gap={12}
              layout
              x={(length / 2 - length + 1 / 2) * 800 + 800 * i}
              y={-400}
            >
              <Txt fill={0xffffff} fontFamily={"Cubano"} text={"Income ="} />
              <Txt
                fill={0xffffff}
                fontFamily={"Cubano"}
                text={() => {
                  let total = 0;

                  for (let consumer of consumers) {
                    total += consumer.refs.beziers[i].active();
                  }

                  return "$" + total.toFixed(2);
                }}
              />
              <Txt
                fill={0xffffff}
                fontFamily={"Cubano"}
                text={() => "/ second"}
              />
            </Rect>
            <Img
              x={(length / 2 - length + 1 / 2) * 800 + 800 * i}
              y={-200}
              ref={sellers.get(src).ref}
              src={src}
              height={300}
            />
          </>
        )
      )}
    </>
  );

  for (let i = 0; i < consumers.length; ++i) {
    const [buyBobRoss, buyFingerPaint] = consumers[i].preferences;
    const sellerMap = new Map([
      ["buyBobRoss", bobRoss],
      ["buyFingerPaint", fingerPainting],
    ]);

    for (let [name, shouldbuy] of [
      ["buyBobRoss", buyBobRoss],
      ["buyFingerPaint", buyFingerPaint],
    ]) {
      if (shouldbuy) {
        const bezier = consumers[i].refs.beziers[+(name == "buyFingerPaint")];
        view.add(
          <CubicBezier
            opacity={() => 0.1 + 9 * (bezier.active() / 10)}
            ref={bezier.ref}
            lineWidth={6}
            stroke={0xffffff}
            p0={
              [
                consumers[i].refs.self().x(),
                consumers[i].refs.self().y(),
              ] as PossibleVector2<number>
            }
            p1={
              [
                consumers[i].refs.self().x(),
                bezierHeight,
              ] as PossibleVector2<number>
            }
            p2={
              [
                sellers
                  .get(sellerMap.get(name as string))
                  .ref()
                  .x(),
                bezierHeight,
              ] as PossibleVector2<number>
            }
            p3={
              [
                sellers
                  .get(sellerMap.get(name as string))
                  .ref()
                  .x(),
                sellers.get(bobRoss).ref().y(),
              ] as PossibleVector2<number>
            }
          />
        );

        for (let m = 0; m < moneyPerPerson; ++m) {
          consumers[i].money[m] = {
            ref: createRef<Img>(),
            position: createSignal(0),
          };

          view.add(
            <Img
              opacity={bezier.active}
              ref={consumers[i].money[m].ref}
              src={moneybag}
              position={() =>
                bezier
                  .ref()
                  .getPointAtPercentage(consumers[i].money[m].position())
                  .position
              }
            />
          );
          moneyAnimations.push(
            chain(
              waitFor(
                moneyTravelDuration * m +
                  (consumers[i].refs.self().x() + 1920 / 2) / 500
              ),
              consumers[i].money[m].position(1, 3)
            )
          );

          consumers[i].money[m].ref().moveToBottom();
        }

        bezier.ref().moveToBottom();
      }
    }
  }

  yield* all(
    all(...moneyAnimations),
    chain(waitFor(10), sellers.get(bobRoss).active(0, 2))
  );
});
