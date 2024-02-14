import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { isPeriodeMedMorForSyk } from '../util';
import MorForSykUploader from '../periode-attachment-uploaders/MorForSykUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const MorForSykDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const morInnlagtPerioder = perioder.filter(isPeriodeMedMorForSyk);

    if (morInnlagtPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <MorForSykUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_SYKDOM_MOR)}
                perioder={morInnlagtPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default MorForSykDokumentasjon;
