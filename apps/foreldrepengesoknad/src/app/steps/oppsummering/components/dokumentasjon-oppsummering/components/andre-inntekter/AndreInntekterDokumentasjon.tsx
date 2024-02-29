import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { BodyLong } from '@navikt/ds-react';

import { Block, bemUtils } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';

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
        <div>
            <Block padBottom="l">
                <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                <BodyLong>{getDokumentasjonStringAndreInntekter(vedlegg)}</BodyLong>
            </Block>
            <VedleggListe vedlegg={vedlegg} />
        </div>
    );
};

export default AndreInntekterDokumentasjon;
