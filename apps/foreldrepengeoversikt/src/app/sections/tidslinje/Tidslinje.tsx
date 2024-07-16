import { UseQueryResult } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { Link as LinkInternal, useParams } from 'react-router-dom';

import { ExternalLink } from '@navikt/ds-icons';
import { BodyShort, Button, Link, ReadMore } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';
import { bemUtils } from '@navikt/fp-utils';

import NoeGikkGalt from 'app/components/noe-gikk-galt/NoeGikkGalt';
import OversiktRoutes from 'app/routes/routes';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import { Ytelse } from 'app/types/Ytelse';
import { guid } from 'app/utils/guid';
import { getAlleYtelser, getBarnGrupperingFraSak, getFørsteUttaksdagIForeldrepengesaken } from 'app/utils/sakerUtils';
import {
    VENTEÅRSAKER,
    getAktivTidslinjeStegIndex,
    getAlleTidslinjehendelser,
    getHendelserForVisning,
    getTidslinjehendelseTittel,
} from 'app/utils/tidslinjeUtils';

import DokumentHendelse from './DokumentHendelse';
import TidslinjeHendelse from './TidslinjeHendelse';
import './tidslinje-hendelse.css';

interface Params {
    saker: SakOppslag;
    visHeleTidslinjen: boolean;
    søkersBarn: SøkerinfoDTOBarn[] | undefined;
    manglendeVedleggQuery: UseQueryResult<Skjemanummer[], Error>;

    tidslinjeHendelserQuery: UseQueryResult<Tidslinjehendelse[], Error>;
}

