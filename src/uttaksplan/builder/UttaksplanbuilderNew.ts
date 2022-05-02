import { Periode } from 'uttaksplan/types/Periode';

const leggTilPeriode = (perioder: Periode[], nyPeriode: Periode): Periode[] => {
    return [...perioder, nyPeriode];
};

const UttaksplanbuilderNew = {
    leggTilPeriode,
};

export default UttaksplanbuilderNew;
