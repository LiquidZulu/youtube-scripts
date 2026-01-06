import { makeScene2D, Rect, Ray, Img, Camera } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  SignalValue,
  Signal,
  SimpleSignal,
  waitUntil,
  sequence,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, after } from "mcas";
import * as colors from "mcas/colors";
import InsanityIsFree from "../assets/InsanityIsFree.jpg";
import TheOtherMassie from "../assets/TheOtherMassie.jpg";
import MonarchoHoppean from "../assets/MonarchoHoppean.jpg";

const speakerImages: Record<string, string> = {
  "@InsanityIsFree": InsanityIsFree,
  "@TheOtherMassie": TheOtherMassie,
  "@MonarchoHoppean": MonarchoHoppean,
};

type SpeakingSection = [string, string];
type Segments = { [key: string]: Segment };
type Segment = SpeakingSection[];
type SpeakerDefinition = Array<[boolean, number]>; // Array<[whether they are speaking, the duration of them speaking]>

const speakingTimes: Segments = {
  "@InsanityIsFree": [
    // Jeremiah Harding
    ["1:11:18", "1:16:25"],
    ["1:19:06", "1:21:31"],
    ["1:21:37", "1:21:38"],
    ["1:22:00", "1:22:26"],
    ["1:22:28", "1:22:31"],
    ["1:23:29", "1:23:32"],
    ["1:23:55", "1:23:56"],
    ["1:25:53", "1:26:21"],
    ["1:26:22", "1:30:23"],
  ],
  "@TheOtherMassie": [
    // Rebekah Massie
    ["1:32:22", "1:37:21"],
  ],
  "@MonarchoHoppean": [
    // MonHop
    ["1:41:42", "1:44:11"],
    ["1:44:26", "1:44:44"], // lot of cross-talk here
    ["1:48:07", "1:48:12"],
    ["1:48:13", "1:48:16"],
    ["1:48:17", "1:48:50"],
    ["1:48:51", "1:48:52"],
    ["1:48:57", "1:49:13"],
    ["1:50:13", "1:50:35"],
    ["1:52:16", "1:52:20"], // fading out ray here
  ],
};

const speakers = {
  "@InsanityIsFree": createSignal(0),
  "@TheOtherMassie": createSignal(0),
  "@MonarchoHoppean": createSignal(0),
};

