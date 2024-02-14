import { Block, NavnPåForeldre, Periode, Situasjon, isUtsettelseBarnInnlagt } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
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

const BarnInnlagtDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const barnInnlagtPerioder = perioder.filter(isUtsettelseBarnInnlagt);

    if (barnInnlagtPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <UttakUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_BARN)}
                perioder={barnInnlagtPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
                skjemanummer={Skjemanummer.DOK_INNLEGGELSE_BARN}
                labelText="Dokumentasjon på at barnet er innlagt"
                description="Du må laste opp dokumentasjon på at barnet er innlagt på sykehus"
                attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
            />
        </Block>
    );
};

export default BarnInnlagtDokumentasjon;
