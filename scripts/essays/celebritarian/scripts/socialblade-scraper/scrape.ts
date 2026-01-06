import puppeteer from "puppeteer";
import readline from "readline";

function waitForUserInput(): Promise<void> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(
            "Please solve the CAPTCHA in the browser, then press Enter to continue...",
            () => {
                rl.close();
                resolve();
            },
        );
    });
}

async function scrapeViewsData(compareUrl: string) {
    const browser = await puppeteer.launch({
        headless: false, // Set to false for debugging to see the browser.
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: "/run/current-system/sw/bin/chromium",
    });
    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    );

    // Navigate to the compare page.
    await page.goto(compareUrl, { waitUntil: "networkidle2" });

    // Check if CAPTCHA is present (e.g., look for a known CAPTCHA element)
    const isCaptchaPresent = await page.evaluate(() => {
        return (
            true ||
            !!document.querySelector("#challenge-form") || // Cloudflare CAPTCHA form
            !!document.querySelector('iframe[src*="cloudflare"]') || // Cloudflare iframe
            !!document.querySelector(".h-captcha") || // hCaptcha
            !!document.querySelector('iframe[src*="hcaptcha"]') // hCaptcha iframe
        );
    });

    if (isCaptchaPresent) {
        console.log("CAPTCHA detected. Please solve it in the browser.");
        await waitForUserInput(); // Pause until user presses Enter
    }

    // Wait for Highcharts to load and render (increased timeout for safety)
    try {
        await page.waitForFunction(
            () =>
                typeof (window as any).Highcharts !== "undefined" &&
                (window as any).Highcharts.charts.length > 0,
            { timeout: 60000 },
        );
    } catch (error) {
        console.error(
            "Failed to load Highcharts. Ensure the CAPTCHA was solved correctly and the page loaded.",
        );
        await browser.close();
        return;
    }

    // Evaluate in the page context to extract data from the views chart.
    const chartData = await page.evaluate(() => {
        const Highcharts = (window as any).Highcharts;
        if (!Highcharts || !Highcharts.charts) return null;

        // Find the chart by title (inspect the page to confirm; e.g., 'Video Views' or similar for the views chart).
        // If multiple charts, loop through Highcharts.charts and match userOptions.title.text.
        const viewsChart = Highcharts.charts.find((chart: any) => {
            const title = chart?.userOptions?.title?.text || "";
            return title.toLowerCase().includes("views"); // Adjust keyword if the title is different (e.g., 'Video Views').
        });

        if (!viewsChart) return null;

        // Extract series data (each series is one channel).
        const extractedData: {
            channel: string;
            points: { date: string; views: number }[];
        }[] = viewsChart.series.map((series: any) => {
            return {
                channel: series.name || "Unknown Channel",
                points: series.data.map((point: any) => {
                    // Convert x (ms timestamp) to readable date.
                    const date = new Date(point.x).toISOString().split("T")[0]; // YYYY-MM-DD format.
                    return { date, views: point.y };
                }),
            };
        });

        return extractedData;
    });

    await browser.close();

    if (!chartData) {
        console.error(
            "Could not find the views chart. Check the title keyword or inspect Highcharts.charts in the browser console.",
        );
        return;
    }

    console.log("Extracted Views Data:");
    console.log(JSON.stringify(chartData, null, 2));
}

scrapeViewsData(
    "https://socialblade.com/youtube/compare/UCJeZwRfSPX00f4bB7gOeN5w/UCTf0py7ryuSldOsDm4abSsg",
);
