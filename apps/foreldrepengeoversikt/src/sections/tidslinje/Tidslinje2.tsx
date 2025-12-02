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
import { useIntl } from 'react-intl';
import { Link as LinkInternal } from 'react-router-dom';

import { BodyShort, Button, Link, List, Process, ReadMore, VStack } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';
import { BarnDto_fpoversikt, TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

import { NavRoutes, OversiktRoutes } from '../../routes/routes.ts';
import { Sak } from '../../types/Sak';
import { Tidslinjehendelse, Tidslinjehendelse2 } from '../../types/Tidslinjehendelse.ts';
import { formaterDato } from '../../utils/dateUtils.ts';
import { guid } from '../../utils/guid';
import { getBarnGrupperingFraSak } from '../../utils/sakerUtils';
import { getAktivTidslinjeStegIndex, getTidligstBehandlingsDatoForTidligSøknad } from '../../utils/tidslinjeUtils';
import {
    beregnTidslinjeVindu,
    getAlleTidslinjehendelser2,
    getTidslinjeTittelForBarnTreÅr,
    tidslinjeTittelForFamiliehendelse,
} from '../../utils/tidslinjeUtils2.ts';
import { DokumentHendelse, InntektsmeldingDokumentHendelse } from './DokumentHendelse';

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
    const intl = useIntl();
    const { sak, søkersBarn, tidslinjeHendelser, manglendeVedlegg, visHeleTidslinjen } = props;

    if (tidslinjeHendelser.length === 0) {
        return null;
    }

    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);

    const erInnvilgetForeldrepengesøknad =
        sak.ytelse === 'FORELDREPENGER' && sak.åpenBehandling === undefined && !!sak.gjeldendeVedtak;

    const alleSorterteHendelser = getAlleTidslinjehendelser2({
        tidslinjeHendelserBackend: tidslinjeHendelser,
        sak,
        barnFraSak,
        intl,
    });

    const { hendelser, aktivtStegIndexISnitt, isTruncated } = beregnTidslinjeVindu({
        alleSorterteHendelser,
        aktivtStegIndex: getAktivTidslinjeStegIndex(alleSorterteHendelser, erInnvilgetForeldrepengesøknad),
        visHeleTidslinjen,
    });

    return (
        <Process isTruncated={isTruncated}>
            {hendelser.map((hendelse, index) => {
                const erAktivt = aktivtStegIndexISnitt === index;
                const erUtført = aktivtStegIndexISnitt > index;
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
    hendelse: Tidslinjehendelse2;
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
            const ids = manglendeVedlegg.join(',');
            const queryPart = ids ? `?skjematype=${encodeURIComponent(ids)}` : '';
            const url = `/sak/${sak.saksnummer}/${OversiktRoutes.ETTERSEND}${queryPart}`;
            return (
                <Process.Event
                    status={status}
                    timestamp="SNAREST" // TODO: intl
                    title={intl.formatMessage({ id: 'tidslinje.tittel.VENT_DOKUMENTASJON' })}
                    bullet={<PaperplaneIcon />}
                >
                    <VStack gap="2">
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
                        <BodyShort size="small">
                            {intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.informasjon' })}
                        </BodyShort>
                        <Button className="mt-2 w-fit" size="small" to={url} as={LinkInternal}>
                            {intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.linkTittel' })}
                        </Button>
                    </VStack>
                </Process.Event>
            );
        }
        case 'VENTER_MELDEKORT': // TODO: hvordan?
        case 'VENTER_PGA_TIDLIG_SØKNAD': {
            if (sak.åpenBehandling === undefined) {
                return null;
            }
            const tidligstBehandlingsDato = getTidligstBehandlingsDatoForTidligSøknad(sak.ytelse, sak.åpenBehandling);

            const merInformasjon =
                sak.ytelse === 'FORELDREPENGER'
                    ? intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.foreldrepenger' })
                    : intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.svangerskapspenger' });

            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage(
                        { id: 'tidslinje.tittel.VENTER_PGA_TIDLIG_SØKNAD' },
                        {
                            tidlistBehandlingsdato: formatDate(tidligstBehandlingsDato),
                        },
                    )}
                    timestamp={'TIDLIGST ' + formaterDato(tidligstBehandlingsDato, 'D. MMM YYYY')} // TODO: bedre dato, intl
                    bullet={<HourglassBottomFilledIcon />}
                >
                    <BodyShort>{merInformasjon}</BodyShort>
                    <Link href={NavRoutes.SØKNADSFRISTER} className="text-ax-brand-blue-700 mt-2">
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
                    <BodyShort>{intl.formatMessage({ id: 'tidslinje.VENT_INNTEKTSMELDING.informasjon' })}</BodyShort>
                    <Link href={NavRoutes.VENT_INNTEKTSMELDING} className="text-ax-brand-blue-700 mt-2">
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
            const merInformasjon =
                sak.ytelse === 'ENGANGSSTØNAD'
                    ? intl.formatMessage({ id: 'tidslinje.FREMTIDIG_VEDTAK.informasjon.engangsstønad' })
                    : intl.formatMessage({ id: 'tidslinje.FREMTIDIG_VEDTAK.informasjon' });
            let url = NavRoutes.SAKSBEHANDLINGSTIDER_FP;
            if (sak.ytelse === 'SVANGERSKAPSPENGER') {
                url = NavRoutes.SAKSBEHANDLINGSTIDER_SVP;
            }
            if (sak.ytelse === 'ENGANGSSTØNAD') {
                url = NavRoutes.SAKSBEHANDLINGSTIDER_ES;
            }

            return (
                <Process.Event
                    status={status}
                    timestamp="SENERE" // TODO: intl
                    title={intl.formatMessage({ id: 'tidslinje.tittel.FREMTIDIG_VEDTAK' })}
                    bullet={<InboxDownIcon />}
                >
                    <BodyShort>{merInformasjon}</BodyShort>
                    <Link href={url} className="text-ax-brand-blue-700 mt-2">
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
            if (sak.ytelse !== 'FORELDREPENGER') {
                return null;
            }

            // TODO: utlede slikt per prosesspunkt, eller der hvor hendelser lages?
            const { antallBarn } = sak.familiehendelse;
            const merInformasjon = sak.gjelderAdopsjon
                ? intl.formatMessage({ id: 'tidslinje.BARN_TRE_ÅR.adopsjon.informasjon' }, { antallBarn })
                : intl.formatMessage({ id: 'tidslinje.BARN_TRE_ÅR.fødsel.informasjon' }, { antallBarn });

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
                    <BodyShort>{merInformasjon}</BodyShort>
                    <Link href={NavRoutes.HVOR_LENGE} className="text-ax-brand-blue-700 mt-2">
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
