import { AnnenForelder, Periodetype } from '@navikt/fp-common';
import { KontoTypeUttak } from '@navikt/fp-types';

import { harAnnenForelderRettIEØS } from '../../utils/annenForelderUtils';

const overføringsårsakSkalBesvares = (
    periodetype: Periodetype,
    erFarEllerMedmor: boolean,
    kontoValue: KontoTypeUttak,
    annenForelder: AnnenForelder,
): boolean => {
    const annenForelderHarRettIEØS = harAnnenForelderRettIEØS(annenForelder);
    return (
        periodetype === Periodetype.Overføring ||
        (annenForelderHarRettIEØS && erFarEllerMedmor && kontoValue === 'MØDREKVOTE') ||
        (annenForelderHarRettIEØS && !erFarEllerMedmor && kontoValue === 'FEDREKVOTE')
    );
};
// eslint-disable-next-line import/no-default-export
export default overføringsårsakSkalBesvares;
