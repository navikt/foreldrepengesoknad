import { YesOrNo } from './../types';
import { ValidationFunction } from './types';

export enum ValidateYesOrNoError {
    'yesOrNoIsUnanswered' = 'yesOrNoIsUnanswered',
}

type YesOrNoValidationResult = ValidateYesOrNoError.yesOrNoIsUnanswered | undefined;

const getYesOrNoValidator = (): ValidationFunction<YesOrNoValidationResult> => (value: any) => {
    const isAnswered = value === YesOrNo.YES || value === YesOrNo.NO;
    return isAnswered ? undefined : ValidateYesOrNoError.yesOrNoIsUnanswered;
};

// eslint-disable-next-line import/no-default-export
export default getYesOrNoValidator;
