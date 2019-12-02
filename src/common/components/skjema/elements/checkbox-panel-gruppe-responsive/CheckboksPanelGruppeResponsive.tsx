import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe, Fieldset, CheckboksPanel, CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import './checkboksPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';
import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';
import Infoboks from 'common/components/infoboks/Infoboks';

interface ResponsiveProps {
    twoColumns?: boolean;
    disabled?: boolean;
    infoboksTekst?: string;
}

type Props = CheckboksPanelGruppeProps & ResponsiveProps;

class CheckboksPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const { feil, twoColumns = false, disabled = false, legend, checkboxes, infoboksTekst, onChange } = this.props;

        if (checkboxes === undefined) {
            return null;
        }

        const cls = classnames('checkboksPanelWrapper', {
            'checkboksPanelWrapper--twoColumns': twoColumns === true
        });

        return (
            <div className="checkboksPanelGruppe">
                <Fieldset legend={legend}>
                    {infoboksTekst && <Infoboks tekst={infoboksTekst} />}
                    <SkjemaGruppe className="checkboksPanelGruppe--responsive" feil={feil}>
                        {checkboxes &&
                            checkboxes.map((checkboks: CheckboksProps, index: number) => {
                                return (
                                    <div className={cls} key={checkboks.value}>
                                        <CheckboksPanel
                                            checked={checkboks.checked || false}
                                            disabled={disabled || false}
                                            onChange={(event) => onChange(event, checkboks.value)}
                                            {...checkboks}
                                            key={index}
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
