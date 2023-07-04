import { BodyShort, Button, Link, Loader, ReadMore } from '@navikt/ds-react';
import { Link as LinkInternal, useParams } from 'react-router-dom';
import { bemUtils, guid, intlUtils } from '@navikt/fp-common';
import Api from 'app/api/api';

import DokumentHendelse from './DokumentHendelse';
import TidslinjeHendelse from './TidslinjeHendelse';
import { ExternalLink } from '@navikt/ds-icons';
import {
    VENTEÅRSAKER,
    getTidslinjehendelseTittel,
    getHendelserForVisning,
    getAlleTidslinjehendelser,
} from 'app/utils/tidslinjeUtils';
import './tidslinje-hendelse.css';
import { useIntl } from 'react-intl';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import NoeGikkGalt from 'app/components/noe-gikk-galt/NoeGikkGalt';
import dayjs from 'dayjs';
import { Ytelse } from 'app/types/Ytelse';
import { SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';
import { getAlleYtelser, getBarnGrupperingFraSak, getFørsteUttaksdagIForeldrepengesaken } from 'app/utils/sakerUtils';
import { SakOppslag } from 'app/types/SakOppslag';
import OversiktRoutes from 'app/routes/routes';

//import { S } from '@storybook/react/dist/types-0a347bb9';

interface Params {
    saker: SakOppslag;
    visHeleTidslinjen: boolean;
    søkersBarn: SøkerinfoDTOBarn[] | undefined;
}

const Tidslinje: React.FunctionComponent<Params> = ({ saker, visHeleTidslinjen, søkersBarn }) => {
    const params = useParams();
    const intl = useIntl();
    const sakPath = location.pathname.replace(`/${OversiktRoutes.TIDSLINJEN}`, '');

    const bem = bemUtils('tidslinje-hendelse');
    const alleSaker = getAlleYtelser(saker);
    const sak = alleSaker.find((sak) => sak.saksnummer === params.saksnummer)!;
    const førsteUttaksdagISaken =
        sak.ytelse === Ytelse.FORELDREPENGER ? getFørsteUttaksdagIForeldrepengesaken(sak) : undefined;
    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(params.saksnummer!);

    const { manglendeVedleggData, manglendeVedleggError } = Api.useGetManglendeVedlegg(params.saksnummer!);
    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);
    const erAvslåttForeldrepengesøknad =
        sak.ytelse === Ytelse.FORELDREPENGER &&
        !!sak.gjeldendeVedtak &&
        (sak.gjeldendeVedtak.perioder.length === 0 ||
            sak.gjeldendeVedtak.perioder.every((p) => p.resultat.innvilget === false));
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

    const alleSorterteHendelser = getAlleTidslinjehendelser(
        tidslinjeHendelserData,
        åpenBehandlingPåVent,
        manglendeVedleggData,
        sak,
        barnFraSak,
        erAvslåttForeldrepengesøknad,
        intl
    );

    const hendelserForVisning = getHendelserForVisning(
        visHeleTidslinjen,
        alleSorterteHendelser,
        erAvslåttForeldrepengesøknad
    );
    const aktivtStegIndex = hendelserForVisning.findIndex((hendelse) =>
        dayjs(hendelse.opprettet).isAfter(dayjs(), 'd')
    );
    const finnesHendelserFørAktivtSteg = alleSorterteHendelser.find((hendelse) =>
        dayjs(hendelse.opprettet).isSameOrBefore(dayjs(), 'd')
    );

    return (
        <div>
            {hendelserForVisning.map((hendelse, index) => {
                const isActiveStep = index === aktivtStegIndex;
                const alleDokumenter = hendelse.dokumenter.map((dokument) => {
                    return <DokumentHendelse dokument={dokument} key={dokument.url} />;
                });
                const visKlokkeslett =
                    hendelse.tidslinjeHendelseType !== TidslinjehendelseType.FAMILIEHENDELSE &&
                    dayjs(hendelse.opprettet).isSameOrBefore(dayjs());

                return (
                    <TidslinjeHendelse
                        date={hendelse.opprettet}
                        title={getTidslinjehendelseTittel(
                            hendelse.tidslinjeHendelseType,
                            intl,
                            hendelse.tidligstBehandlingsDato,
                            manglendeVedleggData,
                            barnFraSak,
                            sak
                        )}
                        key={guid()}
                        isActiveStep={isActiveStep}
                        visKlokkeslett={visKlokkeslett}
                        type={hendelse.tidslinjeHendelseType}
                        førsteUttaksdagISaken={førsteUttaksdagISaken}
                        tidligstBehandlingsDato={hendelse.tidligstBehandlingsDato}
                        finnesHendelserFørAktivtSteg={!!finnesHendelserFørAktivtSteg}
                        visHeleTidslinjen={visHeleTidslinjen}
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
                                    header={`Du sendte ${hendelse.dokumenter.length} dokumenter`}
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
