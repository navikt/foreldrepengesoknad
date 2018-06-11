import * as React from 'react';
import * as classnames from 'classnames';
import {
    SkjemaGruppe,
    Fieldset,
    CheckboksPanel,
    CheckboksPanelGruppeProps
} from 'nav-frontend-skjema';
import './checkboksPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';

interface ResponsiveProps {
    twoColumns?: boolean;
}

type Props = CheckboksPanelGruppeProps & ResponsiveProps;

class CheckboksPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const {
            feil,
            twoColumns = false,
            legend,
            checkboxes,
            onChange
        } = this.props;

        const cls = classnames('checkboksPanelWrapper', {
            'checkboksPanelWrapper--twoColumns': twoColumns === true
        });
        return (
            <div className="checkboksPanelGruppe">
                <Fieldset legend={legend}>
                    <SkjemaGruppe
                        className="checkboksPanelGruppe--responsive"
                        feil={feil}>
                        {checkboxes.map((checkboks) => {
                            return (
                                <div className={cls} key={checkboks.value}>
                                    <CheckboksPanel
                                        checked={checkboks.checked}
                                        onChange={(event: any) =>
                                            onChange(event, checkboks.value)
                                        }
                                        {...checkboks}
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

export default CheckboksPanelGruppeResponsive;
