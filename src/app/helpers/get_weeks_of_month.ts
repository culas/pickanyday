import {describe, expect, test} from 'vitest';

export type Week = [Date, Date, Date, Date, Date, Date, Date];

const LENGTH_OF_ISO_WEEK = 7;
const MAX_WEEKS_A_MONTH_CAN_SPAN = 6;

export function get_weeks_of_month(date: Date): Week[] {
  const result: Week[] = [];

  const last_of_month = get_last_day_of_month(date);
  let day = 1;
  while (result.length <= MAX_WEEKS_A_MONTH_CAN_SPAN) {
    const day_date = new Date(date);
    day_date.setUTCDate(day);
    const week = get_week_of_date(day_date);
    if (week[0].getTime() > last_of_month.getTime()) {
      break;
    }
    result.push(week);
    day += LENGTH_OF_ISO_WEEK;
  }

  return result;
}

function get_week_of_date(date: Date): Week {
  const day_of_week = date.getUTCDay() || LENGTH_OF_ISO_WEEK; // make sunday a 7, as defined in ISO
  return new Array(LENGTH_OF_ISO_WEEK)
    .fill(date)
    .map((date, i) => offset_date(date, (i + 1) - day_of_week)) as Week;
}

function get_last_day_of_month(date: Date): Date {
  const month = date.getUTCMonth();
  const last_of_month = new Date(date);
  last_of_month.setUTCMonth(month + 1);
  last_of_month.setUTCDate(0); // 0 sets last day of previous month
  return last_of_month;
}

function offset_date(date: Date, days_to_offset: number): Date {
  const day_of_month = date.getUTCDate();
  const offset_date = new Date(date);
  offset_date.setUTCDate(day_of_month + days_to_offset);
  return offset_date;
}

describe('get_week_of_day', () => {
  test('within a month', () => {
    const week = get_week_of_date(new Date(Date.UTC(2025, 10, 14)));

    const days = week.map(date => date.getUTCDate());
    expect(days).toEqual([10, 11, 12, 13, 14, 15, 16]);
  });

  test('within a month given a sunday', () => {
    const week = get_week_of_date(new Date(Date.UTC(2025, 10, 16)));

    const days = week.map(date => date.getUTCDate());
    expect(days).toEqual([10, 11, 12, 13, 14, 15, 16]);
  });

  test('across previous month', () => {
    const week = get_week_of_date(new Date(Date.UTC(2025, 10, 1)));

    const days = week.map(date => date.getUTCDate());
    expect(days).toEqual([27, 28, 29, 30, 31, 1, 2]);
  })

  test('across next month', () => {
    const week = get_week_of_date(new Date(Date.UTC(2025, 9, 31)));

    const days = week.map(date => date.getUTCDate());
    expect(days).toEqual([27, 28, 29, 30, 31, 1, 2]);
  })

  test('in january', () => {
    const week = get_week_of_date(new Date(Date.UTC(2026, 0, 10)));

    const days = week.map(date => date.getUTCDate());
    expect(days).toEqual([5, 6, 7, 8, 9, 10, 11]);
  });

})

describe('offset_date', () => {
  test('returns same date for offset 0', () => {
    const date = new Date(Date.UTC(2025, 10, 15, 0, 0, 0));

    const actual = offset_date(date, 0);

    expect(actual).toEqual(date);
  });

  test.each([
    [1, 10, 16],
    [2, 10, 17],
    [15, 10, 30],
    [-1, 10, 14],
    [-10, 10, 5],
    [15, 10, 30],
    [16, 11, 1],
    [18, 11, 3],
    [-14, 10, 1],
    [-15, 9, 31],
    [-17, 9, 29]
  ])('for offset %i should return month %i and day %i',
    (offset, expected_month, expected_day) => {
      const date = new Date(Date.UTC(2025, 10, 15, 0, 0, 0));

      const actual = offset_date(date, offset);

      expect(actual.getDate()).toEqual(expected_day);
      expect(actual.getMonth()).toEqual(expected_month);

    });
});

describe('get_last_day_of_month', () => {
  test.each([
    [0, 31],
    [1, 28],
    [2, 31],
    [3, 30],
    [4, 31],
    [5, 30],
    [6, 31],
    [7, 31],
    [8, 30],
    [9, 31],
    [10, 30],
    [11, 31]
  ])('for month %i in 2025 should return day %i', (given_date, expected) => {
    const date = new Date(Date.UTC(2025, given_date, 1));
    const expected_date = new Date(Date.UTC(2025, given_date, expected));

    const actual = get_last_day_of_month(date);

    expect(actual).toEqual(expected_date);
  })
});
