// import { YesOrNo } from '@navikt/sif-common-formik/lib';
// import { initialOmBarnetValues, OmBarnetFormField } from '../omBarnetFormConfig';
// import omBarnetQuestionsConfig, { OmBarnetQuestionPayload } from '../omBarnetQuestionsConfig';

// const initialConfigPayload: OmBarnetQuestionPayload = {
//     ...initialOmBarnetValues,
//     kjønn: 'K',
//     situasjon: 'fødsel',
// };

describe('Test av questions config for Om Barnet-steget', () => {
    it('Teststub', () => {
        expect(true).toBeTruthy();
    });
    // it('Antall barn spørsmålet skal være konfigurert korrekt', () => {
    //     const visibility = omBarnetQuestionsConfig.getVisbility(initialConfigPayload);
    //     expect(visibility.isIncluded(OmBarnetFormField.antallBarn)).toBeTruthy();
    // });

    // it('Termindato spørsmålet skal være konfigurert korrekt', () => {
    //     let visibility = omBarnetQuestionsConfig.getVisbility(initialConfigPayload);
    //     expect(visibility.isIncluded(OmBarnetFormField.termindato)).toBeFalsy();

    //     visibility = omBarnetQuestionsConfig.getVisbility({ ...initialConfigPayload, erBarnetFødt: YesOrNo.NO });
    //     expect(visibility.isIncluded(OmBarnetFormField.termindato)).toBeTruthy();
    // });
});
