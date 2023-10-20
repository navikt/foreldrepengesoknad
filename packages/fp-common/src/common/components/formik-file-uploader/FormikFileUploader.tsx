import { useState } from 'react';
import { ArrayHelpers, useFormikContext } from 'formik';
import { FormikFileInput } from '@navikt/sif-common-formik-ds/lib';
import AttachmentList from '../attachment/AttachmentList';
import { IntlShape, useIntl } from 'react-intl';
import { BodyShort, ReadMore } from '@navikt/ds-react';
import { Attachment, AttachmentType, Skjemanummer } from '../../types';
import { isAttachmentWithError, mapFilTilVedlegg } from '../../utils/vedleggUtils';
import intlUtils from '../../utils/intlUtils';
import Block from '../block/Block';
import { deleteAttachment } from '../../utils/globalUtil';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';

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
    saveAttachment: (vedlegg: Attachment) => void;
}

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
const MAX_FIL_STØRRELSE_KB = 16777;
const KILOBYTES_IN_BYTE = 0.0009765625;

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
    const filesizeInKb = filesizeInB * KILOBYTES_IN_BYTE;
    return filesizeInKb <= MAX_FIL_STØRRELSE_KB;
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
                        maxStørrelse: MAX_FIL_STØRRELSE_KB,
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
    saveAttachment: any,
    intl: IntlShape,
): void => {
    alleNyeVedlegg.forEach(async (vedlegg, index) => {
        try {
            const response = await saveAttachment(vedlegg);
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
    saveAttachment,
    ...otherProps
}) => {
    const intl = useIntl();
    const { setFieldValue } = useFormikContext<any>();
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <>
            <Block padBottom="l">
                <FormikFileInput
                    legend={legend}
                    buttonLabel={label}
                    name={name}
                    accept={VALID_EXTENSIONS.join(', ')}
                    onFilesSelect={(files: File[], { push, replace, remove }: ArrayHelpers) => {
                        const alleNyeVedlegg = mapFilerTilPendingVedlegg(files, attachmentType, skjemanummer);
                        const alleNyeGyldigeVedlegg = sjekkVedlegg(alleNyeVedlegg, setErrors, intl);
                        alleNyeGyldigeVedlegg.forEach((nyttVedlegg) => push(nyttVedlegg));
                        lastOppVedlegg(
                            alleNyeGyldigeVedlegg,
                            replace,
                            remove,
                            setErrors,
                            attachments.length,
                            saveAttachment,
                            intl,
                        );
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
                <ReadMore header={intlUtils(intl, 'pictureScanninGuide.apneLabel')}>
                    <PictureScanningGuide backgroundColor="blue" />
                </ReadMore>
            </Block>
        </>
    );
};

export default FormikFileUploader;
