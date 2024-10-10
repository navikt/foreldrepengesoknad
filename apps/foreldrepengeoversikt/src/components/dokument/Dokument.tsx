import { FileContent } from '@navikt/ds-icons';
import { Detail, HGrid, HStack, Hide, Link, Show, Tag } from '@navikt/ds-react';

import { formatDateExtended } from '@navikt/fp-utils';

import { Dokument as DokumentType } from '../../types/Dokument';
import { DokumentType as DokumentTypeEnum } from '../../types/DokumentType';
import { lagUrl } from './../../utils/dokumenterUtils';

interface Props {
    dokument: DokumentType;
}

function DokumentLenke({ dokument }: { dokument: DokumentType }) {
    const url = lagUrl(dokument);

    return (
        <>
            <FileContent className="text-text-action" height={24} width={24} aria-hidden={true} />
            <Link href={url} target="_blank" className="overflow-hidden overflow-ellipsis block whitespace-nowrap">
                {dokument.tittel}
            </Link>
        </>
    );
}

function DokumentAvsender({ dokumentType }: { dokumentType: DokumentTypeEnum }) {
    const text = (() => {
        switch (dokumentType) {
            case DokumentTypeEnum.ARBEIDSGIVER:
                return 'Arbeidsgiver';
            case DokumentTypeEnum.UTGÅENDE_DOKUMENT:
                return 'Nav';
            case DokumentTypeEnum.INNGÅENDE_DOKUMENT:
                return 'Du';
        }
    })();

    return (
        <Tag size="small" className="w-max justify-self-end" variant="neutral">
            {text}
        </Tag>
    );
}

const Dokument: React.FunctionComponent<Props> = ({ dokument }) => {
    const { type, mottatt } = dokument;

    return (
        <div className="border-b-2 p-4 pr-3 border-gray-300 last:border-none">
            <Hide above="md" className="flex flex-col gap-4">
                <HGrid columns={'max-content 1fr'} gap="4">
                    <DokumentLenke dokument={dokument} />
                </HGrid>
                <HStack gap="4" align="center" justify="space-between">
                    <DokumentAvsender dokumentType={type} />
                    <Detail textColor="subtle">{formatDateExtended(mottatt)}</Detail>
                </HStack>
            </Hide>
            <Show above="md">
                <HGrid columns="max-content 2fr max-content 112px" gap="8" align="center">
                    <DokumentLenke dokument={dokument} />
                    <Detail textColor="subtle">{formatDateExtended(mottatt)}</Detail>
                    <DokumentAvsender dokumentType={type} />
                </HGrid>
            </Show>
        </div>
    );
};

export default Dokument;
