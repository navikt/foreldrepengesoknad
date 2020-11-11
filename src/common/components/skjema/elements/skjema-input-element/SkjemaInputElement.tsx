import * as React from 'react';
// const { guid } = require('nav-frontend-js-utils');
import classnames from 'classnames';
import SkjemaelementFeilmelding from 'common/lib/validation/errors/SkjemaelementFeilmelding';
import { Feil } from 'common/types';

export interface Props {
    inputId: string;
    label: React.ReactNode;
    feil?: Feil;
    children: React.ReactNode;
}

const SkjemaInputElement: React.StatelessComponent<Props> = (props: Props) => {
    const { label, inputId, feil, children } = props;
    return (
        <div
            className={classnames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined,
            })}
        >
            <label className="skjemaelement__label" htmlFor={inputId}>
                {label}
            </label>
            <div
                className={classnames({
                    'skjema__feilomrade--harFeil': feil !== undefined,
                })}
            >
                {children}
            </div>
            {feil && <SkjemaelementFeilmelding feil={feil.feilmelding} />}
        </div>
    );
};

export default SkjemaInputElement;
