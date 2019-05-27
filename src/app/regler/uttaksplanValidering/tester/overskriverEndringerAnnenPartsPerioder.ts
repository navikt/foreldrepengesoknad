import { Regelgrunnlag, RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../types';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { Periode, isGruppertInfoPeriode } from 'app/types/uttaksplan/periodetyper';
import { getPeriodeTittel } from 'app/util/uttaksplan';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';
import { InjectedIntl } from 'react-intl';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';

export const overskriverEndringerAnnenPartsPerioder: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const {
        eksisterendeUttaksplan,
        søknadsinfo: {
            navn: { navnPåForeldre }
        }
    } = grunnlag;
    if (grunnlag.søknadsinfo.søknaden.erEndringssøknad && eksisterendeUttaksplan) {
        const { perioderSomSkalSendesInn } = grunnlag;
        const perioderSomOverlapper: Periode[] = [];
        perioderSomSkalSendesInn.forEach((periode) => {
            const overlapp = Periodene(eksisterendeUttaksplan.filter(isGruppertInfoPeriode)).finnOverlappendePerioder(
                periode
            );
            if (overlapp.length > 0) {
                perioderSomOverlapper.push(periode);
            }
        });
        const passerer = perioderSomOverlapper.length === 0;
        return {
            passerer,
            info: passerer
                ? undefined
                : perioderSomOverlapper.map((periode) => {
                      const regelInfo: RegelTestresultatInfo = {
                          periodeId: periode.id,
                          intlKey: 'uttaksplan.validering.advarsel.periodeOverskriverAnnenPartsPeriode',
                          renderAsHtml: true,
                          values: {
                              periode: (intl: InjectedIntl) => getPeriodeTittel(intl, periode, navnPåForeldre),
                              tidsperiode: (intl: InjectedIntl) =>
                                  Tidsperioden(periode.tidsperiode).formaterStringKort(intl),
                              forelder: (intl: InjectedIntl) =>
                                  getNavnGenitivEierform(grunnlag.søknadsinfo.navn.annenForelder.fornavn, intl.locale)
                          }
                      };
                      return regelInfo;
                  })
        };
    }

    return { passerer: true };
};
