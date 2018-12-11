import { Periode } from '../../types/uttaksplan/periodetyper';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Tidsperioden, getTidsperiode } from '../../util/uttaksplan/Tidsperioden';

const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

export interface InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor {
    antallUttaksdagerTapt: number;
    førsteUttaksdag: Date;
    sisteUttaksdagInnenSeksUker: Date;
}

const getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor = (
    uttaksplan: Periode[],
    familiehendelsesdato: Date,
    søkerErFarEllerMedmor: boolean
): InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor | undefined => {
    if (søkerErFarEllerMedmor === false) {
        return undefined;
    }
    const førstePeriode = Periodene(uttaksplan).getFørstePerioderEtterFamiliehendelsesdato(familiehendelsesdato);

    if (førstePeriode === undefined) {
        return undefined;
    }

    const førsteUttaksdag = førstePeriode.tidsperiode.fom;
    const sisteUttaksdagInnenSeksUker = getTidsperiode(førsteUttaksdag, 30).tom;
    const antallUttaksdager = Tidsperioden({
        fom: familiehendelsesdato,
        tom: førsteUttaksdag
    }).getAntallUttaksdager();

    if (antallUttaksdager === undefined || antallUttaksdager <= ANTALL_UTTAKSDAGER_SEKS_UKER) {
        return undefined;
    }

    return {
        antallUttaksdagerTapt: antallUttaksdager - ANTALL_UTTAKSDAGER_SEKS_UKER,
        førsteUttaksdag,
        sisteUttaksdagInnenSeksUker
    };
};

export default getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor;
