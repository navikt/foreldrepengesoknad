import React, { useState } from 'react';
import { ArrayHelpers, useFormikContext } from 'formik';
import FormikFileInput from '@navikt/sif-common-formik/lib/components/formik-file-input/FormikFileInput';
import { Block, intlUtils, PictureScanningGuide, UtvidetInformasjon } from '@navikt/fp-common';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import AttachmentApi from 'app/api/attachmentApi';
import AttachmentList from '../attachment/AttachmentList';
import { deleteAttachment } from 'app/utils/globalUtil';
import { IntlShape, useIntl } from 'react-intl';
import { isAttachmentWithError, mapFilTilVedlegg } from 'app/utils/vedleggUtils';
import { Normaltekst } from 'nav-frontend-typografi';

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
const MAX_FIL_STØRRELSE_KB = 16777;
const KILOBYTES_IN_BYTE = 0.0009765625;

const mapFilerTilPendingVedlegg = (
    filer: File[],
    attachmentType: AttachmentType,
    skjemanummer: Skjemanummer
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
    const filesizeInKb = filesizeInB * KILOBYTES_IN_BYTE;
    return filesizeInKb <= MAX_FIL_STØRRELSE_KB;
};

const sjekkVedlegg = (
    alleNyeVedlegg: Attachment[],
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    intl: IntlShape
): Attachment[] => {
    return alleNyeVedlegg.filter((vedlegg) => {
        const erGyldigFiltype = fileExtensionIsValid(vedlegg.filename);
        if (!erGyldigFiltype) {
            setErrors((oldState) =>
                oldState.concat(intlUtils(intl, 'vedlegg.feilmelding.ugyldig.type', { filename: vedlegg.filename }))
            );
        }
        const erGyldigFilstørrelse = fileSizeIsValid(vedlegg.filesize);
        if (!erGyldigFilstørrelse) {
            setErrors((oldState) =>
                oldState.concat(
                    intlUtils(intl, 'vedlegg.feilmelding.ugyldig.størrelse', {
                        filename: vedlegg.filename,
                        maxStørrelse: MAX_FIL_STØRRELSE_KB,
                    })
                )
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
    intl: IntlShape
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
                    intlUtils(intl, 'vedlegg.feilmelding.opplasting.feilet', { filename: vedlegg.filename })
                )
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
    ...otherProps
}) => {
    const intl = useIntl();
    const { setFieldValue } = useFormikContext<any>();
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <>
            <Block padBottom="l">
                <FormikFileInput
                    name={name}
                    acceptedExtensions={VALID_EXTENSIONS.join(', ')}
                    onFilesSelect={(files: File[], { push, replace, remove }: ArrayHelpers) => {
                        const alleNyeVedlegg = mapFilerTilPendingVedlegg(files, attachmentType, skjemanummer);
                        const alleNyeGyldigeVedlegg = sjekkVedlegg(alleNyeVedlegg, setErrors, intl);
                        alleNyeGyldigeVedlegg.forEach((nyttVedlegg) => push(nyttVedlegg));
                        lastOppVedlegg(alleNyeGyldigeVedlegg, replace, remove, setErrors, attachments.length, intl);
                    }}
                    onClick={onFileInputClick}
                    feil={
                        errors.length > 0
                            ? errors.map((error) => <Normaltekst key={error}>{error}</Normaltekst>)
                            : undefined
                    }
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
