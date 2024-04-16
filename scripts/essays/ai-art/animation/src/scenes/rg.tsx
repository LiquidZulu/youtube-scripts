import {
  makeScene2D,
  Txt,
  Img,
  Rect,
  TxtProps,
  ImgProps,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  easeInOutCubic,
  linear,
  map,
  tween,
  Vector2,
  waitFor,
} from "@motion-canvas/core";

import { ferris, rooms } from "../assets/rg";
import { withRef } from "../types";
import { popinSize, popoutSize } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const roomsArr = Object.entries(rooms).map(
    ([room, items]) =>
      [
        {
          ref: createRef<Txt>(),
          text: room,
        },
        items.map((item, i, a) => ({
          ref: createRef<Txt>(),
          text: i == a.length - 1 ? item : item + ",",
        })),
      ] as [withRef<TxtProps, Txt>, withRef<TxtProps, Txt>[]]
  );

  const contents = createRef<Rect>();

  const ellipsis = {
    ref: createRef<Txt>(),
    text: "⋯",
    fontSize: 70,
    fill: 0xa3a3a3,
    fontFamily: "Mononoki",
  } as withRef<TxtProps, Txt>;

  const crab = {
    ref: createRef<Img>(),
    width: 200,
    src: ferris,
  } as withRef<ImgProps, Img>;

  const currentRoom = createSignal(0);

  view.add(
    <Rect y={64} alignItems="center" gap={128} direction="column" layout>
      <Rect gap={64}>
        {roomsArr.map(([room, _]) => (
          <Txt {...room} fill={0x707070} fontFamily="Mononoki" />
        ))}
      </Rect>
      <Rect alignItems="center" gap={32}>
        <Txt fontSize={100} fill="white" fontFamily="Mononoki" text="[" />
        <Rect ref={contents} gap={32}>
          <Txt {...ellipsis} />
        </Rect>
        <Txt fontSize={100} fill="white" fontFamily="Mononoki" text="]" />
      </Rect>
    </Rect>
  );

  view.add(<Img {...crab} />);

  crab.ref().position(
    createSignal(() => {
      const floored = Math.floor(currentRoom());

      const { x, y } = roomsArr[floored][0].ref().position();

      if (!(currentRoom() % 1)) {
        return { x, y: y - 200 };
      }

      return {
        x: Vector2.lerp(
          roomsArr[floored][0].ref().position(),
          roomsArr[floored + 1][0].ref().position(),
          linear(currentRoom() % 1)
        ).x,
        y: y - 200,
      };
    })
  );

  const animation = {
    ellipsis: {
      out: function* () {
        yield* ellipsis.ref().opacity(0, 0.3);
        contents().removeChildren();
      },
      in: function* () {
        contents().add(<Txt {...ellipsis} opacity={0} />);

        yield* ellipsis.ref().opacity(1, 0.3);
      },
    },
    items: {
      in: function* (items: withRef<TxtProps, Txt>[]) {
        contents().add(
          <>
            {items.map((item) => (
              <Txt {...item} fontSize={70} fill="white" fontFamily="Mononoki" />
            ))}
          </>
        );

        const initSize = items.map((item) => item.ref().size());
        for (let item of items) {
          item.ref().size(0);
          item.ref().opacity(0);
        }

        yield* all(...items.map((item, i) => popinSize(item.ref, initSize[i])));
        yield* all(...items.map((item) => item.ref().opacity(1, 1)));
      },
      out: function* (items: withRef<TxtProps, Txt>[]) {
        yield* all(...items.map((item) => item.ref().opacity(0, 0.5)));
        yield* all(...items.map((item) => item.ref().size(2, 0.5))); // this 2 was brute-forced and works for items size 3

        contents().removeChildren();
      },
    },
    room: {
      move: function* () {
        const curr = currentRoom();

        if (curr < roomsArr.length - 1) {
          yield* tween(0.5, (value) => {
            currentRoom(
              map(curr * 1000, (curr + 1) * 1000, easeInOutCubic(value)) / 1000
            );
          });

          yield* currentRoom(curr + 1, 0.5);
        }
      },
      search: function* (
        room: withRef<TxtProps, Txt>,
        items: withRef<TxtProps, Txt>[]
      ) {
        const phoneInRoom = items.reduce(
          (_, __, i, a) => a[i].ref().text() == "phone",
          false
        );

        yield* all(
          room.ref().fill("white", 1),
          ...items.map(({ ref }, i) =>
            chain(
              waitFor(i * 1),
              ref().text() == "phone"
                ? all(ref().fill("green", 1), room.ref().fill("green", 1))
                : ref().fill("red", 1)
            )
          )
        );

        if (!phoneInRoom) {
          yield* room.ref().fill(0xa3a3a3, 0.2);
        }
      },
    },
  };

  for (let [room, items] of roomsArr) {
    yield* animation.ellipsis.out();

    yield* animation.items.in(items);

    yield* animation.room.search(room, items);

    yield* animation.items.out(items);

    yield* animation.ellipsis.in();

    yield* animation.room.move();
  }

  yield* all(
    currentRoom(0, 1),
    ...roomsArr.map(([{ ref }, _]) => ref().fill(0x707070, 1))
  );
});
