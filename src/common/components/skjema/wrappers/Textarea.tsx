import * as React from 'react';
import { TextareaProps } from 'nav-frontend-skjema';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import ValiderbarTextarea from 'common/lib/validation/elements/ValiderbarTextarea';
import LabelWithUtvidetInformasjon from 'common/components/labelWithUtvidetInformasjon/LabelWithUtvidetInformasjon';

export type TextareaWrapperProps = SkjemaelementProps & TextareaProps;

const Textarea: React.FunctionComponent<TextareaWrapperProps> = (props: TextareaWrapperProps) => {
    const id = props.id || guid();
    return (
        <ValiderbarTextarea
            {...props}
            id={id}
            label={<LabelWithUtvidetInformasjon info={props.infotekst}>{props.label}</LabelWithUtvidetInformasjon>}
        />
    );
};

export default Textarea;
