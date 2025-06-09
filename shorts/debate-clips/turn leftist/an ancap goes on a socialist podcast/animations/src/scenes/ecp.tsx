import { makeScene2D, Rect, Ray, Img, Video, Circle } from "@motion-canvas/2d";
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
} from "mcas";
import * as colors from "mcas/colors";
import video from "../assets/video.mp4";
import ytVid from "../assets/yt-vid.png";
import thumb from "../assets/thumb.png";

// It is the idea that you can't have a socialist /economy/ 'cause under socialism you can't /economise/, because you don't know which line of production is gonna be best---you can't arrange the factors, so, the reason for this is because if you have no private property, no private direction, no private control, of factors of production, or means of production, whatever you wanna call them, then you are not allowed to trade them, of course, 'cause it's gonna be a single guy deciding where it all goes, or a group of guys, or whatever it is---a single will, so you're not trading them which means you can't get prices for the factors of production which means that you can't perform economic calculation---you can't compare how much it costs to make a widget vs how much you're getting out of it---so without economic calculation there is nothing you can do,

export default makeScene2D(function* (view) {
  view.add(<Video zIndex={-999} src={video} play />);

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

  yield* after(
    "wipe out",
    delay(0.4, wipe().position(-1610, 0.4)),
    popout(thumbn),
    title(zwsp, 0.6),
    views(402e3, 2),
    videoSubtext().opacity(0, 1),
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
      ] as TranscriptAtom[],
      { zIndex: -1 },
      { zIndex: -1 },
      zwsp,
    ),
  );
});
