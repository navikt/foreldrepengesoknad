import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe, Fieldset, RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import './radioPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';
import Infoboks from 'common/components/infoboks/Infoboks';

interface ResponsiveProps {
    twoColumns?: boolean;
    infoboksTekst?: string;
}

type Props = RadioPanelGruppeProps & ResponsiveProps;

class RadioPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const { feil, twoColumns = false, infoboksTekst, legend, checked, name, radios, onChange } = this.props;

        const cls = classnames('radioPanelWrapper', {
            'radioPanelWrapper--twoColumns': twoColumns === true
        });
        return (
            <div className="radioPanelGruppe">
                <Fieldset legend={legend}>
                    {infoboksTekst && <Infoboks tekst={infoboksTekst} />}
                    <SkjemaGruppe className="radioPanelGruppe--responsive" feil={feil}>
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
                    </SkjemaGruppe>
                </Fieldset>
            </div>
        );
    }
}

export default RadioPanelGruppeResponsive;
