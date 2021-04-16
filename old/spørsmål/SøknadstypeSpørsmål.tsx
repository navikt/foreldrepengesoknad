import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface OwnProps {
    harEksisterendeSak?: boolean;
    skalEndre: boolean | undefined;
    onChange: (skalEndre: boolean) => void;
    erSakForEndringssøknadFraInfotrygd: boolean;
}

type Props = OwnProps;

const SøknadstypeSpørsmål = (props: Props) => {
    const { harEksisterendeSak, skalEndre, onChange, erSakForEndringssøknadFraInfotrygd } = props;
    const intl = useIntl();
    if (harEksisterendeSak) {
        return (
            <div data-name="soknadstype-spm">
                <JaNeiSpørsmål
                    spørsmål={
                        erSakForEndringssøknadFraInfotrygd
                            ? getMessage(intl, `velkommen.spørsmål.søknadstype.harInfotrygdSak.spørsmål`)
                            : getMessage(intl, `velkommen.spørsmål.søknadstype.harSak.spørsmål`)
                    }
                    navn="søknadstype"
                    valgtVerdi={skalEndre}
                    labels={{
                        ja: erSakForEndringssøknadFraInfotrygd
                            ? getMessage(intl, `velkommen.spørsmål.søknadstype.harInfotrygdSak.alternativ.endring`)
                            : getMessage(intl, `velkommen.spørsmål.søknadstype.harSak.alternativ.endring`),
                        nei: erSakForEndringssøknadFraInfotrygd
                            ? getMessage(intl, `velkommen.spørsmål.søknadstype.harInfotrygdSak.alternativ.nyttbarn`)
                            : getMessage(intl, `velkommen.spørsmål.søknadstype.harSak.alternativ.nyttbarn`),
                    }}
                    onChange={(verdi) => onChange(verdi)}
                />
            </div>
        );
    } else {
        return (
            <JaNeiSpørsmål
                spørsmål={getMessage(intl, `velkommen.spørsmål.søknadstype.harIkkeSak.spørsmål`)}
                navn="søknadstype"
                valgtVerdi={skalEndre !== undefined ? !skalEndre : undefined}
                labels={{
                    ja: getMessage(intl, `velkommen.spørsmål.søknadstype.harIkkeSak.alternativ.nyttbarn`),
                    nei: getMessage(intl, `velkommen.spørsmål.søknadstype.harIkkeSak.alternativ.endring`),
                }}
                onChange={(verdi) => onChange(!verdi)}
            />
        );
    }
};

export default SøknadstypeSpørsmål;
