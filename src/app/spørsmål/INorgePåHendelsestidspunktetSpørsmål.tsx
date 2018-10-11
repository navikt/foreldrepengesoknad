import * as React from 'react';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

// tslint:disable-next-line interface-name
interface INorgePåHendelsestidspunktetSpørsmålProps {
    spørsmålstekst: string;
    iNorgePåHendelsestidspunktet?: boolean;
    onChange: (iNorgePåHendelsestidspunktet: boolean) => void;
}

const INorgePåHendelsestidspunktetSpørsmål = (props: INorgePåHendelsestidspunktetSpørsmålProps) => {
    const { onChange, spørsmålstekst, iNorgePåHendelsestidspunktet } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={spørsmålstekst}
            navn="iNorgePåHendelsestidspunktet"
            onChange={onChange}
            valgtVerdi={iNorgePåHendelsestidspunktet}
        />
    );
};

export default INorgePåHendelsestidspunktetSpørsmål;
