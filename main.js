const WebCrawler = require("./wcrawl");

function main() {
  if (process.argv.length < 3) {
    console.log("No Webpage URL provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many arguments provided");
    process.exit(1);
  }
  console.log(`Webpage URL provided, starting web crawling for ${BaseUrl}`);
  WebCrawler(BaseUrl);
}

main();
