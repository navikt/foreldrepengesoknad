import * as React from 'react';
import { SelectProps } from 'nav-frontend-skjema';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import ValiderbarSelect from 'common/lib/validation/elements/ValiderbarSelect';
import LabelWithUtvidetInformasjon from 'common/components/labelWithUtvidetInformasjon/LabelWithUtvidetInformasjon';

export type SelectWrapperProps = SkjemaelementProps & SelectProps;

const Select: React.FunctionComponent<SelectWrapperProps> = (props: SelectWrapperProps) => {
    const id = props.id || guid();
    return (
        <ValiderbarSelect
            {...props}
            id={id}
            label={<LabelWithUtvidetInformasjon info={props.infotekst}>{props.label}</LabelWithUtvidetInformasjon>}
        />
    );
};

export default Select;
