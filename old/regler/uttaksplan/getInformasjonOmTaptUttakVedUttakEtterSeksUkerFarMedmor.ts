import { Periode } from '../../types/uttaksplan/periodetyper';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Tidsperioden, getTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';

const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

export interface InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor {
    antallUttaksdagerTapt: number;
    førsteRegistrerteUttaksdag: Date;
    sisteUttaksdagInnenforSeksUker: Date;
}

const getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor = (
    uttaksplan: Periode[],
    familiehendelsesdato: Date,
    søkerErFarEllerMedmor: boolean,
    bareFarMedmorHarRett: boolean,
    morErUfør: boolean,
    søkerErFarEllerMedmorOgAnnenForelderKanIkkeOppgis: boolean,
    søkerErFarEllerMedmorOgErAleneOmOmsorgen: boolean
): InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor | undefined => {
    if (søkerErFarEllerMedmor === false || bareFarMedmorHarRett === false || morErUfør === true) {
        return undefined;
    }

    if (søkerErFarEllerMedmorOgAnnenForelderKanIkkeOppgis || søkerErFarEllerMedmorOgErAleneOmOmsorgen) {
        return undefined;
    }

    const førstePeriode = Periodene(uttaksplan).getFørstePerioderEtterFamiliehendelsesdato(familiehendelsesdato);
    if (førstePeriode === undefined) {
        return undefined;
    }

    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const førsteRegistrerteUttaksdag = førstePeriode.tidsperiode.fom;
    const sisteUttaksdagInnenforSeksUker = getTidsperiode(førsteUttaksdag, 30).tom;
    const antallUttaksdager =
        Tidsperioden({
            fom: førsteUttaksdag,
            tom: førsteRegistrerteUttaksdag,
        }).getAntallUttaksdager() - 1;

    if (antallUttaksdager === undefined || antallUttaksdager <= ANTALL_UTTAKSDAGER_SEKS_UKER) {
        return undefined;
    }

    return {
        antallUttaksdagerTapt: antallUttaksdager - ANTALL_UTTAKSDAGER_SEKS_UKER,
        førsteRegistrerteUttaksdag,
        sisteUttaksdagInnenforSeksUker,
    };
};

export default getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor;
