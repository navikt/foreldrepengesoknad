import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { isPeriodeMedFarInnleggelse } from '../util';
import FarInnlagtUploader from '../attachment-uploaders/FarInnlagtUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const FarInnlagtDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const farInnlagtPerioder = perioder.filter(isPeriodeMedFarInnleggelse);

    if (farInnlagtPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <FarInnlagtUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_FAR)}
                perioder={farInnlagtPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default FarInnlagtDokumentasjon;