const Tidslinje: React.FunctionComponent<Params> = ({
    saker,
    visHeleTidslinjen,
    søkersBarn,
    tidslinjeHendelserQuery,
    manglendeVedleggQuery,
}) => {
    const params = useParams();
    const intl = useIntl();
    const sakPath = location.pathname.replace(`/${OversiktRoutes.TIDSLINJEN}`, '');

    const bem = bemUtils('tidslinje-hendelse');
    const alleSaker = getAlleYtelser(saker);
    const sak = alleSaker.find((sak) => sak.saksnummer === params.saksnummer)!; // TODO: burde ikke bruke ! her
    const førsteUttaksdagISaken =
        sak.ytelse === Ytelse.FORELDREPENGER ? getFørsteUttaksdagIForeldrepengesaken(sak) : undefined;

    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);
    const erAvslåttForeldrepengesøknad =
        sak.ytelse === Ytelse.FORELDREPENGER &&
        !!sak.gjeldendeVedtak &&
        (sak.gjeldendeVedtak.perioder.length === 0 ||
            sak.gjeldendeVedtak.perioder.every((p) => p.resultat !== undefined && p.resultat.innvilget === false));
    const erInnvilgetForeldrepengesøknad =
        sak.ytelse === Ytelse.FORELDREPENGER && sak.åpenBehandling === undefined && !!sak.gjeldendeVedtak;
    if (tidslinjeHendelserQuery.isError || manglendeVedleggQuery.isError || sak === undefined) {
        return (
            <NoeGikkGalt>
                Vi klarer ikke å vise informasjon om hva som skjer i saken din akkurat nå. Feilen er hos oss, ikke hos
                deg. Prøv igjen senere.
            </NoeGikkGalt>
        );
    }

    const tidslinjeHendelserData = tidslinjeHendelserQuery.data ?? [];
    const manglendeVedleggData = manglendeVedleggQuery.data ?? [];

    if (tidslinjeHendelserData.length === 0) {
        return null;
    }

    const åpenBehandlingPåVent =
        sak.åpenBehandling && VENTEÅRSAKER.includes(sak.åpenBehandling.tilstand) ? sak.åpenBehandling : undefined;

    const alleSorterteHendelser = getAlleTidslinjehendelser(
        tidslinjeHendelserData,
        åpenBehandlingPåVent,
        manglendeVedleggData,
        sak,
        barnFraSak,
        erAvslåttForeldrepengesøknad,
        intl,
    );

    const hendelserForVisning = getHendelserForVisning(
        visHeleTidslinjen,
        alleSorterteHendelser,
        erAvslåttForeldrepengesøknad,
        erInnvilgetForeldrepengesøknad,
    );

    const aktivtStegIndex = getAktivTidslinjeStegIndex(hendelserForVisning, erInnvilgetForeldrepengesøknad);
    const finnesHendelserFørAktivtSteg = alleSorterteHendelser.find((hendelse) =>
        dayjs(hendelse.opprettet).isSameOrBefore(dayjs(), 'd'),
    );
    return (
        <div>
            {hendelserForVisning.map((hendelse, index) => {
                const isActiveStep = index === aktivtStegIndex;
                const alleDokumenter = hendelse.dokumenter.map((dokument) => {
                    return <DokumentHendelse dokument={dokument} key={dokument.url} visesITidslinjen={true} />;
                });
                const visKlokkeslett =
                    hendelse.tidslinjeHendelseType !== TidslinjehendelseType.FAMILIEHENDELSE &&
                    dayjs(hendelse.opprettet).isSameOrBefore(dayjs());
                const erSisteHendelsenIHeleTidslinjen =
                    alleSorterteHendelser.findIndex((h) => h === hendelse) === alleSorterteHendelser.length - 1;
                const erSistePåForsidenMenIkkeSisteIHeleTidslinjen =
                    !visHeleTidslinjen && index === hendelserForVisning.length - 1 && !erSisteHendelsenIHeleTidslinjen;
                return (
                    <TidslinjeHendelse
                        date={hendelse.opprettet}
                        title={getTidslinjehendelseTittel(
                            hendelse,
                            intl,
                            hendelse.tidligstBehandlingsDato,
                            manglendeVedleggData,
                            barnFraSak,
                            sak,
                        )}
                        key={guid()}
                        isActiveStep={isActiveStep}
                        visKlokkeslett={visKlokkeslett}
                        type={hendelse.tidslinjeHendelseType}
                        førsteUttaksdagISaken={førsteUttaksdagISaken}
                        tidligstBehandlingsDato={hendelse.tidligstBehandlingsDato}
                        finnesHendelserFørAktivtSteg={!!finnesHendelserFørAktivtSteg}
                        visHeleTidslinjen={visHeleTidslinjen}
                        erSistePåForsidenMenIkkeSisteIHeleTidslinjen={erSistePåForsidenMenIkkeSisteIHeleTidslinjen}
                    >
                        <ul style={{ listStyle: 'none', padding: '0' }}>
                            {hendelse.tidslinjeHendelseType === TidslinjehendelseType.VENT_DOKUMENTASJON &&
                                manglendeVedleggData &&
                                manglendeVedleggData.length > 1 && (
                                    <div className={bem.element('manglende_vedlegg')}>
                                        <div>
                                            {intl.formatMessage({
                                                id: 'tidslinje.VENT_DOKUMENTASJON.flereVedlegg.tittel',
                                            })}
                                        </div>
                                        <ul>
                                            {manglendeVedleggData.map((skjemaId) => {
                                                return (
                                                    <li key={guid()}>
                                                        {intl.formatMessage({ id: `ettersendelse.${skjemaId}` })}
                                                    </li>
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
                                    header={`Du sendte ${hendelse.dokumenter.length} dokumenter`}
                                >
                                    {alleDokumenter}
                                </ReadMore>
                            )}
                            {hendelse.linkTittel && hendelse.eksternalUrl && (
                                <Link href={hendelse.eksternalUrl} className={bem.element('link')}>
                                    <BodyShort size="small">{hendelse.linkTittel}</BodyShort>
                                    <ExternalLink fontSize={'16px'} aria-hidden={true}></ExternalLink>
                                </Link>
                            )}
                            {hendelse.linkTittel && hendelse.internalUrl && (
                                <LinkInternal
                                    className={bem.element('medium_font')}
                                    to={`${sakPath}/${hendelse.internalUrl}`}
                                >
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
