import { Attachment } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getDokumentasjonStringBarn } from '../../dokumentasjonUtils';
import { BodyLong } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import VedleggListe from '../VedleggListe';

interface Props {
    vedlegg: Attachment[];
}

const BarnDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const intl = useIntl();

    return (
        <div>
            <Block padBottom="l">
                <BodyLong>{getDokumentasjonStringBarn(vedlegg, intl)}</BodyLong>
            </Block>
            <VedleggListe vedlegg={vedlegg} />
        </div>
    );
};

export default BarnDokumentasjon;
