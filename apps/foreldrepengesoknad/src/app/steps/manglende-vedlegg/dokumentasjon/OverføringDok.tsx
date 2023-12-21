import { Block, NavnPåForeldre, Periode, Situasjon, isOverføringsperiode } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import OverføringsUploader from '../periode-attachment-uploaders/OverføringsUploader';
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

const OverføringsDok: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const overføringsperioderSomManglerVedlegg = perioder.filter(isOverføringsperiode);

    if (overføringsperioderSomManglerVedlegg.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <OverføringsUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_OVERFØRING_FOR_SYK)}
                perioder={overføringsperioderSomManglerVedlegg}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default OverføringsDok;
