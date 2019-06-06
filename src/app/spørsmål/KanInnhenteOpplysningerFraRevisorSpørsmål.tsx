import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface InnhenteOpplsyningerOmRevisorSpørsmålProps {
    kanInnhenteOpplysningerFraRevisor?: boolean;
    onChange: (hentOpplysningerOmRevisor: boolean) => void;
}

type Props = InnhenteOpplsyningerOmRevisorSpørsmålProps & InjectedIntlProps;

const KanInnhenteOpplysningerFraRevisorSpørsmål = (props: Props) => {
    const { onChange, kanInnhenteOpplysningerFraRevisor, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'kanInnhenteOpplysningerFraRevisor.spørsmål')}
            navn="hentOpplysningerFraRevisor"
            valgtVerdi={kanInnhenteOpplysningerFraRevisor}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(KanInnhenteOpplysningerFraRevisorSpørsmål);
