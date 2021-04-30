const express = require("express");
const app = express();
const port = 3000;
const citiesTimezone = require("../modules/citiesTimezone");
require("dayjs/locale/fr");

app.use(express.static("./src"));

app.get("/city/:cityname", function (req, res) {
    citiesTimezone.updateInformations(citiesTimezone.getTimezone(req.params.cityname), res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
