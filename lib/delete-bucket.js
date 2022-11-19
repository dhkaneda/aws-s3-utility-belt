// import { S3Client } from "@aws-sdk/client-s3";
import client from "../config.js";
import {
  DeleteBucketCommand,
  DeleteObjectCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  ListObjectVersionsCommand,
} from "@aws-sdk/client-s3";

class S3ClientContainer {
  static emptyBucket = async (bucketName) => {
    const params = { Bucket: bucketName };
    const objectList = await client.send(new ListObjectsCommand(params));
    if (objectList.Contents)
      for (const object of objectList.Contents) {
        params.Key = object.Key;
        await client.send(new DeleteObjectCommand(params));
      }
  };

  static emptyBucketVersions = async (bucketName) => {
    const params = { Bucket: bucketName };
    const versionList = await client.send(
      new ListObjectVersionsCommand(params)
    );
    if (versionList.DeleteMarkers)
      for (const version of versionList.DeleteMarkers) {
        params.Key = version.Key;
        params.VersionId = version.VersionId;
        await client.send(new DeleteObjectCommand(params));
      }
  };

  static deleteBucket = async (bucketName) => {
    const params = { Bucket: bucketName };
    await client.send(new DeleteBucketCommand(params));
  };

  static emptyAndDeleteBucketByName = async (bucketName) => {
    try {
      await this.emptyBucket(bucketName);
      await this.emptyBucketVersions(bucketName);
      await this.deleteBucket(bucketName);
    } catch (error) {
      return error;
    }
    return `Bucket "${bucketName}" emptied and deleted successfully`;
  };

  static emptyAndDeleteAllBuckets = async () => {
    try {
      let bucketList = await client.send(new ListBucketsCommand({}));
      if (bucketList.Buckets.length > 0) {
        for (const bucket of bucketList.Buckets) {
          const response = await S3ClientContainer.emptyAndDeleteBucketByName(bucket.Name);
          console.log(response);
        }
      }
      bucketList = await client.send(new ListBucketsCommand({}));
      if (bucketList.Buckets.length > 0) {
        return `Some buckets could not be deleted. Try to delete them individually: [${bucketList.Buckets.map(
          (bucket) => bucket.Name
        )}].`;
      } else {
        return "There are no buckets.";
      }
    } catch (error) {
      return error;
    }
  };
}

export default S3ClientContainer;
