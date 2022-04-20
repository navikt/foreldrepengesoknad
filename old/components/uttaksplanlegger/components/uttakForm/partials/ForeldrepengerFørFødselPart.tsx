import * as React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, IntlShape } from 'react-intl';

export interface OwnProps {
    skalIkkeHaUttakFørTermin: boolean;
    onChange: (skalIkkeHaUttakFørTermin: boolean) => void;
    intl: IntlShape;
}

type Props = OwnProps;

class ForeldrepengerFørFødselUttakForm extends React.Component<Props> {
    render() {
        const { skalIkkeHaUttakFørTermin, onChange, intl } = this.props;
        return (
            <Checkbox
                checked={skalIkkeHaUttakFørTermin || false}
                autoComplete="off"
                label={getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label')}
                onChange={(e) => onChange(e.target.checked)}
            />
        );
    }
}
export default injectIntl(ForeldrepengerFørFødselUttakForm);
