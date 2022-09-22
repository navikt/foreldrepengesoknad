import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

const overføringsårsakSkalBesvares = (
    periodetype: Periodetype,
    erFarEllerMedmor: boolean,
    kontoValue: StønadskontoType
): boolean => {
    return (
        periodetype === Periodetype.Overføring ||
        (erFarEllerMedmor && kontoValue === StønadskontoType.Mødrekvote) ||
        (!erFarEllerMedmor && kontoValue === StønadskontoType.Fedrekvote)
    );
};

export default overføringsårsakSkalBesvares;
