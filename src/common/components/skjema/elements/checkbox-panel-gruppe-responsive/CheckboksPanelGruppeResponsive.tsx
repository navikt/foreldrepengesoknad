import * as React from 'react';
import { CheckboksPanelGruppeProps, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import './checkboksPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';

interface ResponsiveProps {
    twoColumns?: boolean;
    disabled?: boolean;
    infoboksTekst?: string | React.ReactNode;
}

type Props = CheckboksPanelGruppeProps & ResponsiveProps;

class CheckboksPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const { feil, disabled = false, legend, checkboxes, infoboksTekst, onChange } = this.props;

        if (checkboxes === undefined) {
            return null;
        }

        return (
            <CheckboksPanelGruppe
                checkboxes={
                    disabled
                        ? checkboxes.map((chkbox) => ({
                              ...chkbox,
                              disabled,
                          }))
                        : checkboxes
                }
                feil={feil}
                legend={legend}
                onChange={onChange}
                description={infoboksTekst}
            />
        );
    }
}

export default CheckboksPanelGruppeResponsive;
