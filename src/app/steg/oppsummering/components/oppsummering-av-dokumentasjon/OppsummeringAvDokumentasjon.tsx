import * as React from 'react';
import { useIntl } from 'react-intl';
import KompleksFeltoppsummering from 'app/steg/oppsummering/components/kompleks-feltoppsummering/KompleksFeltoppsummering';
import EtikettBase from 'nav-frontend-etiketter';
import getMessage from 'common/util/i18nUtils';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import Lenke from 'nav-frontend-lenker';
import { isAttachmentWithError } from 'app/components/storage/attachment/components/util';

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
        return vedlegg.filter((a: Attachment) => !isAttachmentWithError(a)).map(({ url, id, filename }) => (
            <Lenke href={url!} key={id} target="_blank">
                {filename}
            </Lenke>
        ));
    };

    return (
        <KompleksFeltoppsummering
            className="oppsummeringAvDokumentasjon"
            ledetekst={ledetekst || getMessage(intl, 'vedlagtdokumentasjon')}
        >
            {vedlegg && vedlegg.filter((a: Attachment) => !isAttachmentWithError(a)).length > 0 ? (
                renderListOfAttachmentPreviewLinks()
            ) : (
                <EtikettBase type="fokus">{getMessage(intl, 'dokumentasjon.mangler')}</EtikettBase>
            )}
        </KompleksFeltoppsummering>
    );
};

export default OppsummeringAvDokumentasjon;
