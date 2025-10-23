import { Tag } from '@navikt/ds-react';

import { DokumentKategori } from '@navikt/fp-types';

export const DokumentAvsender = ({ dokumentType }: { readonly dokumentType: DokumentKategori }) => {
    const text = (() => {
        switch (dokumentType) {
            case 'UTGÅENDE_DOKUMENT':
                return 'Nav';
            case 'INNGÅENDE_DOKUMENT':
                return 'Du';
        }
    })();

    return (
        <Tag size="small" className="min-w-12 justify-self-end" variant="neutral">
            {text}
        </Tag>
    );
};
