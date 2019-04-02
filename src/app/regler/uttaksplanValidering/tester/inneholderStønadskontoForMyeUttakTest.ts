import { Regelgrunnlag, RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../types';
import { InjectedIntl } from 'react-intl';
import { getStønadskontoNavn } from '../../../util/uttaksplan';
import { getVarighetString } from 'common/util/intlUtils';

export const inneholderStønadskontoForMyeUttakTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const stønadskontoerMedForMyeUttak = grunnlag.uttaksstatusStønadskontoer.filter((u) => u.antallDager < 0);
    return {
        passerer: stønadskontoerMedForMyeUttak.length === 0,
        info: stønadskontoerMedForMyeUttak.map((uttak): RegelTestresultatInfo => ({
            intlKey: 'uttaksplan.validering.feil.forMyeUttak',
            values: {
                dager: (intl: InjectedIntl) => getVarighetString(Math.abs(uttak.antallDager), intl),
                konto: (intl: InjectedIntl) =>
                    getStønadskontoNavn(intl, uttak.konto, grunnlag.søknadsinfo.navn.navnPåForeldre)
            }
        }))
    };
};
