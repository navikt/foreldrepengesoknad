import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface OwnProps {
    harEksisterendeSak?: boolean;
    skalEndre: boolean | undefined;
    onChange: (skalEndre: boolean) => void;
}

type Props = OwnProps & InjectedIntlProps;

const SøknadstypeSpørsmål = (props: Props) => {
    const { harEksisterendeSak, skalEndre, onChange, intl } = props;
    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(
                intl,
                `velkommen.spørsmål.søknadstype.${harEksisterendeSak ? 'harSak' : 'harIkkeSak'}.spørsmål`
            )}
            navn="samtidigGradertUttak"
            valgtVerdi={skalEndre}
            labels={{
                ja: getMessage(intl, `velkommen.spørsmål.søknadstype.alternativ.endring`),
                nei: getMessage(intl, `velkommen.spørsmål.søknadstype.alternativ.nyttbarn`)
            }}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(SøknadstypeSpørsmål);
