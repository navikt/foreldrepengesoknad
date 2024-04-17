import { IntlShape } from 'react-intl';

import {
    Forelder,
    OppholdÅrsakType,
    Periode,
    PeriodeInfoType,
    StønadskontoType,
    Søknadsinfo,
    getStønadskontoNavn,
    getVarighetString,
    isInfoPeriodeAnnenPart,
    isUttaksperiode,
} from '@navikt/fp-common';

import { getUttaksstatus } from '../../utils/uttaksstatus';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';

const harSøktOmFellesperiode = (periode: Periode, søkerErFarEllerMedmor: boolean) => {
    if (isUttaksperiode(periode)) {
        if (
            søkerErFarEllerMedmor &&
            periode.forelder === Forelder.farMedmor &&
            periode.konto === StønadskontoType.Fellesperiode
        ) {
            return true;
        }

        if (
            !søkerErFarEllerMedmor &&
            periode.forelder === Forelder.mor &&
            periode.konto === StønadskontoType.Fellesperiode
        ) {
            return true;
        }
    }

    return false;
};

export const stønadskontoInneholderForMyeUttakKunSøkerTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const {
        navnPåForeldre,
        perioder,
        stønadskontoer,
        erDeltUttak,
        erEndringssøknad,
        harKomplettUttaksplan,
        søkerErFarEllerMedmor,
        søkerErAleneOmOmsorg,
    } = grunnlag;
    const harSelvSøktOmFellesperiode =
        perioder.find((p) => harSøktOmFellesperiode(p, søkerErFarEllerMedmor)) !== undefined;
    const perioderSomSkalBrukes = perioder.filter((p) => {
        if (harSelvSøktOmFellesperiode) {
            return true;
        }

        if (
            isInfoPeriodeAnnenPart(p) &&
            p.infotype === PeriodeInfoType.uttakAnnenPart &&
            p.årsak === OppholdÅrsakType.UttakFellesperiodeAnnenForelder
        ) {
            return false;
        }

        return true;
    });

    const stønadskontoerMedForMyeUttak = getUttaksstatus({
        erDeltUttak,
        erEndringssøknad,
        harKomplettUttaksplan,
        erFarEllerMedmor: søkerErFarEllerMedmor,
        tilgjengeligeStønadskontoer: stønadskontoer,
        uttaksplan: perioderSomSkalBrukes,
    }).uttak.filter((u) => u.dager < 0);
    return {
        passerer: stønadskontoerMedForMyeUttak.length === 0,
        info: stønadskontoerMedForMyeUttak.map(
            (uttak): RegelTestresultatInfo => ({
                intlKey: 'uttaksplan.validering.feil.forMyeUttak',
                values: {
                    dager: (intl: IntlShape) => getVarighetString(Math.abs(uttak.dager), intl),
                    konto: (intl: IntlShape) =>
                        getStønadskontoNavn(
                            intl,
                            uttak.konto,
                            navnPåForeldre,
                            søkerErFarEllerMedmor,
                            søkerErAleneOmOmsorg,
                        ),
                },
            }),
        ),
    };
};
