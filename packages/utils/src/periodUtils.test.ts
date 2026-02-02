import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { beforeAll, describe, expect, it } from 'vitest';

import { TIDENES_ENDE } from '@navikt/fp-constants';

import nbMessages from './intl/messages/nb_NO.json';
import { periodFormat } from './periodUtils';

const intlMock = {
    formatMessage: ({ id }: { id: string }) => {
        return nbMessages[id as keyof typeof nbMessages] || id;
    },
} as unknown as IntlShape;

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
