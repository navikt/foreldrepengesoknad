import { BodyShort, Button, Link, Loader } from '@navikt/ds-react';
import { Link as LinkInternal } from 'react-router-dom';
import { bemUtils, guid, intlUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import { Sak } from 'app/types/Sak';
import { EngangsstønadSak } from 'app/types/EngangsstønadSak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import React from 'react';
import { useParams } from 'react-router-dom';
import DokumentHendelse from './DokumentHendelse';
import TidslinjeHendelse from './TidslinjeHendelse';
import { ExternalLink } from '@navikt/ds-icons';
import {
    VENTEÅRSAKER,
    sorterTidslinjehendelser,
    getTidslinjehendelserFraBehandlingPåVent,
    getTidslinjehendelseStatus,
    getTidslinjehendelseTittel,
    getTidslinjehendelserDetaljer,
} from 'app/utils/tidslinjeUtils';
import './tidslinje-hendelse.css';
import { useIntl } from 'react-intl';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import NoeGikkGalt from 'app/components/noe-gikk-galt/NoeGikkGalt';

interface Params {
    sak: Sak | EngangsstønadSak | SvangerskapspengeSak;
}

const Tidslinje: React.FunctionComponent<Params> = ({ sak }) => {
    const params = useParams();
    const intl = useIntl();
    const bem = bemUtils('tidslinje-hendelse');
    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(params.saksnummer!);
    const { manglendeVedleggData, manglendeVedleggError } = Api.useGetManglendeVedlegg(params.saksnummer!);

    if (tidslinjeHendelserError || manglendeVedleggError) {
        return (
            <NoeGikkGalt>
                Vi klarer ikke å vise informasjon om hva som skjer i saken din akkurat nå. Feilen er hos oss, ikke hos
                deg. Prøv igjen senere.
            </NoeGikkGalt>
        );
    }

    if (!tidslinjeHendelserData || !manglendeVedleggData) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
    }

    const åpenBehandlingPåVent =
        sak.åpenBehandling && VENTEÅRSAKER.includes(sak.åpenBehandling.tilstand) ? sak.åpenBehandling : undefined;

    const tidslinjeHendelser = getTidslinjehendelserDetaljer(tidslinjeHendelserData, intl);
    const venteHendelser = åpenBehandlingPåVent
        ? getTidslinjehendelserFraBehandlingPåVent(åpenBehandlingPåVent, manglendeVedleggData, intl)
        : undefined;

    const alleHendelser = venteHendelser ? tidslinjeHendelser.concat(venteHendelser) : tidslinjeHendelser;
    const sorterteHendelser = alleHendelser.sort(sorterTidslinjehendelser);

    return (
        <div>
            {sorterteHendelser.map((hendelse) => {
                return (
                    <TidslinjeHendelse
                        date={hendelse.opprettet}
                        type={getTidslinjehendelseStatus(hendelse.tidslinjeHendelseType, hendelse.opprettet)}
                        title={getTidslinjehendelseTittel(
                            hendelse.tidslinjeHendelseType,
                            intl,
                            hendelse.tidligstBehandlingsDato,
                            manglendeVedleggData,
                            sak.ytelse
                        )}
                        key={guid()}
                    >
                        <ul style={{ listStyle: 'none', padding: '0' }}>
                            {hendelse.tidslinjeHendelseType === TidslinjehendelseType.VENT_DOKUMENTASJON &&
                                manglendeVedleggData &&
                                manglendeVedleggData.length > 1 && (
                                    <div className={bem.element('manglende_vedlegg')}>
                                        <div>{intlUtils(intl, 'tidslinje.VENT_DOKUMENTASJON.flereVedlegg.tittel')}</div>
                                        <ul>
                                            {manglendeVedleggData.map((skjemaId) => {
                                                return (
                                                    <li key={guid()}>{intlUtils(intl, `ettersendelse.${skjemaId}`)}</li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            {hendelse.merInformasjon && (
                                <BodyShort className={bem.element('mer_informasjon')}>
                                    {hendelse.merInformasjon}
                                </BodyShort>
                            )}
                            {hendelse.dokumenter.length > 0 &&
                                hendelse.dokumenter.map((dokument) => {
                                    return <DokumentHendelse dokument={dokument} key={dokument.url} />;
                                })}
                            {hendelse.linkTittel && hendelse.eksternalUrl && (
                                <Link href={hendelse.eksternalUrl}>
                                    <BodyShort>{hendelse.linkTittel}</BodyShort>
                                    <ExternalLink></ExternalLink>
                                </Link>
                            )}
                            {hendelse.linkTittel && hendelse.internalUrl && (
                                <LinkInternal to={hendelse.internalUrl}>
                                    <Button className={bem.element('link')}>{hendelse.linkTittel}</Button>
                                </LinkInternal>
                            )}
                        </ul>
                    </TidslinjeHendelse>
                );
            })}
        </div>
    );
};

export default Tidslinje;
