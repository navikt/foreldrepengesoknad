import { ManglendeVedleggFormData, ManglendeVedleggFormField } from './manglendeVedleggFormConfig';

export const getInitValues = (): Readonly<ManglendeVedleggFormData> => ({
    [ManglendeVedleggFormField.terminbekreftelseDato]: '',
    [ManglendeVedleggFormField.vedlegg]: [],
});
