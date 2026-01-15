import { IntlShape } from 'react-intl';

import {
    InfoPeriode,
    Periode,
    Søknadsinfo,
    isAvslåttPeriode,
    isInfoPeriode,
    isUttaksperiode,
    isUttaksperiodeAnnenpartEøs,
} from '@navikt/fp-common';
import { Tidsperioden, getNavnGenitivEierform } from '@navikt/fp-utils';

import { Periodene } from '../../utils/Periodene';
import { getPeriodeTittel } from '../../utils/periodeUtils';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';

export const overskriverEndringerAnnenPartsPerioder: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const perioderSomKanOverstyres = grunnlag.eksisterendeSak?.uttaksplan
        .filter(isInfoPeriode)
        .filter((p) => !isAvslåttPeriode(p))
        .filter((p) => !isUttaksperiodeAnnenpartEøs(p));

    if (perioderSomKanOverstyres === undefined) {
        return { passerer: true };
    }

    const perioderSomOverlapperUtenSamtidigUttak = finnPerioderSomOverlapperUtenSamtidigUttak(
        grunnlag,
        perioderSomKanOverstyres,
    );

    const fornavnAnnenForelder = grunnlag.søkerErFarEllerMedmor
        ? grunnlag.navnPåForeldre.mor
        : grunnlag.navnPåForeldre.farMedmor;

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
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    strong: () => (msg: any) => msg,
                },
            };
            return regelInfo;
        }),
    };
};

const finnPerioderSomOverlapperUtenSamtidigUttak = (
    grunnlag: Søknadsinfo,
    perioderSomKanOverstyres: InfoPeriode[],
): Periode[] => {
    const perioderForSjekk = grunnlag.erEndringssøknad
        ? grunnlag.perioderSomSkalSendesInn
        : grunnlag.perioder.filter((p) => !isInfoPeriode(p));

    return perioderForSjekk
        .filter((p) => Periodene(perioderSomKanOverstyres).finnOverlappendePerioder(p).length > 0)
        .filter((p) => !(isUttaksperiode(p) && p.ønskerSamtidigUttak));
};
