import { Link } from '@navikt/ds-react';

import { FileContent } from '@navikt/ds-icons';
import { bemUtils } from '@navikt/fp-common';
import { Dokument } from 'app/types/Dokument';
import { lagUrl } from 'app/utils/dokumenterUtils';

import './dokument-hendelse.css';
import classNames from 'classnames';

interface Props {
    dokument: Dokument;
    visesITidslinjen: boolean;
}

const DokumentHendelse: React.FunctionComponent<Props> = ({ dokument, visesITidslinjen }) => {
    const bem = bemUtils('dokument-hendelse');
    const { tittel } = dokument;
    const url = lagUrl(dokument);

    return (
        <li className={classNames(`${bem.block} ${visesITidslinjen ? bem.modifier('medium') : bem.modifier('large')}`)}>
            <FileContent className={bem.element('ikon')} aria-hidden={true} />
            <Link href={url} className={bem.element('ikon')} target="_blank">
                {tittel}
            </Link>
        </li>
    );
};

export default DokumentHendelse;
