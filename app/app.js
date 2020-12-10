const express = require('express');
const cors = require('cors');
const app = express();
//const jsdom = require("jsdom");
const curl = require("curl");

app.use(cors())

app.listen(80, () => {
    console.log('Server running at http://127.0.0.1:80/');
})

app.get('/getTitle', (req, res) => {
    let url = req.query.url

    if(!url.includes('http')) {
        if(!url.includes('www.')) url = 'https:\/\/www.' + url
        else url = 'https:\/\/' + url
    }

    console.log(url)

    curl.get(url, null, (err,resp,body)=>{
        if(!err && resp.statusCode == 200){
            //save to cookies for search history

            res.end(extractTitle(body));
        }
        else {
            //some error handling
            console.log(err);
            res.end('*Invalid URI*')
        }
    });
    
})

function extractTitle(html){
    //const {JSDOM} = jsdom;
    //const dom = new JSDOM(html);
    //const $ = (require('jquery'))(dom.window);

    //return $("meta[property='og:title']").attr('content');

    let re = new RegExp('<title>(.*?)<\/title>');
    var matches = re.exec(html)
    if (matches && matches.length > 0) return matches[0].replace('<title>', '').replace('<\/title>', '')
    else return '*No Title Found*';
}