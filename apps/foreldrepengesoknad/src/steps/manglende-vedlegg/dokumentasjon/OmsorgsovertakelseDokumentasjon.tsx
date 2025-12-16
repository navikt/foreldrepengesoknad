import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, Søkersituasjon } from '@navikt/fp-types';

import { VedleggUploader } from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    søkersituasjon: Søkersituasjon;
}

export const OmsorgsovertakelseDokumentasjon = ({ attachments, updateAttachments, søkersituasjon }: Props) => {
    const intl = useIntl();

    if (!skalViseOmsorgsovertakelseDokumentasjon(søkersituasjon)) {
        return null;
    }

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.OMSORGSOVERTAKELSE)}
            skjemanummer={Skjemanummer.OMSORGSOVERTAKELSE}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.omsorgsovertakelse.tittel' })}
            description={intl.formatMessage({ id: 'manglendeVedlegg.omsorgsovertakelse.description' })}
            attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
            metadataType="BARN"
        />
    );
};

export const skalViseOmsorgsovertakelseDokumentasjon = (søkersituasjon?: Søkersituasjon) => {
    return søkersituasjon?.situasjon === 'adopsjon';
};
