import { Attachment } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { BodyLong } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import VedleggListe from '../VedleggListe';
import { getDokumentasjonStringAndreInntekter } from '../../dokumentasjonUtils';

interface Props {
    vedlegg: Attachment[];
}

const AndreInntekterDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const intl = useIntl();

    if (vedlegg.length === 0) {
        return null;
    }

    return (
        <div>
            <Block padBottom="l">
                <BodyLong>{getDokumentasjonStringAndreInntekter(intl)}</BodyLong>
            </Block>
            <VedleggListe vedlegg={vedlegg} />
        </div>
    );
};

export default AndreInntekterDokumentasjon;
