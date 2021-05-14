import { YesOrNo } from '@navikt/sif-common-formik/lib';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import React, { FunctionComponent } from 'react';

interface Props {
    søkersituasjon: Søkersituasjon;
    erBarnetFødt: YesOrNo | undefined;
}

const Termin: FunctionComponent<Props> = ({ søkersituasjon, erBarnetFødt }) => {
    if (søkersituasjon.situasjon === 'adopsjon' || erBarnetFødt !== YesOrNo.NO) {
        return null;
    }

    return <div>Termin</div>;
};

export default Termin;
