import React from 'react';
import { useIntl } from 'react-intl';

import { Block, NavnPåForeldre, Periode, Situasjon, intlUtils } from '@navikt/fp-common';
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

const MorJobberDokumentasjon: React.FunctionComponent<Props> = ({
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
                updateAttachments={updateAttachments(Skjemanummer.DOK_ARBEID_MOR)}
                perioder={perioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
                skjemanummer={Skjemanummer.DOK_ARBEID_MOR}
                labelText={intlUtils(intl, 'manglendeVedlegg.morJobber.label')}
                description={intlUtils(intl, 'manglendeVedlegg.morJobber.description', { navn: navnPåForeldre.mor })}
                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
            />
        </Block>
    );
};

export default MorJobberDokumentasjon;
