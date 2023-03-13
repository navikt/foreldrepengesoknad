import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Periode } from 'uttaksplan/types/Periode';
import { Uttaksstatus } from 'uttaksplan/utils/uttaksstatus';

interface ModifyPeriodeParams {
    getUttaksstatusFunc: () => Uttaksstatus;
    uttaksplan: Periode[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    familiehendelsesdato: Date;
    erFlerbarnssøknad: boolean;
    erEndringsøknadUtenEkisterendeSak: boolean;
    relevantStartDatoForUttak: Date | undefined;
    harMidlertidigOmsorg: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    opprinneligPlan?: Periode[];
}

export interface DeletePeriodeParams extends ModifyPeriodeParams {
    slettetPeriode: Periode;
}

export interface AddedPeriodeParams extends ModifyPeriodeParams {
    nyPeriode: Periode;
}

export interface UpdatePeriodeParams extends ModifyPeriodeParams {
    oppdatertPeriode: Periode;
}
