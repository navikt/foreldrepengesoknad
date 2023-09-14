import { BodyShort, Link } from '@navikt/ds-react';

import { FileContent } from '@navikt/ds-icons';
import { bemUtils, formatDateExtended } from '@navikt/fp-common';
import { Dokument as DokumentType } from 'app/types/Dokument';
import DokumentAvsender from 'app/components/dokument-avsender/DokumentAvsender';
import Environment from 'app/Environment';

import './dokument.css';

interface Props {
    dokument: DokumentType;
}

const Dokument: React.FunctionComponent<Props> = ({ dokument }) => {
    const bem = bemUtils('dokument');
    const { tittel, type, mottatt } = dokument;
    const fullUrl = lagFullUrl(dokument);

    return (
        <div className={bem.block}>
            <div className={bem.element('content')}>
                <FileContent className={bem.element('ikon')} />
                <div className={bem.element('link-icon')}>
                    <Link href={fullUrl} target="_blank">
                        {tittel}
                    </Link>
                </div>
                <BodyShort>{formatDateExtended(mottatt)}</BodyShort>
                <DokumentAvsender type={type} />
            </div>
        </div>
    );
};

function lagFullUrl(dokument: DokumentType): string {
    return dokument.url && !dokument.url.startsWith('http')
        ? `${Environment.REST_API_URL}${dokument.url}`
        : dokument.url;
}

export default Dokument;
