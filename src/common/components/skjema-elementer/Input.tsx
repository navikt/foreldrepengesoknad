import * as React from 'react';
import { NavFrontendInputProps as NFInputProps } from 'nav-frontend-skjema';
import { SkjemaelementProps } from 'common/components/skjema-elementer/common';
import { guid } from 'nav-frontend-js-utils';
import InputLabel from 'common/components/skjema-elementer/Label';
import ValiderbarInput from 'common/lib/validation/ValiderbarInput';

type InputWrapperProps = SkjemaelementProps & NFInputProps;

const Input: React.StatelessComponent<InputWrapperProps> = (
    props: InputWrapperProps
) => {
    const id = props.id || guid();
    return (
        <ValiderbarInput
            {...props}
            id={id}
            label={
                <InputLabel
                    label={props.label}
                    infotekst={props.infotekst}
                    inputId={id}
                />
            }
        />
    );
};

export default Input;
