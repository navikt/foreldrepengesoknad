import { intlUtils } from '@navikt/fp-common';
import { Forelder } from 'app/types/Forelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { IntlShape } from 'react-intl';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getForelderNavn } from './periodeUtils';

export const getVelgbareStønadskontotyper = (stønadskontoTyper: TilgjengeligStønadskonto[]): StønadskontoType[] =>
    stønadskontoTyper
        .filter(
            (kontoType) =>
                kontoType.konto === StønadskontoType.Fellesperiode ||
                kontoType.konto === StønadskontoType.Fedrekvote ||
                kontoType.konto === StønadskontoType.Mødrekvote ||
                kontoType.konto === StønadskontoType.Foreldrepenger ||
                kontoType.konto === StønadskontoType.AktivitetsfriKvote
        )
        .map((kontoType) => kontoType.konto);

export const getStønadskontoNavn = (intl: IntlShape, konto: StønadskontoType, navnPåForeldre: NavnPåForeldre) => {
    let navn;

    switch (konto) {
        case StønadskontoType.Mødrekvote:
            navn = navnPåForeldre.mor;
            break;
        case StønadskontoType.Fedrekvote:
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskontotype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(navn, intl.locale) }
        );
    }

    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getUttakAnnenPartStønadskontoNavn = (
    intl: IntlShape,
    konto: StønadskontoType,
    periodeForelder: Forelder,
    navnPåForeldre: NavnPåForeldre,
    samtidigUttakProsent: string | undefined
) => {
    const forelderNavn = getForelderNavn(periodeForelder, navnPåForeldre);
    if (samtidigUttakProsent !== undefined) {
        const navn = getNavnGenitivEierform(forelderNavn, intl.locale);
        const intlTekst =
            konto === StønadskontoType.Fellesperiode
                ? 'uttaksplan.periodeAnnenPart.tittel.gradertEllerSamtidigUttakFellesperiode'
                : 'uttaksplan.periodeAnnenPart.tittel.gradertEllerSamtidigUttak';
        return intlUtils(intl, intlTekst, {
            navn,
            prosent: samtidigUttakProsent,
        });
    }
    return getStønadskontoNavn(intl, konto, navnPåForeldre);
};

const navnSlutterPåSLyd = (navn: string): boolean => {
    const sisteBokstav = navn.charAt(navn.length - 1).toLowerCase();
    return sisteBokstav === 's' || sisteBokstav === 'x' || sisteBokstav === 'z';
};

export const getNavnGenitivEierform = (navn: string, locale: string): string => {
    if (locale !== 'nb') {
        return navn;
    }
    if (navnSlutterPåSLyd(navn)) {
        return `${navn}'`;
    }
    return `${navn}s`;
};
