import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import {
    Attachment,
    NavnPåForeldre,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { UttakUploader } from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
}

export const BarnInnlagtDokumentasjon = ({ attachments, updateAttachments, perioder, navnPåForeldre }: Props) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    return (
        <UttakUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_BARN)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            skjemanummer={Skjemanummer.DOK_INNLEGGELSE_BARN}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.barnInnlagt.label' })}
            description={intl.formatMessage({ id: 'manglendeVedlegg.barnInnlagt.description' })}
            attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
        />
    );
};
