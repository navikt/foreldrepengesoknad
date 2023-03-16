declare module 'date-holidays' {
    function DateHolidays(country?: string): any;

    namespace DateHolidays {
        export type HolidayType = 'public' | 'bank' | 'school' | 'observance';

        export interface Holiday {
            date: Date;
            end: Date;
            start: Date;
            name: string;
            type: HolidayType;
        }
    }

    export = DateHolidays;
}
