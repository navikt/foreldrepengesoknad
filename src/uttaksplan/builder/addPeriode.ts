import { guid } from 'nav-frontend-js-utils';
import { Periode } from 'uttaksplan/types/Periode';
import { AddedPeriodeParams } from './ModifyPeriodeParams';
import { UttaksplanBuilder } from './UttaksplanBuilder';

interface AddPeriodeResult {
    updatedPlan: Periode[];
    id: string;
}

const addPeriode = ({
    getUttaksstatusFunc,
    uttaksplan,
    nyPeriode,
    tilgjengeligeStønadskontoer,
    familiehendelsesdato,
    erFlerbarnssøknad,
    erEndringsøknadUtenEkisterendeSak,
    relevantStartDatoForUttak,
    harMidlertidigOmsorg,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    opprinneligPlan,
}: AddedPeriodeParams): AddPeriodeResult => {
    const familiehendelsedato = familiehendelsesdato;
    const builder = UttaksplanBuilder(
        getUttaksstatusFunc,
        uttaksplan,
        familiehendelsedato,
        tilgjengeligeStønadskontoer,
        erFlerbarnssøknad,
        erEndringsøknadUtenEkisterendeSak,
        relevantStartDatoForUttak,
        harMidlertidigOmsorg,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        opprinneligPlan
    );
    const id = guid();

    return {
        updatedPlan: builder.leggTilPeriodeOgBuild({
            ...nyPeriode,
            id,
        }).perioder,
        id,
    };
};

export default addPeriode;
