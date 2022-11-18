import S3ClientContainer from "./lib/delete-bucket.js";
import { program } from "commander";

program
  .option("-b, --bucket <name>", "specify the name of the bucket to be deleted")
  .option("-a, --all", "all buckets will be deleted");

program.parse();
const options = program.opts();

let response;

if (options.all) {
  if (options.bucket) {
    console.error(
      "You cannot specify a bucket to delete when using the '--all' option"
    );
    process.exit();
  }
  response = await S3ClientContainer.emptyAndDeleteAllBuckets();
} else {
  response = await S3ClientContainer.emptyAndDeleteBucketByName(options.bucket);
}

console.log(response);
