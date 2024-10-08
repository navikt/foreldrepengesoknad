import { IntlShape } from 'react-intl';

import { Periode, Søknadsinfo, isAvslåttPeriode, isInfoPeriode, isUttaksperiode } from '@navikt/fp-common';
import { Tidsperioden, getNavnGenitivEierform } from '@navikt/fp-utils';

import { Periodene } from '../../utils/Periodene';
import { getPeriodeTittel } from '../../utils/periodeUtils';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';

export const overskriverEndringerAnnenPartsPerioder: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const eksisterendeUttaksplan =
        grunnlag.eksisterendeSak !== undefined
            ? grunnlag.eksisterendeSak.uttaksplan.filter((p) => !isAvslåttPeriode(p))
            : undefined;
    const fornavnAnnenForelder = grunnlag.søkerErFarEllerMedmor
        ? grunnlag.navnPåForeldre.mor
        : grunnlag.navnPåForeldre.farMedmor;
    if (eksisterendeUttaksplan) {
        const perioderSomOverlapper: Periode[] = [];
        const perioderForSjekk = grunnlag.erEndringssøknad
            ? grunnlag.perioderSomSkalSendesInn
            : grunnlag.perioder.filter((p) => !isInfoPeriode(p));

        perioderForSjekk.forEach((periode) => {
            const overlapp = Periodene(eksisterendeUttaksplan.filter(isInfoPeriode)).finnOverlappendePerioder(periode);
            if (overlapp.length > 0) {
                perioderSomOverlapper.push(periode);
            }
        });

        const perioderSomOverlapperUtenSamtidigUttak = perioderSomOverlapper.filter(
            (p) => !(isUttaksperiode(p) && p.ønskerSamtidigUttak),
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
                                grunnlag.søkersituasjon.situasjon,
                                grunnlag.søkerErFarEllerMedmor,
                            ),
                        tidsperiode: (intl: IntlShape) => Tidsperioden(periode.tidsperiode).formaterStringKort(intl),
                        forelder: fornavnAnnenForelder,
                        forelders: (intl: IntlShape) => getNavnGenitivEierform(fornavnAnnenForelder, intl.locale),
                        //strong: (_intl: IntlShape) => (msg: any) => <strong>{msg}</strong>, //TODO: strong does not work.
                        strong: () => (msg: any) => msg,
                    },
                };
                return regelInfo;
            }),
        };
    }

    return { passerer: true };
};
