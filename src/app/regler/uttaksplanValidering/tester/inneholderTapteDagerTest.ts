import { Regelgrunnlag, RegelTestresultat } from '../types';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor from '../../uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import { isUttaksperiode, Periodetype, StønadskontoType } from '../../../types/uttaksplan/periodetyper';

export function inneholderTapteDagerTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const {
        perioder,
        søknadsinfo: { søknaden, søker, mor, annenForelder }
    } = grunnlag;
    const infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor = getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor(
        perioder,
        søknaden.familiehendelsesdato,
        søker.erFarEllerMedmor,
        mor.harRett === false,
        mor.erUfør,
        !!(søker.erFarEllerMedmor && annenForelder.kanIkkeOppgis),
        !!(søker.erFarEllerMedmor && søker.erAleneOmOmsorg)
    );

    const planInneholderTapteDager =
        Periodene(perioder).getHull().length > 0 || infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor !== undefined;

    const planInneholderAnnetEnnAktivitetsfriKvote = perioder
        .filter((p) => p.type !== Periodetype.Hull)
        .some((p) => (isUttaksperiode(p) && p.konto !== StønadskontoType.AktivitetsfriKvote) || !isUttaksperiode(p));

    const passerer = (planInneholderTapteDager && planInneholderAnnetEnnAktivitetsfriKvote) === false;

    return {
        passerer,
        info: {
            intlKey: 'uttaksplan.veileder.planenInneholderHull'
        }
    };
}
