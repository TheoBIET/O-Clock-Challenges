const capitalCities = require("./capitalCities");
const clock = require("world-clock")();
const dayjs = require("dayjs");

const citiesTimezone = {
    getTimezone: (city) => {
        for (const cities of capitalCities) {
            if (cities.name.toLowerCase() === city) {
                return cities.tz;
            }
        }
    },
    updateInformations: (requestedCity, res) => {
        if (clock.isValid(requestedCity, Date.now())) {
            res.send(
                dayjs(clock.localDateTime(`${requestedCity}`).toString())
                    .locale("fr")
                    .format("D MMMM YYYY hh:mm:ss")
            );
        } else {
          res.status(404).send("Désolé la ville que vous avez demandé n'existe pas ou n'est pas encore disponible!");
        }
    }
}

module.exports = citiesTimezone;