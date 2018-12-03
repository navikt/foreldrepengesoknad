import * as React from 'react';
import { TextareaProps } from 'nav-frontend-skjema';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import InputLabel from 'common/components/skjema/wrappers/Label';
import ValiderbarTextarea from 'common/lib/validation/elements/ValiderbarTextarea';

export type TextareaWrapperProps = SkjemaelementProps & TextareaProps;

const Textarea: React.StatelessComponent<TextareaWrapperProps> = (props: TextareaWrapperProps) => {
    const id = props.id || guid();
    return (
        <ValiderbarTextarea
            {...props}
            id={id}
            label={<InputLabel label={props.label} infotekst={props.infotekst} inputId={id} />}
        />
    );
};

export default Textarea;
