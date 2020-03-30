import * as React from 'react';
import { SkjemaelementFeil } from '../types';

export interface Props {
    feil: SkjemaelementFeil;
}

class SkjemaelementFeilmelding extends React.Component<Props> {
    render() {
        const { feil } = this.props;

        if (!feil) {
            return null;
        }

        return (
            <div role="alert" aria-live="assertive">
                {feil}
            </div>
        );
    }
}

export default SkjemaelementFeilmelding;
