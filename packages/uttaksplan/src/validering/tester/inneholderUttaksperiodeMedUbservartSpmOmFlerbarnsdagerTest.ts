import { ønskerFlerbarnsdagerSkalBesvares } from '../../utils/uttaksskjema/ønskerFlerbarnsdagerSkalBesvares';
import { RegelTestresultat } from '../utils/types/regelTypes';
import {
    Periode,
    Søknadsinfo,
    UttakRundtFødselÅrsak,
    Uttaksperiode,
    isAnnenForelderOppgitt,
    isUttaksperiode,
} from '@navikt/fp-common';

export const inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdagerTest = (
    grunnlag: Søknadsinfo,
): RegelTestresultat => {
    const uttaksperioder = grunnlag.perioder.filter((p: Periode) => isUttaksperiode(p)) as Uttaksperiode[];
    const erFlerbarnssøknad = grunnlag.antallBarn > 1;
    const bareFarMedmorHarRett = grunnlag.søkerErFarEllerMedmor && !grunnlag.erDeltUttak;
    const erDeltUttakINorge =
        grunnlag.erDeltUttak &&
        isAnnenForelderOppgitt(grunnlag.annenForelder) &&
        grunnlag.annenForelder.harRettPåForeldrepengerINorge;
    const perioderMedUbesvartSpmOmFlerbarnsdager = uttaksperioder
        .filter((p) =>
            ønskerFlerbarnsdagerSkalBesvares(
                p.type,
                erFlerbarnssøknad,
                grunnlag.søkerErFarEllerMedmor,
                grunnlag.familiehendelsesdato,
                p.tidsperiode,
                p.konto,
                bareFarMedmorHarRett,
                grunnlag.antallBarn,
                grunnlag.søkerErAleneOmOmsorg,
                !!erDeltUttakINorge,
                p.erMorForSyk ? UttakRundtFødselÅrsak.morErForSyk : undefined,
            ),
        )
        .filter((p) => p.gradert === undefined);

    return {
        passerer: perioderMedUbesvartSpmOmFlerbarnsdager.length === 0,
        info: perioderMedUbesvartSpmOmFlerbarnsdager.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdager',
            periodeId: periode.id,
        })),
    };
};
