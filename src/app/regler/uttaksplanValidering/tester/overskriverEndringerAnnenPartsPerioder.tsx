import React from 'react';
import { UttaksplanRegelgrunnlag } from '../types';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { Periode, isUttaksperiode, isInfoPeriode } from 'app/types/uttaksplan/periodetyper';
import { getPeriodeTittel } from 'app/util/uttaksplan';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';
import { IntlShape } from 'react-intl';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from 'shared/regler/regelTypes';

export const overskriverEndringerAnnenPartsPerioder: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const {
        eksisterendeUttaksplan,
        søknadsinfo: {
            navn: { navnPåForeldre }
        }
    } = grunnlag;
    if (eksisterendeUttaksplan) {
        const { perioderSomSkalSendesInn } = grunnlag;
        const perioderSomOverlapper: Periode[] = [];
        perioderSomSkalSendesInn.forEach((periode) => {
            const overlapp = Periodene(eksisterendeUttaksplan.filter(isInfoPeriode)).finnOverlappendePerioder(periode);
            if (overlapp.length > 0) {
                perioderSomOverlapper.push(periode);
            }
        });
        const passerer =
            perioderSomOverlapper.filter((p) => !(isUttaksperiode(p) && p.ønskerSamtidigUttak)).length === 0;
        return {
            passerer,
            info: perioderSomOverlapper.map((periode) => {
                const regelInfo: RegelTestresultatInfo = {
                    periodeId: periode.id,
                    intlKey: 'uttaksplan.validering.advarsel.periodeOverskriverAnnenPartsPeriode',
                    renderAsHtml: true,
                    values: {
                        periode: (intl: IntlShape) => getPeriodeTittel(intl, periode, navnPåForeldre),
                        tidsperiode: (intl: IntlShape) => Tidsperioden(periode.tidsperiode).formaterStringKort(intl),
                        forelder: grunnlag.søknadsinfo.navn.annenForelder.fornavn,
                        forelders: (intl: IntlShape) =>
                            getNavnGenitivEierform(grunnlag.søknadsinfo.navn.annenForelder.fornavn, intl.locale),
                        strong: (intl: IntlShape) => (msg: any) => <strong>{msg}</strong>
                    }
                };
                return regelInfo;
            })
        };
    }

    return { passerer: true };
};
