import { Folder } from '@navikt/ds-icons';
import { Accordion, BodyShort } from '@navikt/ds-react';

import { guid } from '@navikt/fp-common';
import { bemUtils } from '@navikt/fp-utils';

import { Dokument as DokumentType } from 'app/types/Dokument';

import Dokument from '../dokument/Dokument';
import './grupperte-dokumenter.css';

interface Props {
    dokumenter: DokumentType[];
}

const GrupperteDokumenter: React.FunctionComponent<Props> = ({ dokumenter }) => {
    const bem = bemUtils('grupperte-dokumenter');

    return (
        <Accordion className={bem.block}>
            <Accordion.Item className={bem.element('item')}>
                <Accordion.Header className={bem.element('header')}>
                    <span className={bem.element('header-content')}>
                        <Folder className={bem.element('ikon')} aria-hidden={true} />
                        <BodyShort>{dokumenter.length} dokumenter</BodyShort>
                    </span>
                </Accordion.Header>
                <Accordion.Content className={bem.element('content')}>
                    {dokumenter.map((dokument) => {
                        return <Dokument key={guid()} dokument={dokument} />;
                    })}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default GrupperteDokumenter;
