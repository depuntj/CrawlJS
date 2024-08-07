function PrintCrawl(pages) {
  console.log("===================================");
  console.log("Crawl Results:");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const urls = sortedPage[0];
    const count = sortedPage[1];
    console.log(`found ${count} links to page ${urls}`);
  }
  console.log("Crawl Complete");
  console.log("===================================");
}

function sortPages(pages) {
  const PageArray = Object.entries(pages);
  PageArray.sort((a, b) => {
    return b[1] - a[1];
  });
  return PageArray;
}
module.exports = {
  sortPages,
  PrintCrawl,
};
