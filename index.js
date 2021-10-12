const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const XLSX = require('xlsx');
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb://exceltocosmos:8DIMWhlP1nTvBPhmW6OnbIAkaHUPVImIpGpp0nq2g319D1nzez4FJ4wvfqz8SiItI1tceGsrEx1lnI2PWFwJCw==@exceltocosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@exceltocosmos@";

const dbName = "testexcelimport";
const account = "storage111021";
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`
);

const containerName = "testtrigger";

var db

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    context.log('Connected to Database')
    db = client.db("testexcelimport")
})


module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");

    const workbook = XLSX.read(myBlob, {type:"buffer"});     
    const sheet_name_list = workbook.SheetNames;

    for(var i=0;i < sheet_name_list.length; i++){
      var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]) 
      context.log(dbName);
      context.log(sheet_name_list[i]);   
      db.collection(sheet_name_list[i]).insertMany(data, (err, res) => {
        if (err) throw err;   
        context.log("Number of documents inserted: " + res.insertedCount);
      });
    }
    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    // const downloadBlockBlobResponse = await blobClient.download();
    // context.log(downloadBlockBlobResponse);
    // const downloaded = (
    //   await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
    // ).toString();
    //console.log("Downloaded blob content:", downloaded);
  
    // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
    async function streamToBuffer(readableStream) {
      return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
          chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
          resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
      });
    }
};