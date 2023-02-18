import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from 'uttaksplan/validering/utils/types/regelTypes';
import {
    getSisteUttaksdag6UkerEtterFødsel,
    gjelderWLBReglerFarMedmorRundtFødsel,
    isUttaksperiodeFarMedmorPgaFødsel,
    slutterTidsperiodeInnen6UkerEtterFødsel,
} from 'app/utils/wlbUtils';
import { formaterDatoKompakt } from 'app/utils/dateUtils';

export const slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    if (
        !gjelderWLBReglerFarMedmorRundtFødsel(
            grunnlag.familiehendelsesdato,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.morHarRett,
            grunnlag.søkersituasjon.situasjon
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
        getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato)
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
