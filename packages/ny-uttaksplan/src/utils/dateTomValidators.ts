import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { BrukerRolleSak_fpoversikt, Familiesituasjon, KontoTypeUttak } from '@navikt/fp-types';
import { UttaksdagenString, formatDateMedUkedag } from '@navikt/fp-utils';
import { isAfterOrSame, isBeforeOrSame, isDateWithinRange } from '@navikt/fp-validation';

import { PeriodeHullType } from '../types/Planperiode';

export const getTomKontoTypeValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    fomValue?: string,
    samtidigUttak?: boolean,
    kontoType?: KontoTypeUttak,
) => {
    const erBarnetFødt = familiesituasjon === 'fødsel';

    const validators = [];

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const minDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(15);
    const maxDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).forrige();
    const minDateSamtidigUttak = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(10);

    switch (kontoType) {
        case 'AKTIVITETSFRI_KVOTE':
        case 'MØDREKVOTE':
        case 'FORELDREPENGER':
            validators.push(
                isAfterOrSame(
                    erBarnetFødt
                        ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                        : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
                    UttaksdagenString(familiehendelsedato).denneEllerForrige(),
                ),
            );
            break;
        case 'FEDREKVOTE':
            if (samtidigUttak) {
                validators.push(
                    isAfterOrSame(
                        erBarnetFødt
                            ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                            : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
                        minDateSamtidigUttak,
                    ),
                );
            } else {
                validators.push(
                    isAfterOrSame(
                        erBarnetFødt
                            ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                            : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
                        UttaksdagenString(familiehendelsedato).denneEllerForrige(),
                    ),
                );
            }
            break;
        case 'FORELDREPENGER_FØR_FØDSEL':
            validators.push(
                isDateWithinRange(
                    intl.formatMessage({ id: 'endreTidsPeriodeModal.foreldrepengerFørFødsel' }),
                    dayjs(minDateFPFF).toDate(),
                    dayjs(maxDateFPFF).toDate(),
                ),
            );
            break;
        case 'FELLESPERIODE':
            validators.push(
                (tomValue: string) => {
                    if (dayjs(tomValue).isBetween(minDateFPFF, maxDateFPFF, 'day', '[]')) {
                        return intl.formatMessage({
                            id: 'endreTidsPeriodeModal.foreldrepengerFørFødsel.fellesperiode',
                        });
                    }

                    return null;
                },
                (tomValue: string) => {
                    if (dayjs(minDateFPFF).isBetween(fomValue, tomValue, 'day', '[]')) {
                        return intl.formatMessage({ id: 'endreTidsPeriodeModal.fellesperiodeOverFPFF' });
                    }

                    return null;
                },
            );
            break;
    }

    return validators;
};

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
                            ? 'Du kan ikke kombinere foreldrepenger med arbeid de første seks ukene'
                            : 'Mor kan ikke kombinere foreldrepenger med arbeid de første seks ukene';

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
    årsak?: 'LOVBESTEMT_FERIE' | PeriodeHullType.PERIODE_UTEN_UTTAK,
) => {
    switch (årsak) {
        case 'LOVBESTEMT_FERIE':
            return getTomFerieValidators(intl, familiehendelsedato, familiesituasjon);
        case PeriodeHullType.PERIODE_UTEN_UTTAK:
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
