import * as React from 'react';
import { SelectProps } from 'nav-frontend-skjema';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import InputLabel from 'common/components/skjema/wrappers/Label';
import ValiderbarSelect from 'common/lib/validation/elements/ValiderbarSelect';

export type SelectWrapperProps = SkjemaelementProps & SelectProps;

const Select: React.StatelessComponent<SelectWrapperProps> = (
    props: SelectWrapperProps
) => {
    const id = props.id || guid();
    return (
        <ValiderbarSelect
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

export default Select;
