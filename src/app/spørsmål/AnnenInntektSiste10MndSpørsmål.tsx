import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/skjema/ja-nei-spørsmål/JaNeiSpørsmål';

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
                clsName="annenInntektSiste10mnd"
                hjelpetekst={<AnnenInntektSiste10MndHjelpeTekst intl={intl} />}
                onChange={(verdi) => onChange(verdi)}
            />
        );
    }
}

export default injectIntl(AnnenInntektSiste10MndSpørsmål);

const AnnenInntektSiste10MndHjelpeTekst = ({ intl }: { intl: InjectedIntl }) => {
    return (
        <div>
            <div>{getMessage(intl, 'annenInntekt.infoboksTekst.overskrift')}</div>
            <ul>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktEn')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktTo')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktTre')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktFire')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktFem')}</li>
            </ul>
        </div>
    );
};
