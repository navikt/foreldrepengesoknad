import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
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

    const perioderFarMedmorSomStarterFør2UkerFørFødsel = grunnlag.perioder
        .filter((p) => isUttaksperiodeFarMedmorPgaFødsel(p))
        .filter((p) => !slutterTidsperiodeInnen6UkerEtterFødsel(p.tidsperiode, grunnlag.familiehendelsesdato));

    const sisteUttaksdagSeksUkerEtterFødsel = formaterDatoKompakt(
        getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato)
    );
    return {
        passerer: perioderFarMedmorSomStarterFør2UkerFørFødsel.length === 0,
        info: perioderFarMedmorSomStarterFør2UkerFørFødsel.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.slutterUttaksperiodeRundtFødselEtter6UkerEtterFødsel',
            values: { dato: sisteUttaksdagSeksUkerEtterFødsel },
            periodeId: periode.id,
        })),
    };
};
