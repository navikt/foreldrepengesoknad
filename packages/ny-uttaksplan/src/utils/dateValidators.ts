import dayjs from 'dayjs';
import { UseFormWatch } from 'react-hook-form';
import { IntlShape } from 'react-intl';

import { Forelder } from '@navikt/fp-constants';
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

import { EndrePeriodePanelStepFormValues } from '../components/endre-periode-panel/steps/EndrePeriodePanelStep';
import { LeggTilPeriodePanelFormValues } from '../components/legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';
import { PeriodeHullType } from '../types/Planperiode';

interface FomValidatorProps {
    intl: IntlShape;
    watch: UseFormWatch<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>;
    familiehendelsedato: string;
    erBarnetFødt: boolean;
    minDate: string;
    maxDate: string;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    gjelderAdopsjon: boolean;
}

export const getFomValidators = ({
    intl,
    watch,
    familiehendelsedato,
    erBarnetFødt,
    minDate,
    maxDate,
    årsak,
    gjelderAdopsjon,
}: FomValidatorProps) => {
    const tomValue = watch('tom');
    const skalDuJobbe = watch('skalDuJobbe');
    const samtidigUttak = watch('samtidigUttak');
    const forelder = watch('forelder');
    const kontoType = watch('kontoType');

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
        isBeforeOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.maksDato' }, { maxDate: formatDateMedUkedag(maxDate) }),
            maxDate,
        ),
    );

    if (skalDuJobbe && !gjelderAdopsjon) {
        if (
            kontoType === 'MØDREKVOTE' ||
            (kontoType === 'FELLESPERIODE' && forelder === Forelder.mor) ||
            (kontoType === 'FORELDREPENGER' && forelder === Forelder.mor)
        ) {
            validators.push((date) => {
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

    return validators;
};

interface TomValidatorProps {
    intl: IntlShape;
    watch: UseFormWatch<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>;
    familiehendelsedato: string;
    erBarnetFødt: boolean;
    minDate: string;
    maxDate: string;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    gjelderAdopsjon: boolean;
}

export const getTomValidators = ({
    intl,
    watch,
    familiehendelsedato,
    erBarnetFødt,
    minDate,
    maxDate,
    årsak,
    gjelderAdopsjon,
}: TomValidatorProps) => {
    const fomValue = watch('fom');
    const skalDuJobbe = watch('skalDuJobbe');
    const samtidigUttak = watch('samtidigUttak');
    const forelder = watch('forelder');
    const kontoType = watch('kontoType');

    const validators = [
        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.påkrevd' })),
        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.gyldigDato' })),
        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.måVæreUkedag' })),
    ];

    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const seksUkerEtterFamiliehendelse = UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30);
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
        isBeforeOrSame(
            intl.formatMessage({ id: 'endreTidsPeriodeModal.maksDato' }, { maxDate: formatDateMedUkedag(maxDate) }),
            maxDate,
        ),
    );

    if (skalDuJobbe && !gjelderAdopsjon) {
        if (
            kontoType === 'MØDREKVOTE' ||
            (kontoType === 'FELLESPERIODE' && forelder === Forelder.mor) ||
            (kontoType === 'FORELDREPENGER' && forelder === Forelder.mor)
        ) {
            validators.push((date) => {
                if (dayjs(date).isBetween(familiehendelsedato, seksUkerEtterFamiliehendelse, 'day', '[]')) {
                    const feilmelding =
                        kontoType === 'FORELDREPENGER' && forelder === Forelder.mor
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
