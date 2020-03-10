import * as React from 'react';
import { RadioPanelGruppeProps, RadioPanelGruppe } from 'nav-frontend-skjema';
import './radioPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';

interface ResponsiveProps {
    twoColumns?: boolean;
    fieldsetClassname?: string;
    infoboksTekst?: string | React.ReactNode;
}

export type RadioPanelGruppeResponsiveProps = ResponsiveProps & RadioPanelGruppeProps;

class RadioPanelGruppeResponsive extends React.Component<RadioPanelGruppeResponsiveProps> {
    render() {
        const {
            feil,
            twoColumns = false,
            // infoboksTekst,
            legend,
            checked,
            name,
            radios,
            onChange
        } = this.props;

        return (
            <RadioPanelGruppe
                legend={legend}
                className={twoColumns ? 'twoColumnsPanelGruppe' : undefined}
                feil={feil}
                radios={radios}
                name={name}
                checked={checked}
                onChange={onChange}
            />
        );
    }
}

export default RadioPanelGruppeResponsive;
