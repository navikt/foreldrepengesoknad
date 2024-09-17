import { FunctionComponent } from 'react';

import { VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';
import { bemUtils } from '@navikt/fp-utils';

import { getDokumentasjonStringBarn } from '../../dokumentasjonUtils';
import VedleggListe from '../VedleggListe';
import './../dokumentasjon.css';

interface Props {
    vedlegg: Attachment[];
}

const BarnDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const bem = bemUtils('dokumentasjon');

    return (
        <VStack gap="2">
            <div className={bem.block}>{getDokumentasjonStringBarn(vedlegg)}</div>
            <VedleggListe vedlegg={vedlegg} />
        </VStack>
    );
};

export default BarnDokumentasjon;
