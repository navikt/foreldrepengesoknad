import React from 'react';
import { useIntl } from 'react-intl';

import { Block, NavnPåForeldre, Periode, Situasjon, intlUtils } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

import UttakUploader from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
}

const MorIntroduksjonsprogrammetDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <UttakUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET)}
                perioder={perioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
                skjemanummer={Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET}
                labelText={intlUtils(intl, 'manglendeVedlegg.introduksjonsprogram.tittel')}
                description={intlUtils(intl, 'manglendeVedlegg.introduksjonsprogram.description', {
                    navn: navnPåForeldre.mor,
                })}
                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
            />
        </Block>
    );
};

export default MorIntroduksjonsprogrammetDokumentasjon;
