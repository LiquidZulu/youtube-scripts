import { makeScene2D, Rect, Ray, Img, Grid } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useDuration,
  noop,
  linear,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  a,
  animateWaveform,
  audiowaveformHiLo,
  AudiowaveformJSON,
  TRichText,
  generateTxt,
  after,
  mkGradient,
} from "mcas";
import * as colors from "mcas/colors";

// cut audio in davinci
// render out with padding
// copy to data dir
// get waveform data with zoom = 2400
// replace in timeline with processed audio from FL Studio

export function mkQuote(
  data: AudiowaveformJSON,
  avatar: string,
  username: string,
  timestamp: string,
  quote: TRichText[][],
  scroll: number,
  scaleWave = 1,
) {
  return makeScene2D(function* (view) {
    view.fill(0);

    const quoteText = createRef<Txt>();
    const rays = createRefArray<Ray>();
    const grid = createRef<Grid>();
    const avatarWidth = 700;
    const write = createSignal(0);

    view.add(
      <Rect
        layout
        direction="column"
        size={view.size}
        alignItems="center"
        paddingTop={view.height() / 10}
      >
        <Rect gap={128} width="90%">
          <Rect direction="column" gap={64} alignItems="center">
            <Img
              src={avatar}
              width={avatarWidth - 5}
              radius={20}
              lineWidth={10}
              stroke="white"
              alignItems="end"
              justifyContent="center"
            >
              <Rect
                shadowColor="black"
                shadowBlur={4}
                shadowOffsetX={3}
                shadowOffsetY={5}
              >
                <Txt fontFamily="ProggyClean CE Nerd Font" fontSize={80}>
                  {username}
                </Txt>
              </Rect>
            </Img>
            <Rect
              gap={2}
              alignItems="center"
              clip
              height={200}
              radius={20}
              lineWidth={5}
              stroke="white"
            >
              <Grid
                layout={false}
                ref={grid}
                width={15000}
                height={"100%"}
                stroke={"#666"}
                start={0}
                end={1}
                lineWidth={10}
                scale={0.15}
              />
              {...a(avatarWidth / 2).map((_) => (
                <Ray ref={rays} lineWidth={2} stroke="00ff00" />
              ))}
            </Rect>
          </Rect>
          <Rect ref={quoteText} layout direction="column" gap={64}>
            {...quote.map((q, i) =>
              generateTxt(q, {
                glow: true,
                writeOn: () =>
                  Math.max(0, Math.min(1, write() * quote.length - i)),
                textWrap: true,
                fontFamily: "ProggyClean CE Nerd Font",
                fontSize: 80,
              }),
            )}
          </Rect>
        </Rect>
      </Rect>,
    );

    if (scroll !== undefined)
      view.add(
        <Rect
          width="100%"
          height={600}
          fill={mkGradient([0, 100], [0, -300], "black", "#00000000")}
          position={[0, 800]}
        />,
      );

    view.add(
      <Txt fontFamily="ProggyClean CE Nerd Font" position={[0, 1000]}>
        Dave Smith,{" "}
        <Txt.i>Did I sell out my principles by supporting Trump?</Txt.i>{" "}
        (Twitter Space),{" "}
        <Txt fill={colors.sky500}>
          https://x.com/ComicDaveSmith/status/1860865805006590365
        </Txt>
        , t. {timestamp}
      </Txt>,
    );

    function* usernameIn() {
      yield* waitUntil(username + " in");

      yield* write(1, 1);
      quoteText().removeChildren();
      quoteText().add(
        <>
          {...quote.map((q, i) =>
            generateTxt(q, {
              glow: true,
              textWrap: true,
              fontFamily: "ProggyClean CE Nerd Font",
              fontSize: 80,
            }),
          )}
        </>,
      );
      if (scroll !== undefined) {
        yield* quoteText().margin(
          [-quoteText().height() + 1500, 0, 0, 0],
          scroll,
          linear,
        );
      }
    }

    yield* all(
      usernameIn(),
      animateWaveform(
        audiowaveformHiLo(data),
        rays,
        (c) => (hi, lo, ray) => {
          ray.from([ray.from().x, hi * scaleWave * 100 + 1]);
          ray.to([ray.to().x, lo * scaleWave * 100 - 1]);
        },
        1 / 20,
      ),
    );
  });
}
