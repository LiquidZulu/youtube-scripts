import { makeScene2D, Txt, Rect, TxtProps, RectProps } from "@motion-canvas/2d";
import {
  waitFor,
  createRef,
  createSignal,
  SimpleSignal,
  SignalValue,
  all,
  chain,
} from "@motion-canvas/core";
import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);
  const txtOpts: TxtProps = {
    fill: "white",
    fontSize: createSignal(70) as SignalValue<number>,
  };

  const mainRect = createRef<Rect>();

  view.add(
    <Rect ref={mainRect} alignItems="center" direction="column" layout>
      <Rect layout>
        <Txt {...txtOpts} text={`"`} />
        <Txt {...txtOpts} text="AI image generation steals art from artists," />
      </Rect>
      <Rect layout>
        <Txt {...txtOpts} text="putting them out of a job;&nbsp;" />
        <Txt {...txtOpts} text="and what it produces" />
      </Rect>
      <Rect layout>
        <Txt
          {...txtOpts}
          text="can't even be properly considered art anyway."
        />
        <Txt {...txtOpts} text={`"`} />
      </Rect>
    </Rect>
  );

  const listProps = {
    fill: "white",
    fontSize: 60,
  };

  const stage = createSignal(0);
  const numerals = new Array(3).fill(null).map((x) => createRef<Txt>());
  const premises = new Array(3).fill(null).map((x) => createRef<Txt | Rect>());

  view.add(
    <Rect gap={32} y={150} direction="column" layout>
      <Rect layout>
        <Txt
          ref={numerals[0]}
          {...listProps}
          fontFamily="Mononoki"
          text="1.&nbsp;"
        />
        <Rect
          ref={premises[0]}
          opacity={createSignal(() => stage())}
          direction="column"
          layout
        >
          <Txt
            {...listProps}
            text="AI image generators should be opposed because"
          />
          <Txt {...listProps} text="they steal art from artists;" />
        </Rect>
      </Rect>
      <Rect layout>
        <Txt
          ref={numerals[1]}
          {...listProps}
          fontFamily="Mononoki"
          text="2.&nbsp;"
        />
        <Rect
          ref={premises[1]}
          opacity={createSignal(() => stage() - 1)}
          direction="column"
          layout
        >
          <Txt
            {...listProps}
            text="AI image generators should be opposed because"
          />
          <Txt {...listProps} text="they put artists out of their jobs, and;" />
        </Rect>
      </Rect>
      <Rect layout>
        <Txt
          ref={numerals[2]}
          {...listProps}
          fontFamily="Mononoki"
          text="3.&nbsp;"
        />
        <Txt
          ref={premises[2]}
          opacity={createSignal(() => stage() - 2)}
          {...listProps}
          text="images produced by an AI do not count as art."
        />
      </Rect>
    </Rect>
  );

  for (let numeral of numerals) {
    numeral().scale(0);
  }

  yield* popin(mainRect);
  yield* waitFor(5);

  yield* all(
    (txtOpts.fontSize as SimpleSignal<number>)(50, 1),
    mainRect().y(-300, 1),
    chain(waitFor(0.4), popin(numerals[0])),
    chain(waitFor(0.6), popin(numerals[1])),
    chain(waitFor(0.8), popin(numerals[2]))
  );

  yield* waitFor(1);

  const parts = new Array(3).fill(null).map((x) => createRef<Txt>());
  const ghostRect = createRef<Rect>();

  view.add(
    <Rect
      ref={ghostRect}
      y={-300}
      alignItems="center"
      direction="column"
      layout
    >
      <Rect layout>
        <Txt {...txtOpts} text={`"`} />
        <Txt
          ref={parts[0]}
          {...txtOpts}
          text="AI image generation steals art from artists,"
        />
      </Rect>
      <Rect layout>
        <Txt
          ref={parts[1]}
          {...txtOpts}
          text="putting them out of a job;&nbsp;"
        />
        <Txt ref={parts[2]} {...txtOpts} text="and what it produces" />
      </Rect>
      <Rect layout>
        <Txt
          ref={parts[2]}
          {...txtOpts}
          text="can't even be properly considered art anyway."
        />
        <Txt {...txtOpts} text={`"`} />
      </Rect>
    </Rect>
  );

  mainRect().opacity(0).scale(0);

  yield* all(stage(1, 1), parts[0]().fill("green", 1));
  yield* waitFor(3);
  yield* parts[0]().fill("white", 1);

  yield* all(stage(2, 1), parts[1]().fill("green", 1));
  yield* waitFor(3);
  yield* parts[1]().fill("white", 1);

  yield* all(stage(3, 1), parts[2]().fill("green", 1));
  yield* waitFor(3);

  yield* all(
    popout(ghostRect),
    stage(1, 2),
    chain(waitFor(0.4), popout(numerals[2])),
    chain(waitFor(0.6), popout(numerals[1])),
    chain(
      waitFor(0.8),
      all(popout(numerals[0]), chain(waitFor(0.2), premises[0]().scale(1.3, 1)))
    )
  );

  yield* waitFor(5);
});
