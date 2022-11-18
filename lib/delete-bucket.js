import client from "../config.js";
import {
  DeleteBucketCommand,
  DeleteObjectCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  ListObjectVersionsCommand,
} from "@aws-sdk/client-s3";

class S3ClientContainer {
  static emptyAndDeleteBucketByName = async (bucket) => {
    let params = { Bucket: bucket };
    try {
      // Gets list of objects and deletes each based on key
      const objectList = await client.send(new ListObjectsCommand(params));
      if (objectList.Contents)
        await objectList.Contents.forEach(async (object) => {
          params.Key = object.Key;
          await client.send(new DeleteObjectCommand(params));
        });
      // Gets list of object versions and deletes each based on versionId
      const versionList = await client.send(
        new ListObjectVersionsCommand(params)
      );
      if (versionList.DeleteMarkers)
        await versionList.DeleteMarkers.forEach(async (version) => {
          params.Key = version.Key;
          params.VersionId = version.VersionId;
          await client.send(new DeleteObjectCommand(params));
        });
      await client.send(new DeleteBucketCommand(params));
    } catch (error) {
      return error;
    }
    return `Bucket "${bucket}" emptied and deleted successfully`;
  };

  static emptyAndDeleteAllBuckets = async () => {
    let bucketList = await client.send(new ListBucketsCommand({}));
    if (bucketList.Buckets.length > 0) {
      await bucketList.Buckets.forEach(async (bucket) => {
        await S3ClientContainer.emptyAndDeleteBucketByName(bucket.Name);
      });
    }
    bucketList = await client.send(new ListBucketsCommand({}));
    if (bucketList.Buckets.length > 0) {
      return `Some buckets could not be deleted. Try to delete them individually: [${bucketList.Buckets.map(bucket => bucket.Name)}].`;
    } else {
      return "There are no buckets."
    }
    return "All buckets emptied and deleted successfully.";
  };
}

export default S3ClientContainer;
