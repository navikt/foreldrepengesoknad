import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import UttakUploader from '../attachment-uploaders/UttakUploader';
import { isPeriodeMedMorKvalprogram } from '../util';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const MorKvalifiseringsprogrammetDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const morKvalPerioder = perioder.filter(isPeriodeMedMorKvalprogram);

    if (morKvalPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <UttakUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM)}
                perioder={morKvalPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
                skjemanummer={Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}
                labelText="Dokumentasjon på at mor deltar i introduksjonsprogrammet"
                description="Du må laste opp dokumentasjon på at mor deltar i introduksjonsprogrammet"
                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
            />
        </Block>
    );
};

export default MorKvalifiseringsprogrammetDokumentasjon;