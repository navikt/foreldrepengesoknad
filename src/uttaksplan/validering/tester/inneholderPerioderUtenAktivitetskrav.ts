import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { isUttaksperiode } from 'uttaksplan/types/Periode';
import { hasValue } from '@navikt/fp-common';

export const inneholderPerioderUtenAktivitetskrav = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder, søkerErFarEllerMedmor, søkerErAleneOmOmsorg, søkerHarMidlertidigOmsorg, morHarRett } = grunnlag;

    if (!søkerErFarEllerMedmor || søkerErAleneOmOmsorg || søkerHarMidlertidigOmsorg || morHarRett) {
        return {
            passerer: true,
        };
    }

    let periodeId = undefined;
    const passerer = perioder
        .filter(
            (p) =>
                isUttaksperiode(p) &&
                (p.konto === StønadskontoType.Fellesperiode || p.konto === StønadskontoType.Foreldrepenger)
        )
        .some((p) => {
            if (isUttaksperiode(p) && !hasValue(p.morsAktivitetIPerioden)) {
                periodeId = p.id;
            }
        });

    return {
        passerer,
        info: {
            intlKey: 'uttaksplan.validering.feil.inneholderPerioderUtenAktivitetskrav',
            periodeId,
        },
    };
};
