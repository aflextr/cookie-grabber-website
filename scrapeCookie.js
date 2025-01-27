const Axios = require('axios');
const tough = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');
const axiosRetry = require("axios-retry").default;
const { setupCache } = require("axios-cache-interceptor");



const instance = Axios.create();
const axios = setupCache(instance);
axiosRetry(axios, { retries: 3 });


const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar }));

async function fetchWithCookies(url) {
  try {
    const header = {
      "Accept-Language":"tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
      "Sec-Ch-Ua-Platform":"Windows",
      "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
      "Origin":url,
      "Referer":url,
    }

    await client.get(url,{headers:header});
    
    var cookies = cookieJar.getCookiesSync(url);
    cookies = cookies.map(cookie => cookie.cookieString()).join('; ');
    return cookies
  } catch (error) {
    console.error('Error fetching the URL:', error);
  }
}

module.exports = {fetchWithCookies};