import { AnnenForelder, Periodetype, StønadskontoType } from '@navikt/fp-common';

import { harAnnenForelderRettIEØS } from '../../utils/annenForelderUtils';

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
// eslint-disable-next-line import/no-default-export
export default overføringsårsakSkalBesvares;
