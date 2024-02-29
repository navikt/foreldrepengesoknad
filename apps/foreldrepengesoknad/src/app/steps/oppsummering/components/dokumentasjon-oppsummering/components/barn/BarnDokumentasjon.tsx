import { FunctionComponent } from 'react';

import { Block, bemUtils } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';

import { getDokumentasjonStringBarn } from '../../dokumentasjonUtils';
import VedleggListe from '../VedleggListe';
import './../dokumentasjon.css';

interface Props {
    vedlegg: Attachment[];
}

const BarnDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const bem = bemUtils('dokumentasjon');

    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>{getDokumentasjonStringBarn(vedlegg)}</div>
            </Block>
            <VedleggListe vedlegg={vedlegg} />
        </div>
    );
};

export default BarnDokumentasjon;
