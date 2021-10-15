const fs =require("fs");
const https = require("https");
const download = require('download');
const excelToJson = require('convert-excel-to-json');
  
// Url of the image
const url = 'https://images.indianexpress.com/2020/10/dussehra-1200.jpg';
//const url ='https://www.bajajallianz.com/blog/wp-content/uploads/2018/10/Dussehra-2.jpg';
// Path at which image will get downloaded
//const filePath = `${__dirname}/files`;

const filePath = `C:/dowl`;

const excelData = excelToJson({
    sourceFile: 'shadebankdatatemplate.xlsx',
     sheets:[{
		// Excel Sheet Name
        name: 'formula',
		
		// Header Row -> be skipped and will not be present at our result object.
		header:{
            rows: 1
        },
		
		// Mapping columns to keys
        columnToKey: {
        	A: 'filePath'
        }
    }]
});


for(var i =0 ;i <excelData.formula.length; i++)
{
    const serverPath = excelData.formula[i].filePath
    download(serverPath,filePath)
    .then((filePath) => {
        console.log('Download Completed- '+ serverPath);
    })  
}

  


/* https.get(url,(res) => {
    // Image will be stored at this path
    const path = `${__dirname}/files/img.jpeg`; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })
}) */