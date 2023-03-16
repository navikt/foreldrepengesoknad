import React from 'react';
import classnames from 'classnames';
import { SkjemaGruppe, CheckboksPanel, CheckboksPanelGruppeProps, CheckboxProps } from 'nav-frontend-skjema';
import './checkboksPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';

interface ResponsiveProps {
    columns?: undefined | 2 | 1;
    disabled?: boolean;
}

export type CheckboxPanelgruppeResponsiveProps = CheckboksPanelGruppeProps & ResponsiveProps;

class CheckboksPanelGruppeResponsive extends React.Component<CheckboxPanelgruppeResponsiveProps> {
    render() {
        const { feil, columns, disabled = false, legend, checkboxes, onChange } = this.props;

        if (checkboxes === undefined) {
            return null;
        }

        const cls = classnames('checkboksPanelWrapper', {
            'checkboksPanelWrapper--twoColumns': columns === 2,
            'checkboksPanelWrapper--oneColumn': columns === 1,
        });

        return (
            <div className="checkboksPanelGruppe">
                <SkjemaGruppe className="checkboksPanelGruppe--responsive" feil={feil} legend={legend}>
                    {checkboxes &&
                        checkboxes.map((checkboks: CheckboxProps, index: number) => {
                            return (
                                <div className={cls} key={`${checkboks.value}`}>
                                    <CheckboksPanel
                                        {...checkboks}
                                        checked={checkboks.checked || false}
                                        disabled={disabled || false}
                                        onChange={(event) => onChange(event, checkboks.value)}
                                        key={index}
                                        feil={!!checkboks.feil}
                                    />
                                </div>
                            );
                        })}
                </SkjemaGruppe>
            </div>
        );
    }
}

export default CheckboksPanelGruppeResponsive;
