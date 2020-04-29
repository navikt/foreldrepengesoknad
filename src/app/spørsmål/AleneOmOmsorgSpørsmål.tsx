import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface AleneOmOmsorgsSpørsmålProps {
    aleneOmOmsorg?: boolean;
    onChange: (aleneomsorg: boolean) => void;
}

type Props = AleneOmOmsorgsSpørsmålProps;

const AleneOmOmsorgsSpørsmål = (props: Props) => {
    const { onChange, aleneOmOmsorg } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'annenForelder.aleneOmOmsorg')}
            navn="omsorgsfordeling"
            clsName="aleneOmOmsorgen"
            hjelpetekst={getMessage(intl, 'annenForelder.aleneOmOmsorg.veileder')}
            onChange={onChange}
            valgtVerdi={aleneOmOmsorg === undefined ? undefined : aleneOmOmsorg}
        />
    );
};

export default AleneOmOmsorgsSpørsmål;
