import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyLong } from '@navikt/ds-react';

import { Block, bemUtils } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';

import { getDokumentasjonStringBarn } from '../../dokumentasjonUtils';
import VedleggListe from '../VedleggListe';
import './../dokumentasjon.css';

interface Props {
    vedlegg: Attachment[];
}

const BarnDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const intl = useIntl();
    const bem = bemUtils('dokumentasjon');

    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">{getDokumentasjonStringBarn(vedlegg, intl)}</BodyLong>
                </div>
            </Block>
            <VedleggListe vedlegg={vedlegg} />
        </div>
    );
};

export default BarnDokumentasjon;
