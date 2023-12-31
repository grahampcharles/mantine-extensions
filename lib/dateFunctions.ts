import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import weekOfYear from 'dayjs/plugin/weekOfYear';

export const DATE_STORAGE_FORMAT = 'YYYY-MM-DD';

dayjs.extend(weekOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Atlantic/Azores');
export default dayjs;

export function dayjsNeutral(
  input?: string | number | Dayjs | Date | null | undefined,
  defaultValue?: string | number | Dayjs | Date | null | undefined
): dayjs.Dayjs {
  const ret = dayjs.utc(input);
  if (!ret.isValid()) {
    return dayjs(defaultValue ?? undefined);
  }
  return dayjs(input);
}

export function DateFromString(input: string | undefined): Date {
  return dayjs.utc(input ?? null).toDate();
}

export function DateToString(input: Date | undefined | null): string | null {
  return input === undefined || input === null ? null : dayjs.utc(input).format(DATE_STORAGE_FORMAT);
}

export function convertDateToUTC(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

export function isThisWeek(date: Date | string | null) {
  if (date === null) {
    return false;
  }

  const theDayJs = dayjs(date);
  if (!theDayJs.isValid()) {
    return false;
  }

  return theDayJs.week() === dayjs().week();
}

export function mondayOf(date: Date | string | null | Dayjs) {
  return dayjs(date).startOf('week').add(1, 'day');   // monday
 
}

export function isNextWeek(date: Date | string | null) {
  if (date === null) {
    return false;
  }

  const theDayJs = dayjs(date);
  if (!theDayJs.isValid()) {
    return false;
  }

  return theDayJs.week() === dayjs().add(1, 'week').week();
}
