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
import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';

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

        if (checkboxes === undefined) {
            return null;
        }

        return (
            <div className="checkboksPanelGruppe">
                <Fieldset legend={legend}>
                    <SkjemaGruppe
                        className="checkboksPanelGruppe--responsive"
                        feil={feil}>
                        {checkboxes &&
                            checkboxes.map(
                                (checkboks: CheckboksProps, index: number) => {
                                    return (
                                        <div
                                            className={cls}
                                            key={checkboks.value}>
                                            <CheckboksPanel
                                                checked={
                                                    checkboks.checked || false
                                                }
                                                onChange={(event: any) =>
                                                    onChange(
                                                        event,
                                                        checkboks.value
                                                    )
                                                }
                                                {...checkboks}
                                                key={index}
                                            />
                                        </div>
                                    );
                                }
                            )}
                    </SkjemaGruppe>
                </Fieldset>
            </div>
        );
    }
}

export default CheckboksPanelGruppeResponsive;
