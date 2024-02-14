import { Block, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { isPeriodeMedFarForSyk } from '../util';
import FarForSykUploader from '../attachment-uploaders/FarForSykUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const FarForSykDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const farForSykPerioder = perioder.filter(isPeriodeMedFarForSyk);

    if (farForSykPerioder.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <FarForSykUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_SYKDOM_FAR)}
                perioder={farForSykPerioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default FarForSykDokumentasjon;
