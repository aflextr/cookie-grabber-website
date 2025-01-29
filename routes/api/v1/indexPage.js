const cache = require("node-cache");
const scrapeCookie = require("../../../scrapeCookie");

var nodeCache = new cache({ stdTTL: 120, checkperiod: 120 });


async function PostIndex(req, res) {
    var { url, token } = req.body;
    if (typeof (url) == "undefined") {
        return res.json({ data: "can't be empty address", status: false, statusCode: 500 });
    }
    if (typeof (token) == "undefined") {
        return res.json({ data: "can't be empty tokens", status: false, statusCode: 500 });
    }
    if (!String(url).match("^(https?:\/\/)(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$")) {
        return res.json({ url: url, data: "Your Url Address is incorrect. Please check", status: false, statusCode: 500 });
    }
    try {
        if (token == "free") {
            var cacheData = nodeCache.get(url);
            if (cacheData) {
                return res.json({ url: url, data: cacheData, status: true, statusCode: 200 });
            } else {
                var data = await scrapeCookie.fetchWithCookies(url);
                if (data.length > 0) {
                    nodeCache.set(url, data);
                    return res.json({ url: url, data: data, status: true, statusCode: 200 });
                }
            }
        }else{
            return res.json({ url: url, data: "The token is incorrect or not validated. Try again", status: false, statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { PostIndex }