import metadata from '../store/metadata';

const rtf = new Intl.RelativeTimeFormat(metadata.state.lang, { style: 'short' });

const timeNameMapping = [
  [1, 'second'],
  [60, 'minute'],
  [60, 'hour'],
  [24, 'day'],
  [7, 'week'],
  [4.3482, 'month'],
  [12, 'year'],
];

export default (seconds) => {
  let time = seconds;
  let formatted = rtf.format(-time, timeNameMapping[0][1]);
  // eslint-disable-next-line no-restricted-syntax
  for (const [divisor, timeName] of timeNameMapping.slice(1)) {
    time /= divisor;
    if (time < 1) {
      return formatted;
    }
    formatted = rtf.format(-Math.round(time), timeName);
  }
  return formatted;
};
