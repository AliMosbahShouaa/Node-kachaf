const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const moment = require('moment');


router.get('/get-prayer', async (req, res, next) => {
    fetch('https://api.pray.zone/v2/times/today.json?city=lebanon')
        .then(res => res.json())
        .then(json => {
            if (!json.status) {
                const err = new Error('لم يتم العثور على نتائج للبحث');
                next(err);
                return;
            }
            function tConvert(time) {
                // Check correct time format and split into components
                time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                if (time.length > 1) { // If time format correct
                    time = time.slice(1);  // Remove full string match value
                    time[0] = +time[0] % 12 || 12; // Adjust hours
                }
                return time.join(''); // return adjusted time or original string
            }

            var endFajr = moment(json.results.datetime[0].times.Fajr, 'hh:mm')
                .add(25, 'minutes')
                .format("hh:mm");
            var endDuhur = moment(json.results.datetime[0].times.Dhuhr, 'hh:mm')
                .add(15, 'minutes')
                .format("hh:mm");
            var endAsr = moment(json.results.datetime[0].times.Asr, 'hh:mm')
                .add(10, 'minutes')
                .format("hh:mm");
            var endMaghrib = moment(json.results.datetime[0].times.Maghrib, 'hh:mm')
                .add(5, 'minutes')
                .format("hh:mm");
            var endIsha = moment(json.results.datetime[0].times.Isha, 'hh:mm')
                .add(10, 'minutes')
                .format("hh:mm");

            let prayer = {
                data: {
                    Fajr: {
                        start: tConvert(json.results.datetime[0].times.Fajr),
                        end: endFajr
                    },
                    Duhur: {
                        start: tConvert(json.results.datetime[0].times.Dhuhr),
                        end: endDuhur
                    },
                    Asr: {
                        start: tConvert(json.results.datetime[0].times.Asr),
                        end: endAsr
                    },
                    Maghrib: {
                        start: tConvert(json.results.datetime[0].times.Maghrib),
                        end: endMaghrib
                    },
                    Isha: {
                        start: tConvert(json.results.datetime[0].times.Isha),
                        end: endIsha
                    }
                },
                status : {
                    success : true
                }
            }
            res.status(200).json(prayer)



        })

})












module.exports = router;
