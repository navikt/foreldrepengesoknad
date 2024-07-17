import { FileContent } from '@navikt/ds-icons';
import { Detail, Hide, Link, Show, Tag } from '@navikt/ds-react';

import { bemUtils, formatDateExtended } from '@navikt/fp-utils';

import { Dokument as DokumentType } from 'app/types/Dokument';
import { DokumentType as DokumentTypeEnum } from 'app/types/DokumentType';
import { lagUrl } from 'app/utils/dokumenterUtils';

import './dokument.css';

interface Props {
    dokument: DokumentType;
}

const Dokument: React.FunctionComponent<Props> = ({ dokument }) => {
    const bem = bemUtils('dokument');
    const { type, mottatt } = dokument;

    return (
        <div className={bem.block}>
            <Hide above="md">
                <DokumentLenke dokument={dokument} />
                <div className={bem.element('content-bottom')}>
                    <DokumentAvsender dokumentType={type} />
                    <Detail textColor="subtle">{formatDateExtended(mottatt)}</Detail>
                </div>
            </Hide>
            <Show above="md">
                <div className={bem.element('contentWrapper')}>
                    <DokumentLenke dokument={dokument} />
                    <Detail textColor="subtle">{formatDateExtended(mottatt)}</Detail>
                    <DokumentAvsender dokumentType={type} />
                </div>
            </Show>
        </div>
    );
};

function DokumentLenke({ dokument }: { dokument: DokumentType }) {
    const url = lagUrl(dokument);

    return (
        <>
            <FileContent style={{ color: 'var(--a-surface-action)' }} height={24} width={24} aria-hidden={true} />
            <Link
                href={url}
                target="_blank"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}
            >
                {dokument.tittel}
            </Link>
        </>
    );
}

function DokumentAvsender({ dokumentType }: { dokumentType: DokumentTypeEnum }) {
    const text = dokumentType === DokumentTypeEnum.INNGÅENDE_DOKUMENT ? 'Arbeidsgiver' : 'NAV';

    return (
        <Tag style={{ width: 'max-content', justifySelf: 'flex-end' }} variant="neutral">
            {text}
        </Tag>
    );
}

export default Dokument;
