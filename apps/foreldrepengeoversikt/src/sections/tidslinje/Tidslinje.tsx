import { ExternalLinkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { Link as LinkInternal } from 'react-router-dom';

import { BodyShort, Button, Link, List, ReadMore } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';
import { BarnDto_fpoversikt, TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';

import { Sak } from '../../types/Sak';
import { guid } from '../../utils/guid';
import { getBarnGrupperingFraSak, getFørsteUttaksdagIForeldrepengesaken } from '../../utils/sakerUtils';
import {
    VENTEÅRSAKER,
    getAktivTidslinjeStegIndex,
    getAlleTidslinjehendelser,
    getHendelserForVisning,
    getTidslinjehendelseTittel,
} from '../../utils/tidslinjeUtils';
import { DokumentHendelse, InntektsmeldingDokumentHendelse } from './DokumentHendelse';
import { TidslinjeHendelse } from './TidslinjeHendelse';
import styles from './tidslinje.module.css';

interface Props {
    sak: Sak;
    visHeleTidslinjen: boolean;
    søkersBarn: BarnDto_fpoversikt[];
    manglendeVedlegg: Skjemanummer[];
    tidslinjeHendelser: TidslinjeHendelseDto_fpoversikt[];
}

export const Tidslinje = ({ sak, visHeleTidslinjen, søkersBarn, tidslinjeHendelser, manglendeVedlegg }: Props) => {
    const intl = useIntl();

    const førsteUttaksdagISaken =
        sak.ytelse === 'FORELDREPENGER' ? getFørsteUttaksdagIForeldrepengesaken(sak) : undefined;

    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);
    const erAvslåttForeldrepengesøknad =
        sak.ytelse === 'FORELDREPENGER' &&
        !!sak.gjeldendeVedtak &&
        sak.gjeldendeVedtak.perioder.every((p) => p.resultat !== undefined && p.resultat.innvilget === false);
    const erInnvilgetForeldrepengesøknad =
        sak.ytelse === 'FORELDREPENGER' && sak.åpenBehandling === undefined && !!sak.gjeldendeVedtak;

    if (tidslinjeHendelser.length === 0) {
        return null;
    }

    const åpenBehandlingPåVent =
        sak.åpenBehandling && VENTEÅRSAKER.includes(sak.åpenBehandling.tilstand) ? sak.åpenBehandling : undefined;

    const alleSorterteHendelser = getAlleTidslinjehendelser(
        tidslinjeHendelser,
        åpenBehandlingPåVent,
        manglendeVedlegg,
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
                    if (hendelse.utvidetTidslinjeHendelseType === 'INNTEKTSMELDING') {
                        return (
                            <InntektsmeldingDokumentHendelse
                                key={`${dokument.journalpostId}-${dokument.dokumentId}`}
                                dokument={{ ...dokument, tittel: 'Inntektsmelding' }}
                                visesITidslinjen={true}
                            />
                        );
                    }
                    return (
                        <DokumentHendelse
                            dokument={dokument}
                            key={`${dokument.journalpostId}-${dokument.dokumentId}`}
                            visesITidslinjen={true}
                        />
                    );
                });
                const visKlokkeslett =
                    hendelse.utvidetTidslinjeHendelseType !== 'FAMILIEHENDELSE' &&
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
                            manglendeVedlegg,
                            barnFraSak,
                            sak,
                        )}
                        key={guid()}
                        isActiveStep={isActiveStep}
                        visKlokkeslett={visKlokkeslett}
                        utvidetTidslinjeHendelseType={hendelse.utvidetTidslinjeHendelseType}
                        førsteUttaksdagISaken={førsteUttaksdagISaken?.toISOString()}
                        tidligstBehandlingsDato={hendelse.tidligstBehandlingsDato}
                        finnesHendelserFørAktivtSteg={!!finnesHendelserFørAktivtSteg}
                        visHeleTidslinjen={visHeleTidslinjen}
                        erSistePåForsidenMenIkkeSisteIHeleTidslinjen={erSistePåForsidenMenIkkeSisteIHeleTidslinjen}
                    >
                        <ul>
                            {hendelse.utvidetTidslinjeHendelseType === 'VENT_DOKUMENTASJON' &&
                                manglendeVedlegg &&
                                manglendeVedlegg.length > 1 && (
                                    <div className={styles.manglendeVedlegg}>
                                        <div>
                                            {intl.formatMessage({
                                                id: 'tidslinje.VENT_DOKUMENTASJON.flereVedlegg.tittel',
                                            })}
                                        </div>
                                        <List>
                                            {manglendeVedlegg.map((skjemaId) => {
                                                return (
                                                    <List.Item key={guid()}>
                                                        {intl.formatMessage({ id: `ettersendelse.${skjemaId}` })}
                                                    </List.Item>
                                                );
                                            })}
                                        </List>
                                    </div>
                                )}
                            {hendelse.merInformasjon && (
                                <BodyShort size="small" className={styles.merInformasjon}>
                                    {hendelse.merInformasjon}
                                </BodyShort>
                            )}
                            {alleDokumenter.length > 0 && alleDokumenter.length <= 3 && alleDokumenter}
                            {alleDokumenter.length > 0 && alleDokumenter.length > 3 && (
                                <ReadMore
                                    className={styles.mediumFont}
                                    header={`Du sendte ${hendelse.dokumenter.length} dokumenter`}
                                >
                                    {alleDokumenter}
                                </ReadMore>
                            )}
                            {hendelse.linkTittel && hendelse.eksternalUrl && (
                                <Link href={hendelse.eksternalUrl} className={styles.link}>
                                    <BodyShort size="small">{hendelse.linkTittel}</BodyShort>
                                    <ExternalLinkIcon aria-hidden={true} />
                                </Link>
                            )}
                            {hendelse.linkTittel && hendelse.internalUrl && (
                                <Button
                                    size="small"
                                    className="mt-2"
                                    to={`/sak/${sak.saksnummer}/${hendelse.internalUrl}`}
                                    as={LinkInternal}
                                >
                                    {hendelse.linkTittel}
                                </Button>
                            )}
                        </ul>
                    </TidslinjeHendelse>
                );
            })}
        </div>
    );
};
