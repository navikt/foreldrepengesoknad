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
    erFarEllerMedmor: boolean;
}

export const FarForSykDokumentasjonNy = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    return (
        <UttakUploaderNy
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_SYKDOM_FAR)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            skjemanummer={Skjemanummer.DOK_SYKDOM_FAR}
            labelText={intl.formatMessage(
                { id: 'manglendeVedlegg.farForSyk.label' },
                {
                    navn: navnPåForeldre.farMedmor,
                    erFarEllerMedmor,
                },
            )}
            description={intl.formatMessage(
                { id: 'manglendeVedlegg.farForSyk.description' },
                {
                    navn: navnPåForeldre.farMedmor,
                    erFarEllerMedmor,
                },
            )}
            attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
        />
    );
};
