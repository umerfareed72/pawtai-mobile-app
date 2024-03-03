import moment from 'moment';

export const timeChecker = val => {
  const today = moment().endOf('day');
  const yesterday = moment().subtract(1, 'day').endOf('day');
  let currentDate = moment(val);
  var diff = today.diff(currentDate, 'days') - 7670;
  if (diff === 0) return 'Today';
  if (diff == 1) return 'Yesterday';
  return val;
};
