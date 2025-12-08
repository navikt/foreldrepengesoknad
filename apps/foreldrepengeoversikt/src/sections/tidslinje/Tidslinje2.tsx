import {
    BabyWrappedIcon,
    BellIcon,
    ChildHairEyesIcon,
    ClockIcon,
    DocPencilIcon,
    ExternalLinkIcon,
    HourglassBottomFilledIcon,
    InboxDownIcon,
    InboxUpIcon,
    InformationIcon,
    PaperplaneIcon,
    TasklistSendIcon,
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
import { Tidslinjehendelse2 } from '../../types/Tidslinjehendelse.ts';
import { formaterDato } from '../../utils/dateUtils.ts';
import { guid } from '../../utils/guid';
import { getBarnGrupperingFraSak } from '../../utils/sakerUtils';
import {
    beregnTidslinjeVindu,
    finnIndex,
    getAlleTidslinjehendelser,
    getTidligstBehandlingsDatoForTidligSøknad,
    getTidslinjeTittelForBarnTreÅr,
    tidslinjeTittelForFamiliehendelse,
} from '../../utils/tidslinjeUtils.ts';
import { DokumentHendelse, InntektsmeldingDokumentHendelse } from './DokumentHendelse';

type Props = {
    visHeleTidslinjen: boolean;
    søkersBarn: BarnDto_fpoversikt[];
    manglendeVedlegg: Skjemanummer[];
    tidslinjeHendelser: TidslinjeHendelseDto_fpoversikt[];
    sak: Sak;
};

export const Tidslinje = ({ sak, søkersBarn, tidslinjeHendelser, manglendeVedlegg, visHeleTidslinjen }: Props) => {
    const intl = useIntl();

    if (tidslinjeHendelser.length === 0) {
        return null;
    }

    const barnFraSak = getBarnGrupperingFraSak(sak, søkersBarn);

    const alleSorterteHendelser = getAlleTidslinjehendelser({
        tidslinjeHendelserBackend: tidslinjeHendelser,
        sak,
        barnFraSak,
        intl,
    });

    const { hendelser, aktivtStegIndexISnitt, isTruncated } = beregnTidslinjeVindu({
        alleSorterteHendelser,
        aktivtStegIndex: finnIndex(alleSorterteHendelser),
        visHeleTidslinjen,
    });

    return (
        <Process isTruncated={isTruncated}>
            {hendelser.map((hendelse, index) => {
                const erUtført = aktivtStegIndexISnitt >= index;
                const status = erUtført ? 'completed' : 'uncompleted';
                return (
                    <Hendelse
                        key={hendelse.opprettet + index}
                        status={status}
                        søkersBarn={søkersBarn}
                        sak={sak}
                        manglendeVedlegg={manglendeVedlegg}
                        hendelse={hendelse}
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

    const hendelseDatoMedKlokkeslett = formaterDato(hendelse.opprettet, 'D. MMMM YYYY [kl] HH:mm');
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
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMMM YYYY')}
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
                    timestamp={hendelseDatoMedKlokkeslett}
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
                    timestamp={hendelseDatoMedKlokkeslett}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD_NY' })}
                    bullet={<TasklistSendIcon />}
                >
                    <BodyShort>
                        {intl.formatMessage({
                            id: 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY.ukjentDatoFørstSøknad',
                        })}
                    </BodyShort>
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'ENDRINGSSØKNAD': {
            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.ENDRINGSSØKNAD' })}
                    timestamp={hendelseDatoMedKlokkeslett}
                    bullet={<DocPencilIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'VEDTAK': {
            const harAvslag = hendelse.dokumenter.some((d) => d.tittel.toLowerCase().includes('avslag'));
            const harInnvilget = hendelse.dokumenter.some((d) => d.tittel.toLowerCase().includes('innvilgelse'));

            // TODO: heller funksjon?
            const tittel = harAvslag
                ? intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.avslått' })
                : harInnvilget
                  ? intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.innvilget' })
                  : intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK' });

            const ikon = harAvslag ? <InboxDownIcon /> : harInnvilget ? <ThumbUpIcon /> : <InboxDownIcon />;

            return (
                <Process.Event status={status} timestamp={hendelseDatoMedKlokkeslett} title={tittel} bullet={ikon}>
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'ETTERSENDING': {
            return (
                <Process.Event
                    status={status}
                    timestamp={hendelseDatoMedKlokkeslett}
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
                    timestamp={intl.formatMessage({
                        id: 'tidslinje.snarest',
                    })}
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
        case 'VENTER_MELDEKORT': {
            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.VENTER_MELDEKORT' })}
                    timestamp={formaterDato(hendelse.opprettet, 'D. MMM YYYY')}
                    bullet={<HourglassBottomFilledIcon />}
                >
                    <BodyShort>{intl.formatMessage({ id: 'tidslinje.VENT_MELDEKORT.informasjon' })}</BodyShort>
                    <Link href={NavRoutes.VENT_MELDEKORT} className="text-ax-brand-blue-700 mt-2">
                        <BodyShort size="small">
                            {intl.formatMessage({ id: 'tidslinje.VENT_MELDEKORT.linkTittel' })}
                        </BodyShort>
                        <ExternalLinkIcon aria-hidden={true} />
                    </Link>
                </Process.Event>
            );
        }
        case 'VENTER_PGA_TIDLIG_SØKNAD': {
            if (sak.åpenBehandling === undefined) {
                return null;
            }

            const tidligstBehandlingsDato = getTidligstBehandlingsDatoForTidligSøknad(sak);

            if (!tidligstBehandlingsDato) {
                // Burde ikke skje
                return null;
            }

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
                    timestamp={intl.formatMessage(
                        { id: 'tidslinje.tidligst' },
                        { dato: formaterDato(tidligstBehandlingsDato, 'D. MMMM YYYY') },
                    )}
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
                    timestamp={intl.formatMessage({
                        id: 'tidslinje.snarest',
                    })}
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
            return (
                <Process.Event
                    status={status}
                    timestamp={hendelseDatoMedKlokkeslett}
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
                    timestamp={hendelseDatoMedKlokkeslett}
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
                    timestamp={hendelseDatoMedKlokkeslett}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.INNTEKTSMELDING' })}
                    bullet={<InboxDownIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        }
        case 'FREMTIDIG_VEDTAK': {
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
                    timestamp={intl.formatMessage({ id: 'tidslinje.senere' })}
                    title={intl.formatMessage({ id: 'tidslinje.tittel.FREMTIDIG_VEDTAK' })}
                    bullet={<ClockIcon />}
                >
                    <BodyShort>{intl.formatMessage({ id: 'tidslinje.FREMTIDIG_VEDTAK.informasjon' })}</BodyShort>
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
                    timestamp={hendelseDatoMedKlokkeslett}
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
        case 'FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV':
            return (
                <Process.Event
                    status={status}
                    title={intl.formatMessage({
                        id: 'tidslinje.tittel.FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV',
                    })}
                    timestamp={hendelseDatoMedKlokkeslett}
                    bullet={<InformationIcon />}
                >
                    <DokumenterTilHendelse hendelse={hendelse} />
                </Process.Event>
            );
        default:
            return null;
    }
};

const DokumenterTilHendelse = ({ hendelse }: { hendelse: Tidslinjehendelse2 }) => {
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
