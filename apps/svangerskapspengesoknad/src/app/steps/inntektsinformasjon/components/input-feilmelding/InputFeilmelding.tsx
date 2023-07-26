import { ErrorMessage } from '@navikt/ds-react';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import './input-feilmelding.css';
import { IntlShape } from 'react-intl';
import { ReactNode } from 'react';
import { hasValue } from 'app/utils/validationUtils';

export const getInputFeltFeil = (
    submitClicked: boolean,
    fieldName: string,
    fieldValue: any,
    intl: IntlShape,
    valideringsfeil?: string
): ReactNode => {
    if (valideringsfeil !== undefined) {
        return <InputFeilmelding feilmelding={valideringsfeil} />;
    } else if (submitClicked && !valideringsfeil && !hasValue(fieldValue)) {
        return <InputFeilmelding feilmelding={intlUtils(intl, `valideringsfeil.${fieldName}.påkrevd`)} />;
    }
    return null;
};

interface FeilmeldingProps {
    feilmelding: string;
}
export const InputFeilmelding: React.FunctionComponent<FeilmeldingProps> = ({ feilmelding }) => {
    const bem = bemUtils('input-feilmelding');
    return (
        <div className={bem.block}>
            <ErrorMessage>{feilmelding}</ErrorMessage>
        </div>
    );
};

export default InputFeilmelding;
