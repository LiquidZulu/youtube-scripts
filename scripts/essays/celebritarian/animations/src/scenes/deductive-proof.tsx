import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Camera,
  TxtProps,
  RayProps,
  LineProps,
  Line,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Reference,
  sequence,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  McasTxtProps,
  fixCamera,
  after,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const camera = createRef<Camera>();

  const origin = createRef<Txt>();
  const originLines = createRefArray<Line>();

  const noOwners = createRef<Txt>();
  const noOwnersLine = createRef<Line>();

  const nobodyRightToExclude = createRef<Txt>();

  const singleOwner = createRef<Txt>();
  const singleOwnerLine = createRef<Line>();

  const singleOwnerCanExclude = createRef<Txt>();
  const singleOwnerCanExcludeLine = createRef<Line>();

  const burdenOnDave = createRef<Txt>();

  const groupOwners = createRef<Txt>();
  const groupOwnersLine = createRef<Line>();

  const contradiction = createRef<Txt>();
  const contradictionLine = createRef<Line>();

  const contradictionProof = createRef<Txt>();
  const contradictionProofLines = createRefArray<Line>();

  const aOwns = createRef<Txt>();
  const aOwnsLine = createRef<Line>();

  const bOwns = createRef<Txt>();
  const bOwnsLine = createRef<Line>();

  const aWins = createRef<Txt>();
  const aWinsLine = createRef<Line>();

  const bWins = createRef<Txt>();
  const bWinsLine = createRef<Line>();

  const spearfishingContradiction = createRef<Txt>();

  const txtProps: McasTxtProps = {
    fontFamily: "ProggyClean CE Nerd Font",
    glow: true,
    fontSize: 100,
    writeOn: 0,
  };

  const lineProps: LineProps = {
    lineWidth: 22,
    stroke: "white",
    endArrow: true,
    arrowSize: 30,
    radius: 50,
    shadowBlur: 80,
    shadowColor: "white",
    end: 0,
  };

  view.add(
    <Camera ref={camera}>
      <Txt ref={origin} {...txtProps}>
        scarce means
      </Txt>
      <Line
        {...lineProps}
        ref={originLines}
        points={[
          [0, 100],
          [0, 400],
          [-800, 400],
          [-800, 800],
        ]}
      />
      <Txt ref={noOwners} {...txtProps} position={[-800, 900]}>
        no owners
      </Txt>
      <Line
        {...lineProps}
        ref={noOwnersLine}
        points={[
          [-800, 1000],
          [-800, 1400],
          [-1600, 1400],
          [-1600, 1800],
        ]}
      />
      <Txt ref={nobodyRightToExclude} {...txtProps} position={[-1600, 1900]}>
        nobody has the right to exclude anybody from it
      </Txt>
      <Line
        {...lineProps}
        ref={originLines}
        points={[
          [0, 100],
          [0, 800],
        ]}
      />
      <Txt ref={singleOwner} {...txtProps} position={[0, 900]}>
        single owner
      </Txt>
      <Line
        ref={singleOwnerLine}
        {...lineProps}
        points={[
          [0, 1000],
          [0, 2200],
        ]}
      />
      <Txt ref={singleOwnerCanExclude} {...txtProps} position={[0, 2300]}>
        that single owner is allowed to exclude people
      </Txt>
      <Line
        {...lineProps}
        ref={singleOwnerCanExcludeLine}
        points={[
          [0, 2400],
          [0, 2800],
        ]}
      />
      <Txt
        textAlign="center"
        textWrap
        maxWidth={1900}
        ref={burdenOnDave}
        {...txtProps}
        position={[0, 3100]}
      >
        the burden lies on Dave to show that for some particular possession, it
        is owned by some particular guy who doesn't want some particular
        immigrant to make use of it.
      </Txt>
      <Line
        {...lineProps}
        ref={originLines}
        points={[
          [0, 100],
          [0, 400],
          [800, 400],
          [800, 800],
        ]}
      />
      <Txt ref={groupOwners} {...txtProps} position={[800, 900]}>
        group of owners
      </Txt>
      <Line
        {...lineProps}
        ref={groupOwnersLine}
        points={[
          [800, 1000],
          [800, 1400],
          [1600, 1400],
          [1600, 1800],
        ]}
      />
      <Txt ref={contradiction} {...txtProps} position={[1600, 1900]}>
        contradiction
      </Txt>
      <Line
        {...lineProps}
        ref={contradictionLine}
        points={[
          [1600, 2000],
          [1600, 2300],
          [2600, 2300],
          [2600, 2800],
        ]}
      />
      <Txt
        textAlign="center"
        ref={contradictionProof}
        {...txtProps}
        position={[2600, 3000]}
      >
        {"\{"}A,…,Z{"\}"} own a stick;{"\n"}A wants to spearfish, B doesn't want
        the stick used in this way.{"\n"}Who should win this conflict?
      </Txt>
      <Line
        {...lineProps}
        ref={contradictionProofLines}
        points={[
          [2600, 3200],
          [2600, 3600],
          [1600, 3600],
          [1600, 4000],
        ]}
      />
      <Txt ref={aOwns} {...txtProps} position={[1600, 4100]}>
        A owns the stick
      </Txt>
      <Line
        {...lineProps}
        ref={aOwnsLine}
        points={[
          [1600, 4200],
          [1600, 4600],
        ]}
      />
      <Txt ref={aWins} {...txtProps} position={[1600, 4700]}>
        A should win the conflict
      </Txt>
      <Line
        {...lineProps}
        ref={aWinsLine}
        points={[
          [1600, 4800],
          [1600, 5200],
          [2600, 5200],
          [2600, 5600],
        ]}
      />
      <Line
        {...lineProps}
        ref={contradictionProofLines}
        points={[
          [2600, 3200],
          [2600, 3600],
          [3600, 3600],
          [3600, 4000],
        ]}
      />
      <Txt ref={bOwns} {...txtProps} position={[3600, 4100]}>
        B owns the stick
      </Txt>
      <Line
        {...lineProps}
        ref={bOwnsLine}
        points={[
          [3600, 4200],
          [3600, 4600],
        ]}
      />
      <Txt ref={bWins} {...txtProps} position={[3600, 4700]}>
        B should win the conflict
      </Txt>
      <Line
        {...lineProps}
        ref={bWinsLine}
        points={[
          [3600, 4800],
          [3600, 5200],
          [2600, 5200],
          [2600, 5600],
        ]}
      />
      <Txt
        ref={spearfishingContradiction}
        {...txtProps}
        position={[2600, 5700]}
      >
        The spearfishing should and should not go forth
      </Txt>
    </Camera>,
  );

  fixCamera(view, camera);

  function* itemIn(line: Reference<Line>, text: Reference<Txt>) {
    yield* sequence(
      0.2,
      line().end(1, 1),
      text().writeOn(1, text().text().length < 20 ? 0.5 : 1),
    );
  }

  yield* origin().writeOn(1, 0.5);

  yield* after(
    "nobody owns",
    camera().position([0, 400], 1),
    itemIn(() => originLines[0], noOwners),
  );

  yield* after(
    "single owns",
    itemIn(() => originLines[1], singleOwner),
  );

  yield* after(
    "group owns",
    itemIn(() => originLines[2], groupOwners),
  );

  yield* after(
    "no owns implication",
    camera().centerOn(nobodyRightToExclude(), 1),
    itemIn(noOwnersLine, nobodyRightToExclude),
  );

  yield* after(
    "single own implication",
    camera().centerOn(singleOwnerCanExclude(), 1),
    itemIn(singleOwnerLine, singleOwnerCanExclude),
  );

  yield* after(
    "group owns implication",
    camera().centerOn(contradiction(), 1),
    itemIn(groupOwnersLine, contradiction),
  );

  yield* after(
    "contradiction proof",
    camera().centerOn(contradictionProof(), 1),
    camera().zoom(0.8, 1),
    itemIn(contradictionLine, contradictionProof),
  );

  yield* after(
    "a owns",
    camera().position(camera().position().addY(800), 1),
    itemIn(() => contradictionProofLines[0], aOwns),
  );

  yield* after("a should win", itemIn(aOwnsLine, aWins));

  yield* after(
    "b owns",
    itemIn(() => contradictionProofLines[1], bOwns),
  );

  yield* after("b should win", itemIn(bOwnsLine, bWins));

  yield* after(
    "spearfishing contradiction",
    camera().centerOn(spearfishingContradiction(), 1),
    sequence(
      0.2,
      aWinsLine().end(1, 1),
      itemIn(bWinsLine, spearfishingContradiction),
    ),
  );

  yield* after(
    "only possibilities",
    camera().position([0, 400], 1),
    camera().zoom(1, 1),
  );

  yield* after("eminent domain", camera().centerOn(singleOwnerCanExclude(), 1));

  yield* after(
    "burden on Dave",
    camera().centerOn(burdenOnDave(), 1),
    itemIn(singleOwnerCanExcludeLine, burdenOnDave),
  );

  yield* after("proof established", camera().zoom(0.3, 1));

  yield* waitUntil("end");
});
