import {
    formaterDatoKompakt,
    getSisteUttaksdag6UkerEtterFødsel,
    gjelderWLBReglerFarMedmorRundtFødsel,
    isUttaksperiodeFarMedmorPgaFødsel,
    slutterTidsperiodeInnen6UkerEtterFødsel,
} from '@navikt/fp-common';
import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from 'validering/utils/types/regelTypes';

export const slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel: RegelTest = (
    grunnlag: Søknadsinfo,
): RegelTestresultat => {
    if (
        !gjelderWLBReglerFarMedmorRundtFødsel(
            grunnlag.familiehendelsesdato,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.morHarRett,
            grunnlag.søkersituasjon.situasjon,
        )
    ) {
        return {
            passerer: true,
        };
    }

    const perioderFarMedmorSomIkkeSlutterFør6UkerEtterFødsel = grunnlag.perioder
        .filter((p) => isUttaksperiodeFarMedmorPgaFødsel(p, grunnlag.familiehendelsesdato, grunnlag.termindato))
        .filter((p) => !slutterTidsperiodeInnen6UkerEtterFødsel(p.tidsperiode, grunnlag.familiehendelsesdato));

    const sisteUttaksdagSeksUkerEtterFødsel = formaterDatoKompakt(
        getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato),
    );
    return {
        passerer: perioderFarMedmorSomIkkeSlutterFør6UkerEtterFødsel.length === 0,
        info: perioderFarMedmorSomIkkeSlutterFør6UkerEtterFødsel.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.slutterUttaksperiodeRundtFødselEtter6UkerEtterFødsel',
            values: { dato: sisteUttaksdagSeksUkerEtterFødsel },
            periodeId: periode.id,
        })),
    };
};
