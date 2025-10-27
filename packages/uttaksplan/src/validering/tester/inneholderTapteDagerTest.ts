import { Periodetype, Søknadsinfo, isUttaksperiode } from '@navikt/fp-common';

import { Periodene } from '../../utils/Periodene';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor } from '../utils/uttakValideringUtils';

export function inneholderTapteDagerTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const { perioder, søkerErFarEllerMedmor } = grunnlag;
    const infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor = getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor(
        perioder,
        grunnlag.familiehendelsesdato,
        søkerErFarEllerMedmor,
        grunnlag.morHarRett === false,
        grunnlag.morErUfør,
        !!(søkerErFarEllerMedmor && grunnlag.annenForelder.kanIkkeOppgis),
        !!(søkerErFarEllerMedmor && grunnlag.søkerErAleneOmOmsorg),
    );

    const planInneholderTapteDager =
        Periodene(perioder).getHull().length > 0 || infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor !== undefined;

    const planInneholderAnnetEnnAktivitetsfriKvote = perioder
        .filter((p) => p.type !== Periodetype.Hull)
        .some((p) => (isUttaksperiode(p) && p.konto !== 'AKTIVITETSFRI_KVOTE') || !isUttaksperiode(p));

    const passerer = (planInneholderTapteDager && planInneholderAnnetEnnAktivitetsfriKvote) === false;

    return {
        passerer,
        info: {
            intlKey: 'uttaksplan.validering.info.planenInneholderHull',
        },
    };
}
