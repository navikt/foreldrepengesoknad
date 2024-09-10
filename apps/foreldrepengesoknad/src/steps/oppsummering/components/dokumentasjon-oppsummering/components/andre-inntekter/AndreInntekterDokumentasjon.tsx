import { FunctionComponent } from 'react';

import { VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';
import { bemUtils } from '@navikt/fp-utils';

import { getDokumentasjonStringAndreInntekter } from '../../dokumentasjonUtils';
import VedleggListe from '../VedleggListe';
import './../dokumentasjon.css';

interface Props {
    vedlegg: Attachment[];
}

const AndreInntekterDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const bem = bemUtils('dokumentasjon');

    if (vedlegg.length === 0) {
        return null;
    }

    return (
        <VStack gap="2">
            <div className={bem.block}>{getDokumentasjonStringAndreInntekter(vedlegg)}</div>
            <VedleggListe vedlegg={vedlegg} />
        </VStack>
    );
};

export default AndreInntekterDokumentasjon;
