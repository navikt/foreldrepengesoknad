import { FileIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Link } from '@navikt/ds-react';

import { TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';

import { hentInntektsmelding } from '../../api/api';
import { OversiktRoutes } from '../../routes/routes';
import { lagUrl } from '../../utils/dokumenterUtils';

interface Props {
    dokument: TidslinjeHendelseDto_fpoversikt['dokumenter'][0];
    visesITidslinjen: boolean;
}

export const DokumentHendelse = ({ dokument, visesITidslinjen }: Props) => {
    const { tittel } = dokument;
    const url = lagUrl(dokument);

    return (
        <li
            className={
                visesITidslinjen
                    ? 'text-ax-font-size-medium flex items-center'
                    : 'text-ax-font-size-large flex items-center'
            }
        >
            <FileIcon className="text-ax-bg-accent-strong min-w-[24px]" aria-hidden={true} />
            <Link href={url} className="text-ax-bg-accent-strong min-w-[24px]" target="_blank">
                {tittel}
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
