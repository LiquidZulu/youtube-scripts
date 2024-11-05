import { makeScene2D, Rect, Ray, Img, TxtProps } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import _ from "lodash";

/*
   1. consequentialism---he whose victory would yield the best outcome is he who should win the conflict at hand;[fn:59]
   2. racism---he who is fighting for the interests of the preferred race is he who should win the conflict at hand;
   3. Marxism---he who is fighting for the interests of the proletariat is he who should win the conflict at hand;
   4. primitivism---he who is fighting for apocalypse[fn:60] is he who should win the conflict at hand;
   5. monarchism---he who is deemed to be the proper victor by the monarch is he who should win the conflict at hand;
   6. democratism---he who is deemed to be the proper victor by majority opinion is he who should win the conflict at hand;
   7. Rawlsianism---he who is deemed to be the proper victor by a party situated behind a veil of ignorance is he who should win the conflict at hand,[fn:61] and;
   8. imperialism---he who is deemed to be an ally by the military leadership of the preferred country is he who should win the conflict at hand.
 */

/*
   {theories.map(([name, desc], i) => (
   <Rect gap={32}>
   <Txt
   ref={nums}
   fontFamily="sans"
   fontSize={40}
   fill={colors.zinc500}
   >{`${i + 1}.`}</Txt>
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
 */

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
  view.fill(colors.bg);

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
  ] as Array<[TxtProps, string]>;

  const chunked = [theories.slice(0, 4), theories.slice(4)];

  const nums = createRefArray<Txt>();
  const names = createRefArray<Txt>();
  const descs = createRefArray<Txt>();
  const title = createRef<Txt>();

  // You will notice that on their face these
  // ideologies fall under two categories: (1)
  // the class-based, i.e. "he who is part of
  // the preferred class is he who should win
  // the conflict at hand,"[fn:62] and (2) the
  // whim-based, i.e. "he who is deemed to be the
  // proper victor by X is he who should win the
  // conflict at hand." It should be clear why the
  // latter would fall under the same reasoning as
  // used against the law of the jungle; thus I shall
  // focus my efforts on those class-based mixed-law systems.

  view.add(
    <Rect layout direction="column" gap={40} alignItems="center">
      <Txt fontFamily="sans" ref={title} fill={colors.zinc50} fontSize={70}>
        Mixed-law systems:
      </Txt>
      <Rect direction="column" gap={6}>
        {chunked.map((r: Array<[TxtProps, string]>) => (
          <Rect gap={32}>
            {r.map(([name, desc], i) => (
              <Rect gap={32}>
                <Txt
                  ref={nums}
                  fontFamily="sans"
                  fontSize={40}
                  fill={colors.zinc500}
                >{`${i + 1}.`}</Txt>
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
  //yield* waitFor(1);

  //for (let i = 0; i < theories.length; ++i) {
  //  yield* names[i].opacity(1, 1);
  //  yield* descs[i].opacity(1, 1);
  //  yield* waitFor(4);
  //}
});
