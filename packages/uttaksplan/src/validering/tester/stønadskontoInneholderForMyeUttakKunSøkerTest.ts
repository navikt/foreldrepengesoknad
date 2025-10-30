import { IntlShape } from 'react-intl';

import {
    Forelder,
    Periode,
    PeriodeInfoType,
    Søknadsinfo,
    isInfoPeriodeAnnenPart,
    isUttaksperiode,
} from '@navikt/fp-common';

import { getVarighetString } from '../../components/periodeliste-item-header/PeriodelisteItemHeader';
import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';
import { getUttaksstatus } from '../../utils/uttaksstatus';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';

const harSøktOmFellesperiode = (periode: Periode, søkerErFarEllerMedmor: boolean) => {
    if (isUttaksperiode(periode)) {
        if (søkerErFarEllerMedmor && periode.forelder === Forelder.farMedmor && periode.konto === 'FELLESPERIODE') {
            return true;
        }

        if (!søkerErFarEllerMedmor && periode.forelder === Forelder.mor && periode.konto === 'FELLESPERIODE') {
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
    const harSelvSøktOmFellesperiode = perioder.some((p) => harSøktOmFellesperiode(p, søkerErFarEllerMedmor));
    const perioderSomSkalBrukes = perioder.filter((p) => {
        if (harSelvSøktOmFellesperiode) {
            return true;
        }

        if (
            isInfoPeriodeAnnenPart(p) &&
            p.infotype === PeriodeInfoType.uttakAnnenPart &&
            p.årsak === 'FELLESPERIODE_ANNEN_FORELDER'
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
