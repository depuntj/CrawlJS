const { JSDOM } = require("jsdom");

async function WebCrawler(UrlNow) {
  console.log("Webpage URL provided, starting web crawling for: " + UrlNow);
  const response = await fetch(UrlNow);
  console.log("Response status: " + response.status);
  if (!response.ok) {
    console.error(`Failed to fetch page: ${response.statusText}`);
    process.exit(1);
  }
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
};
