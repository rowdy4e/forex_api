const cheerio = require('cheerio');

const scrapeForexFactory = async () => {
    try {
        const response = await fetch('https://www.forexfactory.com/');
        const body = await response.text();
        
        $ = cheerio.load(body);

        const arr = [];

        const row = $(`.calendar__row[data-event-id]`);

        row.each((index, element) => {
            
            const impactClass = $(element).find('td.calendar__cell.calendar__impact span').attr('class');

            arr.push({
                'time': $(element).find(`td.calendar__cell.calendar__time`).text().trim(),
                'currency': $(element).find(`td.calendar__cell.calendar__currency`).text().trim(),
                'impact': {
                    'icon icon--ff-impact-gra': 'Non-Economic',
                    'icon icon--ff-impact-yel': 'Low',
                    'icon icon--ff-impact-ora': 'Medium',
                    'icon icon--ff-impact-red': 'High'
                }[impactClass] || 'Unknown',
                'event': $(element).find(`td.calendar__cell.calendar__event`).text().trim(),
                'actual': $(element).find(`td.calendar__cell.calendar__actual`).text().trim(),
                'forecast': $(element).find(`td.calendar__cell.calendar__forecast`).text().trim(),
                'previous': $(element).find(`td.calendar__cell.calendar__previous`).text().trim(),
            });
        });

        return {'success': true, 'data': arr};
    } catch (error) {
        return {'success': false, 'message': error.message};
    }
}

module.exports = { scrapeForexFactory };