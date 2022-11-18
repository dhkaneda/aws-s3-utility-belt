# S3 Utility Belt

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
  - If your AWS Shared Credentials file (typically at `~/.aws`) has multiple profiles, ensure the appropriate one is used for local scripts
    ```
    export AWS_PROFILE=name-of-aws-profile
    ```