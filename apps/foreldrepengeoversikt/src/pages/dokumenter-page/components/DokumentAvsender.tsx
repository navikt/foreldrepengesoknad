import { Tag } from '@navikt/ds-react';

import { DokumentKategori } from '@navikt/fp-types';

export const DokumentAvsender = ({ dokumentType }: { readonly dokumentType: DokumentKategori }) => {
    const labelMap: Record<DokumentKategori, string> = {
        UTGÅENDE_DOKUMENT: 'Nav',
        INNGÅENDE_DOKUMENT: 'Du',
    };

    return (
        <Tag size="small" className="min-w-12 justify-self-end" variant="neutral">
            {labelMap[dokumentType]}
        </Tag>
    );
};
