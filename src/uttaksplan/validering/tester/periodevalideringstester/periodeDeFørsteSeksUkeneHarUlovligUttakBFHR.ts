import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel } from 'app/utils/wlbUtils';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { isUttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const periodeDeFørsteSeksUkeneHarUlovligUttakBFHR: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    if (
        !andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato) ||
        !grunnlag.søkerErFarEllerMedmor ||
        grunnlag.morHarRett ||
        grunnlag.søkersituasjon.situasjon !== 'fødsel'
    ) {
        return {
            passerer: true,
        };
    }

    const perioderDeFørsteSeksUkeneMedUlovligUttakBFHR = grunnlag.perioder.filter(
        (periode) =>
            isUttaksperiode(periode) &&
            starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
                periode.tidsperiode,
                grunnlag.familiehendelsesdato,
                grunnlag.termindato
            ) &&
            periode.konto === StønadskontoType.Foreldrepenger &&
            periode.erMorForSyk === false
    );

    return {
        passerer: perioderDeFørsteSeksUkeneMedUlovligUttakBFHR.length === 0,
        info: perioderDeFørsteSeksUkeneMedUlovligUttakBFHR.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.perioderDeFørsteSeksUkeneMedUlovligUttakBFHR',
            periodeId: periode.id,
        })),
    };
};
