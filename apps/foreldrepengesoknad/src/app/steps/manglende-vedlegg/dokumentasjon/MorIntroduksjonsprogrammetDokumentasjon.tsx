import React from 'react';

import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';

import UttakUploader from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
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
                labelText="Dokumentasjon på at mor deltar på introduksjonsprogrammet"
                description="Du kan laste opp dokumentasjon på at mor deltar på introduksjonsprogrammet"
                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
            />
        </Block>
    );
};

export default MorIntroduksjonsprogrammetDokumentasjon;
