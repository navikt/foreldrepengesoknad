import { useIntl } from 'react-intl';
import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { VedleggUploader, formaterPerioderForVisning } from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    andreInntektskilder?: AndreInntektskilder[];
}

export const EtterlønnEllerSluttvederlagDokumentasjon = ({
    attachments,
    updateAttachments,
    andreInntektskilder,
}: Props) => {
    const intl = useIntl();

    if (!andreInntektskilder || !andreInntektskilder.some((i) => i.type === 'ETTERLØNN_SLUTTPAKKE')) {
        return null;
    }

    const perioder = andreInntektskilder.filter((i) => i.type === 'ETTERLØNN_SLUTTPAKKE');

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG)}
            skjemanummer={Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG}
            labelText={intl.formatMessage(
                { id: 'manglendeVedlegg.etterlønn.tittel' },
                {
                    perioder: formaterPerioderForVisning(perioder, intl),
                    antallPerioder: perioder.length,
                },
            )}
            description={intl.formatMessage({
                id: 'manglendeVedlegg.etterlønn.description',
            })}
            attachmentType={AttachmentType.ANNEN_INNTEKT}
            metadataType="OPPTJENING"
            perioder={perioder}
        />
    );
};
