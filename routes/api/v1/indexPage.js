const scrapeCookie = require("../../../scrapeCookie");



async function PostIndex(req, res) {
    try {
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

        if (token == "free") {
            var data = await scrapeCookie.fetchWithCookies(url);
            if (data.length > 0) {
                return res.json({ url: url, data: data, status: true, statusCode: 200 });
            }

        } else {
            return res.json({ url: url, data: "The token is incorrect or not validated. Try again", status: false, statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            url: url,
            data: "server error. Please try again later",
            status: false,
            statusCode: 500
        });
    }
}


module.exports = { PostIndex }