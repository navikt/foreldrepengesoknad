import { FolderIcon } from '@navikt/aksel-icons';

import { Accordion, BodyShort, HStack } from '@navikt/ds-react';

import { guid } from '../../utils/guid';
import { Dokument } from '../dokument/Dokument';
import { Dokument as DokumentType } from './../../types/Dokument';

interface Props {
    dokumenter: DokumentType[];
}

export const GrupperteDokumenter: React.FunctionComponent<Props> = ({ dokumenter }) => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header
                    className="flex-row-reverse justify-between p-4 pt-0"
                    // NOTE: tailwind støtter ikke box-shadows.
                    // Enten må det være et Aksel-token, eller så må det legges inn i custom config. Tar det derfor i style
                    style={{
                        boxShadow: 'inset 0 -2px 0 0 rgb(7 26 54 / 21%)',
                    }}
                >
                    <HStack gap="4">
                        <FolderIcon aria-hidden={true} />
                        <BodyShort>{dokumenter.length} dokumenter</BodyShort>
                    </HStack>
                </Accordion.Header>
                <Accordion.Content className="ml-12 p-0">
                    {dokumenter.map((dokument) => {
                        return <Dokument key={guid()} dokument={dokument} />;
                    })}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
