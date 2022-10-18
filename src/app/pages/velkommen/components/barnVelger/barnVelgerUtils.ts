// import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
// import Barn from 'app/context/types/Barn';

// import { RegistrertBarn } from 'app/types/Person';

// import { BarnVelgerFormData, BarnVelgerFormField } from './barnVelgerFormConfig';

// const getInitValues = (): Readonly<BarnVelgerFormData> => ({
//     [BarnVelgerFormField.gjelderAnnetBarn]: false,
//     [BarnVelgerFormField.valgteBarn]: [],
// });

// export const cleanupOmBarnetFormData = (
//     values: BarnVelgerFormData,
//     visibility: QuestionVisibility<BarnVelgerFormField, undefined>
// ): BarnVelgerFormData => {
//     const cleanedData: BarnVelgerFormData = {
//         gjelderAnnetBarn: visibility.isVisible(BarnVelgerFormField.gjelderAnnetBarn) ? values.gjelderAnnetBarn : false,
//         valgteBarn: visibility.isVisible(BarnVelgerFormField.valgteBarn) ? values.valgteBarn : [],
//     };

//     return cleanedData;
// };

// export const mapBarnVelgerFormDataToState = (
//     values: Partial<BarnVelgerFormData>,
//     registrerteBarn: RegistrertBarn[]
// ) => {
//     //TODO
//     console.log(values, registrerteBarn);
// };

// export const getOmBarnetInitialValues = (barn: Barn, registrerteBarn: RegistrertBarn[]): BarnVelgerFormData => {
//     //TODO
//     console.log(barn, registrerteBarn);
//     return getInitValues();
// };
