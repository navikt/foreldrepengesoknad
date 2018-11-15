import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe, Fieldset, RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import './radioPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';
import Infoboks from 'common/components/infoboks/Infoboks';

interface ResponsiveProps {
    twoColumns?: boolean;
    infoboksTekst?: string | React.ReactNode;
}

export type RadioPanelGruppeResponsiveProps = ResponsiveProps & RadioPanelGruppeProps;

class RadioPanelGruppeResponsive extends React.Component<RadioPanelGruppeResponsiveProps> {
    render() {
        const { feil, twoColumns = false, infoboksTekst, legend, checked, name, radios, onChange } = this.props;

        const cls = classnames('radioPanelWrapper', {
            'radioPanelWrapper--twoColumns': twoColumns === true
        });
        return (
            <div className="radioPanelGruppe">
                <SkjemaGruppe feil={feil}>
                    <Fieldset legend={legend}>
                        {infoboksTekst && <Infoboks tekst={infoboksTekst} />}
                        <div className="radioPanelGruppe--responsive">
                            {radios.map((radio) => {
                                return (
                                    <div className={cls} key={radio.value}>
                                        <RadioPanel
                                            checked={checked === radio.value}
                                            name={name}
                                            onChange={(event) => onChange(event, radio.value)}
                                            {...radio}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Fieldset>
                </SkjemaGruppe>
            </div>
        );
    }
}

export default RadioPanelGruppeResponsive;
