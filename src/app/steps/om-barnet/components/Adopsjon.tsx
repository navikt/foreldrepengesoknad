import Søkersituasjon from 'app/context/types/Søkersituasjon';
import React, { FunctionComponent } from 'react';

interface Props {
    søkersituasjon: Søkersituasjon;
}

const Adopsjon: FunctionComponent<Props> = ({ søkersituasjon }) => {
    if (søkersituasjon.situasjon === 'fødsel') {
        return null;
    }

    return <div>Adopsjon</div>;
};

export default Adopsjon;
