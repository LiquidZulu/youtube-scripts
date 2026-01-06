import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Grid,
  Camera,
  Gradient,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  noop,
  spawn,
  waitUntil,
  Color,
  useDuration,
  linear,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  animateWaveform,
  audiowaveformHiLo,
  AudiowaveformJSON,
  a,
  fixCamera,
  generateTxt,
  popin,
  popout,
  fadein,
  fadeout,
  after,
  ArrowList,
} from "mcas";
import * as colors from "mcas/colors";
import rothImg from "../assets/rothbard.jpg";
import data from "../data/rothbard.wav.json";

export default makeScene2D(function* (view) {
  view.fill(0);

  const scaleWave = 1.4;
  const quoteText = createRefArray<Txt>();
  const rays = createRefArray<Ray>();
  const grid = createRef<Grid>();
  const avatarWidth = 700;
  const camera = createRef<Camera>();
  const elaboration = createRef<Rect>();
  const list = createRef<ArrowList>();
  const quoteCont = createRef<Rect>();
  const write = createSignal(0);

  view.add(
    <Camera ref={camera}>
      <Rect
        layout
        direction="column"
        size={view.size}
        alignItems="center"
        paddingTop={view.height() / 10}
      >
        <Rect gap={128} width="90%">
          <Rect direction="column" gap={64} alignItems="center">
            <Img
              clip
              ratio={1}
              src={rothImg}
              width={avatarWidth - 5}
              radius={20}
              lineWidth={10}
              stroke="white"
              alignItems="end"
              justifyContent="center"
            >
              <Rect
                shadowColor="black"
                shadowBlur={4}
                shadowOffsetX={3}
                shadowOffsetY={5}
              >
                <Txt fontFamily="ProggyClean CE Nerd Font" fontSize={80}>
                  Murray Rothbard
                </Txt>
              </Rect>
            </Img>
            <Rect
              gap={2}
              alignItems="center"
              clip
              height={200}
              radius={20}
              lineWidth={5}
              stroke="white"
            >
              <Grid
                layout={false}
                ref={grid}
                width={15000}
                height={"100%"}
                stroke={"#666"}
                start={0}
                end={1}
                lineWidth={10}
                scale={0.15}
              />
              {...a(avatarWidth / 2).map((_) => (
                <Ray ref={rays} lineWidth={2} stroke="00ff00" />
              ))}
            </Rect>
          </Rect>
          <Rect
            position={[450, 135]}
            layout={false}
            clip
            size={[2630, 1400]}
            shadowBlur={80}
            shadowColor="#E4E0DA"
          >
            <Rect
              width={2630}
              layout
              ref={quoteCont}
              direction="column"
              gap={32}
            >
              <Txt
                writeOn={() => Math.min(write() * 2, 1)}
                ref={quoteText}
                textWrap
                fontFamily="ProggyClean CE Nerd Font"
                fontSize={80}
              >
                Since anarchists and other libertarians are, to say the least,
                an embattled minority, we have tended to be indulgent toward
                anyone and everyone in our ranks, even those who have been
                busily pecking away at the vitals of the libertarian position;
                Or, to change our metaphor, who have been picking off stragglers
                as we try to continue our march against the State. [...] I say
                it is high time to take off the gloves in the struggle against
                those whom Sam Konkin incisively calls "Natural Outlaws."
              </Txt>
              <Txt
                writeOn={() => (write() < 0.5 ? 0 : write() * 2 - 1)}
                ref={quoteText}
                textWrap
                fontFamily="ProggyClean CE Nerd Font"
                fontSize={80}
              >
                For many years now, first as anarcho-Stirnerites and now also as
                anarcho-pragmatists, the Natural Outlaws have been firing away
                from inside their supposedly impregnable fortress of ethical
                nihilism, sneering at such fundamentals of libertarianism as
                individual rights and rational ethical principles. Since the
                Outlaws stand for nothing, they believe they can remain
                permanently blessed with the advantage of the strategic
                offensive.
              </Txt>
            </Rect>
          </Rect>
        </Rect>
      </Rect>
      <Txt fontFamily="ProggyClean CE Nerd Font" position={[0, 1000]}>
        Murray Rothbard,{" "}
        <Txt.i>On The Duty Of Natural Outlaws To Shut Up</Txt.i>,{" "}
        <Txt fill={colors.sky500}>
          https://mises.org/articles-interest/duty-natural-outlaws-shut
        </Txt>
      </Txt>
      <Rect
        layout
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={128}
        size={view.size}
        position={[view.width(), 0]}
        ref={elaboration}
      >
        <Txt fontSize={200} uppercase fontFamily="oswald" fill="red" glow>
          rothbard's attack on pragmatism
        </Txt>
        <ArrowList
          in={(text: Txt, ray: Ray) => {
            text.opacity(1);
            text.children()[0].fontFamily("ProggyClean CE Nerd Font");

            return all(ray.end(1, 1), text.children()[0].writeOn(1, 1));
          }}
          ref={list}
          fontSize={130}
          fontFamily="ProggyClean CE Nerd Font"
          width={2800}
          hGap={128}
          shadowBlur={40}
          shadowColor="#E4E0DA"
        >
          <Txt writeOn={0} textWrap fontFamily="ProggyClean CE Nerd Font">
            Rothbard would outline an attack against these natural outlaws in
            order "that ethicists and natural lawyers [may] take the strategic
            and tactical offensive."
          </Txt>
          <Txt writeOn={0} textWrap fontFamily="ProggyClean CE Nerd Font">
            He shows that <Txt.i>on their own premises</Txt.i>, the pragmatists
            have a moral duty to shut up and abandon their moronic creed.
          </Txt>
        </ArrowList>
      </Rect>
    </Camera>,
  );
  fixCamera(view, camera);

  console.log("hello", quoteCont().size());

  yield spawn(
    animateWaveform(
      audiowaveformHiLo(data),
      rays,
      (c) => (hi, lo, ray) => {
        ray.from([ray.from().x, hi * scaleWave * 100 + 1]);
        ray.to([ray.to().x, lo * scaleWave * 100 - 1]);
      },
      1 / 20,
    ),
  );

  yield* all(
    write(1, 1),
    after(
      "move cam",
      chain(list().next("first list"), list().next("second list")),
      chain(camera().centerOn(elaboration(), 1)),
    ),
  );
  quoteCont().removeChildren();
  quoteCont().add(
    <>
      <Txt textWrap fontFamily="ProggyClean CE Nerd Font" fontSize={80}>
        First, the trouble with pragmatism, and especially anarcho-pragmatism,
        is <Txt.i>that it doesn't work</Txt.i>. And since pragmatists believe
        that the only truth is whatever "works," that settles that (setting
        aside such deep problems as the meaning of "work:" work for "what,"
        etc.). Take, for example, the severe criticisms that Jorge Amador, the
        guru of anarcho-pragmatism, has made of the Bergland-Lewis presidential
        campaign, in his organ, The Pragmatist. Amador's critique is that the LP
        was (a) too gradualist, and also (b) ideological. In other words, his
        preferred campaign would be radical anarchist to the hilt, and yet
        non-ideological. That is, all talk of moral principles or rights would
        be tossed aside. Not only that: we could no longer call the State an
        organization of a criminal ruling class, because "crime" itself is a
        moral and natural-law concept, and presumes immoral criminals ripping
        off innocent victims. So what would an Amadorean LP campaigner talk
        about? He would confine himself to demonstrating the pragmatic virtues
        of the radical anarchist alternative.
      </Txt>
      <Txt textWrap fontFamily="ProggyClean CE Nerd Font" fontSize={80}>
        But this is a tall order indeed. In fact, a virtually impossible one.
        The pragmatic radical anarchist is faced immediately with powerful
        critiques from pragmatic statists. He can show, for example, that
        anarchy would increase production, yield a higher standard of living,
        etc., in the long run. But in the short run, lots of the privileged,
        subsidized, or monopolistic would be cast adrift. All these short-run
        and maybe intermediate-run problems could only be offset by vague future
        benefits. But why pragmatically, should everyone prefer the long-run to
        the short-run? What about the high-time preference people, who thus
        challenge the Amadorean: "Look here, fella, I <Txt.i>know</Txt.i> the
        pragmatic benefits I’m getting from the current system. And I{" "}
        <Txt.i>know</Txt.i>, too, the headaches, the disruptions, the losses
        that I and lots of others will suffer during the lengthy 'transition'
        period. Even if you've convinced me that eventually I might benefit,
        these benefits are too chancy and too long-run for me to want to risk
        it." And if the average person cannot be sold on radical immediatist
        anarchism, <Txt.i>a fortiori</Txt.i> the criminal ruling class, those
        net beneficiaries of the State, they who might well be losers even in
        the long-run, <Txt.i>certainly</Txt.i> won't be convinced.{" "}
        <Txt.i>At best</Txt.i>, the Amadorsymp will say: "Well, I admit this
        anarchism sounds pretty good. But pragmatically, to ease the transition
        and minimize the costs that even you admit, let's move toward the ideal
        very, very gradually." And we are back, willy-nilly, to the
        Republication or Democrat Party, the master "gradualists" of us all.
      </Txt>
      <Txt textWrap fontFamily="ProggyClean CE Nerd Font" fontSize={80}>
        It is no accident, then, that Democrats and Republicans proudly{" "}
        <Txt.i>call themselves</Txt.i> "pragmatists." Sure, they believe in
        freedom, in peace, in free markets, in all the goodies, but these goals
        have to be approached, they tell us, piecemeal, by the groping
        push-and-pull of the democratic consensus. And we are back hip deep in
        the status quo. "Radical pragmaticism" of any sort, whether anarcho or
        Khomeini or whatever, is virtually a contradiction in terms.
      </Txt>
    </>,
  );
  quoteCont().position([0, 1500]);
  yield* after("cam back", camera().position(0, 1));

  elaboration().remove();

  yield* quoteCont().position([0, -1500], useDuration("scroll text"), linear);

  yield* waitUntil("end");
});
