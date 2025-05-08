import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { UttaksdagenString, formatDateMedUkedag } from '@navikt/fp-utils';
import {
    isAfterOrSame,
    isBeforeOrSame,
    isDateWithinRange,
    isRequired,
    isValidDate,
    isWeekday,
} from '@navikt/fp-validation';

import { PeriodeHullType } from '../types/Planperiode';

interface FomValidatorProps {
    intl: IntlShape;
    familiehendelsedato: string;
    kontoType: StønadskontoType | undefined;
    tomValue: string | undefined;
    erBarnetFødt: boolean;
    minDate: string;
    maxDate: string;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    gjelderAdopsjon: boolean;
    skalDuJobbe: boolean | undefined;
    forelder?: Forelder;
}

export const getFomValidators = ({
    intl,
    familiehendelsedato,
    kontoType,
    tomValue,
    erBarnetFødt,
    minDate,
    maxDate,
    årsak,
    gjelderAdopsjon,
    skalDuJobbe,
    forelder,
}: FomValidatorProps) => {
    const validators = [
        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.påkrevd' })),
        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.gyldigDato' })),
        isBeforeOrSame(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.førTilDato' }), tomValue),
        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.måVæreUkedag' })),
    ];

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const seksUkerEtterFamiliehendelse = UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30);
    const minDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(15);
    const maxDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).forrige();

    switch (kontoType) {
        case StønadskontoType.AktivitetsfriKvote:
        case StønadskontoType.Mødrekvote:
        case StønadskontoType.Fedrekvote:
        case StønadskontoType.Foreldrepenger:
            validators.push(
                isAfterOrSame(
                    erBarnetFødt
                        ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                        : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
                    UttaksdagenString(familiehendelsedato).denneEllerForrige(),
                ),
            );
            break;
        case StønadskontoType.ForeldrepengerFørFødsel:
            validators.push(
                isDateWithinRange(
                    intl.formatMessage({ id: 'endreTidsPeriodeModal.foreldrepengerFørFødsel' }),
                    dayjs(minDateFPFF).toDate(),
                    dayjs(maxDateFPFF).toDate(),
                ),
            );
            break;
        case StønadskontoType.Fellesperiode:
            validators.push((fomValue: string) => {
                if (dayjs(fomValue).isBetween(minDateFPFF, maxDateFPFF, 'day', '[]')) {
                    return intl.formatMessage({ id: 'endreTidsPeriodeModal.foreldrepengerFørFødsel.fellesperiode' });
                }

                return null;
            });
            validators.push((fomValue: string) => {
                if (dayjs(minDateFPFF).isBetween(fomValue, tomValue, 'day', '[]')) {
                    return intl.formatMessage({ id: 'endreTidsPeriodeModal.fellesperiodeOverFPFF' });
                }

                return null;
            });
            break;
    }

    switch (årsak) {
        case UtsettelseÅrsakType.Ferie:
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

            break;
        case PeriodeHullType.PERIODE_UTEN_UTTAK:
            validators.push(
                isAfterOrSame(
                    erBarnetFødt
                        ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                        : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
                    UttaksdagenString(familiehendelsedato).denneEllerForrige(),
                ),
            );
            break;
    }

    validators.push(
        isAfterOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.minDato' }, { minDate: formatDateMedUkedag(minDate) }),
            minDate,
        ),
    );
    validators.push(
        isBeforeOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.maksDato' }, { maxDate: formatDateMedUkedag(maxDate) }),
            maxDate,
        ),
    );

    if (skalDuJobbe && !gjelderAdopsjon) {
        if (
            kontoType === StønadskontoType.Mødrekvote ||
            (kontoType === StønadskontoType.Fellesperiode && forelder === Forelder.mor) ||
            (kontoType === StønadskontoType.Foreldrepenger && forelder === Forelder.mor)
        ) {
            validators.push((date) => {
                if (dayjs(date).isBetween(familiehendelsedato, seksUkerEtterFamiliehendelse, 'day', '[]')) {
                    const feilmelding =
                        kontoType === StønadskontoType.Foreldrepenger && forelder === Forelder.mor
                            ? 'Du kan ikke kombinere foreldrepenger med arbeid de første seks ukene'
                            : 'Mor kan ikke kombinere foreldrepenger med arbeid de første seks ukene';

                    return feilmelding;
                } else {
                    return null;
                }
            });
        }
    }

    return validators;
};

