const axios = require('axios');
class APIController {
    static getYesNo = async (req, res, next) => {
        try {
            let theRes = await axios({
                method: 'get',
                url: 'https://yesno.wtf/api',
            });
            if (theRes) {
                res.status(200).json(theRes.data);
            } else {
                next({
                    status: 404,
                    message: `not found in the yesno`,
                });
            }
        } catch (err) {
            next(err);
        }
    };

    static getWeather = async (req, res, next) => {
        try {
            let apiKey = process.env.API_WEATHER;
            let cityName = 'Jakarta';
            let response = await axios({
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
            });

            res.status(200).json(response.data);
        } catch (err) {
            next(err);
        }
    };

    static quotes = async (req, res, next) => {
        try {
            let response = await axios({
                method: 'GET',
                url: `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand`,
            });
            res.status(200).json(response.data);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = APIController;
