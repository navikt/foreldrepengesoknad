import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { isPeriodeMedFarForSyk } from '../util';
import BarnInnlagtUploader from '../attachment-uploaders/BarnInnlagtUploader';

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
    const barnInnlagtPerioder = perioder.filter(isPeriodeMedFarForSyk);

    if (barnInnlagtPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <BarnInnlagtUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_BARN)}
                perioder={barnInnlagtPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default BarnInnlagtDokumentasjon;
