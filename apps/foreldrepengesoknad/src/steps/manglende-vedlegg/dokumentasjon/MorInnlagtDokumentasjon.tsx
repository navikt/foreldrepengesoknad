import React from 'react';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { NavnPåForeldre, Periode, Periodetype, Situasjon, StønadskontoType } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import UttakUploader from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    erFarEllerMedmor: boolean;
}

const MorInnlagtDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    const morErForSykEllerInnlagtFørsteSeksUker =
        perioder.find((p) => {
            if (p.type === Periodetype.Uttak && p.erMorForSyk === true && p.konto === StønadskontoType.Fedrekvote) {
                return true;
            }

            return false;
        }) !== undefined;

    return (
        <UttakUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_MOR)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            familiehendelsesdato={familiehendelsesdato}
            termindato={termindato}
            situasjon={situasjon}
            skjemanummer={Skjemanummer.DOK_INNLEGGELSE_MOR}
            labelText={
                morErForSykEllerInnlagtFørsteSeksUker
                    ? intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagtEllerSyk.label' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
                    : intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagt.label' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
            }
            description={
                morErForSykEllerInnlagtFørsteSeksUker
                    ? intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagtEllerSyk.description' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
                    : intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagt.description' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
            }
            attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
        />
    );
};

export default MorInnlagtDokumentasjon;
