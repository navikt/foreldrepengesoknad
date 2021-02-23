import * as React from 'react';
import 'nav-frontend-skjema-style';
import { RadioPanelGruppeProps, RadioPanelGruppe } from 'nav-frontend-skjema';
import LabelWithUtvidetInformasjon from 'common/components/labelWithUtvidetInformasjon/LabelWithUtvidetInformasjon';

import './radioPanelGruppeResponsive.less';

interface ResponsiveProps {
    twoColumns?: boolean;
    fieldsetClassname?: string;
    infoboksTekst?: React.ReactNode;
    hjelpetekstApneLabel?: React.ReactNode;
}

export type RadioPanelGruppeResponsiveProps = ResponsiveProps & RadioPanelGruppeProps;

const RadioPanelGruppeResponsive: React.FunctionComponent<RadioPanelGruppeResponsiveProps> = ({
    feil,
    twoColumns = false,
    infoboksTekst,
    hjelpetekstApneLabel,
    legend,
    checked,
    name,
    radios,
    onChange,
}) => {
    return (
        <RadioPanelGruppe
            legend={
                <LabelWithUtvidetInformasjon apneLabel={hjelpetekstApneLabel} info={infoboksTekst}>
                    {legend}
                </LabelWithUtvidetInformasjon>
            }
            className={twoColumns ? 'twoColumnsPanelGruppe' : undefined}
            feil={feil}
            radios={radios.map((radio: any) => ({ ...radio, 'aria-invalid': undefined, autoComplete: 'off' }))}
            name={name}
            checked={checked}
            onChange={onChange}
        />
    );
};

export default RadioPanelGruppeResponsive;
