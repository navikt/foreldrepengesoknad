import { API_URLS } from 'appData/queries';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dokumentasjon } from 'types/Dokumentasjon';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { FileUploader } from '@navikt/fp-filopplaster';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { Attachment } from '@navikt/fp-types';

dayjs.extend(minMax);

interface Props {
    attachments?: Attachment[];
    updateAttachments: (attachments: Attachment[], hasPendingUploads: boolean) => void;
    termindato: string;
}

export const TerminDokPanel = ({ attachments, updateAttachments, termindato }: Props) => {
    const intl = useIntl();

    const { control } = useFormContext<Dokumentasjon>();

    return (
        <>
            <RhfDatepicker
                name="terminbekreftelsedato"
                control={control}
                label={<FormattedMessage id="TerminDokPanel.Terminbekreftelsesdato" />}
                minDate={dayjs(termindato).subtract(18, 'week').subtract(3, 'day')}
                maxDate={dayjs()}
            />
            <FileUploader
                label={intl.formatMessage({ id: 'TerminDokPanel.Vedlegg.Terminbekreftelse' })}
                description={<FormattedMessage id="TerminDokPanel.Vedlegg.Terminbekreftelse.Info" />}
                attachmentType={AttachmentType.TERMINBEKREFTELSE}
                skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                existingAttachments={attachments}
                updateAttachments={updateAttachments}
                uploadPath={API_URLS.sendVedlegg}
            />
        </>
    );
};
