// import { FunctionComponent } from 'react';
// import {
//     DelvisTilretteleggingSubformComponents,
//     DelvisTilretteleggingSubformData,
// } from './delvisTilretteleggingSubformConfig';
// import { getInitialDelvisTilretteleggingFormData } from './delvisTilretteleggingSubformUtils';
// import { delvisTilretteleggingSubformQuestionsConfig } from './delvisTilretteleggingSubformQuestions';
// import DelvisTilretteleggingInput from './DelvisTilretteleggingInput';
// import { TilretteleggingInput } from 'app/types/Tilrettelegging';

// interface Props {
//     erFørsteInput: boolean;
//     selectedTilrettelegging: TilretteleggingInput | undefined;
//     setSelectedTilrettelegging: React.Dispatch<React.SetStateAction<TilretteleggingInput | undefined>>;
//     addTilrettelegging: (inntekt: TilretteleggingInput) => void;
//     editTilrettelegging: (inntektSomEditeres: TilretteleggingInput, oppdatertInntekt: TilretteleggingInput) => void;
//     setLeggTilNyttTilrettelegging: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const DelvisTilretteleggingSubform: FunctionComponent<Props> = ({
//     selectedTilrettelegging,
//     erFørsteInput,
//     setSelectedTilrettelegging,
//     addTilrettelegging,
//     editTilrettelegging,
//     setLeggTilNyttTilrettelegging,
// }) => {
//     return (
//         <DelvisTilretteleggingSubformComponents.FormikWrapper
//             initialValues={getInitialDelvisTilretteleggingFormData(selectedTilrettelegging)}
//             onSubmit={() => undefined}
//             renderForm={({ values: formValues, errors }) => {
//                 const visibility = delvisTilretteleggingSubformQuestionsConfig.getVisbility(
//                     formValues as DelvisTilretteleggingSubformData
//                 );
//                 return (
//                     <DelvisTilretteleggingInput
//                         formValues={formValues}
//                         errors={errors}
//                         selectedDelvisTilrettelegging={selectedTilrettelegging}
//                         erFørsteInput={erFørsteInput}
//                         visibility={visibility}
//                         setSelectedDelvisTilrettelegging={setSelectedTilrettelegging}
//                         addDelvisTilrettelegging={addTilrettelegging}
//                         editDelvisTilrettelegging={editTilrettelegging}
//                         setLeggTilNyttDelvisTilrettelegging={setLeggTilNyttTilrettelegging}
//                     />
//                 );
//             }}
//         />
//     );
// };

// export default DelvisTilretteleggingSubform;
