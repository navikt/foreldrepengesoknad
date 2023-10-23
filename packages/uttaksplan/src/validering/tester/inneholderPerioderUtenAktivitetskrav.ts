import { farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk } from '../../utils/uttaksskjema/aktivitetskravMorSkalBesvares';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { StønadskontoType, Søknadsinfo, hasValue, isUttaksperiode } from '@navikt/fp-common';

export const inneholderPerioderUtenAktivitetskrav = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const {
        perioder,
        søkerErFarEllerMedmor,
        søkerErAleneOmOmsorg,
        søkerHarMidlertidigOmsorg,
        familiehendelsesdato,
        søkersituasjon,
    } = grunnlag;

    if (!søkerErFarEllerMedmor || søkerErAleneOmOmsorg || søkerHarMidlertidigOmsorg) {
        return {
            passerer: true,
        };
    }
    const perioderUtenAktivitetskrav = perioder.filter(
        (p) =>
            isUttaksperiode(p) &&
            !hasValue(p.morsAktivitetIPerioden) &&
            !p.erMorForSyk &&
            !p.ønskerSamtidigUttak &&
            !p.ønskerFlerbarnsdager &&
            !farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk(
                familiehendelsesdato,
                søkerErFarEllerMedmor,
                p.konto,
                p.erMorForSyk,
                p.tidsperiode,
                søkersituasjon.situasjon,
            ) &&
            (p.konto === StønadskontoType.Fellesperiode || p.konto === StønadskontoType.Foreldrepenger),
    );

    return {
        passerer: perioderUtenAktivitetskrav.length === 0,
        info: perioderUtenAktivitetskrav.map((p) => ({
            intlKey: 'uttaksplan.validering.feil.inneholderPerioderUtenAktivitetskrav',
            periodeId: p.id,
        })),
    };
};
