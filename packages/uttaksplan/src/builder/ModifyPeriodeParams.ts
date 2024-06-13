import { Uttaksstatus } from 'utils/uttaksstatus';

import { Periode } from '@navikt/fp-common';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

interface ModifyPeriodeParams {
    getUttaksstatusFunc: () => Uttaksstatus;
    uttaksplan: Periode[];
    tilgjengeligeStønadskontoer: TilgjengeligeStønadskontoer[];
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
