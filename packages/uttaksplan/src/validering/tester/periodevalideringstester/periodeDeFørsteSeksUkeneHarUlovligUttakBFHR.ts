import { StønadskontoType, Søknadsinfo, isUttaksperiode } from '@navikt/fp-common';

import { andreAugust2022ReglerGjelder } from '../../../utils/dateUtils';
import { starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel } from '../../../utils/wlbUtils';
import { RegelTest, RegelTestresultat } from '../../utils/types/regelTypes';

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
                grunnlag.termindato,
            ) &&
            periode.konto === StønadskontoType.Foreldrepenger &&
            periode.erMorForSyk === false,
    );

    return {
        passerer: perioderDeFørsteSeksUkeneMedUlovligUttakBFHR.length === 0,
        info: perioderDeFørsteSeksUkeneMedUlovligUttakBFHR.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.perioderDeFørsteSeksUkeneMedUlovligUttakBFHR',
            periodeId: periode.id,
        })),
    };
};
