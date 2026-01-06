import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Video,
  Circle,
  Shape,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  mkSubtitles,
  subtitlesProps,
  TranscriptAtom,
  after,
  SIround,
  zwsp,
  highFill,
  Table,
  TableRecord,
  tableBordersHorizontalInternal,
  flash,
  vectorSum,
} from "mcas";
import * as colors from "mcas/colors";
import video from "../assets/video.mp4";
import ytVid from "../assets/yt-vid.png";
import thumb from "../assets/thumb.png";
import copper from "../assets/copper.png";
import jade from "../assets/jade.png";
import salt from "../assets/salt.png";
import turmeric from "../assets/turmeric.png";
import wood from "../assets/wood.png";
import wool from "../assets/wool.png";

// Well the problem is that just assigning some arbitrary "rarity value," and it might not even be arbitrary, if we just restrict ourselves for now to goods which have a mass, let's say we use the mass, OK there are, you know, 62 tonnes of copper, and 65 tonnes of steel and all that stuff, well that doesn't actually give you the information you need, because you need to know which one is the most efficient in this line of production, you know, maybe you've got a bunch of copper lying around, and you could be using it to make cars out of, but you don't know if that's actually the most value-productive use of copper, copper might be better spent elsewhere, and just knowing how rare copper is, how many tonnes of it you've got---that doesn't tell you that, and this problem, of course, even gets worse when you realise that: well not everything can be measured in tonnes, right? You might have manpower, how many hours of engineer-time you've got, clearly you're not measuring that in tonnes, so how are you going to compare these things and figure out: how much engineering you should use? How much of all different stuff should you use, right?

