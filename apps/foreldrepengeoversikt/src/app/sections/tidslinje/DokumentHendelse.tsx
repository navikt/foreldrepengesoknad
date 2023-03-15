import { Link } from '@navikt/ds-react';
import React from 'react';
import { FileContent } from '@navikt/ds-icons';
import { bemUtils } from '@navikt/fp-common';
import { Dokument as DokumentHendelse } from 'app/types/Dokument';

import './dokument-hendelse.css';

interface Props {
    dokument: DokumentHendelse;
}

const DokumentHendelse: React.FunctionComponent<Props> = ({ dokument }) => {
    const bem = bemUtils('dokument-hendelse');
    const { tittel } = dokument;

    return (
        <li className={bem.block}>
            <FileContent className={bem.element('ikon')} />
            <Link href={dokument.url} className={bem.element('ikon')} target="_blank">
                {tittel}
            </Link>
        </li>
    );
};

export default DokumentHendelse;
