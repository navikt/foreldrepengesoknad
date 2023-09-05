// 'import { TilretteleggingInput, Tilretteleggingstype } from 'app/types/Tilrettelegging';
// import {
//     DelvisTilretteleggingSubformData,
//     DelvisTilretteleggingSubformField,
// } from './delvisTilretteleggingSubformConfig';

// export const initialDelvisTilretteleggingFormValues: DelvisTilretteleggingSubformData = {
//     [DelvisTilretteleggingSubformField.type]: undefined!,
//     [DelvisTilretteleggingSubformField.fom]: '',
//     [DelvisTilretteleggingSubformField.stillingsprosent]: '',
// };

// export const mapTilrettelegging = (formValues: Partial<DelvisTilretteleggingSubformData>): TilretteleggingInput => {
//     return {
//         stillingsprosent: parseInt(formValues.stillingsprosent!, 10),
//         fom: formValues.fom!,
//         type: formValues.type!,
//     };
// };

// export const getInitialDelvisTilretteleggingFormData = (tilrettelegging: TilretteleggingInput | undefined) => {
//     if (tilrettelegging === undefined) {
//         return { ...initialDelvisTilretteleggingFormValues };
//     }
//     if (tilrettelegging.type === Tilretteleggingstype.DELVIS) {
//         return {
//             ...initialDelvisTilretteleggingFormValues,
//             tilretteleggingsType: Tilretteleggingstype.DELVIS,
//             stillingsprosent: tilrettelegging.stillingsprosent.toString() || '',
//             fom: tilrettelegging.fom || '',
//         };
//     }
//     return {
//         ...initialDelvisTilretteleggingFormValues,
//         tilretteleggingsType: Tilretteleggingstype.HEL,
//         fom: tilrettelegging.fom || '',
//     };
// };
