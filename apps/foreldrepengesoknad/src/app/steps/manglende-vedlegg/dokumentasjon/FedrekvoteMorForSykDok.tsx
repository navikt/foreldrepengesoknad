import { Block, NavnPåForeldre, Periode, Situasjon, isUttakAvFedrekvoteMorForSyk } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import FedrekvoteMorForSykUploader from '../periode-attachment-uploaders/FedrekvoteMorForSykUploader';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const FedrekvoteMorForSykDok: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const fedrekvoteMorForSykPerioder = perioder.filter(isUttakAvFedrekvoteMorForSyk);

    if (fedrekvoteMorForSykPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <FedrekvoteMorForSykUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_MOR)}
                perioder={fedrekvoteMorForSykPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default FedrekvoteMorForSykDok;
