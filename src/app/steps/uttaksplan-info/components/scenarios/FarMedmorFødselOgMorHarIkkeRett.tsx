import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React from 'react';

const FarMedmorFødselOgMorHarIkkeRett = () => {
    // søknad.erFødsel && søker.erFarEllerMedmor && annenForelder.harRett === false
    const { søkersituasjon, annenForelder } = useSøknad();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarIkkeRett = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger === false
        : false;

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarIkkeRett;

    if (!shouldRender) {
        return null;
    }

    return <div>Far medmor fødsel og mor har ikke rett</div>;
};

export default FarMedmorFødselOgMorHarIkkeRett;
