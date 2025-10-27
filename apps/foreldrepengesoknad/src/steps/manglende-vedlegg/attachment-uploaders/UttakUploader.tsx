import { API_URLS } from 'api/queries';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { dateToISOString } from 'utils/dateUtils';
import { addMetadata, lagSendSenereDokument } from 'utils/vedleggUtils';

import { BodyLong } from '@navikt/ds-react';

import { getSaveAttachmentFetch } from '@navikt/fp-api';
import { NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import { PeriodelisteItemHeader } from '@navikt/fp-uttaksplan';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    skjemanummer: GyldigeSkjemanummer;
    labelText: string;
    description: string | React.ReactNode;
    attachmentType: AttachmentType;
}

export const UttakUploader = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
    skjemanummer,
    labelText,
    description,
    attachmentType,
}: Props) => {
    const { watch } = useFormContext<ManglendeVedleggFormData>();
    const formAttachments = watch(skjemanummer);

    useEffect(() => {
        if (formAttachments.length === 0) {
            const init = lagSendSenereDokument(attachmentType, skjemanummer);
            const sendSenereVedlegg = addMetadata(init, {
                type: AttachmentMetadataType.UTTAK,
                perioder: perioder.map((p) => ({
                    fom: dateToISOString(p.tidsperiode.fom),
                    tom: dateToISOString(p.tidsperiode.tom),
                })),
            });

            updateAttachments([sendSenereVedlegg]);
        }
    }, [updateAttachments, perioder, formAttachments, attachmentType, skjemanummer]);

    return (
        <FileUploader
            label={labelText}
            description={
                <>
                    <BodyLong>{description}</BodyLong>
                    {perioder.map((p) => {
                        return (
                            <div key={p.id} className="my-4">
                                <PeriodelisteItemHeader
                                    periode={p}
                                    erAleneOmOmsorg={false}
                                    erFarEllerMedmor={true}
                                    navnPåForeldre={navnPåForeldre}
                                    familiehendelsesdato={dayjs(familiehendelsesdato).toDate()}
                                    termindato={termindato ? dayjs(termindato).toDate() : undefined}
                                    situasjon={situasjon}
                                    melding={undefined}
                                />
                            </div>
                        );
                    })}
                </>
            }
            attachmentType={attachmentType}
            skjemanummer={skjemanummer}
            existingAttachments={attachments}
            updateAttachments={(vedlegg) => {
                const attachmentsMedMetadata = vedlegg.map((a) =>
                    addMetadata(a, {
                        type: AttachmentMetadataType.UTTAK,
                        perioder: perioder.map((p) => ({
                            fom: dateToISOString(p.tidsperiode.fom),
                            tom: dateToISOString(p.tidsperiode.tom),
                        })),
                    }),
                );

                return updateAttachments(attachmentsMedMetadata);
            }}
            saveAttachment={getSaveAttachmentFetch(API_URLS.sendVedlegg)}
        />
    );
};
