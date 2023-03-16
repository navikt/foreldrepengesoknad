import React from 'react';
import { RadioPanelGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import Infoboks from 'common/components/infoboks/Infoboks';

import './radioPanelGruppeResponsive.less';

interface ResponsiveProps {
    twoColumns?: boolean;
    fieldsetClassname?: string;
    infoboksTekst?: string | React.ReactNode;
}

export type RadioPanelGruppeResponsiveProps = ResponsiveProps & RadioPanelGruppeProps;

class RadioPanelGruppeResponsive extends React.Component<RadioPanelGruppeResponsiveProps> {
    render() {
        const { infoboksTekst, fieldsetClassname, legend, name, radios, checked, feil, onChange } = this.props;

        return (
            <div className="radioPanelGruppe">
                {infoboksTekst && <Infoboks fieldsetClsName={fieldsetClassname} tekst={infoboksTekst} />}
                <RadioPanelGruppe
                    feil={feil}
                    name={name}
                    radios={radios}
                    legend={legend}
                    checked={checked}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default RadioPanelGruppeResponsive;
