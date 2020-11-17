import * as React from 'react';
import 'nav-frontend-skjema-style';
import { RadioPanelGruppeProps, RadioPanelGruppe } from 'nav-frontend-skjema';
import { LabelWithInfo } from '@navikt/sif-common-formik';

import './radioPanelGruppeResponsive.less';

interface ResponsiveProps {
    twoColumns?: boolean;
    fieldsetClassname?: string;
    infoboksTekst?: string | React.ReactNode;
}

export type RadioPanelGruppeResponsiveProps = ResponsiveProps & RadioPanelGruppeProps;

class RadioPanelGruppeResponsive extends React.Component<RadioPanelGruppeResponsiveProps> {
    render() {
        const { feil, twoColumns = false, infoboksTekst, legend, checked, name, radios, onChange } = this.props;

        return (
            <RadioPanelGruppe
                legend={<LabelWithInfo info={infoboksTekst}>{legend}</LabelWithInfo>}
                className={twoColumns ? 'twoColumnsPanelGruppe' : undefined}
                feil={feil}
                radios={radios.map((radio) => ({ ...radio, autoComplete: 'off' }))}
                name={name}
                checked={checked}
                onChange={onChange}
            />
        );
    }
}

export default RadioPanelGruppeResponsive;
