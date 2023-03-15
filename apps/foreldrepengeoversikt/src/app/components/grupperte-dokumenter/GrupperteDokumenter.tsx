import React from 'react';
import { Dokument as DokumentType } from 'app/types/Dokument';
import Dokument from '../dokument/Dokument';
import { bemUtils, guid } from '@navikt/fp-common';
import { Accordion, BodyShort } from '@navikt/ds-react';

import './grupperte-dokumenter.css';
import { Folder } from '@navikt/ds-icons';

interface Props {
    dokumenter: DokumentType[];
}

const GrupperteDokumenter: React.FunctionComponent<Props> = ({ dokumenter }) => {
    const bem = bemUtils('grupperte-dokumenter');

    return (
        <Accordion className={bem.block}>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <span className={bem.element('header-content')}>
                        <Folder className={bem.element('ikon')} />
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
