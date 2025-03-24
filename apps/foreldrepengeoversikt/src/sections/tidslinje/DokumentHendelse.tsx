import { FileIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Link } from '@navikt/ds-react';

import { DokumentDto } from '@navikt/fp-types';

import { hentInntektsmelding } from '../../api/api';
import { OversiktRoutes } from '../../routes/routes';
import { lagUrl } from '../../utils/dokumenterUtils';
import styles from './dokumentHendelse.module.css';

interface Props {
    dokument: DokumentDto;
    visesITidslinjen: boolean;
}

export const DokumentHendelse = ({ dokument, visesITidslinjen }: Props) => {
    const { tittel } = dokument;
    const url = lagUrl(dokument);

    return (
        <li className={visesITidslinjen ? styles.dokumentHendelseMedium : styles.dokumentHendelseLarge}>
            <FileIcon className={styles.ikon} aria-hidden={true} />
            <Link href={url} className={styles.ikon} target="_blank">
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
        <li className={visesITidslinjen ? styles.dokumentHendelseMedium : styles.dokumentHendelseLarge}>
            <FileIcon className={styles.ikon} aria-hidden={true} />
            <Link
                as={RouterLink}
                to={`${OversiktRoutes.SAKSOVERSIKT}/${saksnummer}/${OversiktRoutes.INNTEKTSMELDING}/${dokument.journalpostId}`}
                className={styles.ikon}
            >
                {tittel}
                {arbeidsgiverNavn ? ` for ${arbeidsgiverNavn}` : ''}
            </Link>
        </li>
    );
};
