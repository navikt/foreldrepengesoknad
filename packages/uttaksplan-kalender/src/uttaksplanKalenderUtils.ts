import { IntlShape } from 'react-intl';

import { Barn, UtsettelsesÅrsak, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import {
    capitalizeFirstLetter,
    formaterDatoUtenDag,
    getFamiliehendelsedato,
    getNavnGenitivEierform,
} from '@navikt/fp-utils';

const getUtsettelseÅrsakTekst = (årsak: UtsettelsesÅrsak, intl: IntlShape) => {
    if (årsak === 'ARBEID') {
        return intl.formatMessage({ id: `kalender.utsettelse.ARBEID` });
    }
    if (årsak === 'INSTITUSJONSOPPHOLD_BARNET') {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_BARNET` });
    }
    if (årsak === 'INSTITUSJONSOPPHOLD_SØKER') {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_SØKER` });
    }
    if (årsak === 'LOVBESTEMT_FERIE') {
        return intl.formatMessage({ id: `kalender.utsettelse.LOVBESTEMT_FERIE` });
    }
    if (årsak === 'SYKDOM') {
        return intl.formatMessage({ id: `kalender.utsettelse.SYKDOM` });
    }
    if (årsak === 'HV_OVELSE') {
        return intl.formatMessage({ id: `kalender.utsettelse.HV_OVELSE` });
    }
    if (årsak === 'NAV_TILTAK') {
        return intl.formatMessage({ id: `kalender.utsettelse.NAV_TILTAK` });
    }
    return '';
};

const getUtsettelseLabel = (unikeUtsettelseÅrsaker: UtsettelsesÅrsak[], intl: IntlShape): string => {
    if (unikeUtsettelseÅrsaker.length === 1 && unikeUtsettelseÅrsaker[0] !== 'FRI') {
        const årsakTekst = getUtsettelseÅrsakTekst(unikeUtsettelseÅrsaker[0]!, intl);
        return intl.formatMessage({ id: 'kalender.utsettelse' }, { årsak: årsakTekst });
    }
    return intl.formatMessage({ id: 'kalender.dinUtsettelse' });
};

export const getFamiliehendelseKalendarLabel = (barn: Barn, intl: IntlShape): string => {
    if (!isAdoptertBarn(barn)) {
        if (isFødtBarn(barn)) {
            return intl.formatMessage({ id: 'kalender.fødsel' });
        }
        return intl.formatMessage({ id: 'kalender.termin' });
    }
    return intl.formatMessage({ id: 'kalender.adopsjon' });
};

const getSkjermlesertekstForFamiliehendelse = (barn: Barn, intl: IntlShape): string => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsenavn = getFamiliehendelseKalendarLabel(barn, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.familiehendelse' },
        { familiehendelsenavn, dato: formaterDatoUtenDag(familiehendelsesdato) },
    );
};

export const getKalenderPeriodenavn = (
    color: CalendarPeriodColor,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelsesÅrsak[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): string => {
    switch (color) {
        case 'BLUE':
        case 'GREEN':
            return intl.formatMessage({ id: 'kalender.dinPeriode' });
        case 'BLUESTRIPED':
        case 'GREENSTRIPED':
            return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
        case 'LIGHTBLUE':
        case 'LIGHTGREEN':
            return intl.formatMessage(
                { id: 'kalender.annenPartPeriode' },
                { navnAnnenPart: getNavnGenitivEierform(capitalizeFirstLetter(navnAnnenPart), intl.locale) },
            );
        case 'LIGHTBLUEGREEN':
        case 'LIGHTGREENBLUE':
            return intl.formatMessage(
                { id: 'kalender.samtidigUttak' },
                { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
            );
        case 'GREENOUTLINE':
            return erFarEllerMedmor
                ? getUtsettelseLabel(unikeUtsettelseÅrsaker, intl)
                : intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  );

        case 'BLUEOUTLINE':
            return erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  )
                : getUtsettelseLabel(unikeUtsettelseÅrsaker, intl);
        case 'BLACK':
            return intl.formatMessage({ id: 'kalender.tapteDager' });
        case 'GRAY':
            return intl.formatMessage({ id: 'kalender.helg' });
        default:
            return '';
    }
};

export const getKalenderSkjermlesertekstForPeriode = (
    period: CalendarPeriod,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelsesÅrsak[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): string | undefined => {
    if (['NONE', 'GRAY'].includes(period.color)) {
        return undefined;
    }
    if (period.color === 'PINK') {
        return getSkjermlesertekstForFamiliehendelse(barn, intl);
    }
    const periodeNavn = getKalenderPeriodenavn(
        period.color,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        erFarEllerMedmor,
        intl,
    );
    return intl.formatMessage(
        { id: 'kalender.skjermleser.periode' },
        {
            periodeNavn,
            fraDato: formaterDatoUtenDag(period.fom),
            tilDato: formaterDatoUtenDag(period.tom),
        },
    );
};
