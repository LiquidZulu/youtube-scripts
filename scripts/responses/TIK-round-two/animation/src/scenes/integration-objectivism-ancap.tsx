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
  Reference,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, flashAround } from "mcas/lib";

// Thus I may now turn my attention towards my aforementioned integration of anarcho-capitalism with Objectivism. In my view, Objectivism is the only proper philosophical basis for the anarcho-capitalist legal theory, and the anarcho-capitalist legal theory is the only proper legal theory on Objectivist philosophy.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();
  const entries = [
    [createRef<Txt>(), createRef<Ray>(), createRef<Txt>()],
    [createRef<Txt>(), createRef<Ray>(), createRef<Txt>()],
  ] as Array<[Reference<Txt>, Reference<Ray>, Reference<Txt>]>;
  const indicate = createRef<Rect>();
  const cont = createRef<Rect>();

  view.add(
    <Rect
      position={[0, 90]}
      ref={cont}
      layout
      direction="column"
      alignItems="center"
      gap={64}
    >
      <Txt ref={title} fontSize={60} fill="white" textAlign="center">
        The integration of Objectivism{"\n"}and anarcho-capitalism
        <Txt ref={colon} opacity={0}>
          :
        </Txt>
      </Txt>
      <Rect direction="column" alignItems="center">
        <Rect ref={indicate} alignItems="center" gap={32}>
          <Txt ref={entries[0][0]} opacity={0} fill={colors.yellow500}>
            Anarcho-capitalism
          </Txt>
          <Ray
            ref={entries[0][1]}
            end={0}
            lineWidth={8}
            endArrow
            stroke="white"
            toX={70}
            arrowSize={12}
          />
          <Txt ref={entries[0][2]} opacity={0} fill={colors.purple500}>
            Objectivism<Txt fill="white">.</Txt>
          </Txt>
        </Rect>
        <Rect alignItems="center" gap={32}>
          <Txt ref={entries[1][0]} opacity={0} fill={colors.purple500}>
            Objectivism
          </Txt>
          <Ray
            ref={entries[1][1]}
            end={0}
            lineWidth={8}
            endArrow
            stroke="white"
            toX={70}
            arrowSize={12}
          />
          <Txt ref={entries[1][2]} opacity={0} fill={colors.yellow500}>
            anarcho-capitalism<Txt fill="white">.</Txt>
          </Txt>
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* fadein(title);

  yield* waitUntil("ancap -> objectivism");
  yield* all(
    colon().opacity(1, 1),
    cont().position(0, 1),
    fadein(entries[0][0]),
    delay(0.1, entries[0][1]().end(1, 1)),
    delay(0.2, fadein(entries[0][2])),
  );

  yield* waitUntil("objectivism -> ancap");
  yield* all(
    fadein(entries[1][0]),
    delay(0.1, entries[1][1]().end(1, 1)),
    delay(0.2, fadein(entries[1][2])),
  );

  yield* waitUntil("indicate sound legal theory");

  yield* flashAround(indicate);

  yield* waitUntil("end");
  yield* all(
    fadeout(title),
    delay(
      0.1,
      all(
        fadeout(entries[0][0]),
        delay(0.1, entries[0][1]().start(1, 1)),
        delay(0.2, fadeout(entries[0][2])),
        delay(
          0.1,
          all(
            fadeout(entries[1][0]),
            delay(0.1, entries[1][1]().start(1, 1)),
            delay(0.2, fadeout(entries[1][2])),
          ),
        ),
      ),
    ),
  );
});
