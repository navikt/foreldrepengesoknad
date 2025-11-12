import { API_URLS } from 'api/queries';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IntlShape } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { addMetadata, lagSendSenereDokument } from 'utils/vedleggUtils';

import { AttachmentType } from '@navikt/fp-constants';
import { getSaveAttachmentFetch } from '@navikt/fp-filopplaster';
import { Attachment, DokumentererType } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import { formatDateShortYear } from '@navikt/fp-utils';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';

type Perioder = Array<{
    fom: string;
    tom?: string;
}>;

export const formaterPerioderForVisning = (perioder: Perioder, intl: IntlShape) => {
    return perioder
        .map((p, index) => {
            const tom = p.tom ? formatDateShortYear(p.tom) : intl.formatMessage({ id: 'VedleggUploader.pågående' });
            const periode = `${formatDateShortYear(p.fom)}-${tom}`;

            if (perioder.length === 1 || index === perioder.length - 1) {
                return periode;
            }

            return index < perioder.length - 2
                ? `${periode}, `
                : `${periode} ${intl.formatMessage({
                      id: 'VedleggUploader.Og',
                  })} `;
        })
        .join('');
};

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    skjemanummer: GyldigeSkjemanummer;
    labelText: string;
    description?: string | React.ReactNode;
    attachmentType: AttachmentType;
    metadataType: DokumentererType;
    perioder?: Perioder;
}

export const VedleggUploader = ({
    attachments,
    updateAttachments,
    skjemanummer,
    labelText,
    description,
    attachmentType,
    metadataType,
    perioder,
}: Props) => {
    const { watch } = useFormContext<ManglendeVedleggFormData>();
    const formAttachments = watch(skjemanummer);

    useEffect(() => {
        if (formAttachments.length === 0) {
            const init = lagSendSenereDokument(attachmentType, skjemanummer);
            const sendSenereVedlegg = addMetadata(init, {
                type: metadataType,
                perioder,
            });

            updateAttachments([sendSenereVedlegg]);
        }
    }, [updateAttachments, formAttachments, attachmentType, skjemanummer, metadataType]);

    return (
        <FileUploader
            label={labelText}
            description={description}
            attachmentType={attachmentType}
            skjemanummer={skjemanummer}
            existingAttachments={attachments}
            updateAttachments={(vedlegg) => {
                const attachmentsMedMetadata = vedlegg.map((a) =>
                    addMetadata(a, {
                        type: metadataType,
                        perioder,
                    }),
                );

                updateAttachments(attachmentsMedMetadata);
            }}
            saveAttachment={getSaveAttachmentFetch(API_URLS.sendVedlegg)}
        />
    );
};
