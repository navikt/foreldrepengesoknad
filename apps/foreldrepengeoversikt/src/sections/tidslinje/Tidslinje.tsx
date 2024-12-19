import { ExternalLinkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { Link as LinkInternal } from 'react-router-dom';

import { BodyShort, Button, Link, ReadMore } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';

import { Sak } from '../../types/Sak';
import { SøkerinfoDTOBarn } from '../../types/SøkerinfoDTO';
import { Tidslinjehendelse } from '../../types/Tidslinjehendelse';
import { TidslinjehendelseType } from '../../types/TidslinjehendelseType';
import { Ytelse } from '../../types/Ytelse';
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
    søkersBarn: SøkerinfoDTOBarn[];
    manglendeVedlegg: Skjemanummer[];
    tidslinjeHendelser: Tidslinjehendelse[];
}

export const Tidslinje = ({ sak, visHeleTidslinjen, søkersBarn, tidslinjeHendelser, manglendeVedlegg }: Props) => {
    const intl = useIntl();

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
                    if (hendelse.tidslinjeHendelseType === TidslinjehendelseType.INNTEKTSMELDING) {
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
                            manglendeVedlegg,
                            barnFraSak,
                            sak,
                        )}
                        key={guid()}
                        isActiveStep={isActiveStep}
                        visKlokkeslett={visKlokkeslett}
                        type={hendelse.tidslinjeHendelseType}
                        førsteUttaksdagISaken={førsteUttaksdagISaken?.toISOString()}
                        tidligstBehandlingsDato={hendelse.tidligstBehandlingsDato}
                        finnesHendelserFørAktivtSteg={!!finnesHendelserFørAktivtSteg}
                        visHeleTidslinjen={visHeleTidslinjen}
                        erSistePåForsidenMenIkkeSisteIHeleTidslinjen={erSistePåForsidenMenIkkeSisteIHeleTidslinjen}
                    >
                        <ul className="list-none p-0">
                            {hendelse.tidslinjeHendelseType === TidslinjehendelseType.VENT_DOKUMENTASJON &&
                                manglendeVedlegg &&
                                manglendeVedlegg.length > 1 && (
                                    <div className={styles.manglendeVedlegg}>
                                        <div>
                                            {intl.formatMessage({
                                                id: 'tidslinje.VENT_DOKUMENTASJON.flereVedlegg.tittel',
                                            })}
                                        </div>
                                        <ul>
                                            {manglendeVedlegg.map((skjemaId) => {
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
