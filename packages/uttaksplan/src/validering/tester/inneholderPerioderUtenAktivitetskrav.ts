import { Søknadsinfo, isUttaksperiode } from '@navikt/fp-common';

import { farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk } from '../../utils/uttaksskjema/aktivitetskravMorSkalBesvares';
import { RegelTestresultat } from '../utils/types/regelTypes';

const hasValue = (v: string | undefined | null) => v !== '' && v !== undefined && v !== null;

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
            (p.konto === 'FELLESPERIODE' || p.konto === 'FORELDREPENGER'),
    );

    return {
        passerer: perioderUtenAktivitetskrav.length === 0,
        info: perioderUtenAktivitetskrav.map((p) => ({
            intlKey: 'uttaksplan.validering.feil.inneholderPerioderUtenAktivitetskrav',
            periodeId: p.id,
        })),
    };
};
