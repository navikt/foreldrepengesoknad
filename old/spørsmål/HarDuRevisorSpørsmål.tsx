import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface HarDuRevisorSpørsmålProps {
    harRevisor?: boolean;
    onChange: (harDuRevisor: boolean) => void;
}

type Props = HarDuRevisorSpørsmålProps;

const HarDuRevisorSpørsmål = (props: Props) => {
    const { onChange, harRevisor } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harRevisor.spørsmål')}
            navn="harDuRevisor"
            valgtVerdi={harRevisor}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default HarDuRevisorSpørsmål;
