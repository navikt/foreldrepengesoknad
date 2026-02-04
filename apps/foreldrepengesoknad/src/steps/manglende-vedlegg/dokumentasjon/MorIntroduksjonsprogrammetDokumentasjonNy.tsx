import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { NavnPåForeldre } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { UttakUploaderNy } from '../attachment-uploaders/UttakUploaderNy';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
}

export const MorIntroduksjonsprogrammetDokumentasjonNy = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
}: Props) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    return (
        <UttakUploaderNy
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            skjemanummer={Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.introduksjonsprogram.tittel' })}
            description={intl.formatMessage(
                { id: 'manglendeVedlegg.introduksjonsprogram.description' },
                {
                    navn: navnPåForeldre.mor,
                },
            )}
            attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
        />
    );
};
