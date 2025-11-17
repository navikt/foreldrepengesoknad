import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { BrukerRolleSak_fpoversikt, Familiesituasjon, KontoTypeUttak } from '@navikt/fp-types';
import { UttaksdagenString, formatDateMedUkedag } from '@navikt/fp-utils';
import { isAfterOrSame, isBeforeOrSame, isDateWithinRange } from '@navikt/fp-validation';

import { PeriodeHullType } from '../types/Planperiode';

export const getFomKontoTypeValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    tomValue?: string,
    samtidigUttak?: boolean,
    kontoType?: KontoTypeUttak,
) => {
    const erBarnetFødt = familiesituasjon === 'fødsel';

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const minDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(15);
    const maxDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).forrige();
    const minDateSamtidigUttak = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(10);

    const validators = [];

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
                (fomValue: string) => {
                    if (dayjs(fomValue).isBetween(minDateFPFF, maxDateFPFF, 'day', '[]')) {
                        return intl.formatMessage({
                            id: 'endreTidsPeriodeModal.foreldrepengerFørFødsel.fellesperiode',
                        });
                    }

                    return null;
                },
                (fomValue: string) => {
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
                    return 'Mor kan ikke kombinere foreldrepenger med arbeid de første seks ukene';
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
    årsak?: 'LOVBESTEMT_FERIE' | PeriodeHullType.PERIODE_UTEN_UTTAK,
) => {
    switch (årsak) {
        case 'LOVBESTEMT_FERIE':
            return getFomFerieValidators(intl, familiehendelsedato, familiesituasjon);
        case PeriodeHullType.PERIODE_UTEN_UTTAK:
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

        //FIXME: Denne er vel feil? Denne slår til uansett om dato er valgt før familiehendelsedato
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
