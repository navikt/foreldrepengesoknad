import { FunctionComponent } from 'react';

import { Block } from '@navikt/fp-common';
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
        <div>
            <Block padBottom="l">
                <div className={bem.block}>{getDokumentasjonStringPerioder(vedlegg)}</div>
            </Block>
            <VedleggListe vedlegg={vedlegg} />
        </div>
    );
};

export default PeriodeDokumentasjon;
