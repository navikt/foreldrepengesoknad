import { Folder } from '@navikt/ds-icons';
import { Accordion, BodyShort, HStack } from '@navikt/ds-react';

import { Dokument as DokumentType } from 'app/types/Dokument';
import { guid } from 'app/utils/guid';

import Dokument from '../dokument/Dokument';

interface Props {
    dokumenter: DokumentType[];
}

const GrupperteDokumenter: React.FunctionComponent<Props> = ({ dokumenter }) => {
    return (
        <Accordion className="mb-4 -mt-4">
            <Accordion.Item>
                <Accordion.Header
                    style={{
                        boxShadow: 'inset 0 -2px 0 0 rgb(7 26 54 / 21%)',
                        padding: '1rem 0 1rem 1rem',
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}
                >
                    <HStack gap="4">
                        <Folder aria-hidden={true} />
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

export default GrupperteDokumenter;
