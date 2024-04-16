import "reflect-metadata";
import { expect, expectTypeOf, test, describe } from "vitest";
import { z } from "zod";
import { Exclusions, Videos } from "../src/data";
import { EVideoType } from "../src/types";
import { durToS } from "../src/services/ITransform/IStatGrabber/IStatisticDuration/IDurationGetter/durToS";

const vIdSchema = z.string().regex(/^([0-9]|[A-z]|\-|\_){11}$/);
const durationSchema = z
  .string()
  .regex(
    /^(([0-9]:[0-5][0-9])|([0-5][0-9]:[0-5][0-9])|([0-9]{1,}:[0-5][0-9]:[0-5][0-9]))$/
  );

describe.concurrent("Schema Validation", () => {
  test("vIdSchema Correctly Parsing", async () => {
    // Array<[id_to_test, whether_its_valid]>
    const testIds = [
      // 11 digits only
      ["aaaaaaaaaaa", true],
      ["aaaaaaaaaa", false],
      ["aaaaaaaaaaaa", false],

      // URI base64 only
      ["abcWXYZ09-_", true],
      ["aaaaaaaaaa+", false],
      ["aaaaaaaaaa/", false],
      ["aaaaaaaaaa!", false],
    ];

    for (let id of testIds) {
      try {
        vIdSchema.parse(id[0]);
        expect(id[1]).toBe(true);
      } catch (e) {
        //
        // if vIdSchema throws ZodError this implies that the ID is invalid
        if (e.name == "ZodError") expect(id[1]).toBe(false);
        //
        // ...but if it throws some other error (like AssertionError)
        // the test suite needs to hear about it.
        else {
          console.log(id);
          throw e;
        }
      }
    }
  });

  test("durationSchema Correctly Parsing", async () => {
    // Array<[duration_to_test, whether_its_valid]>
    const testDurations = [
      /*
       * -- mins:secs --
       */

      // only secs/mins invalid
      ["0", false],
      [":0", false],
      ["0:", false],

      // validating seconds for 0 mins
      ["0:00", true],
      ["0:01", true],
      ["0:59", true],
      ["0:60", false],

      // validating seconds for non-0 single-digit mins
      ["9:00", true],
      ["9:01", true],
      ["9:59", true],
      ["9:60", false],

      // validating seconds for non-0 double-digit mins
      ["10:00", true],
      ["10:01", true],
      ["10:59", true],
      ["10:60", false],

      // validating minutes
      ["59:00", true],
      ["60:00", false],

      /*
       * -- hours:mins:secs --
       */

      // only hours/secs/mins invalid
      ["0::", false],
      [":0:", false],
      ["::0", false],

      // validating seconds
      ["1:00:00", true],
      ["1:00:01", true],
      ["1:00:59", true],
      ["1:00:60", false],

      // validating minutes
      ["1:00:00", true],
      ["1:01:00", true],
      ["1:59:00", true],
      ["1:60:00", false],

      // validating hours
      ["1:00:00", true],
      ["9999:00:00", true],
    ];

    for (let duration of testDurations) {
      try {
        durationSchema.parse(duration[0]);
        expect(duration[1]).toBe(true);
      } catch (e) {
        //
        // if vIdSchema throws ZodError this implies that the ID is invalid
        if (e.name == "ZodError") expect(duration[1]).toBe(false);
        //
        // ...but if it throws some other error (like AssertionError)
        // the test suite needs to hear about it.
        else {
          console.log(duration);
          throw e;
        }
      }
    }
  });
});

describe.concurrent("Data Validation", () => {
  test("Video IDs Valid", async () => {
    for (let video of Videos) {
      expectTypeOf(
        vIdSchema.parse(video.id) // throws ZodError if it does not match the given regex
      ).toBeString();
    }
  });

  test("Video Durations Valid", async () => {
    for (let video of Videos) {
      durationSchema.parse(video.duration); // throws ZodError if it does not match the given regex
    }
  });

  test("No Repeat Video IDs", async () => {
    // this is very unoptimised, many checks will
    // be run multiple times, but it does not
    // need to be optimal given the size of the
    // dataset. Remember: big O talks about
    // runtime as the size tends to infinity!
    for (let i = 0; i < Videos.length; i++) {
      for (let j = 0; j < Videos.length; j++) {
        // so that we arent comparing a given video to itself
        if (i !== j) {
          expect(Videos[i].id).not.toBe(Videos[j].id);
        }
      }
    }
  });

  test("No Excluded Videos Included", async () => {
    for (let video of Exclusions) {
      expect(Videos.find((i) => i.id == video)).not.toBeDefined();
    }
  });

  test("Video Count Correct", async () => {
    // 208 total (video count shows wrong on
    // playlist sidebar, several indicies are
    // missed in the actual video list), minus
    // data.Exclusions.
    expect(Videos.length).toBe(208 - Exclusions.length);
  });

  test("No Short > 60s", async () => {
    for (let video of Videos) {
      if (video.videoType === EVideoType.short) {
        expect(new durToS().getDuration(video.duration)).toBeLessThanOrEqual(
          60
        );
      }
    }
  });
});