interface TomValidatorProps {
    intl: IntlShape;
    familiehendelsedato: string;
    kontoType: StønadskontoType | undefined;
    fomValue: string | undefined;
    erBarnetFødt: boolean;
    minDate: string;
    maxDate: string;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    gjelderAdopsjon: boolean;
    skalDuJobbe: boolean | undefined;
    forelder?: Forelder;
}

export const getTomValidators = ({
    intl,
    familiehendelsedato,
    kontoType,
    fomValue,
    erBarnetFødt,
    minDate,
    maxDate,
    årsak,
    gjelderAdopsjon,
    skalDuJobbe,
    forelder,
}: TomValidatorProps) => {
    const validators = [
        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.påkrevd' })),
        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.gyldigDato' })),
        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.måVæreUkedag' })),
    ];

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const seksUkerEtterFamiliehendelse = UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30);
    const minDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(15);
    const maxDateFPFF = UttaksdagenString(ukedagFamiliehendelsedato).forrige();

    switch (kontoType) {
        case StønadskontoType.AktivitetsfriKvote:
        case StønadskontoType.Mødrekvote:
        case StønadskontoType.Fedrekvote:
        case StønadskontoType.Foreldrepenger:
            validators.push(
                isAfterOrSame(
                    erBarnetFødt
                        ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                        : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
                    UttaksdagenString(familiehendelsedato).denneEllerForrige(),
                ),
            );
            break;
        case StønadskontoType.ForeldrepengerFørFødsel:
            validators.push(
                isDateWithinRange(
                    intl.formatMessage({ id: 'endreTidsPeriodeModal.foreldrepengerFørFødsel' }),
                    dayjs(minDateFPFF).toDate(),
                    dayjs(maxDateFPFF).toDate(),
                ),
            );
            break;
        case StønadskontoType.Fellesperiode:
            validators.push((tomValue: string) => {
                if (dayjs(tomValue).isBetween(minDateFPFF, maxDateFPFF, 'day', '[]')) {
                    return intl.formatMessage({ id: 'endreTidsPeriodeModal.foreldrepengerFørFødsel.fellesperiode' });
                }

                return null;
            });
            validators.push((tomValue: string) => {
                if (dayjs(minDateFPFF).isBetween(fomValue, tomValue, 'day', '[]')) {
                    return intl.formatMessage({ id: 'endreTidsPeriodeModal.fellesperiodeOverFPFF' });
                }

                return null;
            });
            break;
    }

    switch (årsak) {
        case UtsettelseÅrsakType.Ferie:
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

            break;
        case PeriodeHullType.PERIODE_UTEN_UTTAK:
            validators.push(
                isAfterOrSame(
                    erBarnetFødt
                        ? intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.fødsel' })
                        : intl.formatMessage({ id: 'endreTidsPeriodeModal.riktigKvoteFørFødsel.termin' }),
                    UttaksdagenString(familiehendelsedato).denneEllerForrige(),
                ),
            );
            break;
    }

    validators.push(
        isAfterOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.minDato' }, { minDate: formatDateMedUkedag(minDate) }),
            minDate,
        ),
    );
    validators.push(
        isBeforeOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.maksDato' }, { maxDate: formatDateMedUkedag(maxDate) }),
            maxDate,
        ),
    );

    if (skalDuJobbe && !gjelderAdopsjon) {
        if (
            kontoType === StønadskontoType.Mødrekvote ||
            (kontoType === StønadskontoType.Fellesperiode && forelder === Forelder.mor) ||
            (kontoType === StønadskontoType.Foreldrepenger && forelder === Forelder.mor)
        ) {
            validators.push((date) => {
                if (dayjs(date).isBetween(familiehendelsedato, seksUkerEtterFamiliehendelse, 'day', '[]')) {
                    const feilmelding =
                        kontoType === StønadskontoType.Foreldrepenger && forelder === Forelder.mor
                            ? 'Du kan ikke kombinere foreldrepenger med arbeid de første seks ukene'
                            : 'Mor kan ikke kombinere foreldrepenger med arbeid de første seks ukene';

                    return feilmelding;
                } else {
                    return null;
                }
            });
        }
    }

    return validators;
};
