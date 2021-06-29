import * as React from 'react';
import { ArrayHelpers, useFormikContext } from 'formik';
import FormikFileInput from '@navikt/sif-common-formik/lib/components/formik-file-input/FormikFileInput';
import { Block, intlUtils, PictureScanningGuide, UtvidetInformasjon } from '@navikt/fp-common';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import AttachmentApi from 'app/api/attachmentApi';
import AttachmentList from '../attachment/AttachmentList';
import { isAttachmentWithError, mapFileToAttachment } from '../attachment/attachmentUtils';
import { deleteAttachment } from 'app/utils/globalUtil';
import { useIntl } from 'react-intl';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

export interface Props {
    attachments: Attachment[];
    name: any;
    label: string;
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    onFileInputClick?: () => void;
}

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];

const getPendingAttachmentFromFile = (
    file: File,
    attachmentType: AttachmentType,
    skjemanummer: Skjemanummer
): Attachment => {
    const newAttachment = mapFileToAttachment(file, attachmentType, skjemanummer);
    newAttachment.pending = true;
    return newAttachment;
};

const attachmentUploadHasFailed = ({ pending, uploaded, file: { name } }: Attachment): boolean =>
    (!pending && !uploaded) || !fileExtensionIsValid(name);

const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
    return VALID_EXTENSIONS.includes(`.${ext!.toLowerCase()}`);
};

const FormikFileUploader: React.FunctionComponent<Props> = ({
    attachments,
    name,
    onFileInputClick,
    attachmentType,
    skjemanummer,
    ...otherProps
}) => {
    const intl = useIntl();
    const { values, setFieldValue } = useFormikContext<any>();

    async function uploadAttachment(attachment: Attachment) {
        try {
            const response = await AttachmentApi.saveAttachment(attachment);
            attachment = setAttachmentPendingToFalse(attachment);
            attachment.url = response.headers.location;
            attachment.uploaded = true;
            attachment.uuid = response.data;
        } catch (error) {
            setAttachmentPendingToFalse(attachment);
        }
    }

    async function uploadAttachments(allAttachments: Attachment[], replaceFn: FieldArrayReplaceFn) {
        for (const attachment of allAttachments) {
            await uploadAttachment(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        }

        const failedAttachments = [...allAttachments.filter(attachmentUploadHasFailed)];
        updateFailedAttachments(allAttachments, failedAttachments, replaceFn);
    }

    function updateFailedAttachments(
        allAttachments: Attachment[],
        failedAttachments: Attachment[],
        replaceFn: FieldArrayReplaceFn
    ) {
        failedAttachments.forEach((attachment) => {
            attachment = setAttachmentPendingToFalse(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        });
    }

    function updateAttachmentListElement(atts: Attachment[], attachment: Attachment, replaceFn: FieldArrayReplaceFn) {
        replaceFn(atts.indexOf(attachment), attachment);
    }

    function setAttachmentPendingToFalse(attachment: Attachment) {
        attachment.pending = false;
        return attachment;
    }

    function addPendingAttachmentToFieldArray(file: File, pushFn: FieldArrayPushFn) {
        const attachment = getPendingAttachmentFromFile(file, attachmentType, skjemanummer);
        pushFn(attachment);
        return attachment;
    }

    return (
        <>
            <Block padBottom="l">
                <FormikFileInput
                    name={name}
                    acceptedExtensions={VALID_EXTENSIONS.join(', ')}
                    onFilesSelect={async (files: File[], { push, replace }: ArrayHelpers) => {
                        const atts = files.map((file) => addPendingAttachmentToFieldArray(file, push));
                        await uploadAttachments([...values[name], ...atts], replace);
                    }}
                    onClick={onFileInputClick}
                    {...otherProps}
                />
            </Block>
            <Block padBottom="l" visible={attachments.length > 0}>
                <AttachmentList
                    attachments={attachments.filter((a) => !isAttachmentWithError(a))}
                    showFileSize={true}
                    onDelete={(file: Attachment) => {
                        setFieldValue(name, deleteAttachment(attachments, file));
                    }}
                />
            </Block>
            <Block>
                <UtvidetInformasjon apneLabel={intlUtils(intl, 'pictureScanninGuide.apneLabel')}>
                    <PictureScanningGuide />
                </UtvidetInformasjon>
            </Block>
        </>
    );
};

export default FormikFileUploader;
