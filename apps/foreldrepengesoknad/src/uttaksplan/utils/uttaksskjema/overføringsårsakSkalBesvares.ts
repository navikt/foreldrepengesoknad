import AnnenForelder from 'app/context/types/AnnenForelder';
import { harAnnenForelderRettIEØS } from 'app/utils/annenForelderUtils';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

const overføringsårsakSkalBesvares = (
    periodetype: Periodetype,
    erFarEllerMedmor: boolean,
    kontoValue: StønadskontoType,
    annenForelder: AnnenForelder
): boolean => {
    const annenForelderHarRettIEØS = harAnnenForelderRettIEØS(annenForelder);
    return (
        periodetype === Periodetype.Overføring ||
        (annenForelderHarRettIEØS && erFarEllerMedmor && kontoValue === StønadskontoType.Mødrekvote) ||
        (annenForelderHarRettIEØS && !erFarEllerMedmor && kontoValue === StønadskontoType.Fedrekvote)
    );
};

export default overføringsårsakSkalBesvares;
