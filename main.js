const { WebCrawler } = require("./wcrawl");
const { PrintCrawl } = require("./ExportCrawl");

async function main() {
  if (process.argv.length < 3) {
    console.log("No Webpage URL provided");
    process.exit(1);
  }
  // just for checking
  // for (const arg of process.argv){
  //   console.log(arg)
  // }
  if (process.argv.length > 3) {
    console.log("Too many arguments/Webpage URL provided");
    process.exit(1);
  }
  const BaseUrl = process.argv[2];
  const Pagesvisit = await WebCrawler(BaseUrl, BaseUrl, {});
  PrintCrawl(Pagesvisit);
}

main();
