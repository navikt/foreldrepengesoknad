import * as React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface OwnProps {
    skalIkkeHaUttakFørTermin: boolean;
    onChange: (skalIkkeHaUttakFørTermin: boolean) => void;
}

type Props = OwnProps & InjectedIntlProps;

class ForeldrepengerFørFødselUttakForm extends React.Component<Props, {}> {
    render() {
        const { skalIkkeHaUttakFørTermin, onChange, intl } = this.props;
        return (
            <Checkbox
                checked={skalIkkeHaUttakFørTermin || false}
                label={getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label')}
                onChange={(e) => onChange(e.target.checked)}
            />
        );
    }
}
export default injectIntl(ForeldrepengerFørFødselUttakForm);
