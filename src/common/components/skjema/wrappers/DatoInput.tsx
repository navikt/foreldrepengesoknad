import * as React from 'react';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
import { LabelWithInfo } from '@navikt/sif-common-formik/lib';

type DatoInputWrapperProps = SkjemaelementProps & DatoInputProps;

const DatoInput: React.StatelessComponent<DatoInputWrapperProps> = (props: DatoInputWrapperProps) => {
    const id = props.inputId || guid();
    return (
        <ValiderbarDatoInput
            {...props}
            inputId={id}
            label={<LabelWithInfo info={props.infotekst}>{props.label}</LabelWithInfo>}
        />
    );
};

export default DatoInput;
