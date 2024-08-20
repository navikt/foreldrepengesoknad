import {
    BabyWrappedFillIcon,
    BandageFillIcon,
    CloudFillIcon,
    HeartFillIcon,
    InformationSquareFillIcon,
    PersonPregnantFillIcon,
} from '@navikt/aksel-icons';

import { Forelder, NavnPåForeldre } from '@navikt/fp-common';

type GetFargeProps = {
    erPeriodeUtenUttak: boolean;
    erSamtidigUttak: boolean;
    erMor: boolean;
    erHull: boolean | undefined;
    erUtsettelse: boolean | undefined;
    erFamiliehendelse: boolean | undefined;
    bem: any;
};

export const getFarge = ({
    bem,
    erPeriodeUtenUttak,
    erSamtidigUttak,
    erUtsettelse,
    erMor,
    erHull,
    erFamiliehendelse,
}: GetFargeProps) => {
    if (erFamiliehendelse) {
        return bem.modifier('farge-bg-red');
    }

    if (erHull) {
        return bem.modifier('farge-bg-graa');
    }

    if (erPeriodeUtenUttak) {
        return bem.modifier('farge-bg-gul');
    }

    if (erSamtidigUttak) {
        return bem.modifier('farge-bg-lysblaa-gronn');
    }

    if (erUtsettelse) {
        return bem.modifier('farge-bg-blaa');
    }

    if (erMor) {
        return bem.modifier('farge-bg-lysblaa');
    }

    return bem.modifier('farge-bg-gronn');
};

type GetIkonFargeProps = {
    erPeriodeUtenUttak: boolean;
    erMor: boolean;
    erUtsettelse: boolean | undefined;
    erHull: boolean | undefined;
    erFamiliehendelse: boolean | undefined;
    bem: any;
};

export const getIkonFarge = ({
    erPeriodeUtenUttak,
    erMor,
    erUtsettelse,
    bem,
    erHull,
    erFamiliehendelse,
}: GetIkonFargeProps) => {
    if (erFamiliehendelse) {
        return bem.modifier('farge-red');
    }

    if (erHull) {
        return bem.modifier('farge-svart');
    }

    if (erPeriodeUtenUttak) {
        return bem.modifier('farge-gul');
    }

    if (erUtsettelse) {
        return bem.modifier('farge-blaa');
    }

    if (erMor) {
        return bem.modifier('farge-blaa');
    }

    return bem.modifier('farge-gronn');
};

type GetTekstProps = {
    erPeriodeUtenUttak: boolean;
    erSamtidigUttak: boolean;
    erHull: boolean | undefined;
    erUtsettelse: boolean | undefined;
    erFamiliehendelse: boolean | undefined;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    forelder: Forelder | undefined;
};

export const getTekst = ({
    erPeriodeUtenUttak,
    erSamtidigUttak,
    erHull,
    erUtsettelse,
    erFamiliehendelse,
    navnPåForeldre,
    erFarEllerMedmor,
    forelder,
}: GetTekstProps) => {
    const navnPåForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const erEgenPeriode = erFarEllerMedmor ? forelder === Forelder.farMedmor : forelder == Forelder.mor;

    if (erFamiliehendelse) {
        return 'Fødsel';
    }

    if (erUtsettelse) {
        return 'Du er innlagt';
    }

    if (erHull) {
        return 'Dager du kan tape';
    }

    if (erPeriodeUtenUttak) {
        return 'Uten foreldrepenger';
    }

    if (erSamtidigUttak) {
        return `Du og ${navnPåForelder} i permisjon`;
    }

    return erEgenPeriode ? 'Du i permisjon' : `${navnPåForelder} i permisjon`;
};

type GetIkonProps = {
    periodeFørTermindato: boolean;
    erPeriodeUtenUttak: boolean;
    erMor: boolean;
    erUtsettelse: boolean | undefined;
    erHull: boolean | undefined;
    erFamiliehendelse: boolean | undefined;
    bem: any;
};

export const getIkon = ({
    erPeriodeUtenUttak,
    periodeFørTermindato,
    erMor,
    bem,
    erUtsettelse,
    erHull,
    erFamiliehendelse,
}: GetIkonProps) => {
    if (erFamiliehendelse) {
        return (
            <HeartFillIcon
                className={getIkonFarge({ bem, erMor, erPeriodeUtenUttak, erUtsettelse, erHull, erFamiliehendelse })}
                width={24}
                height={24}
            />
        );
    }

    if (erHull) {
        return (
            <InformationSquareFillIcon
                className={getIkonFarge({ bem, erMor, erPeriodeUtenUttak, erUtsettelse, erHull, erFamiliehendelse })}
                width={24}
                height={24}
            />
        );
    }

    if (erUtsettelse) {
        return (
            <BandageFillIcon
                className={getIkonFarge({ bem, erMor, erPeriodeUtenUttak, erUtsettelse, erHull, erFamiliehendelse })}
                width={24}
                height={24}
            />
        );
    }

    if (periodeFørTermindato) {
        return (
            <PersonPregnantFillIcon
                className={getIkonFarge({ bem, erMor, erPeriodeUtenUttak, erUtsettelse, erHull, erFamiliehendelse })}
                width={24}
                height={24}
            />
        );
    }

    if (erPeriodeUtenUttak) {
        return (
            <CloudFillIcon
                className={getIkonFarge({ bem, erMor, erPeriodeUtenUttak, erUtsettelse, erHull, erFamiliehendelse })}
                width={24}
                height={24}
            />
        );
    }

    return (
        <BabyWrappedFillIcon
            className={getIkonFarge({ bem, erMor, erPeriodeUtenUttak, erUtsettelse, erHull, erFamiliehendelse })}
            width={24}
            height={24}
        />
    );
};
