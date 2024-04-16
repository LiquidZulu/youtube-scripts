import { computed, signal } from "@motion-canvas/2d/lib/decorators";
import { createSignal, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { PossibleColor } from "@motion-canvas/core/lib/types";
import { createRef, Reference } from "@motion-canvas/core/lib/utils";
import { all, chain } from "@motion-canvas/core/lib/flow";
import { Video, Ray } from "@motion-canvas/2d/lib/components";
import { vectorSum } from "../util";

type TVec2 = [number, number];
type TCorners = {
  topLeft: TVec2;
  topRight: TVec2;
  bottomLeft: TVec2;
  bottomRight: TVec2;
};
type TRay = {
  ref: Reference<Ray>;
  from: SimpleSignal<TVec2, any>;
  to: SimpleSignal<TVec2, any>;
  id: [keyof TCorners, keyof TCorners];
};

type UnwrapSimpleSignal<T> = T extends SimpleSignal<infer U> ? U : never;

type UnwrapSimpleSignals<T> = T extends infer A ? UnwrapSimpleSignal<A> : never;

export interface SquigglyBorderProps {
  rayWidth?: SimpleSignal<number, any>;
  rayColor?: SimpleSignal<PossibleColor, any>;
  duration?: SimpleSignal<number, any>;
  runtime?: SimpleSignal<number, any>;
  corners?: SimpleSignal<TCorners, any>;
  offsetsList?: SimpleSignal<TCorners[], any>;
}

const DEFAULTS: Array<
  [
    keyof SquigglyBorderProps,
    UnwrapSimpleSignals<SquigglyBorderProps[keyof SquigglyBorderProps]>
  ]
> = [
  ["rayWidth", 5],
  ["rayColor", { r: 0xff, g: 0xff, b: 0xff, a: 1 }],
  ["duration", 0.5],
  ["runtime", 10],
  [
    "corners",
    {
      bottomLeft: [-(1280 / 2), +(720 / 2)],
      bottomRight: [+(1280 / 2), +(720 / 2)],
      topLeft: [-(1280 / 2), -(720 / 2)],
      topRight: [+(1280 / 2), -(720 / 2)],
    } as TCorners,
  ],
  [
    "offsetsList",
    [
      {
        topLeft: [20, 5],
        topRight: [0, -10],
        bottomLeft: [-14, 12],
        bottomRight: [12, -8],
      },
      {
        topLeft: [-10, 7],
        topRight: [6, 12],
        bottomLeft: [-20, 17],
        bottomRight: [15, -12],
      },
      {
        topLeft: [15, -12],
        topRight: [-6, -6],
        bottomLeft: [7, 17],
        bottomRight: [-10, 12],
      },
      {
        topLeft: [-18, 14],
        topRight: [-12, -18],
        bottomLeft: [12, -17],
        bottomRight: [20, 12],
      },
      {
        topLeft: [14, 14],
        topRight: [18, 18],
        bottomLeft: [-18, -17],
        bottomRight: [-4, 15],
      },
    ],
  ],
];

export class SquigglyBorder {
  public constructor(props?: SquigglyBorderProps) {
    if (!props) props = {};

    for (let prop of DEFAULTS) {
      !!props[prop[0]]
        ? (this[prop[0]] = props[prop[0]] as any) // typescript was pissing me off, I have been writing ludicrous types for fucking hours and it keeps throwing & in there for no apparent reason so I no longer care. DEFAULTS is already checked so I forsee no issues
        : (this[prop[0]] = createSignal(prop[1]) as any);
    }

    this.videoRef = createRef<Video>();
    this.rayRefs = new Array(4).fill(null).map((x) => createRef<Ray>());
    this.rays = this.getRays();
  }

  /* props */
  public readonly rayWidth: SimpleSignal<number, this>;
  public readonly rayColor: SimpleSignal<string, this>;
  public readonly duration: SimpleSignal<number, this>;
  public readonly runtime: SimpleSignal<number, this>;
  public readonly corners: SimpleSignal<TCorners, this>;
  public readonly offsetsList: SimpleSignal<TCorners[], this>;
  public readonly videoRef: Reference<Video>;
  public readonly rayRefs: Reference<Ray>[];
  public readonly rays: TRay[];

  /* methods */
  public iterations(): number {
    return this.runtime() / this.duration();
  }

  public animateAll() {
    let toReturn = [];
    for (let i = 0; i < this.iterations(); i++) {
      for (let o of this.offsetsList()) {
        toReturn.push(this.animate(o, this.duration));
      }
    }
    return chain(
      ...toReturn,
      this.animate(this.offsetsList()[0], this.duration) // return to the initial offset so that it loops
    );
  }

  public animate(offsets: TCorners, duration: SimpleSignal<number, any>) {
    return all(
      ...(() => {
        let toReturn = [];
        for (let ray of this.rays) {
          toReturn.push(
            ray.ref().from(
              createSignal(() => vectorSum([ray.from(), offsets[ray.id[0]]])),
              duration() / (this.rays.length + 1)
            ),
            ray.ref().to(
              createSignal(() => vectorSum([ray.to(), offsets[ray.id[1]]])),
              duration() / (this.rays.length + 1)
            )
          );
        }
        return toReturn;
      })()
    );
  }

  private getRays(): TRay[] {
    return [
      {
        ref: this.rayRefs[0],
        from: createSignal(() =>
          vectorSum([this.corners().bottomLeft, [-(this.rayWidth() / 2), 0]])
        ),
        to: createSignal(() =>
          vectorSum([this.corners().bottomRight, [+(this.rayWidth() / 2), 0]])
        ),
        id: ["bottomLeft", "bottomRight"],
      },
      {
        ref: this.rayRefs[1],
        from: createSignal(() =>
          vectorSum([this.corners().bottomRight, [0, +(this.rayWidth() / 2)]])
        ),
        to: createSignal(() =>
          vectorSum([this.corners().topRight, [0, -(this.rayWidth() / 2)]])
        ),
        id: ["bottomRight", "topRight"],
      },
      {
        ref: this.rayRefs[2],
        from: createSignal(() =>
          vectorSum([this.corners().topLeft, [-(this.rayWidth() / 2), 0]])
        ),
        to: createSignal(() =>
          vectorSum([this.corners().topRight, [+(this.rayWidth() / 2), 0]])
        ),
        id: ["topLeft", "topRight"],
      },
      {
        ref: this.rayRefs[3],
        from: createSignal(() =>
          vectorSum([this.corners().bottomLeft, [0, +(this.rayWidth() / 2)]])
        ),
        to: createSignal(() =>
          vectorSum([this.corners().topLeft, [0, -(this.rayWidth() / 2)]])
        ),
        id: ["bottomLeft", "topLeft"],
      },
    ];
  }
}
