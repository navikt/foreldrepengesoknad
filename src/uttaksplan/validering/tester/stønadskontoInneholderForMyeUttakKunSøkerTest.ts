import { IntlShape } from 'react-intl';
import { getUttaksstatus } from '../../utils/uttaksstatus';
import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';
import { getVarighetString } from '../../../app/utils/dateUtils';

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
        søkersituasjon,
    } = grunnlag;
    const stønadskontoerMedForMyeUttak = getUttaksstatus({
        erDeltUttak,
        erEndringssøknad,
        harKomplettUttaksplan,
        erFarEllerMedmor: søkerErFarEllerMedmor,
        tilgjengeligeStønadskontoer: stønadskontoer,
        uttaksplan: perioder,
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
                            søkersituasjon.situasjon,
                            søkerErAleneOmOmsorg
                        ),
                },
            })
        ),
    };
};
