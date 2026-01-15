import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { BrukerRolleSak_fpoversikt, Familiesituasjon } from '@navikt/fp-types';
import { UttaksdagenString, formatDateMedUkedag } from '@navikt/fp-utils';
import { isAfterOrSame, isBeforeOrSame } from '@navikt/fp-validation';

export const getFomDiverseValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    minDate: string,
    maxDate: string,
    samtidigUttak?: boolean,
    kontoType?: string,
    skalDuJobbe?: boolean,
    forelder?: BrukerRolleSak_fpoversikt,
) => {
    const gjelderAdopsjon = familiesituasjon === 'adopsjon';

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const seksUkerEtterFamiliehendelse = UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30);
    const minDateSamtidigUttak = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(10);

    const validators = [];

    if (skalDuJobbe && !gjelderAdopsjon) {
        if (
            kontoType === 'MØDREKVOTE' ||
            (kontoType === 'FELLESPERIODE' && forelder === 'MOR') ||
            (kontoType === 'FORELDREPENGER' && forelder === 'MOR')
        ) {
            validators.push((date: string) => {
                if (dayjs(date).isBetween(familiehendelsedato, seksUkerEtterFamiliehendelse, 'day', '[]')) {
                    return intl.formatMessage({ id: 'endreTidsPeriodeModal.kanIkkeKombinere' });
                } else {
                    return null;
                }
            });
        }
    }

    if (samtidigUttak) {
        validators.push(
            isAfterOrSame(
                intl.formatMessage(
                    { id: 'endreTidsPeriodeModal.minDato' },
                    { minDate: formatDateMedUkedag(minDateSamtidigUttak) },
                ),
                minDateSamtidigUttak,
            ),
        );
    }

    validators.push(
        isAfterOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.minDato' }, { minDate: formatDateMedUkedag(minDate) }),
            minDate,
        ),
        isBeforeOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.maksDato' }, { maxDate: formatDateMedUkedag(maxDate) }),
            maxDate,
        ),
    );

    return validators;
};

export const getFomÅrsakValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    årsak?: 'LOVBESTEMT_FERIE' | 'PERIODE_UTEN_UTTAK',
) => {
    switch (årsak) {
        case 'LOVBESTEMT_FERIE':
            return getFomFerieValidators(intl, familiehendelsedato, familiesituasjon);
        case 'PERIODE_UTEN_UTTAK':
            return [getFomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon)];
        default:
            return [];
    }
};

export const getFomFerieValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
) => {
    const erBarnetFødt = familiesituasjon === 'fødsel';
    const gjelderAdopsjon = familiesituasjon === 'adopsjon';

    const validators = [
        isAfterOrSame(
            erBarnetFødt
                ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
            UttaksdagenString(familiehendelsedato).denneEllerForrige(),
        ),
    ];

    if (!gjelderAdopsjon) {
        const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();

        validators.push(
            isAfterOrSame(
                erBarnetFødt
                    ? intl.formatMessage({ id: 'endreTidsPeriodeModal.ferieFørsteSeksUker.fødsel' })
                    : intl.formatMessage({ id: 'endreTidsPeriodeModal.ferieFørsteSeksUker.termin' }),
                UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30),
            ),
        );
    }

    return validators;
};

export const getFomPeriodeUtenUttakValidator = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
) => {
    const erBarnetFødt = familiesituasjon === 'fødsel';

    return isAfterOrSame(
        erBarnetFødt
            ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
            : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
        UttaksdagenString(familiehendelsedato).denneEllerForrige(),
    );
};
