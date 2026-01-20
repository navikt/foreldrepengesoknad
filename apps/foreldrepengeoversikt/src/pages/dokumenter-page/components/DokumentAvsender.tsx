import { Tag } from '@navikt/ds-react';

import { JournalpostType_fpoversikt } from '@navikt/fp-types';

const labelMap: Record<JournalpostType_fpoversikt, string> = {
    UTGÅENDE_DOKUMENT: 'Nav',
    INNGÅENDE_DOKUMENT: 'Du',
};

export const DokumentAvsender = ({ dokumentType }: { dokumentType: JournalpostType_fpoversikt }) => {
    return (
        <Tag data-color="neutral" size="small" className="min-w-12 justify-self-end" variant="outline">
            {labelMap[dokumentType]}
        </Tag>
    );
};
