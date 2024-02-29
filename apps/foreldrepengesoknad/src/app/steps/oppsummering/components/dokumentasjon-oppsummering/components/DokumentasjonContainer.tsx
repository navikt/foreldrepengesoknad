import React, { FunctionComponent } from 'react';

import './dokumentasjon-container.css';
import { bemUtils } from '@navikt/fp-common';

interface Props {
    children: React.ReactNode;
}

const DokumentasjonContainer: FunctionComponent<Props> = ({ children }) => {
    const bem = bemUtils('dokumentasjon-container');

    return <div className={bem.block}>{children}</div>;
};

export default DokumentasjonContainer;
