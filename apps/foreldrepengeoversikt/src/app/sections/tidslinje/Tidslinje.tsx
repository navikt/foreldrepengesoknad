import { BodyShort, Button, Link, Loader, ReadMore } from '@navikt/ds-react';
import { Link as LinkInternal, useParams } from 'react-router-dom';
import { bemUtils, guid, intlUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import { Sak } from 'app/types/Sak';
import { EngangsstønadSak } from 'app/types/EngangsstønadSak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';

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
    getHendelserForVisning,
} from 'app/utils/tidslinjeUtils';
import './tidslinje-hendelse.css';
import { useIntl } from 'react-intl';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import NoeGikkGalt from 'app/components/noe-gikk-galt/NoeGikkGalt';
import dayjs from 'dayjs';

interface Params {
    sak: Sak | EngangsstønadSak | SvangerskapspengeSak | undefined;
    visHeleTidslinjen: boolean;
}

const Tidslinje: React.FunctionComponent<Params> = ({ sak, visHeleTidslinjen }) => {
    const params = useParams();
    const intl = useIntl();
    const bem = bemUtils('tidslinje-hendelse');
    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(params.saksnummer!);
    const { manglendeVedleggData, manglendeVedleggError } = Api.useGetManglendeVedlegg(params.saksnummer!);

    if (tidslinjeHendelserError || manglendeVedleggError || sak === undefined) {
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
    const sorterteHendelser = [...alleHendelser].sort(sorterTidslinjehendelser);

    const hendelserForVisning = getHendelserForVisning(visHeleTidslinjen, sorterteHendelser);
    const aktivtStegIndex = hendelserForVisning.findIndex((hendelse) =>
        dayjs(hendelse.opprettet).isSameOrAfter(dayjs(), 'd')
    );
    return (
        <div>
            {hendelserForVisning.map((hendelse, index) => {
                const isActiveStep = index === aktivtStegIndex;
                const alleDokumenter = hendelse.dokumenter.map((dokument) => {
                    return <DokumentHendelse dokument={dokument} key={dokument.url} />;
                });

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
                        isActiveStep={isActiveStep}
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
                                <BodyShort size="small" className={bem.element('mer_informasjon')}>
                                    {hendelse.merInformasjon}
                                </BodyShort>
                            )}
                            {alleDokumenter.length > 0 && alleDokumenter.length <= 3 && alleDokumenter}
                            {alleDokumenter.length > 0 && alleDokumenter.length > 3 && (
                                <ReadMore
                                    className={bem.element('medium_font')}
                                    header={`Du lastet opp ${hendelse.dokumenter.length} dokumenter`}
                                >
                                    {alleDokumenter}
                                </ReadMore>
                            )}
                            {hendelse.linkTittel && hendelse.eksternalUrl && (
                                <Link href={hendelse.eksternalUrl}>
                                    <BodyShort size="small">{hendelse.linkTittel}</BodyShort>
                                    <ExternalLink fontSize={'16px'}></ExternalLink>
                                </Link>
                            )}
                            {hendelse.linkTittel && hendelse.internalUrl && (
                                <LinkInternal className={bem.element('medium_font')} to={hendelse.internalUrl}>
                                    <Button>{hendelse.linkTittel}</Button>
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
