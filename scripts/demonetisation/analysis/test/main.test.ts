/* -- DO NOT EDIT DIRECTLY -- */

/*
 * this document is handled by ./main.test.ts.org
 */

// inversify
import "reflect-metadata";
import { Container } from "inversify";

// vitest
import { describe, expect, test, TestFunction } from "vitest";

// types
import {
    IVideo,
    EVideoType,
    EReuse,
    EGenre
} from "../src/types";

// ITransform
import { ITransform } from "../src/services/ITransform";
import { RuntimeByStatistics } from "../src/services/ITransform/RuntimeByStatistics";
import { IStatisticDuration } from "../src/services/ITransform/IStatGrabber/IStatisticDuration";
import { DurationSummer } from "../src/services/ITransform/IStatGrabber/IStatisticDuration/DurationSummer";
import { IDurationGetter } from "../src/services/ITransform/IStatGrabber/IStatisticDuration/IDurationGetter";
import { durToS } from "../src/services/ITransform/IStatGrabber/IStatisticDuration/IDurationGetter/durToS";

const C = new Container();
C.bind(ITransform).to(RuntimeByStatistics);
C.bind(IStatisticDuration).to(DurationSummer);
C.bind(IDurationGetter).to(durToS);

const transform = C.get(ITransform)

let tests: Array<[string, TestFunction]> = []

tests.push(["ITransform correctly processes IVideo.videoType", async () => {
    const testVideoType: IVideo[] = [

        // video
        {
            id: "",
            duration: "9:00:00",
            videoType: EVideoType.video,

            // these dont matter
            reuse: EReuse.none,
            genre: EGenre.debate,
        },
        {
            id: "",
            duration: "1:00:00",
            videoType: EVideoType.video,

            // these dont matter
            reuse: EReuse.none,
            genre: EGenre.debate,
        },

        // short
        {
            id: "",
            duration: "9:00",
            videoType: EVideoType.short,

            // these dont matter
            reuse: EReuse.none,
            genre: EGenre.debate,
        },
        {
            id: "",
            duration: "1:00",
            videoType: EVideoType.short,

            // these dont matter
            reuse: EReuse.none,
            genre: EGenre.debate,
        },

        // stream
        {
            id: "",
            duration: "0:09",
            videoType: EVideoType.stream,

            // these dont matter
            reuse: EReuse.none,
            genre: EGenre.debate,
        },
        {
            id: "",
            duration: "0:01",
            videoType: EVideoType.stream,

            // these dont matter
            reuse: EReuse.none,
            genre: EGenre.debate,
        },
    ];

    const procTestVideoType = transform.proc(testVideoType);
    const procKeys = Object.keys({
        "EVideoType.video": null,
        "EVideoType.stream": null,
        "EVideoType.short": null,
        "EReuse.heavy": null,
        "EReuse.light": null,
        "EReuse.none": null,
        "EGenre.debate": null,
        "EGenre.meme": null,
        "EGenre.thesis": null,
        "EGenre.misc": null,
    });

    expect(Object.keys(procTestVideoType)).toStrictEqual(procKeys);

    // should be 10 hours
    expect(procTestVideoType["EVideoType.video"].data).toBe(10 * (60 * 60));

    // should be 10 minutes
    expect(procTestVideoType["EVideoType.short"].data).toBe(10 * 60);

    // should be 10 seconds
    expect(procTestVideoType["EVideoType.stream"].data).toBe(10);
}])

tests.push(["ITransform correctly processes IVideo.reuse", async () => {
    const testReuse: IVideo[] = [

        // none
        {
            id: "",
            duration: "9:00:00",
            reuse: EReuse.none,

            // these dont matter
            videoType: EVideoType.video,
            genre: EGenre.debate,
        },
        {
            id: "",
            duration: "1:00:00",
            reuse: EReuse.none,

            // these dont matter
            videoType: EVideoType.video,
            genre: EGenre.debate,
        },

        // light
        {
            id: "",
            duration: "9:00",
            reuse: EReuse.light,

            // these dont matter
            videoType: EVideoType.video,
            genre: EGenre.debate,
        },
        {
            id: "",
            duration: "1:00",
            reuse: EReuse.light,

            // these dont matter
            videoType: EVideoType.video,
            genre: EGenre.debate,
        },

        // heavy
        {
            id: "",
            duration: "0:09",
            reuse: EReuse.heavy,

            // these dont matter
            videoType: EVideoType.video,
            genre: EGenre.debate,
        },
        {
            id: "",
            duration: "0:01",
            reuse: EReuse.heavy,

            // these dont matter
            videoType: EVideoType.video,
            genre: EGenre.debate,
        },
    ];

    const procTestReuse = transform.proc(testReuse);
    const procKeys = Object.keys({
        "EVideoType.video": null,
        "EVideoType.stream": null,
        "EVideoType.short": null,
        "EReuse.heavy": null,
        "EReuse.light": null,
        "EReuse.none": null,
        "EGenre.debate": null,
        "EGenre.meme": null,
        "EGenre.thesis": null,
        "EGenre.misc": null,
    });

    expect(Object.keys(procTestReuse)).toStrictEqual(procKeys);

    // should be 10 hours
    expect(procTestReuse["EReuse.none"].data).toBe(10 * (60 * 60));

    // should be 10 minutes
    expect(procTestReuse["EReuse.light"].data).toBe(10 * 60);

    // should be 10 seconds
    expect(procTestReuse["EReuse.heavy"].data).toBe(10);
}])

tests.push(["ITransform correctly processes IVideo.genre", async () => {
    const testGenre: IVideo[] = [

        // debate
        {
            id: "",
            duration: "90:00:00",
            genre: EGenre.debate,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },
        {
            id: "",
            duration: "10:00:00",
            genre: EGenre.debate,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },

        // meme
        {
            id: "",
            duration: "9:00:00",
            genre: EGenre.meme,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },
        {
            id: "",
            duration: "1:00:00",
            genre: EGenre.meme,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },

        // thesis
        {
            id: "",
            duration: "9:00",
            genre: EGenre.thesis,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },
        {
            id: "",
            duration: "1:00",
            genre: EGenre.thesis,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },

        // misc
        {
            id: "",
            duration: "0:09",
            genre: EGenre.misc,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },
        {
            id: "",
            duration: "0:01",
            genre: EGenre.misc,

            // these dont matter
            videoType: EVideoType.video,
            reuse: EReuse.none,
        },
    ];

    const procTestGenre = transform.proc(testGenre);
    const procKeys = Object.keys({
        "EVideoType.video": null,
        "EVideoType.stream": null,
        "EVideoType.short": null,
        "EReuse.heavy": null,
        "EReuse.light": null,
        "EReuse.none": null,
        "EGenre.debate": null,
        "EGenre.meme": null,
        "EGenre.thesis": null,
        "EGenre.misc": null,
    });

    expect(Object.keys(procTestGenre)).toStrictEqual(procKeys);

    // should be 100 hours
    expect(procTestGenre["EGenre.debate"].data).toBe(100 * (60 * 60));

    // should be 10 hours
    expect(procTestGenre["EGenre.meme"].data).toBe(10 * (60 * 60));

    // should be 10 minutes
    expect(procTestGenre["EGenre.thesis"].data).toBe(10 * 60);

    // should be 10 seconds
    expect(procTestGenre["EGenre.misc"].data).toBe(10);
}])

describe.concurrent("Transform layer", () => {
    for(let t of tests){
        test(t[0], t[1])
    }
})
