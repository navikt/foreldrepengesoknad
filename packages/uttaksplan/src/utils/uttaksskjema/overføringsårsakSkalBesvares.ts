import { AnnenForelder, Periodetype, StønadskontoType, harAnnenForelderRettIEØS } from '@navikt/fp-common';

const overføringsårsakSkalBesvares = (
    periodetype: Periodetype,
    erFarEllerMedmor: boolean,
    kontoValue: StønadskontoType,
    annenForelder: AnnenForelder,
): boolean => {
    const annenForelderHarRettIEØS = harAnnenForelderRettIEØS(annenForelder);
    return (
        periodetype === Periodetype.Overføring ||
        (annenForelderHarRettIEØS && erFarEllerMedmor && kontoValue === StønadskontoType.Mødrekvote) ||
        (annenForelderHarRettIEØS && !erFarEllerMedmor && kontoValue === StønadskontoType.Fedrekvote)
    );
};

export default overføringsårsakSkalBesvares;
