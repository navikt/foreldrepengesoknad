import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { BrukerRolleSak_fpoversikt, Familiesituasjon } from '@navikt/fp-types';
import { UttaksdagenString, formatDateMedUkedag } from '@navikt/fp-utils';
import { isAfterOrSame, isBeforeOrSame } from '@navikt/fp-validation';

export const getTomDiverseValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    minDate: string,
    maxDate: string,
    skalDuJobbe?: boolean,
    samtidigUttak?: boolean,
    forelder?: BrukerRolleSak_fpoversikt,
    kontoType?: string,
) => {
    const gjelderAdopsjon = familiesituasjon === 'adopsjon';

    const validators = [];

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const seksUkerEtterFamiliehendelse = UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30);
    const minDateSamtidigUttak = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(10);

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

    if (skalDuJobbe && !gjelderAdopsjon) {
        if (
            kontoType === 'MØDREKVOTE' ||
            (kontoType === 'FELLESPERIODE' && forelder === 'MOR') ||
            (kontoType === 'FORELDREPENGER' && forelder === 'MOR')
        ) {
            validators.push((date: string) => {
                if (dayjs(date).isBetween(familiehendelsedato, seksUkerEtterFamiliehendelse, 'day', '[]')) {
                    const feilmelding =
                        kontoType === 'FORELDREPENGER' && forelder === 'MOR'
                            ? intl.formatMessage({ id: 'endreTidsPeriodeModal.duKanIkkeKombinere' })
                            : intl.formatMessage({ id: 'endreTidsPeriodeModal.kanIkkeKombinere' });

                    return feilmelding;
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

    return validators;
};

export const getTomÅrsakValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    årsak?: 'LOVBESTEMT_FERIE' | 'PERIODE_UTEN_UTTAK',
) => {
    switch (årsak) {
        case 'LOVBESTEMT_FERIE':
            return getTomFerieValidators(intl, familiehendelsedato, familiesituasjon);
        case 'PERIODE_UTEN_UTTAK':
            return [getTomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon)];
        default:
            return [];
    }
};

export const getTomFerieValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
) => {
    const erBarnetFødt = familiesituasjon === 'fødsel';
    const gjelderAdopsjon = familiesituasjon === 'adopsjon';

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();

    const validators = [];

    validators.push(
        isAfterOrSame(
            erBarnetFødt
                ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
            UttaksdagenString(familiehendelsedato).denneEllerForrige(),
        ),
    );

    if (!gjelderAdopsjon) {
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

export const getTomPeriodeUtenUttakValidator = (
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
