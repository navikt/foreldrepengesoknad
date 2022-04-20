import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface ErNæringenRegistrertINorgeSpørsmålProps {
    navnPåNæringen: string;
    registrertINorge?: boolean;
    onChange: (registrertINorge: boolean) => void;
}

type Props = ErNæringenRegistrertINorgeSpørsmålProps;

const ErNæringenRegistrertINorgeSpørsmål = (props: Props) => {
    const { onChange, registrertINorge, navnPåNæringen } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erNæringenRegistrertINorge.spørsmål', { navnPåNæringen })}
            navn="erNæringenRegistrertINorge"
            valgtVerdi={registrertINorge}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default ErNæringenRegistrertINorgeSpørsmål;
