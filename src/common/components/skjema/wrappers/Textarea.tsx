import * as React from 'react';
import { TextareaProps } from 'nav-frontend-skjema';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import ValiderbarTextarea from 'common/lib/validation/elements/ValiderbarTextarea';
import { LabelWithInfo } from '@navikt/sif-common-formik/lib';

export type TextareaWrapperProps = SkjemaelementProps & TextareaProps;

const Textarea: React.StatelessComponent<TextareaWrapperProps> = (props: TextareaWrapperProps) => {
    const id = props.id || guid();
    return (
        <ValiderbarTextarea
            {...props}
            id={id}
            label={<LabelWithInfo info={props.infotekst}>{props.label}</LabelWithInfo>}
        />
    );
};

export default Textarea;
