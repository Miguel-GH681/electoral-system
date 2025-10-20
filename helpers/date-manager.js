const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const timeRemaining = (init_date, duration, measure)=>{
    const initDate = dayjs(init_date).tz('America/Guatemala');
    const now = dayjs().tz('America/Guatemala');
    let endDate = initDate;

    switch (measure.description.toLowerCase()) {
      case 'mes': endDate = initDate.add(duration, 'month').tz('America/Guatemala'); break;
      case 'semana': endDate = initDate.add(duration, 'day').tz('America/Guatemala'); break;
      case 'dia': endDate = initDate.add(duration, 'day').tz('America/Guatemala'); break;
      case 'hora': endDate = initDate.add(duration, 'hour').tz('America/Guatemala'); break;
      default: return res.status(400).json({ ok: false, msg: 'Medida no válida' });
    }

    const diffMs = endDate.diff(now);
    
    if (diffMs <= 0) {
      return 'campaña finalizada';
    }

    return endDate.format("YYYY-MM-DD HH:mm:ss");
}

const currentDate = () => {
  return dayjs().tz('America/Guatemala').format('YYYY-MM-DD HH:mm:ss');
};

module.exports = {
    timeRemaining,
    currentDate
}