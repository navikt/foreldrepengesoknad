import * as React from 'react';
import { ArrayHelpers, useFormikContext } from 'formik';
import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import FormikFileInput from '@navikt/sif-common-formik/lib/components/formik-file-input/FormikFileInput';
import { OmBarnetFormData, OmBarnetFormField } from 'app/steps/om-barnet/omBarnetFormConfig';
import { isAttachmentWithError, mapFileToAttachment } from 'common/storage/attachment/components/util';
import AttachmentApi from 'common/storage/api/attachmentApi';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import { Block } from '@navikt/fp-common';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

interface Props {
    attachments: Attachment[];
    name: OmBarnetFormField;
    label: string;
    validate?: any;
    onFileInputClick?: () => void;
}

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];

const getAttachmentFromFile = (file: File, name: string): Attachment => {
    if (name === OmBarnetFormField.terminbekreftelse) {
        return mapFileToAttachment(file, AttachmentType.TERMINBEKREFTELSE, Skjemanummer.TERMINBEKREFTELSE);
    }
    return mapFileToAttachment(file, AttachmentType.OMSORGSOVERTAKELSE, Skjemanummer.OMSORGSOVERTAKELSE);
};

const getPendingAttachmentFromFile = (file: File, name: string): Attachment => {
    const newAttachment = getAttachmentFromFile(file, name);
    newAttachment.pending = true;
    return newAttachment;
};

const attachmentUploadHasFailed = ({ pending, uploaded, file: { name } }: Attachment): boolean =>
    (!pending && !uploaded) || !fileExtensionIsValid(name);

const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
    return VALID_EXTENSIONS.includes(`.${ext!.toLowerCase()}`);
};

let removeFn: FieldArrayRemoveFn;

const FormikFileUploader: React.FunctionComponent<Props> = ({ attachments, name, onFileInputClick, ...otherProps }) => {
    const { values } = useFormikContext<OmBarnetFormData>();

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
        const attachment = getPendingAttachmentFromFile(file, name);
        pushFn(attachment);
        return attachment;
    }

    return (
        <>
            <FormikFileInput
                name={name}
                acceptedExtensions={VALID_EXTENSIONS.join(', ')}
                onFilesSelect={async (files: File[], { push, replace, remove }: ArrayHelpers) => {
                    removeFn = remove;
                    const atts = files.map((file) => addPendingAttachmentToFieldArray(file, push));
                    await uploadAttachments([...(values as any)[name], ...atts], replace);
                }}
                onClick={onFileInputClick}
                {...otherProps}
            />
            <Block margin="xl">
                <AttachmentList
                    attachments={attachments.filter((a) => !isAttachmentWithError(a))}
                    showFileSize={true}
                    onDelete={(file: Attachment) => {
                        removeFn(attachments.indexOf(file));
                    }}
                />
            </Block>
        </>
    );
};

export default FormikFileUploader;
