import * as React from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';

export interface Props {
    feil: SkjemaelementFeil;
}

class SkjemaelementFeilmelding extends React.Component<Props> {
    renderFeil() {
        return (
            <div className="skjemaelement__feilmelding">
                {this.props.feil.feilmelding}
            </div>
        );
    }

    render() {
        const { feil } = this.props;
        return (
            <div role="alert" aria-live="assertive">
                {feil && this.renderFeil()}
            </div>
        );
    }
}

export default SkjemaelementFeilmelding;
