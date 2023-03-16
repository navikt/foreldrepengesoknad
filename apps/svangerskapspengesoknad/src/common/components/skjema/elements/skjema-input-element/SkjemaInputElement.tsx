import React from 'react';
const { guid } = require('nav-frontend-js-utils');
import classnames from 'classnames';
import SkjemaelementFeilmelding from 'common/lib/validation/errors/SkjemaelementFeilmelding';
import { Label } from '@navikt/ds-react';

export interface Props {
    label: string | React.ReactNode;
    infoboksTekst?: string | React.ReactNode;
    feil?: any;
    id?: string;
    children: React.ReactNode;
}

const SkjemaInputElement: React.FunctionComponent<Props> = (props: Props) => {
    const { label, id, feil, children } = props;
    const inputId = id || guid();
    return (
        <div
            className={classnames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined,
            })}
        >
            {typeof label === 'string' ? (
                <label className="skjemaelement__label" htmlFor={inputId}>
                    <Label>{label}</Label>
                </label>
            ) : (
                label
            )}
            <div
                className={classnames({
                    'skjema__feilomrade--harFeil': feil !== undefined,
                })}
            >
                {children}
            </div>
            <SkjemaelementFeilmelding feil={feil} />
        </div>
    );
};

export default SkjemaInputElement;
