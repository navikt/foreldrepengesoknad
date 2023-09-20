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
    const url = lagUrl(dokument);

    return (
        <div className={bem.block}>
            <div className={bem.element('content')}>
                <FileContent className={bem.element('ikon')} />
                <div className={bem.element('link-icon')}>
                    <Link href={url} target="_blank">
                        {tittel}
                    </Link>
                </div>
                <BodyShort>{formatDateExtended(mottatt)}</BodyShort>
                <DokumentAvsender type={type} />
            </div>
        </div>
    );
};

function lagUrl(dokument: DokumentType): string {
    return dokument.url ? dokument.url : `${Environment.REST_API_URL}/dokument/hent-dokument/${dokument.journalpostId}/${dokument.dokumentId}`;
}

export default Dokument;
