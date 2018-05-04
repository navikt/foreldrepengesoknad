import * as React from 'react';
import * as classnames from 'classnames';
import {
    SkjemaGruppe,
    Fieldset,
    RadioPanel,
    RadioPanelGruppeProps
} from 'nav-frontend-skjema';
import './radioPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';

interface ResponsiveProps {
    twoColumns?: boolean;
}

type Props = RadioPanelGruppeProps & ResponsiveProps;

export default class RadioPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const {
            feil,
            twoColumns = false,
            legend,
            checked,
            name,
            radios,
            onChange
        } = this.props;

        const cls = classnames('radioPanelWrapper', {
            'radioPanelWrapper--twoColumns': twoColumns === true
        });
        return (
            <div className="radioPanelGruppe">
                <Fieldset legend={legend}>
                    <SkjemaGruppe
                        className="radioPanelGruppe--responsive"
                        feil={feil}>
                        {radios.map((radio) => {
                            return (
                                <div className={cls} key={radio.value}>
                                    <RadioPanel
                                        checked={checked === radio.value}
                                        name={name}
                                        onChange={(event: any) =>
                                            onChange(event, radio.value)
                                        }
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
