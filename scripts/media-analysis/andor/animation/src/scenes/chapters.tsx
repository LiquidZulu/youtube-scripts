import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Video, Ray, Txt } from '@motion-canvas/2d/lib/components';
import { vectorSum } from '../util';
import { SquigglyBorder } from '../components';
import { all, chain, waitFor } from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core/lib/signals';

import kassa from '../../../chapters/kassa.raw.mp4';
import clem from '../../../chapters/clem.raw.mp4';
import keef from '../../../chapters/keef.raw.mp4';
import andor from '../../../chapters/andor.raw.mp4';

export default makeScene2D(function* (view) {
    for (let fade of [
        [1, 1],
        [1, 0],
        [0, 1],
    ] as Array<[number, number]>) {
        const squigglyBorder = new SquigglyBorder({
            runtime: createSignal(130),
            rayColor: createSignal({ r: 0xff, g: 0xff, b: 0xff, a: fade[0] }),
        });

        view.fill(0);
        view.add(<Txt fill={0xffffff}>{`Fade behaviour: ${fade}`}</Txt>);
        yield* waitFor(10);

        for (let video of [kassa, clem, keef, andor]) {
            // reset the view
            view.removeChildren();
            view.fill(0x242424);

            view.add(
                <Video
                    scale={2 / 3}
                    ref={squigglyBorder.videoRef}
                    src={video}
                    shadowBlur={60}
                    shadowOffsetY={20}
                    shadowColor={'black'}
                />
            );

            for (let ray of squigglyBorder.rays) {
                view.add(
                    <Ray
                        ref={ray.ref}
                        lineWidth={squigglyBorder.rayWidth}
                        stroke={squigglyBorder.rayColor}
                        from={vectorSum([
                            ray.from,
                            squigglyBorder.offsetsList()[0][ray.id[0]],
                        ])}
                        to={vectorSum([
                            ray.to,
                            squigglyBorder.offsetsList()[0][ray.id[1]],
                        ])}
                    />
                );
            }

            squigglyBorder.videoRef().play();
            yield* all(
                squigglyBorder.animateAll(),
                chain(
                    waitFor(65),
                    squigglyBorder.rayColor(
                        { r: 0xff, g: 0xff, b: 0xff, a: fade[1] } as any, // idk why ts is shouting at me here, it works and this appears to be the correct usage according to the docs
                        3
                    )
                )
            );
        }
    }
});
