import Uttaksplanbuilder from 'uttaksplan/builder/Uttaksplanbuilder';
import { Periode } from 'uttaksplan/types/Periode';

export const leggTilAnnenPartsPerioderISøkerenesUttaksplan = (
    annenPartsPerioder: Periode[],
    uttaksplan: Periode[],
    familiehendelsedato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    eksisterendeSakUttaksplan: Periode[]
): Periode[] => {
    const builder = Uttaksplanbuilder(
        uttaksplan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        eksisterendeSakUttaksplan
    );
    if (annenPartsPerioder.length === 1) {
        return builder.leggTilPeriode(annenPartsPerioder[0]);
    } else {
        return builder.leggTilPerioder(annenPartsPerioder);
    }
};
