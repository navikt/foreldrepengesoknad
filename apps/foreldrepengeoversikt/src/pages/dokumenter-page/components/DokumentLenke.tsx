import { Link } from '@navikt/ds-react';

import { DokumentDto } from '@navikt/fp-types';

import { lagUrl } from '../../../utils/dokumenterUtils';

export const DokumentLenke = ({ dokument }: { readonly dokument: DokumentDto }) => {
    const url = lagUrl(dokument);

    return (
        <>
            <Link href={url} target="_blank" className="block overflow-hidden overflow-ellipsis">
                {dokument.tittel}
            </Link>
        </>
    );
};
