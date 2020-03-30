import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { SkjemaelementFeil, ValidatorFailText } from 'common/lib/validation/types';

export interface Props {
    feil?: ValidatorFailText;
}

const renderFeil = (feil: ValidatorFailText, intl: InjectedIntl): SkjemaelementFeil => {
    const msg = typeof feil === 'string' ? feil : intl.formatMessage({ id: feil.intlKey }, feil.values);

    return <div className="skjemaelement__feilmelding">{msg}</div>;
};

class SkjemaelementFeilmelding extends React.Component<Props & InjectedIntlProps> {
    render() {
        const { feil, intl } = this.props;
        return (
            <div style={{ color: '#ba3a26', fontWeight: 600 }} role="alert" aria-live="assertive">
                {feil && renderFeil(feil, intl)}
            </div>
        );
    }
}

export default injectIntl(SkjemaelementFeilmelding);
