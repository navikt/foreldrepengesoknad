import { IntlShape } from 'react-intl';

import { PeriodeColor, UtsettelseÅrsakType } from '@navikt/fp-constants';
import { Barn, TidsperiodeDate, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import {
    capitalizeFirstLetter,
    formaterDatoUtenDag,
    getFamiliehendelsedato,
    getNavnGenitivEierform,
} from '@navikt/fp-utils';

const getUtsettelseÅrsakTekst = (årsak: UtsettelseÅrsakType, intl: IntlShape) => {
    if (årsak === UtsettelseÅrsakType.Arbeid) {
        return intl.formatMessage({ id: `kalender.utsettelse.ARBEID` });
    }
    if (årsak === UtsettelseÅrsakType.InstitusjonBarnet) {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_BARNET` });
    }
    if (årsak === UtsettelseÅrsakType.InstitusjonSøker) {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_SØKER` });
    }
    if (årsak === UtsettelseÅrsakType.Ferie) {
        return intl.formatMessage({ id: `kalender.utsettelse.LOVBESTEMT_FERIE` });
    }
    if (årsak === UtsettelseÅrsakType.Sykdom) {
        return intl.formatMessage({ id: `kalender.utsettelse.SYKDOM` });
    }
    if (årsak === UtsettelseÅrsakType.HvØvelse) {
        return intl.formatMessage({ id: `kalender.utsettelse.HV_OVELSE` });
    }
    if (årsak === UtsettelseÅrsakType.NavTiltak) {
        return intl.formatMessage({ id: `kalender.utsettelse.NAV_TILTAK` });
    }
    return '';
};

const getUtsettelseLabel = (unikeUtsettelseÅrsaker: UtsettelseÅrsakType[], intl: IntlShape): string => {
    if (unikeUtsettelseÅrsaker.length === 1 && unikeUtsettelseÅrsaker[0] !== UtsettelseÅrsakType.Fri) {
        const årsakTekst = getUtsettelseÅrsakTekst(unikeUtsettelseÅrsaker[0], intl);
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

export const getSkjermlesertekstForFamiliehendelse = (barn: Barn, intl: IntlShape): string => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsenavn = getFamiliehendelseKalendarLabel(barn, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.familiehendelse' },
        { familiehendelsenavn, dato: formaterDatoUtenDag(familiehendelsesdato) },
    );
};

export const getKalenderPeriodenavn = (
    color: PeriodeColor,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelseÅrsakType[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): string => {
    switch (color) {
        case PeriodeColor.PINK:
            return getSkjermlesertekstForFamiliehendelse(barn, intl);
        case PeriodeColor.BLUE:
        case PeriodeColor.GREEN:
            return intl.formatMessage({ id: 'kalender.dinPeriode' });
        case PeriodeColor.BLUESTRIPED:
        case PeriodeColor.GREENSTRIPED:
            return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
        case PeriodeColor.LIGHTBLUE:
        case PeriodeColor.LIGHTGREEN:
            return intl.formatMessage(
                { id: 'kalender.annenPartPeriode' },
                { navnAnnenPart: getNavnGenitivEierform(capitalizeFirstLetter(navnAnnenPart), intl.locale) },
            );
        case PeriodeColor.LIGHTBLUEGREEN:
        case PeriodeColor.LIGHTGREENBLUE:
            return intl.formatMessage(
                { id: 'kalender.samtidigUttak' },
                { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
            );
        case PeriodeColor.GREENOUTLINE:
            return erFarEllerMedmor
                ? getUtsettelseLabel(unikeUtsettelseÅrsaker, intl)
                : intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  );

        case PeriodeColor.BLUEOUTLINE:
            return erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  )
                : getUtsettelseLabel(unikeUtsettelseÅrsaker, intl);
        case PeriodeColor.ORANGE:
            return intl.formatMessage({ id: 'kalender.tapteDager' });
        case PeriodeColor.GRAY:
            return intl.formatMessage({ id: 'kalender.helg' });
        default:
            return '';
    }
};

export const getKalenderSkjermlesertekstForPeriode = (
    tidsperiode: TidsperiodeDate,
    color: PeriodeColor,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelseÅrsakType[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
) => {
    const periodeNavn = getKalenderPeriodenavn(
        color,
        barn,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        erFarEllerMedmor,
        intl,
    );
    return intl.formatMessage(
        { id: 'kalender.skjermleser.periode' },
        { periodeNavn, fraDato: formaterDatoUtenDag(tidsperiode.fom), tilDato: formaterDatoUtenDag(tidsperiode.tom) },
    );
};
