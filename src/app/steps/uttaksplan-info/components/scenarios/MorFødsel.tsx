import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React from 'react';

const MorFødsel = () => {
    const { søkersituasjon } = useSøknad();
    const erMor = !isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';

    const shouldRender = erMor && erFødsel;

    if (!shouldRender) {
        return null;
    }

    return <div>Mor fødsel</div>;
};

export default MorFødsel;
