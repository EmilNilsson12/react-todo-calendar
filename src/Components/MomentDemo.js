import moment from 'moment';
import momentWithLocales from 'moment-with-locales-es6';

function MomentDemo() {
	let m = moment();
	console.log('m: ', m);
	console.log('m string: ', m.toString());
	console.log('m toISOString: ', m.toISOString());
	console.log('----------------------------');

	let m2 = moment.utc();
	console.log('m2 utc : ', m2);
	console.log('m2 utc string: ', m2.toString());
	console.log('----------------------------');

	let m3 = moment('2020-05-22');
	console.log('m3 toString: ', m3.toString());
	console.log('----------------------------');

	let m4 = moment('2020-05-23T12:00:00');
	console.log('m4 toString: ', m4.toString());
	console.log('----------------------------');

	let m5 = moment('24/5/2020', 'DD/MM/YYYY');
	console.log("let m5 = moment('24/5/2020', 'DD/MM/YYYY');");
	console.log('m5 toString from "invalid date" : ', m5.toString());
	console.log('----------------------------');

	console.log('Getters with moment');
	let m6 = moment();
	console.log('m6 toString ', m6.toString());
	console.log('m6 hours - klockan är nu efter:', m6.hours());
	console.log('klockan timme:', m6.hours());
	console.log('klockan minut:', m6.minutes());
	console.log('klockan sekund:', m6.seconds());
	console.log('veckodag:', m6.days());
	console.log('vecka på året:', m6.week());
	console.log('kvartal på året:', m6.quarter());
	console.log('----------------------------');
	let m7 = moment();
	console.log('m7.toString(): ', m7.toString());
	let getter = 'hours';
	console.log('m7.get(getter): ', m7.get(getter));
	console.log('----------------------------');

	console.log('Setters with moment');
	let m8 = moment();
	console.log('m8.toString(): ', m8.toString());
	m8.set('hours', 2);
	m8.minutes(13);
	m8.set('seconds', 53);
	console.log('m8.toString(): ', m8.toString());
	console.log('----------------------------');

	console.log('MIN/MAX');
	let m9 = moment();
	let m10 = moment('2022-02-01');

	console.log('m9: ', m9.toString());
	console.log('m10: ', m10.toString());

	console.log('max of m9 & m10: ', moment.max(m9, m10).toString());
	console.log('min of m9 & m10: ', moment.min(m9, m10).toString());
	console.log('----------------------------');

	console.log('Manipulera moment date objs');
	let m11 = moment();
	console.log('m11 original: ', m11.toString());
	console.log('add 2 h to m11: ', m11.add(2, 'hours').toString());
	console.log('Chaining operations');
	console.log(
		'add 1 then 4 hours to m11: ',
		m11.add(1, 'hours').add(4, 'hours').toString()
	);
	console.log('----------------------------');
	console.log('Manipulating with object as param');
	let m12 = moment();
	console.log('m12 original: ', m12.toString());
	m12.add({
		hours: 2,
		minutes: 11,
	});
	console.log('m11 after .add(): ', m12.toString());

	console.log('----------------------------');
	console.log('startOf & endOf: ');
	let m13 = moment();
	console.log('m13 original: ', m13.toString().toString());
	console.log(
		'show start of current minute m13: ',
		m13.startOf('minutes').toString()
	);
	console.log(
		'show end of current minute m13: ',
		m13.endOf('minutes').toString()
	);
	console.log('----------------------------');
	let m14 = moment();
	console.log('utcOffset');
	console.log('m13 original: ', m14.toString());
	console.log('utcOffset m14.utcOffset(2)', m14.utcOffset(2).toString());
	console.log('utcOffset m14.utcOffset(12)', m14.utcOffset(12).toString());
	console.log('!!value over 15 gets converted to minutes!!');
	console.log('utcOffset m14.utcOffset(16) ', m14.utcOffset(16).toString());
	console.log('----------------------------');

	console.log('Moment is mutable');
	let m20 = moment();
	let m21 = m20.add(2, 'hours');
	console.log('m20 original: ', m20.toString());
	console.log('m21 original: ', m21.toString());
	console.log('----------------------------');

	let m22 = moment();
	let m23 = m22.clone().add(2, 'hours');
	console.log('m22 original: ', m22.toString());
	console.log('m23 (cloned from m22): ', m23.toString());
	console.log('----------------------------');

	console.log('Formatting');
	let m24 = moment();
	console.log('m24 original: ', m24.toString());
	console.log('m24 formatted YYYY/MM/DD: ', m24.format('YYYY/MM/DD'));
	let dateAsValue = m24.format('YYYY-MM-DD');
	console.log('dateAsValue: ', dateAsValue);
	console.log('typeof dateAsValue: ', typeof dateAsValue);
	console.log('----------------------------');
	console.log('text inuti [] ignoreras av .format()');
	console.log(
		"m24.format('[Vi är nu i vecka] W'): ",
		m24.format('[Vi är nu i vecka] W')
	);
	console.log('----------------------------');

	console.log('Locales');
	let m25 = momentWithLocales();
	console.log('m25 original: ', m25.toString());
	console.log('m25 format locale: ', m25.format('L'));
	console.log('----------------------------');
	let m26 = momentWithLocales();
	console.log("run to change default: m26.locale('sv')");
	m26.locale('sv');
	console.log('m26 format locale after: ', m26.format('L'));
	console.log('----------------------------');

	console.log('Fromnow and from');
	let m27 = moment('2021-09-30');
	let m28 = moment('2022-06-01');
	console.log('m27 original: ', m27.toString());
	console.log('----------------------------');
	console.log('m27 fromNow: ', m27.fromNow());
	console.log('m28 fromNow: ', m28.fromNow());
	console.log('m28 from m27: ', m28.from(m27));
	console.log('m27 from m28: ', m27.from(m28));
	console.log('----------------------------');

	let m29 = moment();
	console.log('----------------------------');

	console.log('Calender examples');
	let calendarTime = moment().add(6, 'days');
	console.log('m29 (now): ', m29.toString());
	console.log('----------------------------');
	console.log('Adding less than a week, then displaying w/ .calendar()');
	console.log('calendarTime.calendar(): ', calendarTime.calendar());
	console.log('----------------------------');

	let calendarTime2 = moment().add(20, 'days');
	console.log('Adding more than a week, then displaying w/ .calendar()');
	console.log('calendarTime2.calendar() : ', calendarTime2.calendar());
	console.log('----------------------------');

	console.log('Calender examples');
	let m30 = moment('2021-08-30');
	let m31 = moment('2021-09-24');
	console.log('m30: ', m30.format('DD-MMMM'));
	console.log('m31: ', m31.format('DD-MMMM'));
	console.log('m31.diff(m30, "d"): ', m31.diff(m30, 'd') + ' days');
	console.log('m31.diff(m30, "h"): ', m31.diff(m30, 'h') + ' hours');
	console.log('----------------------------');

	console.log('Querying');
	let m32 = momentWithLocales();
	let m33 = moment();

	console.log('----------------------------');
	console.log('m32 (now with locales): ', m32.toString());
	console.log('m33 (now): ', m33.toString());

	console.log('m32.isSame(m33)');
	console.log(m32.isSame(m33));

	console.log('momentWithLocales().isSame(moment())');
	console.log(momentWithLocales().isSame(moment()));

	console.log('moment().isSame(momentWithLocales())');
	console.log(moment().isSame(momentWithLocales()));

	console.log('----------------------------');
	console.log("moment('2021-01-01').isSame('2021-01-01')");
	console.log(moment('2021-01-01').isSame('2021-01-01'));
	console.log('----------------------------');

	let m34 = momentWithLocales();
	let m35 = momentWithLocales();
	m34.locale('sv');
	m35.locale('pl');
	console.log('m34 (now with locales(sv)): ', m34.format('L').toString());
	console.log('m35 (now with locales(pl)): ', m35.format('L').toString());
	console.log('----------------------------');
	console.log('m34 (now): ', m34.toString());
	console.log('m35 (now): ', m35.toString());
	console.log('----------------------------');
	console.log('m34.isSame(m35)');
	console.log(m34.isSame(m35));
	console.log('----------------------------');
	console.log("m32.format('[den ]DD MMMM[, ]YYYY')");
	console.log('m32: ', m32.format('[den ]DD MMMM[, ]YYYY'));
	console.log('----------------------------');

	return <div>Hello from MomentDemo</div>;
}

export default MomentDemo;
