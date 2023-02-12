// import puppeteer from "puppeteer";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getJson, config } from "serpapi";

import dotnev from "dotenv";
config.api_key = process.env.SERP_API_KEY;
dotnev.config();

// puppeteer.use(StealthPlugin());

// export const scrapeFromYoutube = async (value) => {
//   const searchValue = value;
//   console.log("searchValue", searchValue);
//   try {
//     const input = searchValue.split(" ").join("+");
//     // console.log(input)
//     const browser = await puppeteer.launch({
//       headless: true,
//       // args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       // executablePath: executablePath(),
//     });
//     // console.log("1", browser);
//     const page = await browser.newPage();
//     // console.log("2", page);

//     await page.setDefaultNavigationTimeout(0);
//     // console.log("3", page);
//     await page.goto(`https://www.youtube.com/results?search_query=${input}`);
//     // console.log("4", page);

//     const results = await page.evaluate(() => {
//       console.log("doc body", document.body);
//       let arr = [];
//       const res = document.body
//         .querySelectorAll(
//           "#contents > ytd-item-section-renderer > #contents > ytd-video-renderer > #dismissible > div > #meta > #title-wrapper > h3"
//         )
//         .forEach((e, i) => {
//           let obj = {
//             title: e.innerText,
//             link: `https://www.youtube.com${e
//               .querySelector("#video-title")
//               .getAttribute("href")}`,
//           };
//           if (i < 1) {
//             arr.push(obj);
//           }
//           return;
//         });
//       console.log(arr);
//       return arr;
//     });

//     console.dir(results);
//     browser.close();
//     console.log(results);
//     return results;
//   } catch (err) {
//     console.error("e", err);
//   }
// };

export const youTubeScraping = async (value) => {
  const searchString = value;
  console.log("key", process.env.SERP_API_KEY);

  let params = {
    engine: "youtube",
    search_query: searchString,
    api_key: process.env.SERP_API_KEY,
  };

  let results = await getJson("youtube", params);

  console.log(results);
  return results.video_results[0].link;
};
