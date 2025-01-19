import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  TxtProps,
  Shape,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  Color,
  Reference,
  sequence,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  flashAround,
} from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

function wrapStr(str: string, chunkSize: number) {
  if (str.length < chunkSize) {
    return str;
  }

  const splitted = str.split(" ");
  let newStr = "";
  let line = "";

  for (let chunk of splitted) {
    if (line.length > chunkSize) {
      newStr += `${line}\n`;
      line = "";
    }
    line += `${chunk} `;
  }

  return (newStr + `${line}`).trim();
}

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const hero = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={64}>
      <Txt
        glow
        fill={colors.purple500}
        fontFamily="oswald"
        ref={hero}
        fontSize={80}
      />
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1400}>
          Conflicts should be avoided under certain circumstances, but not
          always.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Any{" "}
          <Txt glow fill={colors.red600}>
            mixed-law
          </Txt>{" "}
          system that can be reduced to: "we must aggress in these arbitrary
          situations" is refuted by the reasoning against{" "}
          <Txt glow fill={colors.red500}>
            the law of the jungle
          </Txt>
          .
        </Txt>
      </ArrowList>
    </Rect>,
  );

  // Next, let's consider the "mixed law" system(s); i.e. that conflicts should be avoided under certain circumstances, but not always. First any mixed-law system that can be reduced to "we must aggress in these arbitrary situations" is refuted by the above reasoning against the law of the jungle.

  yield* hero().text("mixed law:".toUpperCase(), 1);
  yield* list().next("explanation");
  yield* list().next("reduction");
  yield* list().hideAll("mixed law systems", fadeout(hero));

  const theories = [
    [
      { text: "Consequentialism", fill: colors.red500 },
      ": he whose victory would yield the best outcome is he who should win the conflict at hand;",
    ],
    [
      { text: "Racism", fill: colors.amber500 },
      ": he who is fighting for the interests of the preferred race is he who should win the conflict at hand;",
    ],
    [
      { text: "Marxism", fill: colors.yellow500 },
      ": he who is fighting for the interests of the proletariat is he who should win the conflict at hand;",
    ],
    [
      { text: "Primitivism", fill: colors.green500 },
      ": he who is fighting for apocalypse is he who should win the conflict at hand;",
    ],
    [
      { text: "Monarchism", fill: colors.teal500 },
      ": he who is deemed to be the proper victor by the monarch is he who should win the conflict at hand;",
    ],
    [
      { text: "Democratism", fill: colors.sky500 },
      ": he who is deemed to be the proper victor by majority opinion is he who should win the conflict at hand;",
    ],
    [
      { text: "Rawlsianism", fill: colors.indigo500 },
      ": he who is deemed to be the proper victor by a party situated behind a veil of ignorance is he who should win the conflict at hand, and;",
    ],
    [
      { text: "Imperialism", fill: colors.purple500 },
      ": he who is deemed to be an ally by the military leadership of the preferred country is he who should win the conflict at hand.",
    ],
  ] as Array<[TxtProps, string]>; //.map(([a, b]) => [{ glow: true, ...a }, b]);

  const chunked = [theories.slice(0, 4), theories.slice(4)];
  const chunks = createRefArray<Rect>();
  const entries = createRefArray<Rect>();

  const nums = createRefArray<Txt>();
  const names = createRefArray<Txt>();
  const descs = createRefArray<Txt>();
  const title = createRef<Txt>();

  view.add(
    <Rect layout direction="column" gap={40} alignItems="center">
      <Txt fontFamily="sans" ref={title} fill={colors.zinc50} fontSize={70}>
        Mixed-law systems:
      </Txt>
      <Rect direction="column" gap={6}>
        {chunked.map((r: Array<[TxtProps, string]>, chunkN) => (
          <Rect ref={chunks} gap={6} direction="column">
            {r.map(([name, desc], i) => (
              <Rect ref={entries} gap={6}>
                <Txt
                  ref={nums}
                  fontFamily="sans"
                  fontSize={40}
                  fill={colors.zinc500}
                >{`${i + 1 + chunkN * 4}.`}</Txt>
                <Txt
                  fontFamily="sans"
                  fontSize={40}
                  fill={colors.zinc50}
                  alignItems="start"
                >
                  <Txt
                    ref={names}
                    fontWeight={900}
                    fontFamily="sans"
                    {...name}
                    fontSize={40}
                  />
                  <Txt ref={descs}>{wrapStr(desc, 50)}</Txt>
                </Txt>
              </Rect>
            ))}
          </Rect>
        ))}
      </Rect>
    </Rect>,
  );

  for (let i = 0; i < theories.length; ++i) {
    nums[i].opacity(0);
    names[i].opacity(0);
    descs[i].opacity(0);
  }
  yield* all(
    fadein(title),
    ...nums.map((num, i) => chain(waitFor((i + 1) * 0.1), num.opacity(1, 1))),
  );
  yield* waitFor(1);

  for (let i = 0; i < theories.length; ++i) {
    yield* waitUntil(`in: ${theories[i][0].text}`);
    yield* names[i].opacity(1, 1);
    yield* descs[i].opacity(1, 1);
  }

  const flash = <T extends Shape>(elem: T) =>
    flashAround(
      () => elem,
      null,
      null,
      {
        modWidth: () => 50,
        modHeight: () => 50,
      },
      {
        lineWidth: 4,
        shadowColor: colors.purple500,
        shadowBlur: 20,
        stroke: colors.purple500,
        padding: 40,
      },
    );

  yield* waitUntil("highlight first chunk");
  yield* all(flash(chunks[0]), chunks[1].opacity(0.2, 1));

  yield* waitUntil("highlight second chunk");
  yield* chunks[1].opacity(1, 1);
  yield* all(flash(chunks[1]), chunks[0].opacity(0.2, 1));
  yield* waitFor(1);
  yield* chunks[0].opacity(1, 1);
  yield* waitUntil("latter falls");
  yield* chunks[1].opacity(0.05, 1);
  yield* waitUntil("glow");
  yield* all(...names.slice(0, 4).map((name) => name.glow(0).glow(0.5, 1)));
  yield* waitUntil("out");
  yield* all(
    fadeout(title),
    ...entries.map((x, i) =>
      chain(
        waitFor((i + 1) * 0.1),
        fadeout(() => x),
      ),
    ),
  );

  const acol = createSignal(new Color(colors.emerald500));
  const bcol = createSignal(new Color(colors.amber500));
  const arect = createRef<Rect>();
  const brect = createRef<Rect>();
  const a = createRef<Txt>();
  const b = createRef<Txt>();

  view.add(
    <Rect
      end={0}
      ref={arect}
      layout
      alignItems="center"
      justifyContent="space-evenly"
      width={1920 * 0.9}
      height={1080 * 0.9}
      stroke={acol}
      lineWidth={15}
      radius={160}
      fill={() => acol().lerp(view.fill() as Color, 0.9)}
      direction="column"
    >
      <Txt
        scale={0}
        ref={a}
        glow
        fill={acol}
        fontFamily="cubano"
        fontSize={200}
      >
        a
      </Txt>
      <Rect
        end={0}
        ref={brect}
        alignItems="center"
        justifyContent="center"
        width="90%"
        height="50%"
        stroke={bcol}
        lineWidth={15}
        radius={100}
        fill={() => bcol().lerp(view.fill() as Color, 0.9)}
      >
        <Txt
          scale={0}
          ref={b}
          glow
          fill={bcol}
          fontFamily="cubano"
          fontSize={200}
        >
          non-a
        </Txt>
      </Rect>
    </Rect>,
  );

  function* flasha<T extends Rect>(ref: Reference<T>) {
    const opacity = createSignal(1);
    yield* flashAround(ref, null, null, null, {
      lineWidth: ref().lineWidth,
      stroke: colors.purple500,
      radius: ref().radius,
      shadowColor: colors.purple500,
      shadowBlur: 100,
      opacity: opacity,
    });
    opacity(0);
  }

  yield* all(arect().end(1, 1), popin(a));
  yield* waitUntil("non-a");
  yield* all(brect().end(1, 1), popin(b));
  yield* waitUntil("indicate a");
  yield* flasha(arect);
  yield* waitUntil("indicate non-a");
  yield* flasha(brect);
  yield* waitUntil("universal principle");
  yield* all(
    acol(new Color(colors.purple500), 1),
    bcol(new Color(colors.purple500), 1),
  );
  yield* waitUntil("particular subset");
  yield* bcol(new Color(colors.rose500), 1);
  yield* waitUntil("humans");
  yield* b().text("humans", 1);
  yield* waitUntil("subhumans");
  yield* a().text("sub-humans", 1);

  yield* waitUntil("outa");
  yield* sequence(
    0.2,
    sequence(0.99, all(brect().start(1, 1), popout(b)), brect().opacity(0, 0)),
    sequence(0.99, all(arect().start(1, 1), popout(a)), arect().opacity(0, 0)),
  );

  // Any form of class-based law is an ethic in the form: one rule for class $A$ and another for class non-$A$. But by what possible means could one derive that one ethic applies to $A$ and another /incompatible/[fn:65] ethic applies to non-$A$? Surely such an ethic could not be derived from the nature of man as such, because if it were then we would have a universal principle, not one that applies only to a particular subset of humanity. Therefore, such an ethic must be arbitrarily particularised---we have an arbitrary distinction which forms a class of humans and a class of sub-humans, we do not here have a rational ethic for /man/. This particularisation then falls back into the primacy of consciousness and therefore fails.
});
