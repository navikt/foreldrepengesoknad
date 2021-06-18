import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

const initialMorFødselValues: MorFødselFormData = {
    [MorFødselFormField.dekningsgrad]: '',
    [MorFødselFormField.permisjonStartdato]: '',
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: false,
};

export const getInitialMorFødselValues = (): MorFødselFormData => {
    return initialMorFødselValues;
};
