import { FileIcon } from '@navikt/aksel-icons';

import { Detail, HGrid, HStack, Hide, Link, Show, Tag } from '@navikt/ds-react';

import { DokumentDto_fpoversikt, JournalpostType_fpoversikt } from '@navikt/fp-types';
import { formatDateExtended } from '@navikt/fp-utils';

import { API_URLS } from '../../api/queries.ts';

interface Props {
    readonly dokument: DokumentDto_fpoversikt;
}

function DokumentLenke({ dokument }: { dokument: DokumentDto_fpoversikt }) {
    return (
        <>
            <FileIcon className="text-ax-text-accent-subtle" height={24} width={24} aria-hidden={true} />
            <Link
                href={API_URLS.hentDokument(dokument.journalpostId ?? 'ukjent', dokument.dokumentId ?? 'ukjent')}
                target="_blank"
                className="block overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
                {dokument.tittel}
            </Link>
        </>
    );
}

function DokumentAvsender({ dokumentType }: { dokumentType: JournalpostType_fpoversikt }) {
    const text = (() => {
        switch (dokumentType) {
            case 'UTGÅENDE_DOKUMENT':
                return 'Nav';
            case 'INNGÅENDE_DOKUMENT':
                return 'Du';
        }
    })();

    return (
        <Tag size="small" className="w-max justify-self-end" variant="neutral">
            {text}
        </Tag>
    );
}

export const Dokument = ({ dokument }: Props) => {
    const { type, mottatt } = dokument;

    return (
        <div className="border-ax-neutral-400 border-b-2 p-4 pr-3 last:border-none">
            <Hide above="md" className="flex flex-col gap-4">
                <HGrid columns={'max-content 1fr'} gap="space-16">
                    <DokumentLenke dokument={dokument} />
                </HGrid>
                <HStack gap="space-16" align="center" justify="space-between">
                    <DokumentAvsender dokumentType={type} />
                    <Detail textColor="subtle">{formatDateExtended(mottatt)}</Detail>
                </HStack>
            </Hide>
            <Show above="md">
                <HGrid columns="max-content 2fr max-content 112px" gap="space-32" align="center">
                    <DokumentLenke dokument={dokument} />
                    <Detail textColor="subtle">{formatDateExtended(mottatt)}</Detail>
                    <DokumentAvsender dokumentType={type} />
                </HGrid>
            </Show>
        </div>
    );
};
