import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface ErNæringenRegistrertINorgeSpørsmålProps {
    navnPåNæringen: string;
    registrertINorge?: boolean;
    onChange: (registrertINorge: boolean) => void;
}

type Props = ErNæringenRegistrertINorgeSpørsmålProps & InjectedIntlProps;

const ErNæringenRegistrertINorgeSpørsmål = (props: Props) => {
    const { onChange, registrertINorge, navnPåNæringen, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erNæringenRegistrertINorge.spørsmål', { navnPåNæringen })}
            navn="erNæringenRegistrertINorge"
            valgtVerdi={registrertINorge}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(ErNæringenRegistrertINorgeSpørsmål);
