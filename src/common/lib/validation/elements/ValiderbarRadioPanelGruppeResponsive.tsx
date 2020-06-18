import React from 'react';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps,
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';
import RadioPanelGruppeResponsive, {
    RadioPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

type Props = ValiderbartSkjemaelementProps & RadioPanelGruppeResponsiveProps;

const ValiderbarRadioPanelGruppeResponsive: React.StatelessComponent<Props> = (props: Props) => {
    const { validators, optional, validateOnBlur, validateOnChange, ...inputProps } = props;
    return (
        <ValiderbartSkjemaelement
            {...props}
            render={(onChange, _onBlur, feil) => (
                <RadioPanelGruppeResponsive
                    {...inputProps}
                    onChange={onChange}
                    feil={feil !== undefined ? feil.feilmelding : undefined}
                />
            )}
        />
    );
};

export default ValiderbarRadioPanelGruppeResponsive;
