import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { beforeAll, describe, expect, it } from 'vitest';

import { TIDENES_ENDE } from '@navikt/fp-constants';

import nbMessages from './intl/messages/nb_NO.json';
import { periodFormat } from './periodUtils';

const makeIntlMock = (locale: string) =>
    ({
        formatMessage: ({ id }: { id: string }) => nbMessages[id as keyof typeof nbMessages] || id,
        formatDate: (date: string | Date, options?: Intl.DateTimeFormatOptions) =>
            new Intl.DateTimeFormat(locale, options).format(new Date(date)),
    }) as unknown as IntlShape;

const intlMock = makeIntlMock('nb');

describe('periodFormat', () => {
    beforeAll(() => {
        dayjs.locale('nb');
    });

    const fom = '2026-01-02';
    const tom = '2026-01-04';

    it('skal formatere ordinær periode', () => {
        expect(periodFormat(fom, tom, intlMock)).toEqual('02.01.2026 - 04.01.2026');
    });

    it('skal formatere periode med custom separator', () => {
        expect(periodFormat(fom, tom, intlMock, { separator: 'til' })).toEqual('02.01.2026 til 04.01.2026');
    });

    it('skal formatere periode med tom som er undefined', () => {
        expect(periodFormat(fom, undefined, intlMock)).toEqual('02.01.2026 - ');
    });

    it('skal formatere periode med tom som dagens dato', () => {
        expect(periodFormat(fom, undefined, intlMock, { showTodayString: true })).toEqual('02.01.2026 - d.d.');
    });

    it('skal formatere periode med tom som er tidenes ende', () => {
        const tidensEnde = dayjs(TIDENES_ENDE).format('YYYY-MM-DD');
        expect(periodFormat(fom, tidensEnde, intlMock)).toEqual('02.01.2026 - ');
    });
});

describe('periodFormat med useShortMonth', () => {
    const fom = '2026-12-01';
    const tom = '2026-12-31';

    it('skal bruke norske månedsnavn for nb-locale', () => {
        const result = periodFormat(fom, tom, makeIntlMock('nb'), { useShortMonth: true });
        expect(result).toMatch(/des/i);
    });

    it('skal bruke engelske månedsnavn for en-locale', () => {
        const result = periodFormat(fom, tom, makeIntlMock('en'), { useShortMonth: true });
        expect(result).toMatch(/dec/i);
    });

    it('månedsnavn skal følge intl-locale, ikke global dayjs-locale', () => {
        dayjs.locale('nb');
        const nbResult = periodFormat(fom, tom, makeIntlMock('nb'), { useShortMonth: true });
        const enResult = periodFormat(fom, tom, makeIntlMock('en'), { useShortMonth: true });
        expect(nbResult).not.toEqual(enResult);
    });
});
