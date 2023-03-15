import React, { useState } from 'react';
import { ArrayHelpers } from 'formik';
import { Block, intlUtils } from '@navikt/fp-common';
import { IntlShape, useIntl } from 'react-intl';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { AttachmentType } from 'app/types/AttachmentType';
import { Attachment } from 'app/types/Attachment';
import { FormikFileInput } from '@navikt/sif-common-formik-ds/lib';
import { BodyShort } from '@navikt/ds-react';
import { mapFilTilVedlegg } from 'app/utils/attachmentUtils';
import AttachmentApi from 'app/api/attachmentApi';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

export interface Props {
    attachmentType: AttachmentType;
    attachments: Attachment[];
    buttonLabel: string;
    label: string;
    legend: string;
    name: any;
    onFileInputClick?: () => void;
    skjemanummer: Skjemanummer | 'default';
    validateHasAttachment: boolean;
}

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
const MAX_FIL_STØRRELSE_KB = 16777;
const KILOBYTES_IN_BYTE = 0.0009765625;

const mapFilerTilPendingVedlegg = (
    filer: File[],
    attachmentType: AttachmentType,
    skjemanummer: Skjemanummer | 'default'
): Attachment[] | undefined => {
    if (skjemanummer === 'default') {
        return undefined;
    }
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
    legend,
    buttonLabel,
    validateHasAttachment,
    ...otherProps
}) => {
    const intl = useIntl();
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <>
            <Block padBottom="l">
                <FormikFileInput
                    name={name}
                    accept={VALID_EXTENSIONS.join(', ')}
                    onFilesSelect={(files: File[], { push, replace, remove }: ArrayHelpers) => {
                        const alleNyeVedlegg = mapFilerTilPendingVedlegg(files, attachmentType, skjemanummer);
                        const alleNyeGyldigeVedlegg = alleNyeVedlegg
                            ? sjekkVedlegg(alleNyeVedlegg, setErrors, intl)
                            : undefined;
                        if (alleNyeGyldigeVedlegg !== undefined) {
                            alleNyeGyldigeVedlegg.forEach((nyttVedlegg) => push(nyttVedlegg));
                            lastOppVedlegg(alleNyeGyldigeVedlegg, replace, remove, setErrors, attachments.length, intl);
                        }
                    }}
                    validate={() => {
                        if (skjemanummer !== 'default' && validateHasAttachment && attachments.length === 0) {
                            return 'Du må laste opp minst ett dokument';
                        }

                        return undefined;
                    }}
                    legend={legend}
                    buttonLabel={buttonLabel}
                    onClick={onFileInputClick}
                    error={
                        errors.length > 0
                            ? errors.map((error) => <BodyShort key={error}>{error}</BodyShort>)
                            : undefined
                    }
                    {...otherProps}
                />
            </Block>
        </>
    );
};

export default FormikFileUploader;
