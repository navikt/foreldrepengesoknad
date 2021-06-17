import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React from 'react';

const FarMedmorAleneomsorgFødselAdopsjon = () => {
    const { søkersituasjon, søker, annenForelder } = useSøknad();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødselEllerAdopsjon = søkersituasjon.situasjon === 'fødsel' || søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmorAnnenForelderKanIkkeOppgis = erFarEllerMedmor && annenForelder.kanIkkeOppgis;

    const shouldRender =
        (erFarEllerMedmor && erFødselEllerAdopsjon && !!søker.erAleneOmOmsorg) ||
        erFarEllerMedmorAnnenForelderKanIkkeOppgis;

    if (!shouldRender) {
        return null;
    }

    return <div>Far medmor alene om omsorg fødsel/adopsjon</div>;
};

export default FarMedmorAleneomsorgFødselAdopsjon;
