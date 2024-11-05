import { makeScene2D, Rect, Ray, Img, SVG, Path } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useRandom,
  Vector2,
  Vector2Signal,
  SimpleVector2Signal,
  Color,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import head from "../assets/human-head";
import { fadein, fadeout, flashAround, getLocalPos, vectorSum } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const random = useRandom();

  const path = createRef<Path>();
  const rects = createRefArray<Rect>();
  const cont = createRef<Rect>();
  const sight = createRef<Ray>();
  const colour = createSignal(new Color("white"));
  const height = createSignal(100);
  const width = createSignal(100);
  const angles = createSignal(0);
  const conceptualCategories = createRefArray<Rect>();

  view.add(
    <Ray
      ref={sight}
      lineWidth={20}
      endArrow
      arrowSize={50}
      from={[205, -84]}
      to={[-490, -380]}
      stroke={colors.zinc800}
    />,
  );

  view.add(
    <Path
      ref={path}
      data={head}
      fill={colors.zinc50}
      scale={10}
      position={[0, -500]}
    />,
  );

  view.add(
    <Rect layout direction="column" position={[580, -190]}>
      <Rect scale={0} ref={conceptualCategories} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          colour:
        </Txt>
        <Rect height={48} width={48} fill={colour} />
      </Rect>
      <Rect scale={0} ref={conceptualCategories} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          height:
        </Txt>
        <Txt
          fontFamily="mononoki"
          fill={colors.zinc50}
          text={createSignal(() => height().toFixed(0))}
        />
      </Rect>
      <Rect scale={0} ref={conceptualCategories} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          width:
        </Txt>
        <Txt
          fontFamily="mononoki"
          fill={colors.zinc50}
          text={createSignal(() => width().toFixed(0))}
        />
      </Rect>
      <Rect scale={0} ref={conceptualCategories} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          right angles:
        </Txt>
        <Txt
          fontFamily="mononoki"
          fill={colors.zinc50}
          text={createSignal(() => angles().toFixed(0))}
        />
      </Rect>
    </Rect>,
  );

  view.add(
    <Rect
      ref={cont}
      layout
      direction="column"
      position={[-700, 0]}
      gap={120}
      justifyContent="center"
      alignItems="center"
    >
      {[colors.amber500, colors.yellow500, colors.lime500, colors.green500].map(
        (color) => (
          <Rect
            scale={0}
            ref={rects}
            rotation={random.nextFloat(0, 90)}
            width={random.nextInt(10, 20) * 10}
            height={random.nextInt(10, 20) * 10}
            fill={color}
          />
        ),
      )}
    </Rect>,
  );

  const offsetSize = 15;
  const degToRad = Math.PI / 180;
  const rays = new Map();
  const rots = new Map();

  for (let rect of rects) {
    rays.set(rect, createRefArray<Ray>());
    rots.set(rect, rect.rotation());
    for (let [from, to, correction] of [
      [rect.topLeft, rect.topRight, Math.PI],
      [rect.topRight, rect.bottomRight, Math.PI * 1.5],
    ] as [SimpleVector2Signal<Rect>, SimpleVector2Signal<Rect>, number][]) {
      const offset = createSignal(
        () =>
          new Vector2(
            -offsetSize * Math.sin(rect.rotation() * degToRad + correction),
            offsetSize * Math.cos(rect.rotation() * degToRad + correction),
          ),
      );

      view.add(
        <Ray
          ref={rays.get(rect)}
          lineDash={[10, 5]}
          arrowSize={8.5}
          startArrow
          endArrow
          lineWidth={4}
          stroke={colors.zinc500}
          from={createSignal(() =>
            vectorSum([from(), cont().position(), offset()]),
          )}
          to={createSignal(() =>
            vectorSum([to(), cont().position(), offset()]),
          )}
        />,
      );
    }
  }

  yield* all(
    path().opacity(0).opacity(1, 1),
    sight().opacity(0).opacity(1, 1),
    sight().end(0).end(1, 1),
    ...rects.map((rect, i) =>
      chain(
        waitFor(0.1 * i),
        all(
          rect
            .rotation(random.nextFloat(-180, -90))
            .rotation(rots.get(rect), 1),
          popin(() => rect),
        ),
      ),
    ),
    ...conceptualCategories.map((cat, i) =>
      chain(
        waitFor(0.1 * i),
        popin(() => cat),
      ),
    ),
    colour(rects[0].fill() as Color, 1),
    height(rects[0].height(), 1),
    width(rects[0].width(), 1),
    angles(4, 1),
  );

  yield* sight().to([sight().to().x, -130], 1);

  yield* all(
    colour(rects[1].fill() as Color, 1),
    height(rects[1].height(), 1),
    width(rects[1].width(), 1),
  );

  yield* sight().to([sight().to().x, 125], 1);

  yield* all(
    colour(rects[2].fill() as Color, 1),
    height(rects[2].height(), 1),
    width(rects[2].width(), 1),
  );

  yield* sight().to([sight().to().x, 320], 1);

  yield* all(
    colour(rects[3].fill() as Color, 1),
    height(rects[3].height(), 1),
    width(rects[3].width(), 1),
  );

  yield* all(
    sight().end(0, 1),
    ...conceptualCategories.map((cat, i) =>
      chain(
        waitFor(0.1 * i),
        fadeout(() => cat),
      ),
    ),
  );

  const ccdcats = createRefArray<Rect>();
  const ccd = createRef<Txt>();

  view.add(
    <Rect layout direction="column" position={[580, -190]}>
      <Rect scale={0} ref={ccdcats} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          colour: <Txt.i fill={colors.zinc500}>any</Txt.i>
        </Txt>
      </Rect>
      <Rect scale={0} ref={ccdcats} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          height: <Txt.i fill={colors.zinc500}>any</Txt.i>
        </Txt>
      </Rect>
      <Rect scale={0} ref={ccdcats} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          width: <Txt.i fill={colors.zinc500}>any</Txt.i>
        </Txt>
      </Rect>
      <Rect scale={0} ref={ccdcats} gap={16} alignItems="center">
        <Txt fontFamily="cubano" fill={colors.zinc50}>
          right angles:
        </Txt>
        <Txt
          ref={ccd}
          fontFamily="mononoki"
          fill={colors.zinc50}
          text={createSignal(() => angles().toFixed(0))}
        />
      </Rect>
    </Rect>,
  );

  yield* all(
    sight().end(0, 1),
    ...ccdcats.map((cat, i) =>
      chain(
        waitFor(0.1 * i),
        fadein(() => cat),
      ),
    ),
  );

  yield* all(
    flashAround(() => ccdcats[3], 1),
    ccd().fill(colors.amber500, 1),
  );
  yield* waitFor(1);

  yield* all(
    path().opacity(0, 1),
    ...rects.map((rect, i) =>
      chain(
        waitFor(0.1 * i),
        all(
          rect.rotation(random.nextFloat(180, 270), 1),
          popout(() => rect),
        ),
      ),
    ),
    ...ccdcats.map((cat, i) =>
      chain(
        waitFor(0.1 * i),
        fadeout(() => cat),
      ),
    ),
  );
});
