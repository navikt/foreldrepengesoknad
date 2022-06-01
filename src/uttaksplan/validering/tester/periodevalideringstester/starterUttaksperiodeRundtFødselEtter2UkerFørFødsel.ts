import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import {
    getFørsteUttaksdag2UkerFørFødsel,
    gjelderWLBReglerFarMedmorRundtFødsel,
    isUttaksperiodeFarMedmorPgaFødsel,
    starterTidsperiodeEtter2UkerFørFødsel,
} from 'app/utils/wlbUtils';
import { formaterDatoKompakt } from 'app/utils/dateUtils';

export const starterUttaksperiodeRundtFødselEtter2UkerFørFødsel: RegelTest = (
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
        .filter(
            (p) =>
                !starterTidsperiodeEtter2UkerFørFødsel(
                    p.tidsperiode,
                    grunnlag.familiehendelsesdato,
                    grunnlag.termindato
                )
        );

    const førsteUttaksdagToUkerFørFødsel = formaterDatoKompakt(
        getFørsteUttaksdag2UkerFørFødsel(grunnlag.familiehendelsesdato, grunnlag.termindato)
    );
    return {
        passerer: perioderFarMedmorSomStarterFør2UkerFørFødsel.length === 0,
        info: perioderFarMedmorSomStarterFør2UkerFørFødsel.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.starterUttaksperiodeRundtFødselEtter2UkerFørFødsel',
            values: { dato: førsteUttaksdagToUkerFørFødsel },
            periodeId: periode.id,
        })),
    };
};
