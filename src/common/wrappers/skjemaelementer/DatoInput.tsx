import * as React from 'react';
import { SkjemaelementProps } from 'common/wrappers/skjemaelementer/types/common';
import { guid } from 'nav-frontend-js-utils';
import InputLabel from 'common/wrappers/skjemaelementer/Label';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import { DatoInputProps } from 'common/components/dato-input/DatoInput';

type DatoInputWrapperProps = SkjemaelementProps & DatoInputProps;

const DatoInput: React.StatelessComponent<DatoInputWrapperProps> = (
    props: DatoInputWrapperProps
) => {
    const id = props.id || guid();
    return (
        <ValiderbarDatoInput
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

export default DatoInput;
