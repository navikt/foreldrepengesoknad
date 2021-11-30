import { isOverføringsperiode, Periode } from 'uttaksplan/types/Periode';

const overføringsårsakSkalBesvares = (periode: Periode) => {
    return isOverføringsperiode(periode);
};

export default overføringsårsakSkalBesvares;
