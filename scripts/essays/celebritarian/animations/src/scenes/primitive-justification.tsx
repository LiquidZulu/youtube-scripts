import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Camera,
  Line,
  Grid,
  Circle,
  Segment,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  sequence,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  fixCamera,
  flash,
  after,
  romanNumerals,
} from "mcas";
import * as colors from "mcas/colors";

import rothImg from "../assets/rothbard.jpg";

export default makeScene2D(function* (view) {
  view.fill(0);

  const camera = createRef<Camera>();
  const content = createRefArray<Rect>();
  const parts = createRefArray<Txt>();
  const ands = createRefArray<Txt>();
  const conjunctiveWriteOn = createSignal(0);
  const totalLength =
    `"Men own themselves"and"Men can homestead things"and"Men can trade things"`
      .length;
  const titles = createRefArray<Txt>();
  const rest = createRef<Txt>();
  const conjunctiveImplication = createRef<Ray>();
  const rothbard = createRef<Img>();
  const rothbardCont = createRef<Rect>();

  const unit = 80;
  const a = 3 * unit;
  const b = 4 * unit;
  const c = 5 * unit;

  // Triangle points: right angle at (0,0), a along x-axis, b along negative y (upwards, since y positive down in canvas)
  const points = [
    [0, 0],
    [a, 0],
    [0, -b],
  ];

  // Midpoint of hypotenuse
  const midX = (a + 0) / 2;
  const midY = (0 + -b) / 2;

  // Vector along hypotenuse: from (a,0) to (0,-b) -> (-a, -b)
  // CCW perpendicular for outward: (-(-b), -a) -> (b, -a)
  const perpX = b;
  const perpY = -a;

  // Angle of hypotenuse
  const angle = Math.atan2(-b, -a) * (180 / Math.PI);

  // Unit perpendicular
  const perpLength = c;
  const unitPerpX = perpX / perpLength;
  const unitPerpY = perpY / perpLength;

  // Offset for center of hypot square: perpendicular * (c / 2)
  const offsetX = unitPerpX * (c / 2);
  const offsetY = unitPerpY * (c / 2);

  // Center of hypot square
  const hypotCenterX = midX + offsetX;
  const hypotCenterY = midY + offsetY;

  // To center the entire diagram in the view (approximate shift)
  const shiftX = -150; // Adjust based on overall bounding box
  const shiftY = 200;

  // Triangle
  const triangle = createRef<Line>();

  // Square on side a (bottom, extending down)
  const aSquare = createRef<Rect>();

  // Square on side b (left, extending left)
  const bSquare = createRef<Rect>();

  // Square on hypotenuse (rotated and positioned outward)
  const cSquare = createRef<Rect>();

  const pythagoreanTheorem = createRef<Txt>();

  const pixelRadius = unit * 6;
  const theta = 45 * (Math.PI / 180);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const tanTheta = Math.tan(theta);
  const cotTheta = 1 / tanTheta;
  const secTheta = 1 / cosTheta;
  const cscTheta = 1 / sinTheta;
  const trigShiftX = (-pixelRadius * (1 - cotTheta)) / 2; // this doesn't actually do anything it appears, it is just left over from when I was vibe-coding and I cba to remove it.
  const axesScale = 1;

  const trigLines = createRefArray<Circle | Line>();
  const trigTxts = createRefArray<Txt>();

  const axiomsText = [
    "Magnitudes which are equal to the ſame are equal to each other.",
    "If equals be added to equals the ſums will be equal.",
    "If equals be taken away from equals the remainders will be equal.",
    "If equals be added to unequals the ſums will be unequal.",
    "If equals be taken away from unequals the remainders will be unequal.",
    "The doubles of the ſame or equal magnitudes are equal.",
    "The halves of the ſame or equal magnitudes are equal.",
    "Magnitudes which coincide with one another, or exaﬆly fill the same ſpace, are equal.",
    "The whole is greater than its part.",
    "Two ﬆraight lines cannot include a ſpace.",
    "All right angles are equal.",
    "If two ﬆraight lines meet a third ﬆraight line ſo as to make the two interior angles on the ſame ſide leſs than two right angles, theſe two ﬆtraight lines will meet if they be produced on that ſide on which the angles are leſs than two right angles.",
  ];
  const axioms = createRefArray<Rect>();
  const axiomsCont = createRef<Rect>();

  const foundation = createRef<Rect>();
  const foundationTitle = createRef<Txt>();
  const foundationSubtitle = createRef<Txt>();
  const foundationNumbers = createRefArray<Txt>();
  const foundationSolutions = createRefArray<Txt>();

  view.add(
    <Camera ref={camera}>
      <Rect
        position={[0, -200]}
        ref={content}
        layout
        direction="column"
        size={view.size}
        alignItems="center"
        justifyContent="center"
        gap={600}
      >
        <Txt
          ref={titles}
          writeOn={0}
          uppercase
          glow
          fill="red"
          fontFamily="oswald"
          fontSize={200}
        >
          the error of compound principles
        </Txt>
        <Rect layout direction="column" gap={64} alignItems="center">
          <Txt glow fontFamily="ProggyClean CE Nerd Font" fontSize={110}>
            <Txt
              fontFamily="ProggyClean CE Nerd Font"
              ref={parts}
              writeOn={() =>
                Math.max(
                  0,
                  Math.min(
                    1,
                    (conjunctiveWriteOn() - 0 / totalLength) /
                      (18 / totalLength),
                  ),
                )
              }
            >
              "Men own themselves"
            </Txt>{" "}
            <Txt ref={ands}>
              <Txt.i
                writeOn={() =>
                  Math.max(
                    0,
                    Math.min(
                      1,
                      (conjunctiveWriteOn() - 19 / totalLength) /
                        (3 / totalLength),
                    ),
                  )
                }
              >
                and
              </Txt.i>
            </Txt>{" "}
            <Txt
              ref={parts}
              writeOn={() =>
                Math.max(
                  0,
                  Math.min(
                    1,
                    (conjunctiveWriteOn() - 23 / totalLength) /
                      (23 / totalLength),
                  ),
                )
              }
            >
              "Men can homestead things"
            </Txt>{" "}
            <Txt ref={ands}>
              <Txt.i
                writeOn={() =>
                  Math.max(
                    0,
                    Math.min(
                      1,
                      (conjunctiveWriteOn() - 47 / totalLength) /
                        (3 / totalLength),
                    ),
                  )
                }
              >
                and
              </Txt.i>
            </Txt>{" "}
            <Txt
              ref={parts}
              writeOn={() =>
                Math.max(
                  0,
                  Math.min(
                    1,
                    (conjunctiveWriteOn() - 51 / totalLength) /
                      (19 / totalLength),
                  ),
                )
              }
            >
              "Men can trade things"
            </Txt>
          </Txt>
          <Ray
            end={0}
            ref={conjunctiveImplication}
            shadowBlur={50}
            shadowColor="white"
            stroke="white"
            lineWidth={50}
            endArrow
            arrowSize={60}
            toY={200}
          />
          <Txt
            writeOn={0}
            ref={rest}
            glow
            fontFamily="ProggyClean CE Nerd Font"
            fontSize={110}
          >
            The rest of libertarian legal theory.
          </Txt>
        </Rect>
      </Rect>
      <Rect
        end={0}
        position={[0, 1200]}
        ref={rothbardCont}
        layout
        lineWidth={50}
        stroke="red"
        shadowBlur={50}
        shadowColor="red"
      >
        <Img opacity={0} ref={rothbard} src={rothImg} width={700} />
      </Rect>
      <Rect
        position={[0, 3500]}
        ref={content}
        width={view.width}
        height={view.height() + 1100}
        layout
        direction="column"
        justifyContent="space-evenly"
      >
        <Rect
          layout
          width={view.width}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Rect layout direction="column" alignItems="center">
            {/* pythagoras */}
            <Rect size={unit * 12}>
              <Line
                layout={false}
                ref={triangle}
                points={points.map((p) => [p[0] + shiftX, p[1] + shiftY])}
                closed
                stroke={"#ffffff"}
                lineWidth={0}
              />
              <Rect
                end={0}
                shadowBlur={20}
                shadowColor="white"
                layout={false}
                clip
                ref={aSquare}
                position={[a / 2 + shiftX, a / 2 + shiftY]}
                size={a}
                stroke={"#ffffff"}
                lineWidth={12}
              >
                <Grid
                  width={"100%"}
                  height={"100%"}
                  spacing={unit / 2}
                  stroke={"#aaaaaa"}
                  lineWidth={4}
                />
              </Rect>
              <Rect
                end={0}
                shadowBlur={20}
                shadowColor="white"
                layout={false}
                clip
                ref={bSquare}
                position={[-b / 2 + shiftX, -b / 2 + shiftY]}
                size={b}
                stroke={"#ffffff"}
                lineWidth={12}
              >
                <Grid
                  width={"100%"}
                  height={"100%"}
                  spacing={unit / 2}
                  stroke={"#aaaaaa"}
                  lineWidth={4}
                />
              </Rect>
              <Rect
                end={0}
                shadowBlur={20}
                shadowColor="white"
                layout={false}
                clip
                ref={cSquare}
                position={[hypotCenterX + shiftX, hypotCenterY + shiftY]}
                size={c}
                rotation={angle}
                stroke={"#ffffff"}
                lineWidth={12}
              >
                <Grid
                  width={"100%"}
                  height={"100%"}
                  spacing={unit / 2}
                  stroke={"#aaaaaa"}
                  lineWidth={4}
                />
              </Rect>
            </Rect>
            <Txt
              ref={pythagoreanTheorem}
              writeOn={0}
              fontSize={100}
              glow
              fontFamily="ProggyClean CE Nerd Font"
            >
              a² + b² = c²
            </Txt>
          </Rect>
          {/* trig */}
          <Rect layout direction="column" alignItems="center">
            <Rect size={unit * 13}>
              <Rect layout={false}>
                {/* unit circle */}
                <Circle
                  ref={trigLines}
                  end={0}
                  shadowBlur={50}
                  shadowColor="white"
                  layout={false}
                  position={[trigShiftX, 0]}
                  size={pixelRadius * 2}
                  stroke={"#ffffff"}
                  lineWidth={8}
                />
                {/* axes */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX - pixelRadius * axesScale, 0],
                    [trigShiftX + pixelRadius * axesScale, 0],
                  ]}
                  stroke={"#00aaff"}
                  lineWidth={4}
                />
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX, -pixelRadius * axesScale],
                    [trigShiftX, pixelRadius * axesScale],
                  ]}
                  stroke={"#00aaff"}
                  lineWidth={4}
                />
                {/* hypotenuse */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX, 0],
                    [
                      trigShiftX + pixelRadius * cosTheta,
                      -pixelRadius * sinTheta,
                    ],
                  ]}
                  shadowBlur={50}
                  shadowColor="white"
                  stroke={"#ffffff"}
                  lineWidth={8}
                />
                {/* cosine */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX, -(pixelRadius * cosTheta)],
                    [
                      trigShiftX + pixelRadius * cosTheta,
                      -(pixelRadius * cosTheta),
                    ],
                  ]}
                  shadowBlur={50}
                  shadowColor="red"
                  stroke={"#ff0000"}
                  lineWidth={8}
                />
                {/* sine */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX + pixelRadius * cosTheta, 0],
                    [
                      trigShiftX + pixelRadius * cosTheta,
                      -pixelRadius * sinTheta,
                    ],
                  ]}
                  shadowBlur={50}
                  shadowColor={colors.sky500}
                  stroke={colors.sky500}
                  lineWidth={8}
                />
                {/* secant */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX, 0],
                    [trigShiftX + 2 * (pixelRadius * cosTheta), 0],
                  ]}
                  shadowBlur={50}
                  shadowColor="green"
                  stroke={"#00ff00"}
                  lineWidth={8}
                />
                {/* tangent */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX + 2 * (pixelRadius * cosTheta), 0],
                    [
                      trigShiftX + pixelRadius * cosTheta,
                      -pixelRadius * sinTheta,
                    ],
                  ]}
                  shadowBlur={50}
                  shadowColor="ffa500"
                  stroke={"#ffa500"}
                  lineWidth={8}
                />
                {/* cosecant */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [trigShiftX, 0],
                    [trigShiftX, -2 * (pixelRadius * cosTheta)],
                  ]}
                  shadowBlur={50}
                  shadowColor="ff00ff"
                  stroke={"#ff00ff"}
                  lineWidth={8}
                />
                {/* cotangent */}
                <Line
                  ref={trigLines}
                  end={0}
                  layout={false}
                  points={[
                    [
                      trigShiftX + pixelRadius * cosTheta,
                      -pixelRadius * sinTheta,
                    ],
                    [trigShiftX, -2 * (pixelRadius * cosTheta)],
                  ]}
                  shadowBlur={50}
                  shadowColor="a020f0"
                  stroke={"#a020f0"}
                  lineWidth={8}
                />
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  layout={false}
                  position={[
                    trigShiftX + (pixelRadius / 4) * Math.cos(theta / 2),
                    -(pixelRadius / 4) * Math.sin(theta / 2),
                  ]}
                  fontSize={30}
                  fill={"#ffffff"}
                >
                  θ
                </Txt>
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  layout={false}
                  position={[
                    trigShiftX +
                      (pixelRadius / 4) * Math.cos((theta + Math.PI / 2) / 2) +
                      4,
                    -(pixelRadius / 4) * Math.sin((theta + Math.PI / 2) / 2),
                  ]}
                  fontSize={28}
                  fill={"#ffffff"}
                >
                  90° - θ
                </Txt>
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  glow
                  fontFamily="ProggyClean CE Nerd Font"
                  layout={false}
                  position={[
                    trigShiftX + (pixelRadius * cosTheta) / 2,
                    -(pixelRadius * cosTheta) - 25,
                  ]}
                  fontSize={50}
                  fill={"#ff0000"}
                >
                  cosine
                </Txt>
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  rotation={90}
                  layout={false}
                  position={[
                    trigShiftX + pixelRadius * cosTheta + 25,
                    -(pixelRadius * sinTheta) / 2,
                  ]}
                  glow
                  fontFamily="ProggyClean CE Nerd Font"
                  fontSize={50}
                  fill={colors.sky500}
                >
                  sine
                </Txt>
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  rotation={theta * (180 / Math.PI)}
                  layout={false}
                  position={[
                    trigShiftX + pixelRadius + 50,
                    -(pixelRadius * tanTheta) / 2 + 45,
                  ]}
                  glow
                  fontFamily="ProggyClean CE Nerd Font"
                  fontSize={50}
                  fill={"#ffa500"}
                >
                  tangent
                </Txt>
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  layout={false}
                  position={[trigShiftX + pixelRadius * cosTheta, 30]}
                  glow
                  fontFamily="ProggyClean CE Nerd Font"
                  fontSize={50}
                  fill={"#00ff00"}
                >
                  secant
                </Txt>
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  rotation={-90}
                  layout={false}
                  position={[trigShiftX - 30, -(pixelRadius * cosTheta)]}
                  glow
                  fontFamily="ProggyClean CE Nerd Font"
                  fontSize={50}
                  fill={"#ff00ff"}
                >
                  cosecant
                </Txt>
                <Txt
                  ref={trigTxts}
                  writeOn={0}
                  rotation={theta * (180 / Math.PI)}
                  layout={false}
                  position={[
                    trigShiftX + (pixelRadius * cosTheta) / 2 + 20,
                    -(pixelRadius * cosTheta) - 200,
                  ]}
                  glow
                  fontFamily="ProggyClean CE Nerd Font"
                  fontSize={50}
                  fill={"#a020f0"}
                >
                  cotangent
                </Txt>
              </Rect>
            </Rect>
            {/* <Txt fontSize={100} glow fontFamily="ProggyClean CE Nerd Font">
          sin²θ + cos²θ = 1
          </Txt> */}
          </Rect>
        </Rect>
        <Rect
          ref={axiomsCont}
          layout
          width={view.width}
          alignItems="center"
          justifyContent="space-evenly"
          wrap="wrap"
          gap={[0, 64]}
        >
          {...axiomsText.map((text, i) => (
            <Rect
              opacity={0}
              ref={axioms}
              layout
              direction="column"
              gap={32}
              alignItems="center"
              width={840}
            >
              <Txt glow fill="white" fontFamily="Junicode" textWrap>
                {romanNumerals(i + 1) + "."}
              </Txt>
              <Txt glow fill="white" fontFamily="Junicode" textWrap>
                {text}
              </Txt>
            </Rect>
          ))}
        </Rect>
      </Rect>
      <Rect
        alignItems="center"
        justifyContent="center"
        ref={foundation}
        layout
        direction="column"
        position={[-view.width(), 0]}
        size={view.size}
        gap={128}
      >
        <Txt
          fontSize={200}
          ref={foundationTitle}
          uppercase
          fontFamily="oswald"
          fill="red"
          glow
        >
          the foundation of law
        </Txt>
        <Rect direction="column">
          <Txt
            fontSize={90}
            ref={foundationSubtitle}
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
            fill="white"
            glow
          >
            Conflicts are possible, so how should we deal with them?{"\n\n"}
          </Txt>
          {...[
            "The Non-Aggression Principle",
            "The Law of the Jungle",
            "Mixed-Law",
          ].map((x, i) => (
            <Rect gap={32}>
              <Txt
                fontSize={70}
                ref={foundationNumbers}
                opacity={0}
                fontFamily="ProggyClean CE Nerd Font"
                fill="white"
                glow
              >
                {i + 1 + "."}
              </Txt>
              <Txt
                fontSize={70}
                ref={foundationSolutions}
                writeOn={0}
                fontFamily="ProggyClean CE Nerd Font"
                fill="white"
                glow
              >
                {x}
              </Txt>
            </Rect>
          ))}
        </Rect>
      </Rect>
    </Camera>,
  );

  fixCamera(view, camera);

  yield* conjunctiveWriteOn(1, 1);
  yield* after(
    "indicate self ownership",
    flash(() => parts[0], "red"),
  );

  yield* after(
    "homesteading",
    flash(() => parts[1], "red"),
    after(
      "trade",
      flash(() => parts[2], "red"),
      after(
        "establish libertarian legal theory",
        conjunctiveImplication().end(1, 1),
        delay(0.4, rest().writeOn(1, 1)),
      ),
    ),
  );

  yield* after("error", titles[0].writeOn(1, 1));

  yield* after(
    "roth in",
    camera().zoom(0.78, 1),
    camera().position([0, 400], 1),
    delay(0.3, all(rothbard().opacity(1, 1), rothbardCont().end(1, 1))),
  );

  function* shadowFlash(thing: any) {
    yield* thing().shadowBlur(100, 0.4).to(0, 0.4);
  }

  yield* after(
    "self own again",
    shadowFlash(() => parts[0]),
  );
  yield* after(
    "homesteading again",
    shadowFlash(() => parts[1]),
    after(
      "trade again",
      shadowFlash(() => parts[2]),
    ),
  );

  yield* after(
    "mathematical equivalent",
    camera().centerOn([0, view.height() + 600], 1),
    camera().zoom(1, 1),
    after(
      "pythagoras in",
      pythagoreanTheorem().writeOn(1, 1),
      sequence(
        0.2,
        aSquare().end(1, 1),
        bSquare().end(1, 1),
        cSquare().end(1, 1),
      ),
    ),
  );

  yield* after(
    "trig in",
    sequence(0.05, ...trigLines.map((line) => line.end(1, 1))),
    delay(0.3, sequence(0.05, ...trigTxts.map((txt) => txt.writeOn(1, 1)))),
  );

  yield* after(
    "axioms in",
    camera().centerOn(axiomsCont(), 1),
    sequence(0.1, ...axioms.map((a) => a.opacity(1, 1))),
  );

  yield* after("back to trig", camera().centerOn([0, view.height() + 600], 1));

  yield* after("back to beginning", camera().position(0, 2));

  yield* after(
    "indicate self ownership 1",
    flash(() => parts[0], "red"),
  );

  yield* after(
    "homesteading 1",
    flash(() => parts[1], "red"),
    after(
      "trade 1",
      flash(() => parts[2], "red"),
    ),
  );

  yield* after(
    "indicate ands",
    sequence(0.1, ...ands.map((and) => flash(() => and, "red"))),
  );

  yield* after(
    "foundation",
    camera().centerOn(foundationTitle(), 1),
    after(
      "subtitle in",
      camera().centerOn(foundation(), 1),
      foundationSubtitle().writeOn(1, 1),
    ),
  );

  yield* after(
    "nums in",
    sequence(0.1, ...foundationNumbers.map((num) => num.opacity(1, 1))),
    after("solution 1", foundationSolutions[0].writeOn(1, 1)),
  );
  yield* after("solution 2", foundationSolutions[1].writeOn(1, 1));
  yield* after("solution 3", foundationSolutions[2].writeOn(1, 1));

  yield* waitFor(10);
});
