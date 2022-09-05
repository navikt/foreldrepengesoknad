import { FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import Uttaksplanbuilder from 'uttaksplan/builder/Uttaksplanbuilder';
import { Periode } from 'uttaksplan/types/Periode';
import { FarMedmorFørstegangssøknadMedAnnenPartFormData } from './farMedmorFørstegangssøknadMedAnnenPartFormConfig';

export const getFarMedmorFørstegangssøknadMedAnnenPartInitialValues = (
    state: FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo | undefined
): FarMedmorFørstegangssøknadMedAnnenPartFormData => {
    if (!state) {
        return {
            permisjonStartdato: '',
        };
    }

    return {
        permisjonStartdato: state.permisjonStartdato,
    };
};

export const leggTilFarMedmorsPerioderIEksisterendeSaksUttaksplan = (
    farMedmorsPerioder: Periode[],
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
    if (farMedmorsPerioder.length === 1) {
        return builder.leggTilPeriode(farMedmorsPerioder[0]);
    } else {
        return builder.leggTilPerioder(farMedmorsPerioder);
    }
};
