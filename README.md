# S3 Utility Belt

## Overview
These functions are very destructive and can wipe out an account's buckets. They were put together to clean out educational accounts once students are done with their resources and a new class is prepped. If you have the necessary permissions on your account to delete buckets, you probably know what power you hold.

## Known Issues
Some buckets cannot because they must be addressed using a specified endpoint.
Changing the region manually to reflect the redirect endpoint should do it - patch incoming.

## Requirements
  - execution environment will require AWS credentials with S3 capabilities
  - `node` version 18 LTS (created with, not tested with others)

### Usage
  - `npm install` to install dependencies
  - Run `index.js` with Node or use the NPM scripts ([passing arguments](https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script))
    - To see all available options
      ```
      node index.js --help  
      ```
      ```
      npm start -- --help
      ```
    - To delete all buckets
      ```
      node index.js -a
      ```
    - To delete a bucket by name
      ```
      node index.js -b BUCKET_NAME
      ```

### Troubleshooting
  - Run this to see which user profile is selected
    ```
    aws iam get-user
    ```
  - If your AWS Shared Credentials file (typically at `~/.aws`) has multiple profiles, ensure the appropriate one is used for local scripts
    ```
    export AWS_PROFILE=name-of-aws-profile
    ```