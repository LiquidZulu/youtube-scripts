import { makeScene2D, Rect, Ray, Img, Camera } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
  delay,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  ArrowList,
  after,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const list = createRefArray<ArrowList>();
  const camera = createRef<Camera>();
  const content = createRefArray<Rect>();
  const titles = createRefArray<Txt>();
  const implication = createRef<Ray>();

  const timeline = createRef<Ray>();
  const negations = createRefArray<Ray>();
  const negationTitles = createRefArray<Txt>();
  const opinions = createRefArray<Txt>();
  const opinionArrows = createRefArray<Ray>();

  view.add(
    <Camera ref={camera}>
      <Rect
        ref={content}
        layout
        direction="column"
        gap={128}
        alignItems="center"
      >
        <Txt uppercase glow fill="red" fontFamily="oswald" fontSize={200}>
          "mixing labour" as invalid
        </Txt>
        <ArrowList
          in={(text: Txt, ray: Ray) => {
            text.opacity(1);
            text.children()[0].fontFamily("ProggyClean CE Nerd Font");

            return all(ray.end(1, 1), text.children()[0].writeOn(1, 1));
          }}
          ref={list}
          fontSize={130}
          fontFamily="ProggyClean CE Nerd Font"
          width={2800}
          hGap={128}
          shadowBlur={40}
          shadowColor="#E4E0DA"
        >
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            "Mixing labour with the land" has always been an overly-romantic and
            vague term.
          </Txt>
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            Can I measure my labour? Can I pour a cup of labour and mix it up
            with a cup of flour to make a labour cake?
          </Txt>
          <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
            Labour <Txt.i>is not the root of property</Txt.i>, labour is
            something you do <Txt.i>with</Txt.i> your property.
          </Txt>
        </ArrowList>
      </Rect>
      <Rect
        position={[view.width() * 2, 300]}
        ref={content}
        layout
        direction="column"
        gap={128}
        alignItems="center"
      >
        <Txt uppercase glow fill="red" fontFamily="oswald" fontSize={200}>
          the "retroactive slavery" justification
        </Txt>
        <ArrowList
          in={(text: Txt, ray: Ray) => {
            text.opacity(1);
            text.children()[0].fontFamily("ProggyClean CE Nerd Font");

            return all(ray.end(1, 1), text.children()[0].writeOn(1, 1));
          }}
          ref={list}
          fontSize={130}
          fontFamily="ProggyClean CE Nerd Font"
          width={2800}
          hGap={128}
          shadowBlur={40}
          shadowColor="#E4E0DA"
        >
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            "Mixing labour with the land" means that if someone takes the
            product from you you are "retroactively enslaved."
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            At the moment when the man is building the house he is not possesed
            by any other person.
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            This doesn't change because someone later comes along and possesses{" "}
            <Txt.i>the house</Txt.i> that he built.
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            Slavery refers to possession of a human, not possession of houses.
          </Txt>
        </ArrowList>
      </Rect>
      <Ray
        ref={implication}
        end={0}
        arrowSize={120}
        lineWidth={100}
        startArrow
        fromX={-view.width() / 2}
        toX={view.width() / 2}
        position={[view.width(), 0]}
        stroke="white"
        shadowBlur={50}
        shadowColor="white"
      />
      <Txt
        uppercase
        fontFamily="oswald"
        glow
        fill="white"
        fontSize={200}
        position={[view.width(), -300]}
      >
        implied by
      </Txt>
      <Rect
        position={[view.width() * 2, view.height() + 1500]}
        ref={content}
        layout
        direction="column"
        gap={128}
        alignItems="center"
      >
        <Txt
          ref={titles}
          writeOn={0}
          uppercase
          glow
          fill="red"
          fontFamily="oswald"
          fontSize={150}
        >
          additional problems with retroactive slavery
        </Txt>
        <ArrowList
          in={(text: Txt, ray: Ray) => {
            text.opacity(1);
            text.children()[0].fontFamily("ProggyClean CE Nerd Font");

            return all(ray.end(1, 1), text.children()[0].writeOn(1, 1));
          }}
          ref={list}
          fontSize={130}
          fontFamily="ProggyClean CE Nerd Font"
          width={2800}
          hGap={128}
          shadowBlur={40}
          shadowColor="#E4E0DA"
        >
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            Many people put "labour" "into" the house--the builders, architects,
            loggers, etc.--so why is only the builder the one who has been
            retroactively enslaved?
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            What if the builder sold the house, is he still the one who was
            enslaved?
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            Was the buyer enslaved for the time they were at their job to earn
            the money?
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            If they <Txt.i>were</Txt.i> the slave, then was their employment
            illegitimate? Should the employer get that wage back?
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            Have they still been enslaved if they got the house for free?
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            If the theif kills them first, has he enslaved a person who is now
            dead?
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            Does this mean that an archaeologist taking artefacts from some
            long-dead pharoah has enslaved that pharoah? Or has he enslaved the
            slaves of the pharoah?
          </Txt>
          <Txt
            textWrap
            fill="#E4E0DA"
            writeOn={0}
            fontFamily="ProggyClean CE Nerd Font"
          >
            If retroactive slavery is possible, does this mean I can also
            retroactively revoke consent?
          </Txt>
        </ArrowList>
      </Rect>
      <Rect
        ref={content}
        size={view.size}
        position={view.size}
        alignContent="center"
        justifyContent="center"
      >
        <Ray
          end={0}
          ref={timeline}
          lineWidth={100}
          stroke="white"
          shadowBlur={50}
          shadowColor="white"
          fromX={-1400}
          toX={1400}
        />
        <Rect
          layout
          direction="column"
          position={[-1400, -200]}
          alignItems="center"
          gap={64}
        >
          <Txt
            writeOn={0}
            ref={opinions}
            fontFamily="cubano"
            fill="white"
            glow
            fontSize={60}
          >
            "This house is mine"
          </Txt>
          <Ray
            end={0}
            ref={opinionArrows}
            lineWidth={40}
            arrowSize={45}
            toY={80}
            endArrow
            stroke="white"
            shadowBlur={50}
            shadowColor="white"
          />
        </Rect>
        <Rect
          layout
          direction="column"
          position={[0, -200]}
          alignItems="center"
          gap={64}
        >
          <Txt
            writeOn={0}
            ref={opinions}
            fontFamily="cubano"
            fill="white"
            glow
            fontSize={60}
          >
            "This house is not mine"
          </Txt>
          <Ray
            end={0}
            ref={opinionArrows}
            lineWidth={40}
            arrowSize={45}
            toY={80}
            endArrow
            stroke="white"
            shadowBlur={50}
            shadowColor="white"
          />
        </Rect>
        <Rect
          layout
          direction="column"
          position={[1400, -200]}
          alignItems="center"
          gap={64}
        >
          <Txt
            writeOn={0}
            ref={opinions}
            fontFamily="cubano"
            fill="white"
            glow
            fontSize={60}
          >
            "This house is mine"
          </Txt>
          <Ray
            end={0}
            ref={opinionArrows}
            lineWidth={40}
            arrowSize={45}
            toY={80}
            endArrow
            stroke="white"
            shadowBlur={50}
            shadowColor="white"
          />
        </Rect>
        <Rect
          layout
          direction="column"
          gap={32}
          alignItems="center"
          position={[-1400 / 2 - 30, -310]}
        >
          <Txt
            writeOn={0}
            ref={negationTitles}
            fontFamily="cubano"
            fill="red"
            glow
          >
            negates
          </Txt>
          <Ray
            end={0}
            ref={negations}
            shadowBlur={50}
            shadowColor="red"
            arrowSize={50}
            lineWidth={40}
            stroke="red"
            endArrow
            toX={-630}
          />
        </Rect>
        <Rect
          layout
          direction="column"
          gap={32}
          alignItems="center"
          position={[1400 / 2 + 30, -310]}
        >
          <Txt
            writeOn={0}
            ref={negationTitles}
            fontFamily="cubano"
            fill="red"
            glow
          >
            negates
          </Txt>
          <Ray
            end={0}
            ref={negations}
            shadowBlur={50}
            shadowColor="red"
            arrowSize={50}
            lineWidth={40}
            stroke="red"
            endArrow
            toX={-630}
          />
        </Rect>
      </Rect>
      <Rect size={view.size().mul(100)} fill="red" opacity={0} />
    </Camera>,
  );

  camera()
    .scene()
    .position(
      createSignal(() => {
        return view
          .size()
          .div(2)
          .add(camera().position().mul(-1).mul(camera().zoom()));
      }),
    );

  camera().scene().scale(camera().zoom);

  camera().cache(false);

  yield* list[0].next('"mixing labour" vague');
  yield* list[0].next("labour cake");
  yield* list[0].next("labour not the root of property");

  yield* after(
    "justification",
    list[1].next("theft means retroactively enslaved"),
    chain(
      camera().zoom(0.6, 1),
      all(
        implication().end(1, 1.4),
        camera().position([content[1].position().x, 0], 2),
      ),
      camera().zoom(1, 1),
    ),
  );
  yield* list[1].next("when house is built, man isnt a slave");
  yield* list[1].next("this doesnt change");

  yield* after(
    "slavery is possession of humans, not houses",
    delay(0.4, list[1].next()),
    camera().position(camera().position().addY(500), 1),
  );

  yield* after(
    "why only builder?",
    delay(0.4, list[2].next()),
    delay(0.2, titles[0].writeOn(1, 1)),
    camera().position(
      camera()
        .position()
        .addY(view.height() - 100),
      1,
    ),
  );
  yield* list[2].next("what if sold?");
  yield* list[2].next("buyer enslaved?");
  yield* after(
    "employment illegitimate?",
    delay(0.4, list[2].next()),
    camera().position(
      camera()
        .position()
        .addY(view.height() - 400),
      1,
    ),
  );
  yield* list[2].next("what if the house was free?");
  yield* list[2].next("enslaving a corpse?");
  yield* list[2].next("pharoahs too?");
  yield* after(
    "retroactive consent?",
    delay(0.4, list[2].next()),
    camera().position(camera().position().addY(400), 1),
  );

  yield* after(
    "move to timeline",
    camera().zoom(0.6, 1),
    delay(0.3, camera().centerOn(content[3], 1)),
    delay(
      0.9,
      all(
        camera().zoom(1, 1),
        timeline().end(1, 1),
        delay(0.4, all(opinions[0].writeOn(1, 1), opinionArrows[0].end(1, 1))),
      ),
    ),
  );

  yield* after(
    "middle opinion",
    opinions[1].writeOn(1, 1),
    opinionArrows[1].end(1, 1),
  );

  yield* after(
    "first negation",
    opinions[0].opacity(0.2, 1),
    opinionArrows[0].opacity(0.2, 1),
    negations[0].end(1, 1),
    negationTitles[0].writeOn(1, 1),
  );

  yield* after(
    "final opinion",
    opinions[2].writeOn(1, 1),
    opinionArrows[2].end(1, 1),
  );

  yield* after(
    "second negation",
    opinions[0].opacity(1, 1),
    opinionArrows[0].opacity(1, 1),
    opinions[1].opacity(0.2, 1),
    opinionArrows[1].opacity(0.2, 1),
    negations[0].opacity(0.2, 1),
    negationTitles[0].opacity(0.2, 1),
    negations[1].end(1, 1),
    negationTitles[1].writeOn(1, 1),
  );

  yield* waitUntil("end");
});
