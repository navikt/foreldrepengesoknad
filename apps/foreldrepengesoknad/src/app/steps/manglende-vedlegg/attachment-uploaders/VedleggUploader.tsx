import React, { FunctionComponent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IntlShape } from 'react-intl';

import { getSaveAttachment } from '@navikt/fp-api';
import { addMetadata, lagSendSenereDokument } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, InnsendingsType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';

import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';

type Perioder = Array<{
    fom: string;
    tom: string;
}>;

export const formaterPerioderForVisning = (perioder: Perioder, intl: IntlShape) => {
    return perioder
        .map((p, index) => {
            const periode = `${p.fom}-${p.tom}`;
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
    metadataType: AttachmentMetadataType;
    perioder?: Perioder;
}

const VedleggUploader: FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    skjemanummer,
    labelText,
    description,
    attachmentType,
    metadataType,
    perioder = [],
}) => {
    const { watch } = useFormContext<ManglendeVedleggFormData>();
    const formAttachments = watch(skjemanummer);

    useEffect(() => {
        if (formAttachments.length === 0) {
            const init = lagSendSenereDokument(attachmentType, skjemanummer);
            const sendSenereVedlegg = addMetadata(init, {
                type: metadataType,
                perioder:
                    perioder.length > 0
                        ? perioder.map((p) => ({
                              fom: p.fom,
                              tom: p.tom,
                          }))
                        : undefined,
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
            existingAttachments={attachments.filter((a) => a.innsendingsType !== InnsendingsType.SEND_SENERE)}
            updateAttachments={(vedlegg) => {
                const attachmentsMedMetadata = vedlegg.map((a) =>
                    addMetadata(a, {
                        type: metadataType,
                        perioder:
                            perioder.length > 0
                                ? perioder.map((p) => ({
                                      fom: p.fom,
                                      tom: p.tom,
                                  }))
                                : undefined,
                    }),
                );

                return updateAttachments(attachmentsMedMetadata);
            }}
            saveAttachment={getSaveAttachment('foreldrepenger')}
        />
    );
};

export default VedleggUploader;
