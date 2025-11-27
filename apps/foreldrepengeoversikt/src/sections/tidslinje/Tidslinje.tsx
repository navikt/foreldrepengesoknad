import {
    BabyWrappedIcon,
    BellIcon,
    ChildHairEyesIcon,
    DocPencilIcon,
    ExternalLinkIcon,
    HourglassBottomFilledIcon,
    InboxDownIcon,
    InboxUpIcon,
    PaperplaneIcon,
    TasklistSendIcon,
    ThumbDownIcon,
    ThumbUpIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { Link as LinkInternal } from 'react-router-dom';

import { BodyShort, Button, Link, List, Process, ReadMore, VStack } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';
import { BarnDto_fpoversikt, TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

import { EngangsstønadSak, Foreldrepengesak, Sak, SvangerskapspengeSak } from '../../types/Sak';
import { Tidslinjehendelse } from '../../types/Tidslinjehendelse.ts';
import { formaterDato } from '../../utils/dateUtils.ts';
import { guid } from '../../utils/guid';
import { getBarnGrupperingFraSak, getFørsteUttaksdagIForeldrepengesaken } from '../../utils/sakerUtils';
import {
    VENTEÅRSAKER,
    getAktivTidslinjeStegIndex,
    getAlleTidslinjehendelser,
    getHendelserForVisning,
    getTidslinjehendelseTittel,
} from '../../utils/tidslinjeUtils';
import { getTidslinjeTittelForBarnTreÅr, tidslinjeTittelForFamiliehendelse } from '../../utils/tidslinjeUtils2.ts';
import { DokumentHendelse, InntektsmeldingDokumentHendelse } from './DokumentHendelse';
import { TidslinjeHendelse } from './TidslinjeHendelse';

type TidslinjeProps = {
    visHeleTidslinjen: boolean;
    søkersBarn: BarnDto_fpoversikt[];
    manglendeVedlegg: Skjemanummer[];
    tidslinjeHendelser: TidslinjeHendelseDto_fpoversikt[];
};

type Props = {
    sak: Sak;
} & TidslinjeProps;

export const TidslinjeNy = (props: Props) => {
    const { sak, ...rest } = props;

    if (props.tidslinjeHendelser.length === 0) {
        return null;
    }

    switch (sak.ytelse) {
        case 'ENGANGSSTØNAD':
            return <TidslinjeES {...rest} sak={sak} />;
        case 'SVANGERSKAPSPENGER':
            return <TidslinjeSVP {...rest} sak={sak} />;
        case 'FORELDREPENGER':
            return <TidslinjeFP {...rest} sak={sak} />;
    }
};

export const TidslinjeES = (props: TidslinjeProps & { sak: EngangsstønadSak }) => {
    return '';
};

export const TidslinjeSVP = (props: TidslinjeProps & { sak: SvangerskapspengeSak }) => {
    return '';
};

export const TidslinjeFP = (props: TidslinjeProps & { sak: Foreldrepengesak }) => {
    const intl = useIntl();
    const { sak, søkersBarn, tidslinjeHendelser, manglendeVedlegg, visHeleTidslinjen } = props;

    const førsteUttaksdagISaken = getFørsteUttaksdagIForeldrepengesaken(sak);
    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);
    const erAvslåttForeldrepengesøknad =
        sak.gjeldendeVedtak?.perioder.every((p) => p.resultat?.innvilget === false) ?? false;
    const erInnvilgetForeldrepengesøknad = sak.åpenBehandling === undefined && sak.gjeldendeVedtak !== undefined;

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

    return (
        <Process>
            {hendelserForVisning.map((hendelse, index) => {
                const erAktivt = aktivtStegIndex === index;
                const erUtført = aktivtStegIndex > index;
                const status = erAktivt ? 'active' : erUtført ? 'completed' : 'uncompleted';
                return (
                    <Hendelse
                        status={status}
                        søkersBarn={søkersBarn}
                        sak={sak}
                        manglendeVedlegg={manglendeVedlegg}
                        hendelse={hendelse}
                        key={hendelse.opprettet + index}
                    />
                );
            })}
        </Process>
    );
};

const Hendelse = ({
    hendelse,
    sak,
    søkersBarn,
    status,
    manglendeVedlegg,
}: {
    sak: Sak;
    status?: 'active' | 'completed' | 'uncompleted';
    hendelse: Tidslinjehendelse;
    søkersBarn: BarnDto_fpoversikt[];
    manglendeVedlegg: Skjemanummer[];
}) => {
    const intl = useIntl();
    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);
    const { familiehendelse } = sak;

    switch (hendelse.utvidetTidslinjeHendelseType) {
        case 'FAMILIEHENDELSE': {
            const tittel = tidslinjeTittelForFamiliehendelse({
                sak,
                barnFraSak,
                intl,
            });

            return (
                <Process.Event
                    status={status}
                    title={tittel}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMM YYYY')}
                    bullet={<BabyWrappedIcon />}
                />
            );
        }
        case 'FØRSTEGANGSSØKNAD': {
            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage(
                        { id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD' },
                        { ytelse: sak.ytelse.toLowerCase() },
                    )}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')}
                    bullet={<TasklistSendIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'FØRSTEGANGSSØKNAD_NY': {
            return (
                <Process.Event
                    status={status}
                    timestamp={intl.formatMessage({
                        id: 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY.ukjentDatoFørstSøknad', // TODO: trenger vi si presist tidspunkt?
                    })}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD_NY' })}
                    bullet={<TasklistSendIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'ENDRINGSSØKNAD': {
            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.ENDRINGSSØKNAD' })}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')}
                    bullet={<DocPencilIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'VEDTAK': {
            const harAvslag = hendelse.dokumenter.some((d) => d.tittel.includes('Avslagsbrev'));
            const harInnvilget = hendelse.dokumenter.some((d) => d.tittel.includes('Innvilgelsesbrev'));

            // TODO: heller funksjon?
            const tittel = harAvslag
                ? intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.avslått' })
                : harInnvilget
                  ? intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.innvilget' })
                  : intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK' });

            // TODO: litt brutalt med thumbs down?
            const ikon = harAvslag ? <ThumbDownIcon /> : harInnvilget ? <ThumbUpIcon /> : <InboxDownIcon />;

            return (
                <Process.Event
                    status={status}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')}
                    title={tittel}
                    bullet={ikon}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'ETTERSENDING': {
            return (
                <Process.Event
                    status={status}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.ETTERSENDING' })}
                    bullet={<InboxUpIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'VENT_DOKUMENTASJON': {
            return (
                <Process.Event
                    status={status}
                    timestamp="SNAREST" // TODO: intl
                    title={intl.formatMessage({ id: 'tidslinje.tittel.VENT_DOKUMENTASJON' })}
                    bullet={<PaperplaneIcon />}
                >
                    <VStack>
                        <BodyShort>
                            {intl.formatMessage({
                                id: 'tidslinje.VENT_DOKUMENTASJON.flereVedlegg.tittel',
                            })}
                        </BodyShort>
                        <List>
                            {manglendeVedlegg.map((skjemaId) => {
                                return (
                                    <List.Item key={guid()}>
                                        {intl.formatMessage({ id: `ettersendelse.${skjemaId}` })}
                                    </List.Item>
                                );
                            })}
                        </List>
                        <Button
                            className="mt-2 w-fit"
                            size="small"
                            to={`/sak/${sak.saksnummer}/${hendelse.internalUrl}`}
                            as={LinkInternal}
                        >
                            {hendelse.linkTittel}
                        </Button>
                    </VStack>
                </Process.Event>
            );
        }
        case 'VENTER_MELDEKORT': // TODO: hvordan?
        case 'VENTER_PGA_TIDLIG_SØKNAD': {
            if (!hendelse.tidligstBehandlingsDato) {
                return null;
            }
            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage(
                        { id: 'tidslinje.tittel.VENTER_PGA_TIDLIG_SØKNAD' },
                        {
                            tidlistBehandlingsdato: formatDate(hendelse.tidligstBehandlingsDato),
                        },
                    )}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMM YYYY')} // TODO: bedre dato
                    bullet={<HourglassBottomFilledIcon />}
                >
                    <BodyShort>{hendelse.merInformasjon}</BodyShort>
                    <Link href={hendelse.eksternalUrl} className="text-ax-brand-blue-700 mt-2">
                        <BodyShort size="small">
                            {intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.linkTittel' })}
                        </BodyShort>
                        <ExternalLinkIcon aria-hidden={true} />
                    </Link>
                </Process.Event>
            );
        }
        case 'VENTER_INNTEKTSMELDING': {
            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.VENTER_INNTEKTSMELDING' })}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMM YYYY')}
                    bullet={<HourglassBottomFilledIcon />}
                >
                    <BodyShort>{hendelse.merInformasjon}</BodyShort>
                    <Link href={hendelse.eksternalUrl} className="text-ax-brand-blue-700 mt-2">
                        <BodyShort size="small">
                            {intl.formatMessage({ id: 'tidslinje.VENT_INNTEKTSMELDING.linkTittel' })}
                        </BodyShort>
                        <ExternalLinkIcon aria-hidden={true} />
                    </Link>
                </Process.Event>
            );
        }
        case 'UTGÅENDE_VARSEL_TILBAKEBETALING': {
            // TODO: story
            return (
                <Process.Event
                    status={status}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')} // TODO: skrive idag for idag?
                    title={intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_VARSEL_TILBAKEBETALING' })}
                    bullet={<InboxDownIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'UTGÅENDE_ETTERLYS_INNTEKTSMELDING': {
            return (
                <Process.Event
                    status={status}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')} // TODO: skrive idag for idag?
                    title={intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_ETTERLYS_INNTEKTSMELDING' })}
                    bullet={<BellIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'INNTEKTSMELDING': {
            return (
                <Process.Event
                    status={status}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.INNTEKTSMELDING' })}
                    bullet={<InboxDownIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'FREMTIDIG_VEDTAK': {
            return (
                <Process.Event
                    status={status}
                    timestamp="SENERE" // TODO: intl
                    title={intl.formatMessage({ id: 'tidslinje.tittel.FREMTIDIG_VEDTAK' })}
                    bullet={<InboxDownIcon />}
                >
                    <BodyShort>{hendelse.merInformasjon}</BodyShort>
                    <Link href={hendelse.eksternalUrl} className="text-ax-brand-blue-700 mt-2">
                        <BodyShort size="small">
                            {intl.formatMessage({ id: 'tidslinje.FREMTIDIG_VEDTAK.linkTittel' })}
                        </BodyShort>
                        <ExternalLinkIcon aria-hidden={true} />
                    </Link>
                </Process.Event>
            );
        }
        case 'UTGÅENDE_INNHENT_OPPLYSNINGER': {
            return (
                <Process.Event
                    status={status}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm')}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_INNHENT_OPPLYSNINGER' })}
                    bullet={<InboxUpIcon />}
                >
                    {/*// TODO: story*/}
                    <Button size="small" className="mt-2" to={`/sak/${sak.saksnummer}/ettersend`} as={LinkInternal}>
                        {intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.linkTittel' })}
                    </Button>
                </Process.Event>
            );
        }
        case 'BARNET_TRE_ÅR': {
            // TODO: Hva er logikken?
            const skalVises =
                (familiehendelse?.fødselsdato || familiehendelse?.omsorgsovertakelse) && familiehendelse.antallBarn;

            if (!skalVises) {
                return null;
            }
            return (
                <Process.Event
                    status={status}
                    title={getTidslinjeTittelForBarnTreÅr({
                        barnFraSak,
                        intl,
                        familiehendelse,
                    })}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMM YYYY')}
                    bullet={<ChildHairEyesIcon />}
                >
                    <BodyShort>{hendelse.merInformasjon}</BodyShort>
                    <Link href={hendelse.eksternalUrl} className="text-ax-brand-blue-700 mt-2">
                        <BodyShort size="small">
                            {intl.formatMessage({ id: 'tidslinje.BARN_TRE_ÅR.linkTittel' })}
                        </BodyShort>
                        <ExternalLinkIcon aria-hidden={true} />
                    </Link>
                </Process.Event>
            );
        }
        default:
            return null;
    }
};

const DokumenterTilHendelse = ({ hendelse }: { hendelse: Tidslinjehendelse }) => {
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
    if (alleDokumenter.length > 0 && alleDokumenter.length <= 3) {
        return alleDokumenter;
    }
    return (
        <ReadMore className="text-ax-font-size-medium" header={`Du sendte ${hendelse.dokumenter.length} dokumenter`}>
            {alleDokumenter}
        </ReadMore>
    );
};

export const Tidslinje = ({ sak, visHeleTidslinjen, søkersBarn, tidslinjeHendelser, manglendeVedlegg }: Props) => {
    const intl = useIntl();

    // if (sak.ytelse !== "FORELDREPENGER") {
    //     return null;
    // }

    const førsteUttaksdagISaken =
        sak.ytelse === 'FORELDREPENGER' ? getFørsteUttaksdagIForeldrepengesaken(sak) : undefined;

    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);
    const erAvslåttForeldrepengesøknad =
        (sak.ytelse === 'FORELDREPENGER' &&
            sak.gjeldendeVedtak?.perioder.every((p) => p.resultat?.innvilget === false)) ??
        false;
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
                                    <div className="text-ax-font-size-medium mb-4">
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
                                <BodyShort size="small" className="mb-4">
                                    {hendelse.merInformasjon}
                                </BodyShort>
                            )}
                            {alleDokumenter.length > 0 && alleDokumenter.length <= 3 && alleDokumenter}
                            {alleDokumenter.length > 0 && alleDokumenter.length > 3 && (
                                <ReadMore
                                    className="text-ax-font-size-medium"
                                    header={`Du sendte ${hendelse.dokumenter.length} dokumenter`}
                                >
                                    {alleDokumenter}
                                </ReadMore>
                            )}
                            {hendelse.linkTittel && hendelse.eksternalUrl && (
                                <Link href={hendelse.eksternalUrl} className="text-ax-brand-blue-700">
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
