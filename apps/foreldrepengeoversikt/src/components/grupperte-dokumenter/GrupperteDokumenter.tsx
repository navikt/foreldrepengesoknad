import { FolderIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { Accordion, BodyShort, HStack } from '@navikt/ds-react';

import { DokumentDto_fpoversikt } from '@navikt/fp-types';

import { guid } from '../../utils/guid';
import { Dokument } from '../dokument/Dokument';

interface Props {
    dokumenter: DokumentDto_fpoversikt[];
}

export const GrupperteDokumenter = ({ dokumenter }: Props) => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header
                    className="flex-row-reverse rounded-none p-4 pt-4"
                    // NOTE: tailwind støtter ikke box-shadows.
                    // Enten må det være et Aksel-token, eller så må det legges inn i custom config. Tar det derfor i style
                    style={{
                        boxShadow: 'inset 0 -2px 0 0 rgb(7 26 54 / 21%)',
                    }}
                >
                    <HStack gap="space-16">
                        <FolderIcon aria-hidden={true} />
                        <BodyShort>
                            <FormattedMessage id="dokumenter.antall" values={{ count: dokumenter.length }} />
                        </BodyShort>
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
