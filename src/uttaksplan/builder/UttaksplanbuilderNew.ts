import { Periode } from 'uttaksplan/types/Periode';

const leggTilPeriode = (perioder: Periode[], nyPeriode: Periode): Periode[] => {
    return [...perioder, nyPeriode];
};

const oppdaterPeriode = () => null;

const slettPeriode = () => null;

const UttaksplanbuilderNew = {
    leggTilPeriode,
    oppdaterPeriode,
    slettPeriode,
};

export default UttaksplanbuilderNew;
