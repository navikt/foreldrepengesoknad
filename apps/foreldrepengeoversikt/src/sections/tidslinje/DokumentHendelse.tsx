import { FileIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { HStack, Link } from '@navikt/ds-react';

import { Dokument_fpoversikt } from '@navikt/fp-types';

import { API_URLS, hentInntektsmelding } from '../../api/queries.ts';
import { OversiktRoutes } from '../../routes/routes';

interface Props {
    dokument: Dokument_fpoversikt;
    visesITidslinjen: boolean;
}

export const DokumentHendelse = ({ dokument, visesITidslinjen }: Props) => {
    return (
        <HStack
            className={
                visesITidslinjen
                    ? 'text-ax-font-size-medium flex items-center'
                    : 'text-ax-font-size-large flex items-center'
            }
        >
            <FileIcon className="min-w-[24px]" aria-hidden={true} />
            <Link
                href={API_URLS.hentDokument(dokument.journalpostId, dokument.dokumentId ?? 'ukjent')}
                className="min-w-[24px]"
                target="_blank"
            >
                {dokument.tittel}
            </Link>
        </HStack>
    );
};

export const InntektsmeldingDokumentHendelse = ({ dokument, visesITidslinjen }: Props) => {
    const { saksnummer } = useParams();
    const { tittel } = dokument;

    const arbeidsgiverNavn = (useQuery(hentInntektsmelding(saksnummer!)).data ?? []).find(
        (im) => im.journalpostId === dokument.journalpostId,
    )?.arbeidsgiverNavn;

    return (
        <HStack
            className={
                visesITidslinjen
                    ? 'text-ax-font-size-medium flex items-center'
                    : 'text-ax-font-size-large flex items-center'
            }
        >
            <FileIcon className="min-w-[24px]" aria-hidden={true} />
            <Link
                as={RouterLink}
                to={`${OversiktRoutes.SAKSOVERSIKT}/${saksnummer}/${OversiktRoutes.INNTEKTSMELDING}/${dokument.journalpostId}`}
                className="min-w-[24px]"
            >
                {tittel}
                {arbeidsgiverNavn && (
                    <>
                        {' '}
                        <FormattedMessage id="inntektsmelding.for" values={{ arbeidsgiverNavn }} />
                    </>
                )}
            </Link>
        </HStack>
    );
};
