import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { IntlShape } from 'react-intl';
import { isInfoPeriode, isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { getPeriodeTittel } from 'uttaksplan/utils/periodeUtils';
import { getNavnGenitivEierform } from 'uttaksplan/utils/stønadskontoerUtils';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const overskriverEndringerAnnenPartsPerioder: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const eksisterendeUttaksplan =
        grunnlag.eksisterendeSak !== undefined ? grunnlag.eksisterendeSak.uttaksplan : undefined;
    const fornavnAnnenForelder = grunnlag.søkerErFarEllerMedmor
        ? grunnlag.navnPåForeldre.mor
        : grunnlag.navnPåForeldre.farMedmor;
    if (eksisterendeUttaksplan) {
        const perioderSomOverlapper: Periode[] = [];
        grunnlag.perioderSomSkalSendesInn.forEach((periode) => {
            const overlapp = Periodene(eksisterendeUttaksplan.filter(isInfoPeriode)).finnOverlappendePerioder(periode);
            if (overlapp.length > 0) {
                perioderSomOverlapper.push(periode);
            }
        });

        const perioderSomOverlapperUtenSamtidigUttak = perioderSomOverlapper.filter(
            (p) => !(isUttaksperiode(p) && p.ønskerSamtidigUttak)
        );

        const passerer = perioderSomOverlapperUtenSamtidigUttak.length === 0;
        return {
            passerer,
            info: perioderSomOverlapperUtenSamtidigUttak.map((periode) => {
                const regelInfo: RegelTestresultatInfo = {
                    periodeId: periode.id,
                    intlKey: 'uttaksplan.validering.advarsel.periodeOverskriverAnnenPartsPeriode',
                    renderAsHtml: true,
                    values: {
                        periode: (intl: IntlShape) =>
                            getPeriodeTittel(
                                intl,
                                periode,
                                grunnlag.navnPåForeldre,
                                grunnlag.familiehendelsesdato,
                                grunnlag.termindato,
                                grunnlag.søkersituasjon.situasjon
                            ),
                        tidsperiode: (intl: IntlShape) => Tidsperioden(periode.tidsperiode).formaterStringKort(intl),
                        forelder: fornavnAnnenForelder,
                        forelders: (intl: IntlShape) => getNavnGenitivEierform(fornavnAnnenForelder, intl.locale),
                        //strong: (_intl: IntlShape) => (msg: any) => <strong>{msg}</strong>, //TODO: strong does not work.
                        strong: (_intl: IntlShape) => (msg: any) => msg,
                    },
                };
                return regelInfo;
            }),
        };
    }

    return { passerer: true };
};
