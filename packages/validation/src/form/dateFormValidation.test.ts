import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { isPeriodNotOverlappingOthers } from './dateFormValidation';

describe('isPeriodNotOverlappingOthers', () => {
    it('skal ikke gi feil når periodene ikke overlapper', () => {
        const fom = dayjs().add(10, 'day').format(ISO_DATE_FORMAT);
        const tom = dayjs().add(20, 'day').format(ISO_DATE_FORMAT);
        const annenFom = dayjs().add(1, 'day').format(ISO_DATE_FORMAT);

        const validate = isPeriodNotOverlappingOthers('Feil', { date: tom, isStartDate: false }, [
            { fom: annenFom, tom: dayjs().add(5, 'day').format(ISO_DATE_FORMAT) },
        ]);

        expect(validate(fom)).toBeNull();
    });

    it('skal gi feil når periodene overlapper', () => {
        const fom = dayjs().add(1, 'day').format(ISO_DATE_FORMAT);
        const tom = dayjs().add(20, 'day').format(ISO_DATE_FORMAT);
        const annenFom = dayjs().add(10, 'day').format(ISO_DATE_FORMAT);

        const validate = isPeriodNotOverlappingOthers('Feil', { date: tom, isStartDate: false }, [
            { fom: annenFom, tom: dayjs().add(30, 'day').format(ISO_DATE_FORMAT) },
        ]);

        expect(validate(fom)).toBe('Feil');
    });

    it('skal behandle annen periode uten kjent tom-dato (åpent opphold) som at den varer for alltid', () => {
        const fom = dayjs().add(1, 'day').format(ISO_DATE_FORMAT);
        const tom = dayjs().add(20, 'day').format(ISO_DATE_FORMAT);
        const annenFom = dayjs().add(10, 'day').format(ISO_DATE_FORMAT);

        const validate = isPeriodNotOverlappingOthers('Feil', { date: tom, isStartDate: false }, [
            { fom: annenFom, tom: undefined },
        ]);

        expect(validate(fom)).toBe('Feil');
    });

    it('skal behandle annen periode med tom streng som tom-dato likt som manglende tom-dato', () => {
        const fom = dayjs().add(10, 'day').format(ISO_DATE_FORMAT);
        const tom = dayjs().add(30, 'day').format(ISO_DATE_FORMAT);
        const annenFom = dayjs().add(1, 'day').format(ISO_DATE_FORMAT);

        const validate = isPeriodNotOverlappingOthers('Feil', { date: tom, isStartDate: false }, [
            { fom: annenFom, tom: '' },
        ]);

        expect(validate(fom)).toBe('Feil');
    });

    it('skal behandle tom streng som egen sluttdato likt som manglende sluttdato', () => {
        const fom = dayjs().add(1, 'day').format(ISO_DATE_FORMAT);
        const annenFom = dayjs().add(10, 'day').format(ISO_DATE_FORMAT);

        const validate = isPeriodNotOverlappingOthers('Feil', { date: '', isStartDate: false }, [
            { fom: annenFom, tom: dayjs().add(30, 'day').format(ISO_DATE_FORMAT) },
        ]);

        expect(validate(fom)).toBe('Feil');
    });
});
