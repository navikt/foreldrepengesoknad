import { UttaksplanRegelgrunnlag } from '../types';
import { InjectedIntl } from 'react-intl';
import { getStønadskontoNavn } from '../../../util/uttaksplan';
import { getVarighetString } from 'common/util/intlUtils';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from 'shared/regler/regelTypes';

export const inneholderStønadskontoForMyeUttakTest: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const stønadskontoerMedForMyeUttak = grunnlag.uttaksstatusStønadskontoer.filter((u) => u.dager < 0);
    return {
        passerer: stønadskontoerMedForMyeUttak.length === 0,
        info: stønadskontoerMedForMyeUttak.map((uttak): RegelTestresultatInfo => ({
            intlKey: 'uttaksplan.validering.feil.forMyeUttak',
            values: {
                dager: (intl: InjectedIntl) => getVarighetString(Math.abs(uttak.dager), intl),
                konto: (intl: InjectedIntl) =>
                    getStønadskontoNavn(intl, uttak.konto, grunnlag.søknadsinfo.navn.navnPåForeldre)
            }
        }))
    };
};
