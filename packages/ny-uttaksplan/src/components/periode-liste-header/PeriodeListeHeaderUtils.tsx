import {
    BabyWrappedFillIcon,
    BandageFillIcon,
    BriefcaseFillIcon,
    CloudFillIcon,
    HeartFillIcon,
    InformationSquareFillIcon,
    PersonPregnantFillIcon,
} from '@navikt/aksel-icons';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Forelder } from '@navikt/fp-constants';
import { Familiesituasjon, UtsettelseÅrsakType } from '@navikt/fp-types';

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
    utsettelseÅrsak: UtsettelseÅrsakType | undefined;
    erFamiliehendelse: boolean | undefined;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    forelder: Forelder | undefined;
    familiesituasjon: Familiesituasjon;
};

export const getTekst = ({
    erPeriodeUtenUttak,
    erSamtidigUttak,
    erHull,
    utsettelseÅrsak,
    erFamiliehendelse,
    navnPåForeldre,
    erFarEllerMedmor,
    forelder,
    familiesituasjon,
}: GetTekstProps) => {
    const navnPåAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const navnPåForelder = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    const erEgenPeriode = erFarEllerMedmor ? forelder === Forelder.farMedmor : forelder == Forelder.mor;

    if (erFamiliehendelse) {
        switch (familiesituasjon) {
            case 'adopsjon':
                return 'Omsorgsovertakelse';
            case 'fødsel':
                return 'Fødsel';
            default:
                return 'Termin';
        }
    }

    if (utsettelseÅrsak !== undefined) {
        switch (utsettelseÅrsak) {
            case UtsettelseÅrsakType.InstitusjonSøker:
                return 'Du er innlagt';
            case UtsettelseÅrsakType.Sykdom:
                return 'Du er syk';
            case UtsettelseÅrsakType.InstitusjonBarnet:
                return 'Barnet er innlagt';
            case UtsettelseÅrsakType.Arbeid:
                return 'Utsettelse grunnet arbeid';
            case UtsettelseÅrsakType.Ferie:
                return 'Utsettelse grunnet ferie';
            case UtsettelseÅrsakType.HvØvelse:
                return 'Utsettelse grunnet heimvernsøvelse';
            case UtsettelseÅrsakType.NavTiltak:
                return 'Utsettelse grunnet Nav tiltak';
            case UtsettelseÅrsakType.Fri:
                return 'Uten foreldrepenger';
        }
    }

    if (erHull) {
        return 'Dager du kan tape';
    }

    if (erPeriodeUtenUttak) {
        return 'Uten foreldrepenger';
    }

    if (erSamtidigUttak) {
        return 'Dere har foreldrepenger';
    }

    return erEgenPeriode ? `${navnPåForelder} har foreldrepenger` : `${navnPåAnnenForelder} har foreldrepenger`;
};

type GetIkonProps = {
    periodeFørTermindato: boolean;
    erPeriodeUtenUttak: boolean;
    erMor: boolean;
    utsettelseÅrsak: UtsettelseÅrsakType | undefined;
    erHull: boolean | undefined;
    erFamiliehendelse: boolean | undefined;
    bem: any;
};

export const getIkon = ({
    erPeriodeUtenUttak,
    periodeFørTermindato,
    erMor,
    bem,
    utsettelseÅrsak,
    erHull,
    erFamiliehendelse,
}: GetIkonProps) => {
    if (erFamiliehendelse) {
        return (
            <HeartFillIcon
                className={getIkonFarge({
                    bem,
                    erMor,
                    erPeriodeUtenUttak,
                    erUtsettelse: utsettelseÅrsak !== undefined,
                    erHull,
                    erFamiliehendelse,
                })}
                width={24}
                height={24}
            />
        );
    }

    if (erHull) {
        return (
            <InformationSquareFillIcon
                className={getIkonFarge({
                    bem,
                    erMor,
                    erPeriodeUtenUttak,
                    erUtsettelse: utsettelseÅrsak !== undefined,
                    erHull,
                    erFamiliehendelse,
                })}
                width={24}
                height={24}
            />
        );
    }

    if (utsettelseÅrsak !== undefined) {
        if (utsettelseÅrsak === UtsettelseÅrsakType.Arbeid || utsettelseÅrsak === UtsettelseÅrsakType.Fri) {
            return (
                <BriefcaseFillIcon
                    className={getIkonFarge({
                        bem,
                        erMor,
                        erPeriodeUtenUttak,
                        erUtsettelse: utsettelseÅrsak !== undefined,
                        erHull,
                        erFamiliehendelse,
                    })}
                    width={24}
                    height={24}
                />
            );
        }

        return (
            <BandageFillIcon
                className={getIkonFarge({
                    bem,
                    erMor,
                    erPeriodeUtenUttak,
                    erUtsettelse: utsettelseÅrsak !== undefined,
                    erHull,
                    erFamiliehendelse,
                })}
                width={24}
                height={24}
            />
        );
    }

    if (periodeFørTermindato) {
        return (
            <PersonPregnantFillIcon
                className={getIkonFarge({
                    bem,
                    erMor,
                    erPeriodeUtenUttak,
                    erUtsettelse: utsettelseÅrsak !== undefined,
                    erHull,
                    erFamiliehendelse,
                })}
                width={24}
                height={24}
            />
        );
    }

    if (erPeriodeUtenUttak) {
        return (
            <CloudFillIcon
                className={getIkonFarge({
                    bem,
                    erMor,
                    erPeriodeUtenUttak,
                    erUtsettelse: utsettelseÅrsak !== undefined,
                    erHull,
                    erFamiliehendelse,
                })}
                width={24}
                height={24}
            />
        );
    }

    return (
        <BabyWrappedFillIcon
            className={getIkonFarge({
                bem,
                erMor,
                erPeriodeUtenUttak,
                erUtsettelse: utsettelseÅrsak !== undefined,
                erHull,
                erFamiliehendelse,
            })}
            width={24}
            height={24}
        />
    );
};
