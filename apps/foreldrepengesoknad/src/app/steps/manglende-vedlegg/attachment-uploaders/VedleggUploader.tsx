import React, { FunctionComponent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Label, VStack } from '@navikt/ds-react';

import { getSaveAttachment } from '@navikt/fp-api';
import { addMetadata, lagSendSenereDokument } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, InnsendingsType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';

import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    skjemanummer: GyldigeSkjemanummer;
    labelText: string;
    description: string | React.ReactNode;
    attachmentType: AttachmentType;
    metadataType: AttachmentMetadataType;
}

const VedleggUploader: FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
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
            });

            updateAttachments([sendSenereVedlegg]);
        }
    }, [updateAttachments, formAttachments, attachmentType, skjemanummer, metadataType]);

    return (
        <VStack gap="4">
            <Label>{labelText}</Label>
            <BodyLong>{description}</BodyLong>

            <BodyLong>
                <FormattedMessage id="manglendeVedlegg.størrelse" />
            </BodyLong>
            <FileUploader
                attachmentType={attachmentType}
                skjemanummer={skjemanummer}
                existingAttachments={attachments.filter((a) => a.innsendingsType !== InnsendingsType.SEND_SENERE)}
                updateAttachments={(vedlegg) => {
                    const attachmentsMedMetadata = vedlegg.map((a) =>
                        addMetadata(a, {
                            type: metadataType,
                        }),
                    );

                    return updateAttachments(attachmentsMedMetadata);
                }}
                saveAttachment={getSaveAttachment('foreldrepenger')}
            />
        </VStack>
    );
};

export default VedleggUploader;
