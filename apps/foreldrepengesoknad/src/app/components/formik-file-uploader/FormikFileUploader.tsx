import { ArrayHelpers, useFormikContext } from 'formik';
import { useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Block, deleteAttachment, intlUtils, isAttachmentWithError, mapFilTilVedlegg } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { FormikFileInput } from '@navikt/fp-formik';
import { Attachment } from '@navikt/fp-types';
import { ScanDocumentInfo } from '@navikt/fp-ui';

import AttachmentApi from 'app/api/attachmentApi';

import AttachmentList from '../attachment/AttachmentList';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

export interface Props {
    attachments: Attachment[];
    name: any;
    label: string;
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    legend: string;
    onFileInputClick?: () => void;
}

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
const MAX_FIL_STØRRELSE_MB = 16;
const MAX_FIL_STØRRELSE_BYTES = MAX_FIL_STØRRELSE_MB * 1024 * 1024;

const mapFilerTilPendingVedlegg = (
    filer: File[],
    attachmentType: AttachmentType,
    skjemanummer: Skjemanummer,
): Attachment[] => {
    return filer.map((fil) => {
        const nyttVedlegg = mapFilTilVedlegg(fil, attachmentType, skjemanummer);
        nyttVedlegg.pending = true;
        return nyttVedlegg;
    });
};

const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
    return VALID_EXTENSIONS.includes(`.${ext!.toLowerCase()}`);
};

const fileSizeIsValid = (filesizeInB: number): boolean => {
    return filesizeInB <= MAX_FIL_STØRRELSE_BYTES;
};

const sjekkVedlegg = (
    alleNyeVedlegg: Attachment[],
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    intl: IntlShape,
): Attachment[] => {
    return alleNyeVedlegg.filter((vedlegg) => {
        const erGyldigFiltype = fileExtensionIsValid(vedlegg.filename);
        if (!erGyldigFiltype) {
            setErrors((oldState) =>
                oldState.concat(intlUtils(intl, 'vedlegg.feilmelding.ugyldig.type', { filename: vedlegg.filename })),
            );
        }
        const erGyldigFilstørrelse = fileSizeIsValid(vedlegg.filesize);
        if (!erGyldigFilstørrelse) {
            setErrors((oldState) =>
                oldState.concat(
                    intlUtils(intl, 'vedlegg.feilmelding.ugyldig.størrelse', {
                        filename: vedlegg.filename,
                        maxStørrelse: MAX_FIL_STØRRELSE_MB,
                    }),
                ),
            );
        }
        return erGyldigFiltype && erGyldigFilstørrelse;
    });
};

const lastOppVedlegg = (
    alleNyeVedlegg: Attachment[],
    replaceFn: FieldArrayReplaceFn,
    removeFn: FieldArrayRemoveFn,
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    antallEksisterendeVedlegg: number,
    intl: IntlShape,
): void => {
    alleNyeVedlegg.forEach(async (vedlegg, index) => {
        try {
            const response = await AttachmentApi.saveAttachment(vedlegg);
            vedlegg.pending = false;
            vedlegg.url = response.headers.location;
            vedlegg.uploaded = true;
            vedlegg.uuid = response.data;
            replaceFn(antallEksisterendeVedlegg + index, vedlegg);
        } catch (error) {
            removeFn(antallEksisterendeVedlegg + index);
            setErrors((oldState) =>
                oldState.concat(
                    intlUtils(intl, 'vedlegg.feilmelding.opplasting.feilet', { filename: vedlegg.filename }),
                ),
            );
        }
    });
};

const FormikFileUploader: React.FunctionComponent<Props> = ({
    attachments,
    name,
    onFileInputClick,
    attachmentType,
    skjemanummer,
    label,
    legend,
    ...otherProps
}) => {
    const intl = useIntl();
    const { setFieldValue } = useFormikContext<any>();
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <>
            <Block padBottom="xl">
                <FormikFileInput
                    legend={legend}
                    buttonLabel={label}
                    name={name}
                    accept={VALID_EXTENSIONS.join(', ')}
                    onFilesSelect={(files: File[], { push, replace, remove }: ArrayHelpers) => {
                        const alleNyeVedlegg = mapFilerTilPendingVedlegg(files, attachmentType, skjemanummer);
                        const alleNyeGyldigeVedlegg = sjekkVedlegg(alleNyeVedlegg, setErrors, intl);
                        alleNyeGyldigeVedlegg.forEach((nyttVedlegg) => push(nyttVedlegg));
                        lastOppVedlegg(alleNyeGyldigeVedlegg, replace, remove, setErrors, attachments.length, intl);
                    }}
                    onClick={onFileInputClick}
                    error={
                        errors.length > 0
                            ? errors.map((error) => <BodyShort key={error}>{error}</BodyShort>)
                            : undefined
                    }
                    {...otherProps}
                />
            </Block>
            <Block padBottom="xl" visible={attachments.length > 0}>
                <AttachmentList
                    attachments={attachments.filter((a) => !isAttachmentWithError(a))}
                    showFileSize={true}
                    onDelete={(file: Attachment) => {
                        setFieldValue(name, deleteAttachment(attachments, file));
                    }}
                />
            </Block>
            <Block padBottom="l">
                <ScanDocumentInfo />
            </Block>
        </>
    );
};

export default FormikFileUploader;
