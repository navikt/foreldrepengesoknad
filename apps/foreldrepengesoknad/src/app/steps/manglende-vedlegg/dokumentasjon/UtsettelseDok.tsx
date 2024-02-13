import { Block, NavnPåForeldre, Periode, Situasjon, isUtsettelsesperiode } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import { Skjemanummer } from '@navikt/fp-constants';
import UtsettelseUploader from '../periode-attachment-uploaders/UtsettelseUploader';
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

const UtsettelseDok: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const utsettelsePerioderSomManglerVedlegg = perioder.filter(isUtsettelsesperiode);

    if (utsettelsePerioderSomManglerVedlegg.length === 0) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <UtsettelseUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_BARN)}
                perioder={utsettelsePerioderSomManglerVedlegg}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
            />
        </Block>
    );
};

export default UtsettelseDok;
