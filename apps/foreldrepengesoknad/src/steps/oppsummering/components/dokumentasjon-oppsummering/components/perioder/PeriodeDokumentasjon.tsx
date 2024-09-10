import { FunctionComponent } from 'react';

import { VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';
import { bemUtils } from '@navikt/fp-utils';

import { getDokumentasjonStringPerioder } from '../../dokumentasjonUtils';
import VedleggListe from '../VedleggListe';
import './../dokumentasjon.css';

interface Props {
    vedlegg: Attachment[];
}

const PeriodeDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const bem = bemUtils('dokumentasjon');

    return (
        <VStack gap="2">
            <div className={bem.block}>{getDokumentasjonStringPerioder(vedlegg)}</div>
            <VedleggListe vedlegg={vedlegg} />
        </VStack>
    );
};

export default PeriodeDokumentasjon;
