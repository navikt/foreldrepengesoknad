import * as React from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { ValidatorFailTextIntl } from 'common/lib/validation/types';

export interface Props {
    feil?: SkjemaelementFeil;
}

const renderFeil = (feil: SkjemaelementFeil, intl: InjectedIntl): JSX.Element => {
    let msg;
    if (typeof feil.feilmelding === 'string') {
        msg = feil.feilmelding;
    } else {
        const failTextIntl = feil.feilmelding as ValidatorFailTextIntl;
        msg = intl.formatMessage({ id: failTextIntl.intlKey }, failTextIntl.values);
    }
    return <div className="skjemaelement__feilmelding">{msg}</div>;
};

class SkjemaelementFeilmelding extends React.Component<Props & InjectedIntlProps> {
    render() {
        const { feil, intl } = this.props;
        return (
            <div role="alert" aria-live="assertive">
                {feil && renderFeil(feil, intl)}
            </div>
        );
    }
}

export default injectIntl(SkjemaelementFeilmelding);
