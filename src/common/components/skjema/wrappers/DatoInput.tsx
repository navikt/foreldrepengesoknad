import * as React from 'react';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
import LabelWithUtvidetInformasjon from 'common/components/labelWithUtvidetInformasjon/LabelWithUtvidetInformasjon';

type DatoInputWrapperProps = Omit<SkjemaelementProps, 'onChange'> & DatoInputProps;

const DatoInput = (props: DatoInputWrapperProps) => {
    const id = props.id || guid();
    return (
        <ValiderbarDatoInput
            {...props}
            id={id}
            label={
                <LabelWithUtvidetInformasjon info={props.infotekst} apneLabel={props.apneLabel}>
                    {props.label}
                </LabelWithUtvidetInformasjon>
            }
        />
    );
};

export default DatoInput;
