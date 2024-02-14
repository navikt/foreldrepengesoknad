import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { isPeriodeMedMorInnleggelse } from '../util';
import MorInnlagtUploader from '../periode-attachment-uploaders/MorInnlagtUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const MorInnlagtDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const morInnlagtPerioder = perioder.filter(isPeriodeMedMorInnleggelse);

    if (morInnlagtPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <MorInnlagtUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_MOR)}
                perioder={morInnlagtPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default MorInnlagtDokumentasjon;
