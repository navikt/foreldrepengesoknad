import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { FileContent } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { hentInntektsmelding } from '../../api/api';
import Routes from '../../routes/routes';
import { Dokument } from '../../types/Dokument';
import { lagUrl } from '../../utils/dokumenterUtils';
import './dokument-hendelse.css';

interface Props {
    dokument: Dokument;
    visesITidslinjen: boolean;
}

export const DokumentHendelse: React.FunctionComponent<Props> = ({ dokument, visesITidslinjen }) => {
    const bem = bemUtils('dokument-hendelse');
    const { tittel } = dokument;
    const url = lagUrl(dokument);

    return (
        <li className={classNames(`${bem.block} ${visesITidslinjen ? bem.modifier('medium') : bem.modifier('large')}`)}>
            <FileContent className={bem.element('ikon')} aria-hidden={true} />
            <Link href={url} className={bem.element('ikon')} target="_blank">
                {tittel}
            </Link>
        </li>
    );
};

export const InntektsmeldingDokumentHendelse = ({ dokument, visesITidslinjen }: Props) => {
    const { saksnummer } = useParams();
    const bem = bemUtils('dokument-hendelse');
    const { tittel } = dokument;

    const arbeidsgiverNavn = (useQuery(hentInntektsmelding(saksnummer!)).data ?? []).find(
        (im) => im.journalpostId === dokument.journalpostId,
    )?.arbeidsgiverNavn;

    return (
        <li className={classNames(`${bem.block} ${visesITidslinjen ? bem.modifier('medium') : bem.modifier('large')}`)}>
            <FileContent className={bem.element('ikon')} aria-hidden={true} />
            <Link
                as={RouterLink}
                to={`${Routes.SAKSOVERSIKT}/${saksnummer}/${Routes.INNTEKTSMELDING}/${dokument.journalpostId}`}
                className={bem.element('ikon')}
            >
                {tittel}
                {arbeidsgiverNavn ? ` for ${arbeidsgiverNavn}` : ''}
            </Link>
        </li>
    );
};
