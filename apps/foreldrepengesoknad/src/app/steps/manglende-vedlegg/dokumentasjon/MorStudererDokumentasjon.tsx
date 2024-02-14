import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import UttakUploader from '../attachment-uploaders/UttakUploader';
import { isPeriodeMedMorStuderer } from '../util';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const MorStudererDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const morStudererPerioder = perioder.filter(isPeriodeMedMorStuderer);

    if (morStudererPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <UttakUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_UTDANNING_MOR)}
                perioder={morStudererPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
                skjemanummer={Skjemanummer.DOK_UTDANNING_MOR}
                labelText="Dokumentasjon på at mor studerer"
                description="Du må laste opp dokumentasjon på at mor studerer"
            />
        </Block>
    );
};

export default MorStudererDokumentasjon;
