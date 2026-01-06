import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Camera,
  RectProps,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
  waitUntil,
  useDuration,
  linear,
  easeOutSine,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  ArrowList,
  SquigglyBorder,
  zwsp,
  after,
  flash,
} from "mcas";
import * as colors from "mcas/colors";

import deweyPicture from "../assets/dewey.jpg";
import kantPicture from "../assets/kant.png";
import platoPicture from "../assets/plato.png";
import hegelPicture from "../assets/hegel.png";
import descartesPicture from "../assets/descartes.jpg";

// TODO: add retro scroll wheel on side when it becomes clear how much content there is

export default makeScene2D(function* (view) {
  view.fill(0);

  const content = createRef<Rect>();
  const columns = createRefArray<Rect>();

  const historytitle = createRef<Txt>();
  const historyarrows = createRefArray<Ray>();
  const historypoints = createRefArray<Txt>();

  const deweycont = createRef<Rect>();
  const deweyimg = createRef<Img>();

  view.add(
    <Rect
      layout
      ref={content}
      direction="row"
      position={[view.width() / 2, 0]}
    />,
  );

  content().add(<Rect ref={columns} direction="column" />);
  content().add(<Rect ref={columns} direction="column" width={view.width()} />);

  const sectionProps: RectProps = {
    size: view.size(),
    alignItems: "center",
    justifyContent: "center",
  };

  columns[0].add(
    <Rect {...sectionProps}>
      <Rect layout gap={256} size={{ x: 3242.40625, y: 1476 }}>
        <Rect
          size={{ x: 1905.40625, y: 1476 }}
          direction="column"
          alignItems="center"
          gap={128}
        >
          <Rect size={{ x: 1905.40625, y: 240 }}>
            <Txt
              glow
              ref={historytitle}
              fontFamily="oswald"
              fill="red"
              fontSize={200}
            >
              {zwsp}
            </Txt>
          </Rect>
          <Rect
            width={1905.40625}
            direction="column"
            fontSize={100}
            fontFamily="ProggyClean CE Nerd Font"
            alignItems="start"
            gap={80}
          >
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={historyarrows}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow ref={historypoints} writeOn={0}>
                Possibility for knowledge about the{"\n"}world has been under
                attack.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={historyarrows}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow ref={historypoints} writeOn={0}>
                Sought to bring philosophy back down to{"\n"}Earth, and make it{" "}
                <Txt.i>work</Txt.i> for the every day{"\n"}man.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={historyarrows}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow ref={historypoints} writeOn={0}>
                The purpose of theory is action; the{"\n"}standard of whether a
                theory is true is{"\n"}whether it <Txt.i>works</Txt.i>.
              </Txt>
            </Rect>
          </Rect>
        </Rect>
        <Rect
          ref={deweycont}
          shadowColor="red"
          shadowBlur={150}
          stroke="red"
          lineWidth={64}
          end={0}
        >
          <Img opacity={0} ref={deweyimg} src={deweyPicture} />
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* all(
    historytitle().text(`history of pragmatism`.toUpperCase(), 1),
    deweycont().end(1, 1),
    deweyimg().opacity(1, 1),
    historyarrows[0].end(1, 1),
    historypoints[0].writeOn(1, 1),
  );

  const historyportraits = createRefArray<Img>();

  view.add(
    <Rect layout gap={128} position={[-650, 400]}>
      <Img
        ref={historyportraits}
        scale={0}
        stroke="red"
        lineWidth={32}
        shadowColor="red"
        shadowBlur={90}
        height={600}
        src={kantPicture}
      />
      <Img
        ref={historyportraits}
        scale={0}
        stroke="red"
        lineWidth={32}
        shadowColor="red"
        shadowBlur={90}
        height={600}
        src={platoPicture}
      />
      <Img
        ref={historyportraits}
        scale={0}
        stroke="red"
        lineWidth={32}
        shadowColor="red"
        shadowBlur={90}
        height={600}
        src={hegelPicture}
      />
    </Rect>,
  );

  yield* after(
    "kant",
    popin(() => historyportraits[0]),
  );
  yield* after(
    "plato",
    popin(() => historyportraits[1]),
  );
  yield* after(
    "hegel",
    popin(() => historyportraits[2]),
  );

  yield* after(
    "portraits out",
    sequence(0.1, ...historyportraits.map((x) => popout(() => x))),
    after(
      "back down to earth",
      historyarrows[1].end(1, 1),
      historypoints[1].writeOn(1, 1),
    ),
  );

  yield* after(
    "purpose theory",
    historyarrows[2].end(1, 1),
    historypoints[2].writeOn(1, 1),
  );

  historypoints[2].shadowBlur(0);
  for (let child of historypoints[2].children()) {
    child.shadowBlur(100);
    child.shadowColor("#E4E0DA");
  }

  yield* after(
    "highlight standard",
    sequence(
      0.01,
      ...historypoints[2]
        .children()
        .slice(33)
        .map((x) => all(x.fill("red", 0.4), x.shadowColor("red", 0.4))),
    ),
  );

  historypoints[0].children(
    <Txt>
      Possibility for knowledge about the{"\n"}world has been under attack.
    </Txt>,
  );

  historypoints[1].children(
    <Txt>
      Sought to bring philosophy back down to{"\n"}Earth, and make it{" "}
      <Txt.i>work</Txt.i> for the every day{"\n"}man.
    </Txt>,
  );

  historypoints[2].children(
    <Txt>
      <Txt glow>The purpose of theory is action;</Txt>{" "}
      <Txt fill="red" glow>
        the{"\n"}standard of whether a theory is true is{"\n"}whether it{" "}
        <Txt.i>works</Txt.i>.
      </Txt>
    </Txt>,
  );

  yield* after(
    "indicate theory",
    flash(() => historypoints[2], "red"),
  );

  yield* waitUntil("cartesian proof");

  content().position([view.width() / 2, view.height() / 2]);

  const cartesianrays = createRefArray<Ray>();
  const cartesianpoints = createRefArray<Txt>();

  columns[0].add(
    <Rect {...sectionProps}>
      <Rect layout gap={256}>
        <Img
          size={{ x: 817, y: 1000 }}
          shadowColor="red"
          shadowBlur={150}
          stroke="red"
          lineWidth={64}
          src={descartesPicture}
        />
        <Rect direction="column" alignItems="center" gap={128} maxWidth={2300}>
          <Rect>
            <Txt glow fontFamily="oswald" fill="red" fontSize={200} uppercase>
              cartesian pragmatism
            </Txt>
          </Rect>
          <Rect
            direction="column"
            fontSize={100}
            fontFamily="ProggyClean CE Nerd Font"
            gap={80}
          >
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={cartesianrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={cartesianpoints} writeOn={0}>
                Cartesian Doubt: to know something with certainty means that you
                couldn't be wrong about that thing.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={cartesianrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={cartesianpoints} writeOn={0}>
                Man is fallible, so he <Txt.i>can</Txt.i> be wrong about things.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={cartesianrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={cartesianpoints} writeOn={0}>
                \therefore you must doubt everything which is dubitable.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={cartesianrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={cartesianpoints} writeOn={0}>
                This theory of truth is useless, so better to say that the true
                is that which works.
              </Txt>
            </Rect>
          </Rect>
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* content().position([view.width() / 2, -view.height() * 0.5], 1);

  yield* after(
    "CD argument",
    cartesianrays[0].end(1, 1),
    cartesianpoints[0].writeOn(1, 1),
  );

  yield* after(
    "man fallible",
    cartesianrays[1].end(1, 1),
    cartesianpoints[1].writeOn(1, 1),
  );

  yield* after(
    "scepticism conclusion",
    cartesianrays[2].end(1, 1),
    cartesianpoints[2].writeOn(1, 1),
  );

  yield* after(
    "indicate classic theory of truth",
    flash(() => cartesianpoints[0], "red"),
  );

  yield* after(
    "pragmatist conclusion",
    cartesianrays[3].end(1, 1),
    cartesianpoints[3].writeOn(1, 1),
  );

  cartesianpoints[0].children(
    <Txt>
      Cartesian Doubt: to know something with certainty means that you couldn't
      be wrong about that thing.
    </Txt>,
  );
  cartesianpoints[1].children(
    <Txt>
      Man is fallible, so he <Txt.i>can</Txt.i> be wrong about things.
    </Txt>,
  );

  cartesianpoints[2].children(
    <Txt>\therefore you must doubt everything which is dubitable.</Txt>,
  );

  cartesianpoints[3].children(
    <Txt>
      This theory of truth is useless, so better to say that the true is that
      which works.
    </Txt>,
  );

  yield* waitUntil("ethical implications");

  const implicationpoints = createRefArray<Txt>();
  const implicationrays = createRefArray<Ray>();

  content().position([view.width() / 2, 0]);
  columns[0].add(
    <Rect {...sectionProps}>
      <Rect layout gap={256}>
        <Rect direction="column" alignItems="center" gap={128} maxWidth={2300}>
          <Rect>
            <Txt glow fontFamily="oswald" fill="red" fontSize={200} uppercase>
              ethical implications of pragmatism
            </Txt>
          </Rect>
          <Rect
            direction="column"
            fontSize={100}
            fontFamily="ProggyClean CE Nerd Font"
            gap={80}
          >
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={implicationrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={implicationpoints} writeOn={0}>
                No unyielding ethical principles: what works today might not
                work tomorrow.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={implicationrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={implicationpoints} writeOn={0}>
                The standard of truth is whether it achieves some human purpose,
                so the laws of logic are not absolute.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={implicationrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={implicationpoints} writeOn={0}>
                \therefore the purpose that is the standard of truth must be{" "}
                <Txt.i>pre-logical</Txt.i>: a mere whim.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={implicationrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={implicationpoints} writeOn={0}>
                An ethical claim is true if it satisfies one's unjustified and
                unjustifiable whims.
              </Txt>
            </Rect>
          </Rect>
        </Rect>
      </Rect>
    </Rect>,
  );

  content().position([view.width() / 2, 0]);

  yield* content().position([view.width() / 2, -view.height()], 1);

  yield* after(
    "no unyielding principles",
    implicationpoints[0].writeOn(1, 1),
    implicationrays[0].end(1, 1),
  );
  yield* after(
    "truth satisfies desires",
    implicationpoints[1].writeOn(1, 1),
    implicationrays[1].end(1, 1),
  );
  yield* after(
    "purpose is pre-logical",
    implicationpoints[2].writeOn(1, 1),
    implicationrays[2].end(1, 1),
  );
  yield* after(
    "ethical claim is true if it satisfies your whims",
    implicationpoints[3].writeOn(1, 1),
    implicationrays[3].end(1, 1),
  );

  yield* after(
    "back to dewey",
    content().position([view.width() / 2, view.height()], 1),
  );

  yield* after(
    "indicate dewey",
    deweycont().shadowBlur(200, 0.5).to(150, 0.5),
    deweycont().lineWidth(96, 0.5).to(64, 0.5),
  );

  yield* after(
    "get that shit outta here",
    historytitle().opacity(0, 1),
    sequence(0.1, ...historypoints.map((x) => x.opacity(0, 1))),
    sequence(0.1, ...historyarrows.map((x) => x.start(1, 1))),
  );

  const quote = createRef<Rect>();

  view.add(
    <Rect
      opacity={0}
      ref={quote}
      position={[-680, 1500]}
      layout
      direction="column"
      gap={128}
    >
      <Txt
        width={2000}
        justify
        fontSize={100}
        fontFamily="ProggyClean CE Nerd Font"
      >
        Men, instead of being proud of accepting and asserting beliefs and
        "principles" on the ground of loyalty, will be as ashamed of that
        procedure as they would now be to confess their assent to a scientific
        theory out of reverence for Newton or Helmholz or whomever, without
        regard to evidence. <Txt fill="black">foo bar baz etc aaaaaaaaaaa</Txt>
      </Txt>
      <Txt
        width={2000}
        justify
        fontSize={100}
        fontFamily="ProggyClean CE Nerd Font"
      >
        If one stops to consider the matter, is there not something strange in
        the fact that men should consider loyalty to "laws," principles,
        standards, ideals to be an inherent virtue, accounted unto them for
        righteousness? It is as if they were making up for some secret sense of
        weakness by rigidity and intensity of insistent attachment. A moral law,
        like a law in physics, is not something to swear by and stick to at all
        hazards [...]. <Txt fill="black">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Txt>
      </Txt>
    </Rect>,
  );

  yield* after(
    "quote in",
    quote().opacity(1, 2),
    quote().position([-680, -600], useDuration("scroll quote"), easeOutSine),
  );

  yield* waitUntil("primacy of consciousness");

  const pocrays = createRefArray<Ray>();
  const pocpoints = createRefArray<Txt>();

  columns[1].add(
    <Rect {...sectionProps}>
      <Rect layout gap={256}>
        <Rect direction="column" alignItems="center" gap={128} maxWidth={2300}>
          <Rect>
            <Txt
              textAlign="center"
              glow
              fontFamily="oswald"
              fill="red"
              fontSize={200}
              uppercase
            >
              pragmatism as a form of{"\n"}the primacy of consicousness
            </Txt>
          </Rect>
          <Rect
            direction="column"
            fontSize={100}
            fontFamily="ProggyClean CE Nerd Font"
            gap={80}
          >
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={pocrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={pocpoints} writeOn={0}>
                PoC: The thesis that consciousness <Txt.i>precedes</Txt.i>{" "}
                existence.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={pocrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={pocpoints} writeOn={0}>
                The true is that which achieves certain purposes, purposes held
                by a consciousness.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={pocrays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={pocpoints} writeOn={0}>
                Stolen concept: to be conscious means to be conscious{" "}
                <Txt.i>of something</Txt.i>. The concept "consciousness" relies
                upon the <Txt.i>prior</Txt.i> concept "existence."
              </Txt>
            </Rect>
          </Rect>
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* all(
    content().position([-view.width() / 2, view.height()], 1),
    quote().position(
      [quote().position().x - view.width(), quote().position().y],
      1,
    ),
  );

  yield* after("pocthesis", pocrays[0].end(1, 1), pocpoints[0].writeOn(1, 1));
  yield* after(
    "link to pragmatism",
    pocrays[1].end(1, 1),
    pocpoints[1].writeOn(1, 1),
  );
  yield* after(
    "stolen concept",
    pocrays[2].end(1, 1),
    pocpoints[2].writeOn(1, 1),
  );

  yield* waitUntil("parasitic");

  const pararays = createRefArray<Ray>();
  const parapoints = createRefArray<Txt>();

  columns[1].add(
    <Rect {...sectionProps}>
      <Rect layout gap={256}>
        <Rect direction="column" alignItems="center" gap={128} maxWidth={2300}>
          <Rect>
            <Txt
              textAlign="center"
              glow
              fontFamily="oswald"
              fill="red"
              fontSize={200}
              uppercase
            >
              pragmatism as a parasitic philosophy
            </Txt>
          </Rect>
          <Rect
            direction="column"
            fontSize={100}
            fontFamily="ProggyClean CE Nerd Font"
            gap={80}
          >
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={pararays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={parapoints} writeOn={0}>
                Ethics: it is not possible to be a consistent pragmatist right
                from the offset.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={pararays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={parapoints} writeOn={0}>
                If I desire money, pragmatism tells me to do what "works" to
                yield the highest income. But why would I desire money in the
                first place?
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={pararays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={parapoints} writeOn={0}>
                I only desire money because I have a certain code of values that
                tells me money is good.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={pararays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={parapoints} writeOn={0}>
                I must have already had some basic ethical principles before I
                could ever follow the pragmatist ethics.
              </Txt>
            </Rect>
          </Rect>
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* content().position(
    [content().position().x, content().position().y - view.height()],
    1,
  );

  yield* after(
    "in ethics blah",
    parapoints[0].writeOn(1, 1),
    pararays[0].end(1, 1),
  );
  yield* after(
    "desire money",
    parapoints[1].writeOn(1, 1),
    pararays[1].end(1, 1),
  );
  yield* after(
    "already have code of values",
    parapoints[2].writeOn(1, 1),
    pararays[2].end(1, 1),
  );
  yield* after(
    "requires prior ethics",
    parapoints[3].writeOn(1, 1),
    pararays[3].end(1, 1),
  );

  yield* waitUntil("pragmatist epistemology parasitic");

  const epipoints = createRefArray<Txt>();
  const epirays = createRefArray<Ray>();

  columns[1].add(
    <Rect {...sectionProps}>
      <Rect layout gap={256}>
        <Rect direction="column" alignItems="center" gap={128} maxWidth={2300}>
          <Rect>
            <Txt
              textAlign="center"
              glow
              fontFamily="oswald"
              fill="red"
              fontSize={200}
              uppercase
            >
              the pragmatist epistemology as parasitic
            </Txt>
          </Rect>
          <Rect
            direction="column"
            fontSize={100}
            fontFamily="ProggyClean CE Nerd Font"
            gap={80}
          >
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={epirays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={epipoints} writeOn={0}>
                Saying a proposition is true <Txt.i>means</Txt.i> that it leads
                to certain consequences and those consequences are desirable.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={epirays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={epipoints} writeOn={0}>
                "A is true" means that A leads to B and B is desirable.
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={epirays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={epipoints} writeOn={0}>
                To know "A is true," I must know: "A leads to B," and "B is
                desirable." But how do we know that "A leads to B" is true?
              </Txt>
            </Rect>
            <Rect alignItems="center" gap={64}>
              <Ray
                ref={epirays}
                lineWidth={16}
                arrowSize={26}
                endArrow
                toX={80}
                stroke="#E4E0DA"
                end={0}
              />
              <Txt glow textWrap ref={epipoints} writeOn={0}>
                A proposition is true if it is desirable, so "A leads to B" is
                true if "A leads to B" leads to C and C is desirable.
              </Txt>
            </Rect>
          </Rect>
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* content().position(
    [content().position().x, content().position().y - view.height()],
    1,
  );

  yield* after(
    "what it means to say something is true",
    epipoints[0].writeOn(1, 1),
    epirays[0].end(1, 1),
  );
  yield* after("example", epipoints[1].writeOn(1, 1), epirays[1].end(1, 1));
  yield* after("elaboration", epipoints[2].writeOn(1, 1), epirays[2].end(1, 1));
  yield* after(
    "infinite regress",
    epipoints[3].writeOn(1, 1),
    epirays[3].end(1, 1),
  );

  yield* waitUntil("end");
});
