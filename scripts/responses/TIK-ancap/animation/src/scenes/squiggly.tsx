import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Video, Ray } from '@motion-canvas/2d/lib/components';
import { vectorSum } from '../util';
import { SquigglyBorder } from '../components';
import { all, chain, waitFor } from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core/lib/signals';

import squiggly from '../../input/squiggly.mp4';

export default makeScene2D(function* (view) {
    const squigglyBorder = new SquigglyBorder({
        runtime: createSignal(740),
    });

    const video = squiggly;
    view.fill(0x202228);

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
    yield* squigglyBorder.animateAll();
});
