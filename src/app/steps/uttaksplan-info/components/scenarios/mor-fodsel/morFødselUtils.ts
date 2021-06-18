import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

const initialMorFødselValues: MorFødselFormData = {
    [MorFødselFormField.dekningsgrad]: '',
};

export const getInitialMorFødselValues = (): MorFødselFormData => {
    return initialMorFødselValues;
};
