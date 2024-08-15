import React from 'react';
import { useIntl } from 'react-intl';

import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
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

const MorKvalifiseringsprogrammetDokumentasjon: React.FunctionComponent<Props> = ({
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
                updateAttachments={updateAttachments(Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM)}
                perioder={perioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
                skjemanummer={Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}
                labelText={intl.formatMessage({ id: 'manglendeVedlegg.kvalifiseringsprogram.tittel' })}
                description={intl.formatMessage(
                    { id: 'manglendeVedlegg.kvalifiseringsprogram.description' },
                    {
                        navn: navnPåForeldre.mor,
                    },
                )}
                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
            />
        </Block>
    );
};

export default MorKvalifiseringsprogrammetDokumentasjon;
