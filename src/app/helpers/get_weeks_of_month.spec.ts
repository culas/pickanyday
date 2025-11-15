import {describe, expect, test} from 'vitest';
import {get_weeks_of_month} from './get_weeks_of_month';

describe('get_weeks_of_month', () => {
  test('should return all weeks with days of november 2025', () => {
    const weeks = get_weeks_of_month(new Date(Date.UTC(2025, 10, 14)));

    const days = weeks.map(week => week.map(date => date.getUTCDate()));
    expect(days).toEqual([
      [27, 28, 29, 30, 31, 1, 2],
      [3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, 30]
    ])
  });

  test('should return all weeks with days of january 2026', () => {
    const weeks = get_weeks_of_month(new Date(Date.UTC(2026, 0, 1)));

    const days = weeks.map(week => week.map(date => date.getUTCDate()));
    expect(days).toEqual([
      [29, 30, 31, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, 1]
    ])
  });

  test('should return all weeks with days of february 2026', () => {
    const weeks = get_weeks_of_month(new Date(Date.UTC(2026, 1, 14)));

    const days = weeks.map(week => week.map(date => date.getUTCDate()));
    expect(days).toEqual([
      [26, 27, 28, 29, 30, 31, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 1]
    ])
  });

  test('should return all weeks with days of march 2026 with six weeks', () => {
    const weeks = get_weeks_of_month(new Date(Date.UTC(2026, 2, 14)));

    const days = weeks.map(week => week.map(date => date.getUTCDate()));
    expect(days).toEqual([
      [23, 24, 25, 26, 27, 28, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, 31, 1, 2, 3, 4, 5]
    ])
  });
});