export default makeScene2D(function* (view) {
  //view.add(<Video zIndex={-999} src={video} play />);

  const subs = mkSubtitles(
    view,
    [
      <Txt {...subtitlesProps}>The thesis of that video is</Txt>,
    ] as TranscriptAtom[],
    { zIndex: -1 },
    { zIndex: -1 },
  );

  const wipe = createRef<Rect>();

  view.add(
    <Rect
      width={9999}
      height={2200}
      fill={colors.yt.dark}
      ref={wipe}
      rotation={-30}
      position={1610}
    />,
  );

  const title = createSignal(zwsp);
  const views = createSignal(0);
  const thumbn = createRef<Img>();
  const videoSubtext = createRef<Rect>();

  view.add(
    <Rect gap={28} layout width="80%" direction="column">
      <Img scale={0} ref={thumbn} width="100%" src={thumb} radius={40} />

      <Rect gap={14} direction="column">
        <Txt
          fontSize={50}
          fontFamily="San Francisco Display"
          fontWeight={600}
          text={title}
        />
        <Rect opacity={0} ref={videoSubtext} alignItems="center" gap={12}>
          <Txt
            fill={colors.yt.videoSubtext}
            fontSize={40}
            fontFamily="San Francisco Display"
            text={() => SIround(views()) + " views"}
          />
          <Circle size={8} fill={colors.yt.videoSubtext} />
          <Txt
            fill={colors.yt.videoSubtext}
            fontSize={40}
            fontFamily="San Francisco Display"
            text="2 years ago"
          />
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* all(
    subs,
    after(
      "wipe",
      wipe().position(0, 0.4),
      after(
        "video",
        popin(thumbn),
        title("Why Socialism is Literally Impossible", 1),
        delay(0.3, all(views(402e3, 2), videoSubtext().opacity(1, 1))),
      ),
    ),
  );

  const table = createRef<Table>();

  view.add(
    <Table
      ref={table}
      borders={tableBordersHorizontalInternal}
      hidden
      data={
        [
          [
            <Txt fontFamily="cubano">GOOD</Txt>,
            <Txt fontFamily="cubano">"RARITY"</Txt>,
          ],
          [
            <Img
              height={100}
              src={copper}
              shadowBlur={6}
              shadowOffset={[5, 7]}
              shadowColor="000000aa"
            />,
            createSignal(52),
          ],
          [
            <Img
              height={100}
              src={turmeric}
              shadowBlur={6}
              shadowOffset={[5, 7]}
              shadowColor="000000aa"
            />,
            createSignal(34),
          ],
          [
            <Img
              height={80}
              src={wood}
              shadowBlur={6}
              shadowOffset={[5, 7]}
              shadowColor="000000aa"
            />,
            createSignal(23),
          ],
          [
            <Img
              height={100}
              src={jade}
              shadowBlur={6}
              shadowOffset={[5, 7]}
              shadowColor="000000aa"
            />,
            createSignal(87),
          ],
          [
            <Img
              height={100}
              src={wool}
              shadowBlur={6}
              shadowOffset={[5, 7]}
              shadowColor="000000aa"
            />,
            createSignal(45),
          ],
          [
            <Img
              height={100}
              src={salt}
              shadowBlur={6}
              shadowOffset={[5, 7]}
              shadowColor="000000aa"
            />,
            createSignal(60),
          ],
        ] as TableRecord[]
      }
      cellHeight={140}
    />,
  );

  const indicates = createRefArray<Rect>();

  view.add(
    <Rect
      ref={indicates}
      width={table().cellWidth}
      height={table().cellHeight() * 7}
      position={[-table().cellWidth() / 2, 0]}
    />,
  );

  view.add(
    <Rect
      ref={indicates}
      width={table().cellWidth}
      height={table().cellHeight() * 7}
      position={[table().cellWidth() / 2, 0]}
    />,
  );

  yield* after(
    "wipe out",
    delay(0.4, wipe().position(-1610, 0.4)),
    popout(thumbn),
    title(zwsp, 0.6),
    views(402e3, 2),
    videoSubtext().opacity(0, 1),
    after(
      "wipe in",
      wipe().position(1610, 0).to(0, 0.4),
      table().in(),
      after(
        "indicate goods",
        flash(() => indicates[0]),
      ),
    ),
    mkSubtitles(
      view,
      [
        <Txt {...subtitlesProps}>It is the idea that you can't</Txt>,
        <Txt {...subtitlesProps}>
          have a socialist <Txt.i>economy</Txt.i> 'cause
        </Txt>,
        <Txt {...subtitlesProps}>under socialism</Txt>,
        <Txt {...subtitlesProps}>
          you can't <Txt.i>economise,</Txt.i>
        </Txt>,
        <Txt {...subtitlesProps}>because you don't know which</Txt>,
        <Txt {...subtitlesProps}>line of production</Txt>,
        <Txt {...subtitlesProps}>is gonna be best---</Txt>,
        <Txt {...subtitlesProps}>you can't arrange the factors, so,</Txt>,
        <Txt {...subtitlesProps}>the reason for this is because</Txt>,
        <Txt {...subtitlesProps}>if you have no private property,</Txt>,
        <Txt {...subtitlesProps}>no private direction,</Txt>,
        <Txt {...subtitlesProps}>no private control,</Txt>,
        <Txt {...subtitlesProps}>of factors of production,</Txt>,
        <Txt {...subtitlesProps}>or means of production,</Txt>,
        <Txt {...subtitlesProps}>whatever you wanna call them,</Txt>,
        <Txt {...subtitlesProps}>then you are not allowed</Txt>,
        <Txt {...subtitlesProps}>to trade them, of course,</Txt>,
        <Txt {...subtitlesProps}>'cause it's gonna be a single guy</Txt>,
        <Txt {...subtitlesProps}>deciding where it all goes,</Txt>,
        <Txt {...subtitlesProps}>or a group of guys,</Txt>,
        <Txt {...subtitlesProps}>or whatever it is---</Txt>,
        <Txt {...subtitlesProps}>a single will,</Txt>,
        <Txt {...subtitlesProps}>so you're not trading them</Txt>,
        <Txt {...subtitlesProps}>which means you can't get prices</Txt>,
        <Txt {...subtitlesProps}>for the factors of production</Txt>,
        <Txt {...subtitlesProps}>which means that you can't</Txt>,
        <Txt {...subtitlesProps}>perform economic calculation---</Txt>,
        <Txt {...subtitlesProps}>you can't compare</Txt>,
        <Txt {...subtitlesProps}>how much it costs</Txt>,
        <Txt {...subtitlesProps}>to make a widget vs</Txt>,
        <Txt {...subtitlesProps}>how much you're getting out of it---</Txt>,
        <Txt {...subtitlesProps}>so without economic calculation</Txt>,
        <Txt {...subtitlesProps}>there is nothing you can do,</Txt>,
        [
          highFill(colors.amber500),
          <Txt {...subtitlesProps}>I mean, could you conceive of</Txt>,
        ],
        <Txt {...subtitlesProps}>a system where it is someone's job</Txt>,
      ] as TranscriptAtom[],
      { zIndex: -1 },
      { zIndex: -1 },
      zwsp,
    ),
  );

  yield* after(
    "rarity",
    flash(() => indicates[1]),
    after(
      "wipe out again",
      delay(0.8, wipe().position(-1610, 0.4)),
      table().out(0.01),
      mkSubtitles(
        view,
        [
          <Txt {...subtitlesProps}>that would be similar</Txt>,
          <Txt {...subtitlesProps}>to a price but it's not</Txt>,
          <Txt {...subtitlesProps}>actually like a price,</Txt>,
          <Txt {...subtitlesProps}>it's for internal use only---</Txt>,
          <Txt {...subtitlesProps}>the same way like a business</Txt>,
          <Txt {...subtitlesProps}>would do some kind of like</Txt>,
          <Txt {...subtitlesProps}>internal calculations that way</Txt>,
          <Txt {...subtitlesProps}>but then it's---</Txt>,
          <Txt {...subtitlesProps}>because it's a</Txt>,
          <Txt {...subtitlesProps}>socialist-run economy</Txt>,
          <Txt {...subtitlesProps}>you have something similar to</Txt>,
          <Txt {...subtitlesProps}>a price control but it's</Txt>,
          <Txt {...subtitlesProps}>just not used for trading,</Txt>,
          <Txt {...subtitlesProps}>it's more used for</Txt>,
          <Txt {...subtitlesProps}>keeping track of the inventory,</Txt>,
          [
            highFill(colors.emerald500),
            <Txt {...subtitlesProps}>Well the problem is that</Txt>,
          ],
          <Txt {...subtitlesProps}>just assigning some arbitrary</Txt>,
          <Txt {...subtitlesProps}>"rarity value," and it might not</Txt>,
          <Txt {...subtitlesProps}>even be arbitrary, if we just</Txt>,
          <Txt {...subtitlesProps}>restrict ourselves for now</Txt>,
          <Txt {...subtitlesProps}>to goods which have a mass,</Txt>,
          <Txt {...subtitlesProps}>let's say we use the mass,</Txt>,
          <Txt {...subtitlesProps}>OK there are, you know,</Txt>,
          <Txt {...subtitlesProps}>62 tonnes of copper and</Txt>,
          <Txt {...subtitlesProps}>65 tonnes of steel and</Txt>,
          <Txt {...subtitlesProps}>all that stuff,</Txt>,
          <Txt {...subtitlesProps}>well that doesn't actually give</Txt>,
          <Txt {...subtitlesProps}>you the information you need,</Txt>,
          <Txt {...subtitlesProps}>because you need to know</Txt>,
          <Txt {...subtitlesProps}>which one is the most efficient</Txt>,
          <Txt {...subtitlesProps}>in this line of production,</Txt>,
          <Txt {...subtitlesProps}>you know, maybe you've got</Txt>,
          <Txt {...subtitlesProps}>a bunch of copper lying around,</Txt>,
          <Txt {...subtitlesProps}>and you could be using it to</Txt>,
          <Txt {...subtitlesProps}>make cars out of, but</Txt>,
          <Txt {...subtitlesProps}>you don't know if that's actually</Txt>,
          <Txt {...subtitlesProps}>the most value-productive</Txt>,
          <Txt {...subtitlesProps}>use of copper,</Txt>,
          <Txt {...subtitlesProps}>copper might be</Txt>,
          <Txt {...subtitlesProps}>better spent elsewhere,</Txt>,
          <Txt {...subtitlesProps}>and just knowing</Txt>,
          <Txt {...subtitlesProps}>how rare copper is,</Txt>,
          <Txt {...subtitlesProps}>how many tonnes of it you've got---</Txt>,
          <Txt {...subtitlesProps}>that doesn't tell you that, and</Txt>,
          <Txt {...subtitlesProps}>this problem, of course,</Txt>,
          <Txt {...subtitlesProps}>even gets worse</Txt>,
          <Txt {...subtitlesProps}>when you realise that:</Txt>,
          <Txt {...subtitlesProps}>well not everything can be</Txt>,
          <Txt {...subtitlesProps}>measured in tonnes, right?</Txt>,
          <Txt {...subtitlesProps}>You might have manpower,</Txt>,
          <Txt {...subtitlesProps}>how many hours of</Txt>,
          <Txt {...subtitlesProps}>engineer-time you've got,</Txt>,
          <Txt {...subtitlesProps}>clearly you're not measuring</Txt>,
          <Txt {...subtitlesProps}>that in tonnes, so how are you</Txt>,
          <Txt {...subtitlesProps}>going to compare these things</Txt>,
          <Txt {...subtitlesProps}>and figure out:</Txt>,
          <Txt {...subtitlesProps}>how much engineering</Txt>,
          <Txt {...subtitlesProps}>you should use?</Txt>,
          <Txt {...subtitlesProps}>How much all sorts of different</Txt>,
          <Txt {...subtitlesProps}>stuff should you use, right?</Txt>,
        ] as TranscriptAtom[],
        { zIndex: -1 },
        { zIndex: -1, fill: colors.amber500 },
        zwsp + zwsp,
      ),
    ),
  );
});
