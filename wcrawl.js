const { JSDOM } = require("jsdom");

async function WebCrawler(UrlNow, BaseUrl, Pagesvisited) {
  const BaseUrlObject = new URL(BaseUrl);
  const UrlNowObject = new URL(UrlNow);
  if (BaseUrlObject.hostname !== UrlNowObject.hostname) {
    console.error("URL provided is not from the same domain");
    return Pagesvisited;
  }
  const normalizeURLNow = normalizeURL(UrlNow);
  if (Pagesvisited[normalizeURLNow] > 0) {
    console.log(`URL already visited: ${UrlNow}`);
    Pagesvisited[normalizeURLNow]++;
    return Pagesvisited;
  }
  Pagesvisited[normalizeURLNow] = 1;
  console.log("Webpage URL provided, starting web crawling for: " + UrlNow);
  const response = await fetch(UrlNow);
  console.log("Response status: " + response.status);
  if (!response.ok) {
    console.error(`Failed to fetch page: ${response.statusText}`);
    return Pagesvisited;
  }
  if (!response.headers.get("content-type").includes("text/html")) {
    console.error("Provided URL is not a webpage");
    return Pagesvisited;
  }
  const htmlBody = await response.text();
  const NewURLs = getURLsFromHTML(htmlBody, BaseUrl);
  for (const NewURL of NewURLs) {
    Pagesvisited = await WebCrawler(NewURL, BaseUrl, Pagesvisited);
  }
  return Pagesvisited;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const linkElements = Array.from(dom.window.document.querySelectorAll("a"));
  const cleanedBaseURL = baseURL.replace(/\/+$/, "");

  return linkElements
    .map((linkElement) => {
      try {
        const url = linkElement.href.startsWith("/")
          ? `${cleanedBaseURL}${linkElement.href}`
          : linkElement.href;
        return new URL(url).href;
      } catch (error) {
        console.error(`Invalid URL ${error.message}`);
        return null;
      }
    })
    .filter((url) => url !== null);
}

function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  const hostpath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostpath.endsWith("/")) {
    return hostpath.slice(0, -1);
  }
  return hostpath;
}
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  WebCrawler,
};
