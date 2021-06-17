import React from 'react';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import useSøknad from 'app/utils/hooks/useSøknad';

/** Mor og far, adopsjon, begge har rett, adopterer alene, bare en har rett */
const MorFarAdopsjon = () => {
    const { søkersituasjon, annenForelder, søker } = useSøknad();

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = !!søker.erAleneOmOmsorg;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger !== undefined
        : false;

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    if (!shouldRender) {
        return null;
    }

    return <div>Mor og far, adopsjon, begge har rett, adopterer alene, bare en har rett</div>;
};

export default MorFarAdopsjon;
