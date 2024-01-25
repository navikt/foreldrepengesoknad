import { Attachment, isAttachmentWithError } from '@navikt/fp-common';
import * as React from 'react';
import { useIntl } from 'react-intl';
import KompleksFeltoppsummering from '../kompleks-feltoppsummering/KompleksFeltoppsummering';
import { Link, Tag } from '@navikt/ds-react';

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
                <Link href={url!} key={id} target="_blank">
                    {filename}
                </Link>
            ));
    };

    return (
        <KompleksFeltoppsummering
            className="oppsummeringAvDokumentasjon"
            ledetekst={ledetekst || intl.formatMessage({ id: 'vedlagtdokumentasjon' })}
        >
            {vedlegg && vedlegg.filter((a: Attachment) => !isAttachmentWithError(a)).length > 0 ? (
                <div>{renderListOfAttachmentPreviewLinks()}</div>
            ) : (
                <div>
                    <Tag variant="warning">
                        {intl.formatMessage({ id: 'oppsummering.andreInntekter.dokumentasjon.mangler' })}
                    </Tag>
                </div>
            )}
        </KompleksFeltoppsummering>
    );
};

export default OppsummeringAvDokumentasjon;
