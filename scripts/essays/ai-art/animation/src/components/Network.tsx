import {
  RayProps,
  Circle,
  Node,
  NodeProps,
  Rect,
  Ray,
  Polygon,
} from "@motion-canvas/2d";
import {
  createSignal,
  SignalValue,
  SimpleSignal,
  PossibleColor,
  ColorSignal,
  createRef,
  Reference,
  Vector2Signal,
} from "@motion-canvas/core";
import { colorSignal, initial, signal } from "@motion-canvas/2d/lib/decorators";

import * as d3 from "d3";
import seedrandom from "seedrandom";

export type TNetworkDefinition = {
  rayProps?: RayProps;
  vertices: TVertices;
};

export type TVertex = {
  contents: Node;
  links?: Array<[string, Reference<Ray>]>;
  ref: Reference<Node>;
};

export type TVertices = {
  [key: string]: TVertex;
};

export type TLinkEnd = { vertex: [string, TVertex]; x: number; y: number };
export type TLink = { source: TLinkEnd; target: TLinkEnd };
export type TNodeDatum = { vertex: [string, TVertex] } & d3.SimulationNodeDatum;

export interface NetworkProps extends NodeProps {
  vertices: SignalValue<TVertices>;
  seed?: SignalValue<string>;
  lineWidth?: SignalValue<number>;
  stroke?: SignalValue<PossibleColor>;
  centerForce?: SignalValue<number>;
  repelForce?: SignalValue<number>;
  linkForce?: SignalValue<number>;
  linkDistance?: SignalValue<number>;
}

export class Network extends Node {
  @signal()
  public declare readonly vertices: SimpleSignal<TVertices, this>;

  @initial("")
  @signal()
  public declare readonly seed: SimpleSignal<string, this>;

  @initial(8)
  @signal()
  public declare readonly lineWidth: SimpleSignal<number, this>;

  @initial(0xa0a0a0)
  @colorSignal()
  @signal()
  public declare readonly stroke: ColorSignal<this>;

  @initial(0.8)
  @signal()
  public declare readonly centerForce: SimpleSignal<number, this>;

  @initial(100)
  @signal()
  public declare readonly repelForce: SimpleSignal<number, this>;

  @initial(10)
  @signal()
  public declare readonly linkForce: SimpleSignal<number, this>;

  @initial(10)
  @signal()
  public declare readonly linkDistance: SimpleSignal<number, this>;

  public constructor(props?: NetworkProps) {
    super(props);

    this.rng = createSignal(() => seedrandom(this.seed()));

    Object.values(this.vertices()).forEach((x) =>
      x.ref().position([this.random() * (1920 / 2), this.random() * (1080 / 2)])
    );

    for (let [k, v] of Object.entries(this.vertices())) {
      if (!!v.links) {
        for (let [link, ref] of v.links) {
          this.links.push({
            source: { vertex: [k, v], ...v.ref().position() },
            target: {
              vertex: [link, this.vertices()[link]],
              ...this.vertices()[link].ref().position(),
            },
          });
          this.add(
            <Ray
              ref={ref}
              from={this.vertices()[k].ref().position}
              to={this.vertices()[link].ref().position}
              lineWidth={this.lineWidth}
              stroke={this.stroke}
            />
          );
        }
      }
    }

    this.simulation = createSignal(() =>
      d3
        .forceSimulation(
          Object.entries(this.vertices()).map(([k, v]) => ({
            vertex: [k, v],
            x: v.ref().position().x,
            y: v.ref().position().y,
          })) as TNodeDatum[]
        )
        .force("charge", d3.forceManyBody().strength(-this.repelForce()))
        .force("link", d3.forceLink(this.links).distance(this.linkDistance()))
        .force("center", d3.forceCenter().strength(this.centerForce()))
        .tick(100)
        .stop()
    );

    this.simNodes = this.simulation().nodes();

    for (let i = 0; i < this.simNodes.length; ++i) {
      const [k, _] = this.simNodes[i].vertex;
      this.vertices()
        [k].ref()
        .position([this.simNodes[i].x, this.simNodes[i].y]);
      this.add(this.vertices()[k].contents);
    }
  }

  private simNodes: TNodeDatum[];
  private links: TLink[] = [];
  private simulation: SimpleSignal<d3.Simulation<TNodeDatum, TLink>>;
  private rng: SimpleSignal<seedrandom.PRNG>;
  private random(): number {
    return this.rng()();
  }
}
