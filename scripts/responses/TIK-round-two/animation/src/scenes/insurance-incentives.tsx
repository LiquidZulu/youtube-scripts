import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  QuadBezier,
  Circle,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
  useDuration,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, flashAround, getLocalPos } from "mcas/lib";

// In addition to this tendency for free-market defense towards precision in lieu of sweeping destruction; any defense insurance firm would have both the incentive to provide effective defense and likely the resources to engage in it. Even in their heavily restricted form today, insurance firms control vast arrays of capital spread across the globe which they can use to compensate anyone who makes a claim on their policy. After all, if an insurer does not have such a warchest of resources, nobody would trust them to have the means to pay up should the time come. Thus they would have to publicly show that they are in control of great capital holdings not subject to the risk of immediate state seizure. Because these firms would have to dip into their own resources to pay off anyone whose property was not adequately protected, they have the incentive not just to vigorously track down and extract restitution from the criminals, but also to efficiently predict and mitigate crime before it happens; which is in stark distinction to the state method of forcing victims to pay for the shelter, feeding, and entertainment of their aggressors through taxation.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list}>
      <Txt maxWidth={1700} textWrap>
        Free-market defense tends towards precision.
      </Txt>
      <Txt maxWidth={1700} textWrap>
        Defense insurance firms would tend to have both the incentive to provide
        effective defense and the resources required to engage in it.
      </Txt>
      <Txt maxWidth={1700} textWrap>
        Even in their current form insurance firms control vast arrays of
        capital spread across the globe which can be used to compensate anyone
        who makes a claim on their policy.
      </Txt>
      <Txt maxWidth={1700} textWrap>
        Any insurer that lacks this can't find customers on the market.
      </Txt>
      <Txt maxWidth={1700} textWrap>
        Because the insurer must compensate victims they have the incentive to
        extract restitution and prevent crime before it happens.
      </Txt>
      <Txt maxWidth={1700} textWrap>
        The statist method is to force victims to pay for the shelter, feeding,
        and entertainment of their aggressors.
      </Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* list().next("incentive");
  yield* list().next("heavily restricted");
  yield* list().next("no warchest");
  yield* list().next("incentive to prevent crime");
  yield* list().next("statist method");
  yield* waitUntil("out");
  yield* list().hideAll();

  // This tendency enacts a civilising process, in contrast to the decivilising one created by monopoly "protection" under a state. All other things being equal, men would prefer to have their property under a lower risk of predation; so as the risk of aggression increases, the value of property decreases. On the one hand, in low-risk-high-value (i.e. "good") neighborhoods, insurance rates could be low in accordance with the low risk of predation; and on the other hand, in high-risk-low-value (i.e. "bad") neighborhoods, insurance rates would be accordingly higher. This creates a tendency for productive individuals to move to and invest their resources in good as against bad areas. In contrast, those who are in good neighborhoods under state-monopoly protection are forced to pay more in taxes in order to subsidise those who languish in the bad neighborhoods---shifting resources from civilisation to decivilisation.

  const chart = createRef<Rect>();
  const labels = createRefArray<Txt>();
  const axes = createRefArray<Ray>();
  const value = createRef<QuadBezier>();
  const cost = createRef<QuadBezier>();
  const risk = createSignal(0.5);
  const points = createRefArray<Circle>();
  const valueTxt = createRef<Txt>();
  const costTxt = createRef<Txt>();
  const riskRay = createRef<Ray>();

  view.add(
    <Rect
      layout
      direction="column"
      alignItems="center"
      justifyContent="center"
      position={[-157, 34]}
    >
      <Rect alignItems="center" justifyContent="center">
        <Txt
          ref={labels}
          fill={colors.zinc400}
          rotation={-90}
          marginRight={-200}
          opacity={0}
        >
          <Txt ref={valueTxt} fill={colors.emerald500}>
            Value
          </Txt>{" "}
          /{" "}
          <Txt ref={costTxt} fill={colors.green500}>
            Protection Cost
          </Txt>
        </Txt>
        <Rect ref={chart} width={1500} height={800} clip />
      </Rect>
      <Rect>
        <Rect width={60} ratio={1} marginRight={40} />
        <Rect width={1500} justifyContent="center">
          <Txt
            opacity={0}
            ref={labels}
            fill="white"
            marginLeft={200}
            marginTop={10}
          >
            Risk of Predation
          </Txt>
        </Rect>
      </Rect>
    </Rect>,
  );

  view.add(
    <Ray
      end={0}
      position={[-157, 0]}
      ref={axes}
      lineWidth={6}
      endArrow
      arrowSize={12}
      stroke={colors.zinc500}
      fromY={chart().bottomLeft().y + 3}
      fromX={chart().bottomLeft().x}
      to={chart().topLeft}
    />,
  );
  view.add(
    <Ray
      end={0}
      position={[-157, 0]}
      ref={axes}
      lineWidth={6}
      endArrow
      arrowSize={12}
      stroke={colors.zinc500}
      from={chart().bottomLeft}
      to={chart().bottomRight}
    />,
  );

  chart().add(
    <QuadBezier
      end={0}
      ref={value}
      position={[-157, 34]}
      layout={false}
      lineWidth={8}
      stroke={colors.emerald500}
      p0={chart().topLeft()}
      p1={[400, -400]}
      p2={createSignal(() => {
        const { x, y } = axes[1].to;
        return { x: x() + 50, y: y() + axes[1].position().y };
      })}
    />,
  );

  chart().add(
    <QuadBezier
      end={0}
      opacity={costTxt().opacity}
      ref={cost}
      position={[-157, 0]}
      layout={false}
      lineWidth={8}
      stroke={colors.green500}
      p0={chart().bottomLeft()}
      p1={[400, 400 + axes[1].position().y]}
      p2={createSignal(() => {
        const { x, y } = chart().topRight();
        return {
          x: x + 50,
          y: y,
        };
      })}
    />,
  );

  chart().add(
    <Circle
      scale={0}
      ref={points}
      layout={false}
      width={20}
      ratio={1}
      stroke="white"
      lineWidth={5}
      position={() => {
        const { x, y } = value().getPointAtPercentage(risk()).position;
        return {
          x: x + value().position().x,
          y: y + value().position().y,
        };
      }}
    />,
  );

  chart().add(
    <Circle
      scale={0}
      opacity={costTxt().opacity}
      ref={points}
      layout={false}
      width={20}
      ratio={1}
      stroke="white"
      lineWidth={5}
      position={() => {
        const { x, y } = cost().getPointAtPercentage(risk()).position;
        return {
          x: x + cost().position().x,
          y: y + cost().position().y,
        };
      }}
    />,
  );

  chart().add(
    <Ray
      ref={riskRay}
      end={0}
      zIndex={-1}
      layout={false}
      lineWidth={4}
      from={createSignal(() => {
        const y = axes[1].position().y + 400;
        const costY = points[1].position().y;

        return {
          x:
            value().getPointAtPercentage(risk()).position.x +
            value().position().x,
          y: Math.max(y, costY),
        };
      })}
      to={createSignal(() => {
        const valuePoint = value().getPointAtPercentage(risk()).position;
        const costPoint = cost().getPointAtPercentage(risk()).position;
        if (valuePoint.y < costPoint.y) {
          return {
            x: valuePoint.x + value().position().x,
            y: valuePoint.y + value().position().y,
          };
        } else {
          return {
            x: costPoint.x + cost().position().x,
            y: costPoint.y + cost().position().y,
          };
        }
      })}
      stroke={colors.zinc700}
      lineDash={[10, 5]}
    />,
  );

  // This tendency enacts a civilising process, in contrast to the decivilising one created by monopoly "protection" under a state. All other things being equal, men would prefer to have their property under a lower risk of predation; so as the risk of aggression increases, the value of property decreases. On the one hand, in low-risk-high-value (i.e. "good") neighborhoods, insurance rates could be low in accordance with the low risk of predation; and on the other hand, in high-risk-low-value (i.e. "bad") neighborhoods, insurance rates would be accordingly higher.

  yield* all(
    delay(0.3, riskRay().end(1, 1)),
    ...labels.map((label, i) =>
      delay(
        0.1 * i,
        fadein(() => label),
      ),
    ),
    ...axes.map((axis) => axis.end(1, 1)),
    delay(0.3, value().end(1, 1)),
    cost().end(1, 1),
    delay(
      0.4,
      popin(() => points[1]),
    ),
    delay(
      0.4 + 0.3,
      popin(() => points[0]),
    ),
  );

  yield* waitUntil("less risk");

  yield* risk(0.2, 2);

  yield* waitUntil("increasing risk");

  yield* all(costTxt().opacity(0.1, 1), risk(0.8, 3));

  yield* waitUntil("back");

  yield* costTxt().opacity(1, 1);

  yield* waitUntil("low risk high value");

  yield* risk(0.2, 1);

  yield* waitUntil("good");

  const good = createRef<Rect>();
  const bad = createRef<Rect>();

  view.add(
    <Rect
      position={getLocalPos(chart().absolutePosition())}
      layout
      width={chart().width}
      height={chart().height}
      opacity={0.1}
      zIndex={-1}
    >
      <Rect
        opacity={0}
        ref={good}
        width="50%"
        height="100%"
        fill={colors.green500}
      />
      <Rect
        opacity={0}
        ref={bad}
        width="50%"
        height="100%"
        fill={colors.red500}
      />
    </Rect>,
  );

  yield* all(
    good().opacity(1, 1),
    flashAround(good, null, null, { color: colors.green500 }, { lineWidth: 4 }),
  );

  yield* waitUntil("high risk low value");
  yield* risk(0.9, 1);
  yield* waitUntil("bad");
  yield* all(
    bad().opacity(1, 1),
    flashAround(bad, null, null, { color: colors.red500 }, { lineWidth: 4 }),
  );

  // This creates a tendency for productive individuals to move to and invest their resources in good as against bad areas. In contrast, those who are in good neighborhoods under state-monopoly protection are forced to pay more in taxes in order to subsidise those who languish in the bad neighborhoods---shifting resources from civilisation to decivilisation.

  yield* waitUntil("tendency");

  const tendency = createRef<Ray>();

  view.add(
    <Ray
      ref={tendency}
      stroke={colors.green500}
      lineWidth={16}
      endArrow
      fromX={getLocalPos(points[0].absolutePosition()).x}
      fromY={-478}
      toX={() => getLocalPos(points[0].absolutePosition()).x}
      toY={-478}
    />,
  );

  yield* risk(0.2, useDuration("productive individuals moving"));

  yield* waitUntil("indicate good");
  yield* flashAround(
    good,
    null,
    null,
    { color: colors.green500 },
    { lineWidth: 4 },
  );
  yield* waitUntil("indicate bad");
  yield* flashAround(
    bad,
    null,
    null,
    { color: colors.red500 },
    { lineWidth: 4 },
  );

  yield* waitUntil("invert curve");

  yield* all(
    axes[0].startArrow(true, 1),
    axes[1].position([-157, -400], 1),
    cost().p0(chart().topLeft(), 1),
    cost().p1([300, -100], 1),
    cost().p2([965, 300], 1),
  );

  yield* waitUntil("shifting resources");

  const currentTendencyEndpoint = tendency().to().x;
  const currentTendencyY = tendency().from().y;

  yield* all(
    risk(0.8, 1),
    tendency().stroke(colors.red500, 1),
    tendency()
      .to(
        createSignal(() => [
          getLocalPos(points[0].absolutePosition()).x,
          currentTendencyY,
        ]),
      )
      .from([currentTendencyEndpoint, currentTendencyY], 1),
  );

  yield* waitUntil("end");
});
