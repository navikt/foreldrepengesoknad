import React, { FunctionComponent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { BodyLong, List } from '@navikt/ds-react';

import { getSaveAttachment } from '@navikt/fp-api';
import { addMetadata, formatDate, lagSendSenereDokument } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';

import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';
import './periode-attachment-uploader.css';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    perioder: Array<{
        fom: string;
        tom: string;
    }>;
    skjemanummer: GyldigeSkjemanummer;
    labelText: string;
    description: string | React.ReactNode;
    attachmentType: AttachmentType;
    metadataType: AttachmentMetadataType;
}

const VedleggMedPeriodeUploader: FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    skjemanummer,
    labelText,
    description,
    attachmentType,
    metadataType,
}) => {
    const { watch } = useFormContext<ManglendeVedleggFormData>();
    const formAttachments = watch(skjemanummer);

    useEffect(() => {
        if (formAttachments.length === 0) {
            const init = lagSendSenereDokument(attachmentType, skjemanummer);
            const sendSenereVedlegg = addMetadata(init, {
                type: metadataType,
                perioder: perioder.map((p) => ({
                    fom: p.fom,
                    tom: p.tom,
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
                    <List as="ul">
                        {perioder.map((p) => {
                            return (
                                <List.Item key={p.fom + p.tom}>
                                    {formatDate(p.fom)} - {formatDate(p.tom)}
                                </List.Item>
                            );
                        })}
                    </List>
                </>
            }
            attachmentType={attachmentType}
            skjemanummer={skjemanummer}
            existingAttachments={attachments}
            updateAttachments={(vedlegg) => {
                const attachmentsMedMetadata = vedlegg.map((a) =>
                    addMetadata(a, {
                        type: metadataType,
                        perioder: perioder.map((p) => ({
                            fom: p.fom,
                            tom: p.tom,
                        })),
                    }),
                );

                return updateAttachments(attachmentsMedMetadata);
            }}
            saveAttachment={getSaveAttachment('foreldrepenger')}
        />
    );
};

export default VedleggMedPeriodeUploader;
