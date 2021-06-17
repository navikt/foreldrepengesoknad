import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React from 'react';

const FarMedmorFødselFørsteganggsøknadBeggeHarRett = () => {
    const { annenForelder, søkersituasjon } = useSøknad();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepenger
        : false;

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarRett;

    if (!shouldRender) {
        return null;
    }

    return <div>Far Medmor Fødsel Førsteganggsøknad Begge Har Rett</div>;
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