function toSeconds(timestamp: string): number {
  const [hours, minutes, seconds] = timestamp.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function validSegments(segments: Segments): Segments {
  for (const speaker in segments) {
    const sections = segments[speaker];
    for (const [start, end] of sections) {
      const startSeconds = toSeconds(start);
      const endSeconds = toSeconds(end);
      if (endSeconds <= startSeconds) {
        throw new Error(
          `End time is not after start time for speaker ${speaker}: [${start}, ${end}]`,
        );
      }
    }
  }
  return segments;
}

function getSpeakerDefinition(segment: Segment): SpeakerDefinition {
  // Validate the segment
  for (const [start, end] of segment) {
    const startSeconds = toSeconds(start);
    const endSeconds = toSeconds(end);
    if (endSeconds <= startSeconds) {
      throw new Error(`End time is not after start time: [${start}, ${end}]`, {
        cause: { start, end },
      });
    }
  }

  // Collect all timestamps to determine the total timeline
  const allTimestamps = segment.flatMap(([start, end]) => [
    toSeconds(start),
    toSeconds(end),
  ]);
  const minTime = Math.min(...allTimestamps);
  const maxTime = Math.max(...allTimestamps);
  const totalDuration = maxTime - minTime;

  if (totalDuration === 0) {
    throw new Error(`Zero duration array provided to getSpeakerDefinition`, {
      cause: segment,
    });
  }

  // Sort segments by start time
  const sortedSections = segment
    .map(
      ([start, end]) => [toSeconds(start), toSeconds(end)] as [number, number],
    )
    .sort((a, b) => a[0] - b[0]);

  const result: SpeakerDefinition = [];
  let currentTime = minTime;

  // Process each segment
  for (const [start, end] of sortedSections) {
    // Add non-speaking period before this segment, if any
    if (currentTime < start) {
      const nonSpeakingDuration = start - currentTime; // Duration in seconds
      result.push([false, nonSpeakingDuration]);
    }
    // Add speaking period
    const speakingDuration = end - start; // Duration in seconds
    result.push([true, speakingDuration]);
    currentTime = end;
  }

  // Add final non-speaking period if needed
  if (currentTime < maxTime) {
    const finalNonSpeakingDuration = maxTime - currentTime; // Duration in seconds
    result.push([false, finalNonSpeakingDuration]);
  }

  return result;
}

function getTotalDuration(definition: SpeakerDefinition): number {
  const totalSeconds = definition.reduce(
    (sum, [, duration]) => sum + duration,
    0,
  );
  if (totalSeconds < 0) {
    throw new Error(`Total duration cannot be negative: ${totalSeconds}`, {
      cause: definition,
    });
  }
  return totalSeconds;
}

const normalisedSpeakerLengths: Record<string, number> = (() => {
  // Calculate total speaking time for each speaker using getSpeakerDefinition
  const speakerDurations: Record<string, number> = {};
  for (const speaker in speakingTimes) {
    const definition = getSpeakerDefinition(speakingTimes[speaker]);
    speakerDurations[speaker] = getTotalDuration(definition);
  }

  // Find the maximum speaking time
  const maxDuration = Math.max(...Object.values(speakerDurations));
  if (maxDuration === 0) {
    throw new Error("No valid speaking durations found", {
      cause: speakerDurations,
    });
  }

  // Normalize durations relative to the maximum
  const normalized: Record<string, number> = {};
  for (const speaker in speakerDurations) {
    normalized[speaker] = speakerDurations[speaker] / maxDuration;
  }

  return normalized;
})();

// Store references for each speaker's components
type SpeakerRefs = {
  image: Reference<Img>;
  nameText: Referenc<Txt>;
  ratioText: Reference<Txt>;
  bar: Reference<Rect>;
  signal: SimpleSignal<number>;
};

let speakerRefs: Record<string, SpeakerRefs> = {};

function* speakerIn(speaker: string) {
  const refs = speakerRefs[speaker];
  if (!refs) {
    throw new Error(`No references found for speaker ${speaker}`);
  }

  yield* all(
    popin(refs.image),
    refs.nameText().writeOn(1, 1),
    refs.ratioText().writeOn(1, 1),
    refs.signal(1, 1),
  );
}

export default makeScene2D(function* (view) {
  view.fill(0);

  for (let speaker of Object.values(speakers)) {
    speaker(0);
  }

  validSegments(speakingTimes);

  const MAX_BAR_WIDTH = 2200;
  const speakerOrder = Object.keys(speakingTimes);

  const speakerMinMax: Record<
    string,
    { min: number; max: number; totalSpeaking: number }
  > = {};
  for (const speaker of speakerOrder) {
    const sections = speakingTimes[speaker];
    if (sections.length === 0) continue;
    let minT = Infinity;
    let maxT = -Infinity;
    let totalSpeaking = 0;
    for (const [s, e] of sections) {
      const ss = toSeconds(s);
      const ee = toSeconds(e);
      minT = Math.min(minT, ss);
      maxT = Math.max(maxT, ee);
      totalSpeaking += ee - ss;
    }
    speakerMinMax[speaker] = { min: minT, max: maxT, totalSpeaking };
  }

  view.add(
    <Rect layout direction="column" gap={160}>
      {speakerOrder.map((speaker) => {
        const { min, max, totalSpeaking } = speakerMinMax[speaker];
        const totalDur = max - min;
        const barWidth = normalisedSpeakerLengths[speaker] * MAX_BAR_WIDTH;
        const barRef = createRef<Rect>();
        const imageRef = createRef<Img>();
        const nameTextRef = createRef<Txt>();
        const ratioTextRef = createRef<Txt>();
        const ratioText = `${totalSpeaking}s / ${totalDur}s (${((totalSpeaking / totalDur) * 100).toFixed(2)}%)`;
        const definition = getSpeakerDefinition(speakingTimes[speaker]);
        let current_pos = 0;

        // Store references for this speaker
        speakerRefs[speaker] = {
          image: imageRef,
          nameText: nameTextRef,
          ratioText: ratioTextRef,
          bar: barRef,
          signal: speakers[speaker],
        };

        return (
          <Rect layout gap={40} alignItems="center">
            <Rect width={600} direction="column" alignItems="center" gap={30}>
              <Img
                ref={imageRef}
                src={speakerImages[speaker]}
                size={500}
                radius={9999}
                shadowBlur={100}
                shadowColor="white"
                scale={0}
              />
              <Txt
                writeOn={0}
                ref={nameTextRef}
                glow
                fontFamily="ProggyClean CE Nerd Font"
                text={speaker}
                fill="white"
                fontSize={60}
              />
            </Rect>
            <Rect ref={barRef} width={barWidth}>
              {definition.map(([isSpeaking, dur]) => {
                const norm_start = current_pos / totalDur;
                const norm_end = (current_pos + dur) / totalDur;
                current_pos += dur;
                const color = isSpeaking ? "00ff00" : "ff0000";
                return (
                  <Ray
                    position={[-barWidth / 2, 0]}
                    layout={false}
                    toX={barWidth}
                    start={norm_start}
                    end={() =>
                      Math.max(
                        norm_start,
                        Math.min(speakers[speaker](), norm_end),
                      )
                    }
                    lineWidth={190}
                    stroke={color}
                    lineCap="butt"
                    endArrow={false}
                    startArrow={false}
                  />
                );
              })}
            </Rect>
            <Txt
              writeOn={0}
              ref={ratioTextRef}
              glow
              fontFamily="ProggyClean CE Nerd Font"
              text={ratioText}
              fill="white"
              fontSize={100}
            />
          </Rect>
        );
      })}
    </Rect>,
  );

  yield* speakerIn("@InsanityIsFree");
  yield* waitUntil("eight separate points");

  const points = [
    "Is allegedly buying into propaganda worse than the one who created that propaganda?",
    "Game of Thrones is an apt analogy because the chick who thinks she is is falling on her sword turns on her promises and murders a civilisation.",
    "Freeing Ross is an interesting gambit because the GOP fucks taking over the states are the kind of fucks that refuse to pardon and commute and advocate for innocent people all the time.",
    //"A lot of these people claim to be great on these subjects but have been caustic anti-transparency hawk ghouls.",
    //`Claiming that these people are anti-war because they say some stuff about Ukraine is "buying it."`,
    //"Vivek is notorious for trying to scrub the record of his Soros-backed funding.",
    "Trump said he supports trans surgeries with parental consent and he was the architect of the lockdowns and vaccines.",
    "Trump's campaign included many big pharma CEOs.",
    "I'm not saying that Harris would be better, but there are active un-truths that are being said.",
    "Trump is not getting rid of the income tax.",
    "Trump is a warhawk---more of the same.",
  ];

  // Create references for each point's text
  const pointTextRefs = createRefArray<Txt>();

  view.add(
    <Rect
      layout
      direction="column"
      gap={100}
      padding={40}
      width={3300}
      position={[0, 300]}
    >
      {points
        .reduce((rows, point, index) => {
          if (index % 2 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(point);
          return rows;
        }, [] as string[][])
        .map((row, rowIndex) => (
          <Rect
            gap={200}
            layout
            direction="row"
            width="100%"
            justifyContent="space-between"
          >
            {row.map((point, colIndex) => {
              const pointIndex = rowIndex * 2 + colIndex;
              return (
                <Rect
                  layout
                  direction="row"
                  gap={10}
                  width="50%"
                  justifyContent="start"
                >
                  <Rect width={100}>
                    <Txt
                      ref={pointTextRefs}
                      writeOn={0}
                      textAlign="right"
                      fontFamily="ProggyClean CE Nerd Font"
                      text={`${pointIndex + 1}. `}
                      fill="white"
                      fontSize={70}
                      glow
                    />
                  </Rect>
                  <Txt
                    ref={pointTextRefs}
                    writeOn={0}
                    grow={1}
                    glow
                    fontFamily="ProggyClean CE Nerd Font"
                    text={point}
                    fill="white"
                    fontSize={60}
                    textWrap="wrap"
                  />
                </Rect>
              );
            })}
            {row.length === 1 && <Rect width="50%" />}
          </Rect>
        ))}
    </Rect>,
  );

  // Animate the writeOn value for each point's text (including numbers)
  yield* sequence(
    0.05,
    ...pointTextRefs.map((textRef, index) => textRef.writeOn(1, 0.8)),
  );

  yield* waitUntil("refuting winograd");
  yield* sequence(
    0.05,
    ...pointTextRefs.reverse().map((textRef, index) => textRef.writeOn(0, 0.8)),
  );

  const notLibertarian = createRef<Txt>();

  view.add(
    <Txt
      ref={notLibertarian}
      writeOn={0}
      glow
      fontFamily="ProggyClean CE Nerd Font"
      fontSize={200}
    >
      "I am not 100% libertarian."
    </Txt>,
  );

  let citation = createRefArray<Txt>();

  view.add(
    <Txt
      opacity={0}
      ref={citation}
      glow
      fontFamily="ProggyClean CE Nerd Font"
      fontSize={50}
      position={[0, 1000]}
    >
      Dave smith,{" "}
      <Txt.i>Did I sell out my principles by supporting Trump?</Txt.i> (Twitter
      Space),{" "}
      <Txt glow fill={colors.sky500}>
        https://x.com/ComicDaveSmith/status/1860865805006590365
      </Txt>
      , t. 01:26:32
    </Txt>,
  );

  yield* all(citation[0].opacity(1, 1), notLibertarian().writeOn(1, 1));

  yield* after(
    "get rid of that shit",
    notLibertarian().writeOn(0, 1),
    citation[0].opacity(0, 1),
  );

  yield* after("massie", speakerIn("@TheOtherMassie"));

  view.add(
    <Txt
      opacity={0}
      ref={citation}
      glow
      fontFamily="ProggyClean CE Nerd Font"
      fontSize={50}
      position={[0, 1000]}
    >
      Dave smith,{" "}
      <Txt.i>Did I sell out my principles by supporting Trump?</Txt.i> (Twitter
      Space),{" "}
      <Txt glow fill={colors.sky500}>
        https://x.com/ComicDaveSmith/status/1860865805006590365
      </Txt>
      , t. 01:33:54
    </Txt>,
  );

  const rebekah = createRef<Txt>();

  view.add(
    <Txt
      ref={rebekah}
      writeOn={0}
      glow
      fontFamily="ProggyClean CE Nerd Font"
      fontSize={200}
      position={[0, 650]}
    >
      "I am kind of somewhere in the middle."
    </Txt>,
  );

  yield* after(
    "rebekah's shit",
    rebekah().writeOn(1, 1),
    citation[1].opacity(1, 1),
  );

  yield* after(
    "massie out",
    rebekah().writeOn(0, 1),
    citation[1].opacity(0, 1),
  );

  yield* after("monhop in", speakerIn("@MonarchoHoppean"));

  yield* waitUntil("end");
});
