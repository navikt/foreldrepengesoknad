import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { isPeriodNotOverlappingOthers, isValidDate } from './dateFormValidation';

describe('isValidDate', () => {
    const validate = isValidDate('feil');

    it('godtar tom verdi og gyldig ISO-dato', () => {
        expect(validate('')).toBeNull();
        expect(validate('2024-01-01')).toBeNull();
        expect(validate('2024-02-29')).toBeNull();
    });

    it.each(['x2024-01-01', '2024-1-1', '01.01.2024', '2024-02-31', '2023-02-29', '2024-04-31'])('avviser %s', (value) => {
        expect(validate(value)).toBe('feil');
    });
});

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
