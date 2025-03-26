import dayjs from 'dayjs';

import { ISO_DATE_FORMAT, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

import { getMaxDate, getMinDate } from './dateLimits';

describe('Datobegrensninger', () => {
    it('Skal gi korrekte begrensninger for mødrekvoten', () => {
        const kontoType = StønadskontoType.Mødrekvote;
        const familiehendelsedato = '2025-03-26';
        const gjelderAdopsjon = false;

        const minDate = getMinDate({ kontoType, familiehendelsedato, gjelderAdopsjon });
        const maxDate = getMaxDate({ kontoType, familiehendelsedato });

        expect(minDate).toEqual(familiehendelsedato);
        expect(maxDate).toEqual(dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT));
    });

    it('Skal gi korrekte begrensninger for fedrekvoten', () => {
        const kontoType = StønadskontoType.Fedrekvote;
        const familiehendelsedato = '2025-03-26';
        const gjelderAdopsjon = false;

        const minDate = getMinDate({ kontoType, familiehendelsedato, gjelderAdopsjon });
        const maxDate = getMaxDate({ kontoType, familiehendelsedato });

        expect(minDate).toEqual(familiehendelsedato);
        expect(maxDate).toEqual(dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT));
    });

    it('Skal gi korrekte begrensninger for fellesperioden', () => {
        const kontoType = StønadskontoType.Fellesperiode;
        const familiehendelsedato = '2025-03-26';
        const gjelderAdopsjon = false;

        const minDate = getMinDate({ kontoType, familiehendelsedato, gjelderAdopsjon });
        const maxDate = getMaxDate({ kontoType, familiehendelsedato });

        expect(minDate).toEqual(UttaksdagenString(familiehendelsedato).trekkFra(60));
        expect(maxDate).toEqual(dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT));
    });

    it('Skal gi korrekte begrensninger for foreldrepenger', () => {
        const kontoType = StønadskontoType.Foreldrepenger;
        const familiehendelsedato = '2025-03-26';
        const gjelderAdopsjon = false;

        const minDate = getMinDate({ kontoType, familiehendelsedato, gjelderAdopsjon });
        const maxDate = getMaxDate({ kontoType, familiehendelsedato });

        expect(minDate).toEqual(familiehendelsedato);
        expect(maxDate).toEqual(dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT));
    });

    it('Skal gi korrekte begrensninger for foreldrepenger før fødsel', () => {
        const kontoType = StønadskontoType.ForeldrepengerFørFødsel;
        const familiehendelsedato = '2025-03-26';
        const gjelderAdopsjon = false;

        const minDate = getMinDate({ kontoType, familiehendelsedato, gjelderAdopsjon });
        const maxDate = getMaxDate({ kontoType, familiehendelsedato });

        expect(minDate).toEqual(UttaksdagenString(familiehendelsedato).trekkFra(15));
        expect(maxDate).toEqual(UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).forrige());
    });

    it('Skal gi korrekte begrensninger for ferie', () => {
        const årsak = UtsettelseÅrsakType.Ferie;
        const familiehendelsedato = '2025-03-26';
        const gjelderAdopsjon = false;

        const minDate = getMinDate({ årsak, familiehendelsedato, gjelderAdopsjon });
        const maxDate = getMaxDate({ familiehendelsedato });

        expect(minDate).toEqual(UttaksdagenString(familiehendelsedato).leggTil(30));
        expect(maxDate).toEqual(dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT));
    });
});
