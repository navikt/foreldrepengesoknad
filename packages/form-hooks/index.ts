export { RhfForm } from './src/form-wrappers/RhfForm';
export { RhfCheckbox } from './src/form-wrappers/RhfCheckbox';
export { RhfCheckboxGroup } from './src/form-wrappers/RhfCheckboxGroup';
export { RhfDatepicker } from './src/form-wrappers/RhfDatepicker';
export { RhfDateRangepicker } from './src/form-wrappers/RhfDateRangepicker';
export { RhfRadioGroup } from './src/form-wrappers/RhfRadioGroup';
export { RhfSelect } from './src/form-wrappers/RhfSelect';
export { RhfTextField } from './src/form-wrappers/RhfTextField';
export { RhfTextarea } from './src/form-wrappers/RhfTextarea';
export { RhfNumericField } from './src/form-wrappers/RhfNumericField';
export { RhfConfirmationPanel } from './src/form-wrappers/RhfConfirmationPanel';
export { StepButtonsHookForm } from './src/StepButtonsHookForm';
export { ErrorMessageHookForm } from './src/error/ErrorMessageHookForm';
export { ErrorSummaryHookForm } from './src/error/ErrorSummaryHookForm';

import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const formHookMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};
