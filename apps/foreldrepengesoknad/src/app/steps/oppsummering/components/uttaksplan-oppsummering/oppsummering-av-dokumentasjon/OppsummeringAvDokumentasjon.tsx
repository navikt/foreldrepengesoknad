import { intlUtils } from '@navikt/fp-common';
import { Attachment } from 'app/types/Attachment';
import { isAttachmentWithError } from 'app/utils/vedleggUtils';
import EtikettBase from 'nav-frontend-etiketter';
import Lenke from 'nav-frontend-lenker';
import * as React from 'react';
import { useIntl } from 'react-intl';
import KompleksFeltoppsummering from '../kompleks-feltoppsummering/KompleksFeltoppsummering';

import './oppsummeringAvDokumentasjon.less';

interface OppsummeringAvDokumentasjonProps {
    ledetekst?: string;
    vedlegg: Attachment[];
}

type Props = OppsummeringAvDokumentasjonProps;

const OppsummeringAvDokumentasjon: React.FunctionComponent<Props> = (props) => {
    const { ledetekst, vedlegg } = props;
    const intl = useIntl();

    const renderListOfAttachmentPreviewLinks = () => {
        return vedlegg
            .filter((a: Attachment) => !isAttachmentWithError(a))
            .map(({ url, id, filename }) => (
                <Lenke href={url!} key={id} target="_blank">
                    {filename}
                </Lenke>
            ));
    };

    return (
        <KompleksFeltoppsummering
            className="oppsummeringAvDokumentasjon"
            ledetekst={ledetekst || intlUtils(intl, 'vedlagtdokumentasjon')}
        >
            {vedlegg && vedlegg.filter((a: Attachment) => !isAttachmentWithError(a)).length > 0 ? (
                renderListOfAttachmentPreviewLinks()
            ) : (
                <EtikettBase type="fokus">
                    {intlUtils(intl, 'oppsummering.andreInntekter.dokumentasjon.mangler')}
                </EtikettBase>
            )}
        </KompleksFeltoppsummering>
    );
};

export default OppsummeringAvDokumentasjon;
