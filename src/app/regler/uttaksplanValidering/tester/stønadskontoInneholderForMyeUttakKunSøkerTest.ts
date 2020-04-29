import { UttaksplanRegelgrunnlag } from '../types';
import { IntlShape } from 'react-intl';
import { getStønadskontoNavn } from '../../../util/uttaksplan';
import { getVarighetString } from 'common/util/intlUtils';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from 'shared/regler/regelTypes';
import { getUttaksstatus } from 'app/util/uttaksplan/uttaksstatus';

export const stønadskontoInneholderForMyeUttakKunSøkerTest: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const { søknadsinfo, perioder, tilgjengeligeStønadskontoer } = grunnlag;
    const stønadskontoerMedForMyeUttak = getUttaksstatus(
        søknadsinfo,
        tilgjengeligeStønadskontoer,
        perioder
    ).uttak.filter((u) => u.dager < 0);
    return {
        passerer: stønadskontoerMedForMyeUttak.length === 0,
        info: stønadskontoerMedForMyeUttak.map(
            (uttak): RegelTestresultatInfo => ({
                intlKey: 'uttaksplan.validering.feil.forMyeUttak',
                values: {
                    dager: (intl: IntlShape) => getVarighetString(Math.abs(uttak.dager), intl),
                    konto: (intl: IntlShape) =>
                        getStønadskontoNavn(intl, uttak.konto, grunnlag.søknadsinfo.navn.navnPåForeldre),
                },
            })
        ),
    };
};
