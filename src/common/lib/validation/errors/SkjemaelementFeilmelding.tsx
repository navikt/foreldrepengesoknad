import * as React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import { SkjemaelementFeil, ValidatorFailText } from 'common/lib/validation/types';

export interface Props {
    feil?: ValidatorFailText;
}

const renderFeil = (feil: ValidatorFailText, intl: IntlShape): SkjemaelementFeil => {
    const msg = typeof feil === 'string' ? feil : intl.formatMessage({ id: feil.intlKey }, feil.values);

    return <div className="skjemaelement__feilmelding">{msg}</div>;
};

const SkjemaelementFeilmelding: React.FunctionComponent<Props> = ({ feil }) => {
    const intl = useIntl();

    return (
        <div style={{ color: '#ba3a26', fontWeight: 600 }} role="alert" aria-live="assertive">
            {feil && renderFeil(feil, intl)}
        </div>
    );
};

export default SkjemaelementFeilmelding;
