import * as React from 'react';
import { NavFrontendInputProps as NFInputProps } from 'nav-frontend-skjema';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import InputLabel from 'common/components/skjema/wrappers/Label';
import ValiderbarInput from 'common/lib/validation/elements/ValiderbarInput';

export type InputWrapperProps = SkjemaelementProps & NFInputProps;

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
