import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface HarDuRevisorSpørsmålProps {
    harRevisor?: boolean;
    onChange: (harDuRevisor: boolean) => void;
}

type Props = HarDuRevisorSpørsmålProps & InjectedIntlProps;

const HarDuRevisorSpørsmål = (props: Props) => {
    const { onChange, harRevisor, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harRevisor.spørsmål')}
            navn="harDuRevisor"
            valgtVerdi={harRevisor}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(HarDuRevisorSpørsmål);
