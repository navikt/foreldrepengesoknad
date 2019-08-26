import { UttaksplanRegelgrunnlag } from '../types';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { getPeriodeTittel, getPeriodeForelderNavn } from 'app/util/uttaksplan';
import { InjectedIntl } from 'react-intl';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from 'shared/regler/regelTypes';

export const overlapperPeriodeAndrePerioder: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const {
        perioder,
        søknadsinfo: {
            navn: { navnPåForeldre }
        }
    } = grunnlag;
    const perioderSomHarOverlapp = perioder.filter(
        (periode) => Periodene(perioder).finnOverlappendePerioder(periode).length > 0
    );

    const passerer = perioderSomHarOverlapp.length === 0;
    return {
        passerer,
        info: perioderSomHarOverlapp.map((periode) => {
            const info: RegelTestresultatInfo = {
                periodeId: periode.id,
                intlKey: 'uttaksplan.validering.feil.periodeoverlapp.oppsummering',
                renderAsHtml: true,
                values: {
                    periode: (intl: InjectedIntl) => getPeriodeTittel(intl, periode, navnPåForeldre),
                    tidsperiode: (intl: InjectedIntl) => Tidsperioden(periode.tidsperiode).formaterStringKort(intl),
                    forelder: (intl: InjectedIntl) =>
                        getNavnGenitivEierform(getPeriodeForelderNavn(periode, navnPåForeldre), intl.locale)
                }
            };
            return info;
        })
    };
};
