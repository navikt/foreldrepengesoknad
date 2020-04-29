import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface InnhenteOpplsyningerOmRevisorSpørsmålProps {
    kanInnhenteOpplysningerFraRevisor?: boolean;
    onChange: (hentOpplysningerOmRevisor: boolean) => void;
}

type Props = InnhenteOpplsyningerOmRevisorSpørsmålProps;

const KanInnhenteOpplysningerFraRevisorSpørsmål = (props: Props) => {
    const { onChange, kanInnhenteOpplysningerFraRevisor } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'kanInnhenteOpplysningerFraRevisor.spørsmål')}
            navn="hentOpplysningerFraRevisor"
            valgtVerdi={kanInnhenteOpplysningerFraRevisor}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default KanInnhenteOpplysningerFraRevisorSpørsmål;
