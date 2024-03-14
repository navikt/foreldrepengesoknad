import React, { FunctionComponent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Label, VStack } from '@navikt/ds-react';

import { getSaveAttachment } from '@navikt/fp-api';
import { addMetadata, lagSendSenereDokument } from '@navikt/fp-common';
import { AttachmentType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { AttachmentMetadataType } from '@navikt/fp-types/src/AttachmentMetadata';
import { FileUploader } from '@navikt/fp-ui';

import Environment from 'app/Environment';
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
                existingAttachments={attachments}
                updateAttachments={(attachments) => {
                    const attachmentsMedMetadata = attachments.map((a) =>
                        addMetadata(a, {
                            type: metadataType,
                        }),
                    );

                    return updateAttachments(attachmentsMedMetadata);
                }}
                saveAttachment={getSaveAttachment(Environment.REST_API_URL, 'foreldrepenger')}
            />
        </VStack>
    );
};

export default VedleggUploader;
