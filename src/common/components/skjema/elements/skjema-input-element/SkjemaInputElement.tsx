import * as React from 'react';
const { guid } = require('nav-frontend-js-utils');
import classnames from 'classnames';
import SkjemaelementFeilmelding from 'common/lib/validation/errors/SkjemaelementFeilmelding';
import { Feil } from 'common/types';

export interface Props {
    label: string | React.ReactNode;
    feil?: Feil;
    id?: string;
    children: React.ReactNode;
}

const SkjemaInputElement: React.StatelessComponent<Props> = (props: Props) => {
    const { label, id, feil, children } = props;
    const inputId = id || guid();
    return (
        <div
            className={classnames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined
            })}
        >
            {typeof label === 'string' ? (
                <label className="skjemaelement__label" htmlFor={inputId}>
                    {label}
                </label>
            ) : (
                label
            )}
            <div
                className={classnames({
                    'skjema__feilomrade--harFeil': feil !== undefined
                })}
            >
                {children}
            </div>
            {feil && <SkjemaelementFeilmelding feil={feil.feilmelding} />}
        </div>
    );
};

export default SkjemaInputElement;
