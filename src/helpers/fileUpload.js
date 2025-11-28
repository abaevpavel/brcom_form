var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:811d84fd-f4f6-44d5-8e65-822dac02eecf";

const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: bucketRegion,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: bucketRegion }),
    identityPoolId: IdentityPoolId
  }),
});

let promiseUpload = function (file) {
  var rightNow = new Date();
  var dateFormatted = rightNow.toISOString().slice(0, 19).replace(/-/g, "").replace(/:/g,"_").replace(/\s/g,"_")
  let fileClean = file.name.replace(/%20/g, "+");; 
  let key = `forms/todos/${dateFormatted}/${fileClean}`
  if (file) {
    return {
      'promise': s3.send(new PutObjectCommand({
          Bucket: "basementremodeling-archive-12345",
          Key: key,
          Body: file,
          ACL: "public-read"
      })),
      'url': `https://basementremodeling-archive-12345.s3.amazonaws.com/${key}`
    }
  }

}




module.exports = { promiseUpload};