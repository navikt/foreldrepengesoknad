import { AxiosInstanceAPI } from 'api/AxiosInstance';
import dayjs from 'dayjs';
import React, { FunctionComponent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { dateToISOString } from 'utils/dateUtils';
import { addMetadata, lagSendSenereDokument } from 'utils/vedleggUtils';

import { BodyLong } from '@navikt/ds-react';

import { getSaveAttachment } from '@navikt/fp-api';
import { NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import { bemUtils } from '@navikt/fp-utils';
import { PeriodelisteItemHeader } from '@navikt/fp-uttaksplan';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';
import './periode-attachment-uploader.css';

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

const UttakUploader: FunctionComponent<Props> = ({
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
}) => {
    const bem = bemUtils('periode-attachment-uploader');

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
                            <div key={p.id} className={bem.block}>
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
            saveAttachment={getSaveAttachment(AxiosInstanceAPI(), 'foreldrepenger')}
        />
    );
};

export default UttakUploader;
