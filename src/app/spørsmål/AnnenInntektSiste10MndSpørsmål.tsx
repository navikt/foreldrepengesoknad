import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

export interface OwnProps {
    harHattAnnenInntekt?: boolean;
    onChange: (value: boolean) => void;
    intl: IntlShape;
}

type Props = OwnProps;

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
                    nei: getMessage(intl, 'annenInntekt.alternativ.ikkeHatt'),
                }}
                clsName="annenInntektSiste10mnd"
                hjelpetekst={<AnnenInntektSiste10MndHjelpeTekst intl={intl} />}
                hjelpetekstApneLabel="Les mer om hva som kan telle som annen inntekt"
                onChange={(verdi) => onChange(verdi)}
            />
        );
    }
}

export default injectIntl(AnnenInntektSiste10MndSpørsmål);

const AnnenInntektSiste10MndHjelpeTekst = ({ intl }: { intl: IntlShape }) => {
    return (
        <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
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
