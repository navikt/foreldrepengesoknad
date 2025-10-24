import { Link } from '@navikt/ds-react';

import { DokumentDto } from '@navikt/fp-types';

import { lagUrl } from '../../../utils/dokumenterUtils';

export const DokumentLenke = ({ dokument }: { readonly dokument: DokumentDto }) => {
    return (
        <Link href={lagUrl(dokument)} target="_blank" className="block overflow-hidden overflow-ellipsis">
            {dokument.tittel}
        </Link>
    );
};
