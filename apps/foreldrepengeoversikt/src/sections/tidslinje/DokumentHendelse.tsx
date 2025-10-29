import { FileIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Link } from '@navikt/ds-react';

import { Dokument_fpoversikt } from '@navikt/fp-types';

import { API_URLS, hentInntektsmelding } from '../../api/api';
import { OversiktRoutes } from '../../routes/routes';

interface Props {
    dokument: Dokument_fpoversikt;
    visesITidslinjen: boolean;
}

export const DokumentHendelse = ({ dokument, visesITidslinjen }: Props) => {
    return (
        <li
            className={
                visesITidslinjen
                    ? 'text-ax-font-size-medium flex items-center'
                    : 'text-ax-font-size-large flex items-center'
            }
        >
            <FileIcon className="text-ax-bg-accent-strong min-w-[24px]" aria-hidden={true} />
            <Link
                href={API_URLS.hentDokument(dokument.journalpostId, dokument.dokumentId ?? 'ukjent')}
                className="text-ax-bg-accent-strong min-w-[24px]"
                target="_blank"
            >
                {dokument.tittel}
            </Link>
        </li>
    );
};

export const InntektsmeldingDokumentHendelse = ({ dokument, visesITidslinjen }: Props) => {
    const { saksnummer } = useParams();
    const { tittel } = dokument;

    const arbeidsgiverNavn = (useQuery(hentInntektsmelding(saksnummer!)).data ?? []).find(
        (im) => im.journalpostId === dokument.journalpostId,
    )?.arbeidsgiverNavn;

    return (
        <li
            className={
                visesITidslinjen
                    ? 'text-ax-font-size-medium flex items-center'
                    : 'text-ax-font-size-large flex items-center'
            }
        >
            <FileIcon className="text-ax-bg-accent-strong min-w-[24px]" aria-hidden={true} />
            <Link
                as={RouterLink}
                to={`${OversiktRoutes.SAKSOVERSIKT}/${saksnummer}/${OversiktRoutes.INNTEKTSMELDING}/${dokument.journalpostId}`}
                className="text-ax-bg-accent-strong min-w-[24px]"
            >
                {tittel}
                {arbeidsgiverNavn ? ` for ${arbeidsgiverNavn}` : ''}
            </Link>
        </li>
    );
};
