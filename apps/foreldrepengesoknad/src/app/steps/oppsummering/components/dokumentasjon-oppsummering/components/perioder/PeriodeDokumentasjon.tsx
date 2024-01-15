import { Attachment } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getDokumentasjonStringPerioder } from '../../dokumentasjonUtils';
import { BodyLong } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import VedleggListe from '../VedleggListe';

interface Props {
    vedlegg: Attachment[];
}

const PeriodeDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const intl = useIntl();

    return (
        <div>
            <Block padBottom="l">
                <BodyLong>{getDokumentasjonStringPerioder(vedlegg, intl)}</BodyLong>
            </Block>
            <VedleggListe vedlegg={vedlegg} />
        </div>
    );
};

export default PeriodeDokumentasjon;
