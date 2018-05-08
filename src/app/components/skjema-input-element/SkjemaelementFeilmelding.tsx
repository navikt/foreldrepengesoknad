import * as React from 'react';
import { Feil } from './types';

interface Props {
    feil?: Feil;
}

const SkjemaelementFeilmelding: React.StatelessComponent<Props> = ({
    feil
}) => (
    <div role="alert" aria-live="assertive">
        {feil && (
            <div className="skjemaelement__feilmelding">{feil.feilmelding}</div>
        )}
    </div>
);

export default SkjemaelementFeilmelding;
