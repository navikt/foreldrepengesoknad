import { InfoBlock } from '@navikt/fp-common';
import React from 'react';
import Periodeliste from './../periodeliste/Periodeliste';

const Planlegger = () => {
    return (
        <InfoBlock>
            <section>
                <Periodeliste />
            </section>
        </InfoBlock>
    );
};

export default Planlegger;
