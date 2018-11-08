import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

export interface OwnProps {
    harHattAnnenInntekt?: boolean;
    onChange: (value: boolean) => void;
}

type Props = OwnProps & InjectedIntlProps;

class AnnenInntektSiste10MndSpørsmål extends React.Component<Props> {
    render() {
        const { harHattAnnenInntekt, onChange, intl } = this.props;

        return (
            <JaNeiSpørsmål
                spørsmål={getMessage(intl, 'annenInntekt.spørsmål')}
                navn="annenInntekt"
                valgtVerdi={harHattAnnenInntekt}
                labels={{
                    ja: getMessage(intl, 'annenInntekt.alternativ.hatt'),
                    nei: getMessage(intl, 'annenInntekt.alternativ.ikkeHatt')
                }}
                onChange={(verdi) => onChange(verdi)}
            />
        );
    }
}

export default injectIntl(AnnenInntektSiste10MndSpørsmål);
