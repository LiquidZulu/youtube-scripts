import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import stick from "../assets/crusoe/stick.png";
import spearfishing from "yt/b-roll/castaway-spearfishing.mp4";
import fire from "yt/b-roll/castaway fire.mp4";

// It is only because the stick is scarce
// that Crusoe and Friday can come into
// conflict over its use. This requires a
// specific understanding of the terminology
// ---to say that a given entity is scarce
// is to say that men can come into conflicts
// over its use, where a conflict is defined
// as mutually-exclusive actions. Crusoe
// cannot use the stick to spearfish at the
// same time that Friday uses it to stoke
// his fire---one action excludes the other,
// i.e. they are mutually-exclusive.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const stickScarce = createRef<Rect>();

  view.add(
    <Rect ref={stickScarce} layout alignItems="center">
      <Img src={stick} width={200} rotation={-30} />
      <Txt fontSize={70} fontFamily="Cubano" fill={colors.zinc50}>
        {" "}
        = scarce
      </Txt>
    </Rect>,
  );

  yield* popin(stickScarce);

  const reasons = {
    txt: createRefArray<Txt>(),
    ray: createRefArray<Ray>(),
  };

  view.add(
    <Rect layout direction="column" gap={64}>
      <Rect alignItems="center" gap={32}>
        <Ray
          end={0}
          ref={reasons.ray}
          toX={50}
          lineWidth={6}
          stroke={colors.zinc50}
          endArrow
          arrowSize={12}
        />
        <Txt opacity={0} ref={reasons.txt} fill={colors.zinc50}>
          Crusoe and Friday can come into conflict over its use.
        </Txt>
      </Rect>
      <Rect alignItems="center" gap={32}>
        <Ray
          end={0}
          ref={reasons.ray}
          toX={50}
          lineWidth={6}
          stroke={colors.zinc50}
          endArrow
          arrowSize={12}
        />
        <Txt opacity={0} ref={reasons.txt} fill={colors.zinc50}>
          Scarcity means that men can come into conflict{"\n"}over the object's
          use.
        </Txt>
      </Rect>
      <Rect alignItems="center" gap={32}>
        <Ray
          end={0}
          ref={reasons.ray}
          toX={50}
          lineWidth={6}
          stroke={colors.zinc50}
          endArrow
          arrowSize={12}
        />
        <Txt opacity={0} ref={reasons.txt} fill={colors.zinc50}>
          Conflicts are mutually exclusive actions.
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* stickScarce().position([0, -400], 1);

  yield* all(
    ...new Array(3)
      .fill(0)
      .map((_, i) =>
        chain(
          waitFor((i + 1) * 0.1),
          all(
            reasons.ray[i].end(1, 1),
            chain(waitFor(0.2), reasons.txt[i].opacity(1, 1)),
          ),
        ),
      ),
  );

  yield* waitFor(5);

  yield* all(
    ...new Array(3)
      .fill(0)
      .map((_, i) =>
        chain(
          waitFor((i + 1) * 0.2),
          all(reasons.ray[i].start(1, 0.5), reasons.txt[i].opacity(0, 1)),
        ),
      ),
  );

  const vids = createRefArray<Video>();
  const rays = createRefArray<Ray>();

  view.add(
    <Rect layout direction="column" gap={64} alignItems="center">
      <Rect gap={200}>
        <Ray
          ref={rays}
          lineWidth={8}
          endArrow
          toY={300}
          toX={-200}
          stroke={colors.zinc50}
        />
        <Ray
          ref={rays}
          lineWidth={8}
          endArrow
          toY={300}
          toX={200}
          stroke={colors.zinc50}
        />
      </Rect>
      <Rect gap={200}>
        <Video width={400} ref={vids} src={spearfishing} />
        <Video width={400} ref={vids} src={fire} />
      </Rect>
    </Rect>,
  );

  vids[0].play();
  vids[1].play();
  vids[0].opacity(0);
  vids[1].opacity(0);
  rays[0].end(0);
  rays[1].end(0);

  yield* all(rays[0].end(1, 1), chain(waitFor(0.5), vids[0].opacity(1, 1)));
  yield* all(
    rays[0].opacity(0.2, 1),
    vids[0].opacity(0.2, 1),
    rays[1].end(1, 1),
    chain(waitFor(0.5), vids[1].opacity(1, 1)),
  );
  yield* waitFor(0.5);
  yield* all(
    rays[0].opacity(1, 1),
    vids[0].opacity(1, 1),
    rays[1].opacity(0.2, 1),
    vids[1].opacity(0.2, 1),
  );
  yield* waitFor(1);
});
