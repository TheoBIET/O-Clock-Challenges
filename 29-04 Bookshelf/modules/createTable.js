const dayjs = require('dayjs');
require('dayjs/locale/fr');

const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime)
const table = {
    getRowTableBookInformation: (informations) => {
        return(`
            <tr>
                <td>${informations.title}</td>
                <td>${informations.language}</td>
                <td>${informations.country}</td>
                <td>${informations.author}</td>
                <td>${dayjs(informations.date).locale('fr').format('D MMMM YYYY')}</td>
                <td>${dayjs().locale('fr').from(dayjs(informations.date), true)}</td>
            </tr>
        `)
    }
}

module.exports = table;