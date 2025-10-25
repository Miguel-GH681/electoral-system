const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const timeRemaining = (init_date, duration, measure) => {
  const initUtc = dayjs.utc(init_date);
  const nowUtc = dayjs.utc();

  let endUtc = initUtc;

  switch ((measure?.description || '').toLowerCase()) {
    case 'mes':
      endUtc = initUtc.add(duration, 'month');
      break;
    case 'semana':
      endUtc = initUtc.add(duration, 'week');
      break;
    case 'dia':
      endUtc = initUtc.add(duration, 'day');
      break;
    case 'hora':
      endUtc = initUtc.add(duration, 'hour');
      break;
    default:
      return 'fecha invalida';
  }

  const diffMs = endUtc.diff(nowUtc);
  if (diffMs <= 0) {
    return 'campaña finalizada';
  }

  return endUtc.tz('America/Guatemala').format('YYYY-MM-DD HH:mm:ss');
};

const currentDate = () => {
  return dayjs.utc().toISOString();
};

module.exports = {
  timeRemaining,
  currentDate
};