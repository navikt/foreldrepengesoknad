import { Link } from '@navikt/ds-react';

import { DokumentDto_fpoversikt } from '@navikt/fp-types';

import { API_URLS } from '../../../api/queries.ts';

export const DokumentLenke = ({ dokument }: { dokument: DokumentDto_fpoversikt }) => {
    return (
        <Link
            href={API_URLS.hentDokument(dokument.journalpostId ?? 'ukjent', dokument.dokumentId ?? 'ukjent')}
            target="_blank"
            className="block overflow-hidden overflow-ellipsis"
        >
            {dokument.tittel}
        </Link>
    );
};
