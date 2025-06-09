import { makeScene2D, Rect, Ray, Img, Circle, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  linear,
  PossibleColor,
  Reference,
  sequence,
  easeOutBack,
  loopUntil,
  spawn,
  easeInOutBack,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

import fracking from "../assets/fracking.jpg";
import farming from "../assets/farming.jpg";
import mining from "../assets/mining.jpg";
import plucking from "../assets/plucking.jpg";
import { after, Browser, flashAround, SquigglyBorder } from "mcas/lib";

import xr from "../assets/xr.png";
import ed from "../assets/earth-day.png";
import jso from "../assets/jso.mp4";
import sierra from "../assets/sierra.png";

export default makeScene2D(function* (view) {
  view.fill("black");

  const title = createRef<Txt>();
  view.add(
    <Txt
      fontSize={80}
      glow
      fontFamily="Oswald"
      fill={colors.blue500}
      ref={title}
    />,
  );

  yield* all(
    view.fill(colors.bg, 2, linear),
    title().text("humanist environmentalism?".toUpperCase(), 1),
  );

  yield* waitUntil("title up");

  yield* all(
    title().position([0, -440], 1),
    title().text("the meaning of environmental harmony:".toUpperCase(), 1),
  );

  type Thing = {
    name: string;
    img: string;
    color: PossibleColor;
    problem: string;
    circRef: Reference<Circle>;
    imgRef: Reference<Img>;
    nameRef: Reference<Txt>;
    problemRef: Reference<Txt>;
  };

  const things: Thing[] = [
    {
      name: "The fracking\nof oil.",
      img: fracking,
      color: colors.amber500,
      problem: "Fracking is destructive of\nthe natural environment!",
    },
    {
      name: "The farming\nof cows.",
      img: farming,
      color: colors.green500,
      problem: "Farming disrupts the\nproper functioning of the\nsoil!",
    },
    {
      name: "The mining\nof copper.",
      img: mining,
      color: colors.orange500,
      problem: "The explosives would scare\noff migratory birds!",
    },
    {
      name: "The plucking\nof an apple.",
      img: plucking,
      color: colors.red500,
      problem:
        "The tree needs those fruits\nto be eaten by grazing\nanimals to spread the\nseeds!",
    },
  ].map((x) => ({
    ...x,
    circRef: createRef<Circle>(),
    imgRef: createRef<Img>(),
    nameRef: createRef<Txt>(),
    problemRef: createRef<Txt>(),
  }));

  view.add(
    <Rect
      layout
      wrap="wrap"
      justifyContent="space-evenly"
      gap={64}
      position={[0, 80]}
    >
      {...things.map(
        ({
          name,
          img,
          color,
          problem,
          circRef,
          imgRef,
          nameRef,
          problemRef,
        }) => (
          <Rect gap={64} width={800}>
            <Rect direction="column" gap={24} alignItems="center">
              <Circle
                ref={circRef}
                lineWidth={12}
                stroke={color}
                width={256}
                ratio={1}
              >
                <Circle width={256} ratio={1} clip>
                  <Img ref={imgRef} src={img} height={256} />
                </Circle>
              </Circle>
              <Txt
                ref={nameRef}
                textAlign="center"
                glow
                text={name}
                fill={color}
                fontSize={30}
                width={256}
              />
            </Rect>
            <Rect height={256} alignItems="center">
              <Txt ref={problemRef} text={problem} fontSize={39} />
            </Rect>
          </Rect>
        ),
      )}
    </Rect>,
  );

  for (let { circRef, imgRef, nameRef, problemRef } of things) {
    circRef().end(0);
    imgRef().opacity(0);
    nameRef().text("");
    problemRef().text("");
  }

  function* showThing({
    name,
    problem,
    circRef,
    imgRef,
    nameRef,
    problemRef,
  }: Thing) {
    yield* all(
      imgRef().opacity(1, 1),
      circRef().end(1, 1),
      nameRef().text(name, 1),
      after(name + " problem", problemRef().text(problem, 1)),
    );
  }

  function* hideThing({ circRef, imgRef, nameRef, problemRef }: Thing) {
    yield* all(
      imgRef().opacity(0, 1),
      circRef().start(1, 1),
      nameRef().text("", 1),
      problemRef().text("", 1),
    );
  }

  for (let thing of things) {
    yield* waitUntil(thing.name + " in");
    yield* showThing(thing);
  }

  yield* after(
    "things out",
    sequence(
      0.2,
      title().text("", 1),
      ...things.map((thing) => hideThing(thing)),
    ),
  );

  // Many conservationists will cry out at this point that they do not wish to destroy man to aid the environment; they just want mankind to live in harmony with the environment. What, then, does it mean for mankind to live in harmony with the environment? A man fracking oil to fuel his automobile? "No!---That is destructive of the natural environment!" A man farming cows to produce milk for him to drink? "No!---That would disrupt the proper functioning of the soil!" A man mining copper to build his computers? "No!---The explosives would scare off migratory birds!" A man plucking an apple from a tree to feed his starving body? "No!---The tree needs those fruits to be eaten by grazing animals which then spread the seeds and thus continue the circle of life!"

  const browser = createRef<Browser>();
  const page = createRef<Img>();

  view.add(
    <Browser
      ref={browser}
      hyperlink="https://extinctionrebellion.uk/the-truth/demands/"
    >
      <Img ref={page} src={xr} width={1000} position={[0, 685]} />
    </Browser>,
  );

  yield* browser().position([0, 1080]).position(0, 1, easeOutBack);

  browser().mkHighlight(
    { lineWidth: 30, stroke: colors.purple500 },
    [[-202, 507], 110],
    [[73, 507], 336],
    [[-410, 507 + 35], 212],
    //
  );

  browser().mkHighlight(
    { lineWidth: 30, stroke: colors.purple500 },
    [[-120, 605], 524],
    [[-398, 605 + 35], 268],
    //
  );

  yield* after("h0", browser().highlight(1, 1));
  yield* after("h1", browser().highlight(2, 1));

  const gm = createRef<Rect>();
  view.add(<Rect ref={gm} width={185} height={32} position={[-228, 310]} />);

  yield* after("gm", flashAround(gm));

  // The Marxian influences are clear to see by a simple perusal of the mission statements of environmental organisations. Extinction Rebellion says that their demands[fn:14] are rooted in "a fundamental commitment to climate justice" elaborating that "in the UK, we bear a particular responsibility to the Global Majority." They capitalise "Global Majority" as if they were speaking about God---the Global Majority is their secular stand-in that we must now worship.

  yield* waitUntil("demands");
  yield* browser().scroll(0.39, 1);

  browser().mkHighlight(
    { lineWidth: 28, stroke: colors.purple500 },
    [[-270, 900], 142],
    [[172, 928], 285],
    [[-270, 956], 668],
    [[-270, 984], 80],
    //
  );

  yield* after("h d1", browser().highlight(3, 1));

  // Their manifesto consists of three demands. The first is that "all institutions" must be run such that they communicate "the injustice [climate change] represents, its historic roots, and the urgent need for rapid political, social and economic change"---they have no knowledge of cause and effect, they are akin on this point to the savage tribesmen who claim to own the forest by the simple fact of their being there. It is never explained how those institutions came to be, who paid for them, who runs them---they might as well be facts of nature that anyone can come along and operate, so long as they have the correct material conditions.

  browser().mkHighlight(
    { lineWidth: 28, stroke: colors.purple500 },
    [[-270, 1144], 695],
    [[-270, 1144 + 28], 720],
    [[-270, 1144 + 28 * 2], 734],
    [[-270, 1144 + 28 * 3], 350],
    //
  );

  yield* after("h d2 1/2", browser().highlight(3.465, 1));
  yield* after("h d2 2/2", browser().highlight(4, 1));

  // Their second is that "every part of society must act now to reduce greenhouse gas emissions to net zero by 2025 and begin protecting and repairing nature immediately"---again, they treat nature as a fiercesome and unknowable spirit that mankind must not alter in any way. This is the essence of the "net zero" ideology---that we "leave well enough alone." They elaborate that "the whole of society must move into a new precautionary paradigm, where life is *sacred* and all are *in service* to ensuring *its* future" (emphasis mine). So "we" should be "in service" of "it" because "it" is "sacred"---again, note that God has been replaced with a new secular incarnation in this worldview.

  browser().mkHighlight(
    { lineWidth: 28, stroke: colors.purple500 },
    [[314, 1386], 42],
    [[-270, 1386 + 28], 680],
    [[-270, 1386 + 28 * 2], 666],
    [[-270, 1386 + 28 * 3], 380],
    //
  );
  yield* after("h d3", browser().highlight(5, 1));

  // The third demand is perhaps the most explicitly Marxist: "The Government must create and be led by a Citizens’ Assembly on Climate and Ecological Justice. Only the common sense of ordinary people will help us navigate the challenging decisions ahead." We just need a "common sense" solution originated by "ordinary people," which of course means guild socialism---"ordinary people should be running this factory, they are the ones with the common sense, not those ivory tower businessmen!"

  yield* after(
    "Earth Day",
    all(
      browser().scroll(0, 0.5),
      browser().hyperlink("https://www.earthday.org/our-successes/", 1),
      chain(
        page().opacity(0, 0.5),
        all(page().src(ed, 0), page().position([0, 3800], 0)),
        page().opacity(1, 0.5),
      ),
      chain(browser().animateHighlights((r) => r.opacity(0, 0.5))),
    ),
  );
  browser().removeHighlights();
  browser().highlight(0);

  yield* after("ed scroll", browser().scroll(0.3, 1));

  browser().mkHighlight(
    { lineWidth: 20, stroke: colors.purple500 },
    [[-136, 836], 306],
    //
  );
  browser().mkHighlight(
    { lineWidth: 20, stroke: colors.purple500 },
    [[-290, 886], 440],
    //
  );
  browser().mkHighlight(
    { lineWidth: 20, stroke: colors.purple500 },
    [[-186, 936], 182],
    //
  );

  for (let i = 0; i < 3; ++i) {
    yield* after(`h ed ${i}`, browser().highlight(i + 1, 1));
  }

  // The "Earth Day" organisation gives top billing in their list of accomplishments[fn:15] to "the passage of landmark environmental protection laws," including the formation of the EPA and the signing of the Paris Climate Agreement---environmental success means an expansion in government bureaucracy. This is in spite of the fact that the disposal of waste and the handling of pollution have been under the control of the government for decades---it was government central planning which came about in the progressive period which allowed factories to pollute with impunity.[fn:16] Regardless, the environmentalists make sure to keep their sights on the abolition of industry and celebrate when more power is given to the government.
  //

  yield* waitUntil("Just Stop Oil");

  const squig = createRef<SquigglyBorder>();
  const vid = createRef<Video>();
  const cont = createRef<Rect>();

  view.add(
    <Rect
      position={[0, 1080]}
      ref={cont}
      shadowBlur={50}
      shadowColor="black"
      shadowOffsetY={25}
    >
      <SquigglyBorder ref={squig}>
        <Video ref={vid} src={jso} play width={(1920 * 2) / 3} />
      </SquigglyBorder>
    </Rect>,
  );

  vid().seek(50);
  vid().video().volume = 0;

  let wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* squig().wiggle();
    }
  });

  yield* all(
    chain(
      browser().position([0, -1080], 1, easeInOutBack),
      browser().highlight(0, 0),
    ),
    cont().position(0, 1, easeInOutBack),
    after(
      "Sierra Club",
      all(
        page().src(sierra, 0),
        page().position([0, 1260], 0),
        browser().scroll(0, 0),
        cont().position([0, 1080], 1, easeInOutBack),
        browser().position(0, 1, easeInOutBack),
        browser().hyperlink("https://www.sierraclub.org/our-vision", 0),
      ),
    ),
  );

  wiggle = false;
  browser().removeHighlights();

  yield* after("sierra scroll", browser().scroll(0.2, 1));

  //0.2
  browser().mkHighlight(
    { lineWidth: 16, stroke: colors.purple500 },
    [[-121, 842.5], 36],
    [[-365, 842.5 + 16], 256],
    [[-365, 842.5 + 16 * 2], 75],
    //
  );
  yield* after("sierra highlight 0", browser().highlight(1, 1));

  browser().mkHighlight(
    { lineWidth: 16, stroke: colors.purple500 },
    [[-187, 842.5 + 16 * 5], 76],
    [[-365, 842.5 + 16 * 6], 161],
    //
  );
  yield* after("sierra highlight 1", browser().highlight(2, 1));

  browser().mkHighlight(
    { lineWidth: 16, stroke: colors.purple500 },
    [[-250, 842.5 + 16 * 2], 155],
    [[-365, 842.5 + 16 * 3], 28],
    [[-165, 842.5 + 16 * 3], 62],
    [[-365, 842.5 + 16 * 4], 70],
    //
  );
  yield* after("sierra highlight 2", browser().highlight(3, 1));

  browser().mkHighlight(
    { lineWidth: 16, stroke: colors.purple500 },
    [[-262, 842.5 + 16 * 4], 145],
    //
  );
  yield* after("sierra highlight 3", browser().highlight(4, 1));

  // 0.6
  browser().mkHighlight(
    { lineWidth: 16, stroke: colors.purple500 },
    [[-365, 1521.5], 256],
    [[-365, 1521.5 + 16], 288],
    [[-365, 1521.5 + 16 * 2], 264],
    [[-365, 1521.5 + 16 * 3], 262],
    [[-365, 1521.5 + 16 * 4], 288],
    [[-365, 1521.5 + 16 * 5], 278],
    [[-365, 1521.5 + 16 * 6], 120],
    //
  );
  yield* all(
    after("sierra scroll down", browser().scroll(0.6, 1)),
    after("sierra highlight 4", browser().highlight(5, 1)),
  );

  yield* waitUntil("blah");
});
