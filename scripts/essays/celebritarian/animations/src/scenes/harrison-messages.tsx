import { makeScene2D, Rect, Ray, Img, Camera, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  fixCamera,
  after,
} from "mcas";
import * as colors from "mcas/colors";
import harry from "../assets/twitter/harrison.jpg";

export default makeScene2D(function* (view) {
  view.fill(0);

  const quotes = [
    `\
Affiliates who supported open borders would get nastygrams about how "we don't talk about immigration" but affiliates who supported closed borders could post about how good deportations are to their hearts content.`,
    `\
They would also hide behind "the MC has never supported open borders" whenever the general concept of being principled was brought up.

This was especially true when the person [bringing] it up was me but they did this to other people too.`,
    `\
I would say "it is important to be principled and maintain our position as the propertarian wing of the party" and the counter would be "we aren't an open borders party" even if I wasn't talking about immigration but was simply speaking generally.`,
    `\
This was a common retort to me during the time when I was publicly arguing with the national comms director for saying we need to abandon the NAP.`,
  ];

  const messages = createRefArray<Rect>();
  const camera = createRef<Camera>();

  const strategy = [
    `Widen the tent to include both sides of the issue through a public-facing "neutrality" stance.`,
    `Only enforce this neutrality for the side you don't want to endorse.`,
    `Now shrink the tent back down to only the side you really wanted all along.`,
  ];

  const nums = createRefArray<Txt>();
  const txts = createRefArray<Txt>();

  view.add(
    <Camera ref={camera}>
      <Rect layout direction="column" gap={64}>
        {...quotes.map((q) => (
          <Rect gap={64} alignItems="end" ref={messages} scale={0}>
            <Circle size={400} clip>
              <Img src={harry} size="100%" />
            </Circle>
            <Rect
              fill={colors.sky500}
              maxWidth={2000}
              padding={130}
              paddingLeft={160}
              justifyContent="center"
              radius={[200, 200, 200, 30]}
            >
              <Txt.b text={q} fill="white" textWrap fontSize={100} />
            </Rect>
          </Rect>
        ))}
      </Rect>
      <Rect layout direction="column" gap={300} position={[4000, 0]}>
        {...strategy.map((s, i) => (
          <Rect gap={128}>
            <Txt
              fill={colors.slate400}
              opacity={0}
              ref={nums}
              text={i + 1 + "."}
              fontSize={250}
            />
            <Txt writeOn={0} ref={txts} text={s} fontSize={250} textWrap />
          </Rect>
        ))}
      </Rect>
    </Camera>,
  );

  fixCamera(view, camera);

  const messageIn = (index: number) =>
    sequence(
      0.3,
      camera().centerOn(messages[index], 1),
      popin(() => messages[index]),
    );

  const stratIn = (index: number) =>
    sequence(
      0.3,
      fadein(() => nums[index]),
      txts[index].writeOn(1, 1),
    );

  camera().position({ x: 0, y: -1626 });

  yield* messageIn(0);
  yield* after("message 1", messageIn(1));
  yield* after("message 2", messageIn(2));
  yield* after("message 3", messageIn(3));

  yield* after(
    "strategy laid bare",
    camera().position([2600, 0], 1),
    camera().zoom(0.48, 1),
  );

  for (let i = 0; i < nums.length; ++i) {
    yield* after("strat " + i, stratIn(i));
  }
});
