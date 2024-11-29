import { sum, sumBy } from 'lodash';
import { createContext, useContext } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-common';
import { RettighetType } from '@navikt/fp-common/src/common/types/RettighetType';
import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, Stønadskonto, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Tidsperioden, formatOppramsing } from '@navikt/fp-utils';

import { getVarighetString } from './utils/dateUtils';

type Props = {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
    rettighetType: RettighetType;
    forelder: Forelder;
};
const KvoteContext = createContext<Props | null>(null);

export const useKvote = () => {
    const context = useContext(KvoteContext);
    if (!context) {
        throw new Error('useKvote må brukes i en KvoteContext.Provider');
    }

    return context;
};

export const KvoteOppsummering = (props: Props) => {
    return (
        <KvoteContext.Provider value={props}>
            {(props.rettighetType === 'ALENEOMSORG' || props.rettighetType === 'BARE_SØKER_RETT') && (
                <ExpansionCard aria-label="Kvoteoversikt" size="small">
                    <KvoteTittelKunEnHarForeldrepenger />
                    <ExpansionCard.Content>
                        <VStack gap="4">
                            <ForeldrepengerFørFødselKvoter />
                            <KunEnHarForeldrepengeKvoter />
                            <AktivitetsfriKvoter />
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            )}
            {props.rettighetType === 'BEGGE_RETT' && <BeggeRettKvote />}
        </KvoteContext.Provider>
    );
};

const BeggeRettKvote = () => {
    return (
        <ExpansionCard aria-label="Kvoteoversikt" size="small">
            <KvoteTittel />
            <ExpansionCard.Content>
                <VStack gap="4">
                    <ForeldrepengerFørFødselKvoter />
                    <MødreKvoter />
                    <div className="h-[2px] bg-gray-300 w-full" />
                    <FedreKvoter />
                    <div className="h-[2px] bg-gray-300 w-full" />
                    <FellesKvoter />
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

const KvoteTittelKunEnHarForeldrepenger = () => {
    const { konto, perioder } = useKvote();
    const intl = useIntl();

    const dagerBrukt = summerDagerIPerioder(
        perioder.filter(
            (p) =>
                p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                p.kontoType === 'FORELDREPENGER' ||
                p.kontoType === 'AKTIVITETSFRI_KVOTE',
        ),
    );

    const fpKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const aktivitetsfriKonto = konto.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const førFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');

    const totaltTilgjengeligeDager = sumBy([fpKonto, aktivitetsfriKonto, førFødselKonto], (k) => k?.dager ?? 0);

    const antallUbrukteDager = totaltTilgjengeligeDager - dagerBrukt;

    if (antallUbrukteDager === 0) {
        const tittel = 'All tid er i planen';
        const beskrivelse = `Du har lagt til ${getVarighetString(dagerBrukt, intl)} i planen.`;
        return (
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
                <ExpansionCard.Description>{beskrivelse}</ExpansionCard.Description>
            </ExpansionCard.Header>
        );
    }

    const tittel = `Det er ${getVarighetString(antallUbrukteDager, intl)} igjen som kan legges til i planen`;
    return (
        <ExpansionCard.Header>
            <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
            <ExpansionCard.Description>
                Hvis du ønsker å bruke mer foreldrepenger enn det som ligger i planen nå, kan du sende en
                endringssøknad.
            </ExpansionCard.Description>
        </ExpansionCard.Header>
    );
};

const KvoteTittel = () => {
    const { konto, perioder } = useKvote();
    const intl = useIntl();

    const dagerBruktAvMor = summerDagerIPerioder(
        perioder.filter(
            (p) =>
                p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                p.kontoType === 'MØDREKVOTE' ||
                p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER',
        ),
    );
    const dagerBruktAvFar = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FEDREKVOTE' || p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'),
    );
    const dagerFellesBrukt = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FELLESPERIODE' || p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER'),
    );

    const fedreKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const førFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødreKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    const ubrukteDagerMor =
        mødreKonto && førFødselKonto ? mødreKonto.dager + førFødselKonto.dager - dagerBruktAvMor : 0;
    const ubrukteDagerFar = fedreKonto ? fedreKonto.dager - dagerBruktAvFar : 0;
    const ubrukteDagerFelles = fellesKonto ? fellesKonto.dager - dagerFellesBrukt : 0;

    const antallUbrukteDager = sum([ubrukteDagerFar, ubrukteDagerMor, ubrukteDagerFelles]);

    if (antallUbrukteDager === 0) {
        const tittel = 'All tid er i planen';
        const beskrivelseMor = dagerBruktAvMor > 0 ? `${getVarighetString(dagerBruktAvMor, intl)} til mor` : '';
        const beskrivelseFelles =
            dagerFellesBrukt > 0 ? `${getVarighetString(dagerFellesBrukt, intl)} av fellesperioden` : '';
        const beskrivelseFar = dagerBruktAvFar > 0 ? `${getVarighetString(dagerBruktAvFar, intl)} til far` : '';

        const beskrivelse = `${formatOppramsing([beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean), intl)} er lagt til i planen`;
        return (
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
                <ExpansionCard.Description>{beskrivelse}</ExpansionCard.Description>
            </ExpansionCard.Header>
        );
    }

    const tittel = `Det er ${getVarighetString(antallUbrukteDager, intl)} igjen som kan legges til i planen`;
    const beskrivelseMor = ubrukteDagerMor > 0 ? `${getVarighetString(ubrukteDagerMor, intl)} til mor` : '';
    const beskrivelseFelles =
        ubrukteDagerFelles > 0 ? `${getVarighetString(ubrukteDagerFelles, intl)} av fellesperioden` : '';
    const beskrivelseFar = ubrukteDagerFar > 0 ? `${getVarighetString(ubrukteDagerFar, intl)} til far` : '';
    const beskrivelse = `${formatOppramsing([beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean), intl)} ligger ikke i planen. `;
    return (
        <ExpansionCard.Header>
            <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
            <ExpansionCard.Description>
                {beskrivelse}
                Hvis du ønsker å bruke mer foreldrepenger enn det som ligger i planen nå, kan du sende en
                endringssøknad. Annen forelder må sende søknad selv for å bruke sine uker med foreldrepenger.
            </ExpansionCard.Description>
        </ExpansionCard.Header>
    );
};

const ForeldrepengerFørFødselKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantePerioder = perioder.filter((p) => p.kontoType === 'FORELDREPENGER_FØR_FØDSEL');
    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const KunEnHarForeldrepengeKvoter = () => {
    const { konto, perioder } = useKvote();
    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'FORELDREPENGER' && p.morsAktivitet !== 'IKKE_OPPGITT',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const FedreKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'FEDREKVOTE' || p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const AktivitetsfriKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const MødreKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'MØDREKVOTE' || p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER',
    );
    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const FellesKvoter = () => {
    const intl = useIntl();
    const { konto, perioder, forelder } = useKvote();
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    if (!fellesKonto) {
        return null;
    }

    const dagerBruktAvDeg = summerDagerIPerioder(perioder.filter((p) => p.kontoType === 'FELLESPERIODE'));
    const dagerBruktAvAnnenPart = summerDagerIPerioder(
        perioder.filter((p) => p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER'),
    );
    const ubrukteDager = fellesKonto.dager - (dagerBruktAvDeg + dagerBruktAvAnnenPart);

    const prosentBruktAvDeg = Math.round((dagerBruktAvDeg / fellesKonto.dager) * 100);
    const prosentBruktAvAnnenPart = Math.round((dagerBruktAvAnnenPart / fellesKonto.dager) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">
                {getVarighetString(fellesKonto.dager, intl)} for å dele, fellesperiode
            </BodyShort>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            kontoType: forelder === 'MOR' ? StønadskontoType.Mødrekvote : StønadskontoType.Fedrekvote,
                            prosent: prosentBruktAvDeg,
                        },
                        {
                            kontoType:
                                forelder === 'FAR_MEDMOR' ? StønadskontoType.Mødrekvote : StønadskontoType.Fedrekvote,
                            prosent: prosentBruktAvAnnenPart,
                        },
                        {
                            kontoType: undefined,
                            erFyllt: false,
                            prosent: 100 - (prosentBruktAvAnnenPart + prosentBruktAvDeg),
                        },
                    ]}
                />
                <BodyShort>
                    {getVarighetString(dagerBruktAvDeg, intl)} er lagt til for deg,{' '}
                    {getVarighetString(dagerBruktAvAnnenPart, intl)} er lagt til for annen forelder{' '}
                    {ubrukteDager > 0 ? `, ${getVarighetString(ubrukteDager, intl)} gjenstår` : ''}
                </BodyShort>
            </VStack>
        </VStack>
    );
};

const StandardVisning = ({ konto, perioder }: { konto?: Stønadskonto; perioder: SaksperiodeNy[] }) => {
    const intl = useIntl();

    if (!konto) {
        return null;
    }

    const dagerBrukt = summerDagerIPerioder(perioder);

    const ubrukteDager = konto.dager - dagerBrukt;
    const prosentBruktAvFedrekvote = Math.floor((dagerBrukt / konto.dager) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">
                {finnVisningsnavForKvote(konto.konto)} - {getVarighetString(konto.dager, intl)}
            </BodyShort>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            kontoType: konto.konto,
                            prosent: prosentBruktAvFedrekvote,
                        },
                        {
                            kontoType: konto.konto,
                            prosent: 100 - prosentBruktAvFedrekvote,
                            erFyllt: false,
                        },
                    ]}
                />
                <BodyShort>
                    {getVarighetString(dagerBrukt, intl)} er lagt til
                    {ubrukteDager > 0 ? `, ${getVarighetString(ubrukteDager, intl)} gjenstår` : ''}
                </BodyShort>
            </VStack>
        </VStack>
    );
};

const summerDagerIPerioder = (perioder: SaksperiodeNy[]) => {
    return sum(
        perioder.map((p) => Tidsperioden({ fom: new Date(p.fom), tom: new Date(p.tom) }).getAntallUttaksdager()),
    );
};

const FordelingsBar = ({ fordelinger }: { fordelinger: FordelingSegmentProps[] }) => {
    return (
        <HStack gap="2">
            {fordelinger.map((fordeling) => (
                <FordelingSegment key={Object.values(fordeling).join('-')} {...fordeling} />
            ))}
        </HStack>
    );
};

type FordelingSegmentProps = {
    kontoType?: StønadskontoType;
    prosent: number;
    erFyllt?: boolean;
};
const FordelingSegment = ({ kontoType, prosent, erFyllt = true }: FordelingSegmentProps) => {
    const { forelder } = useKvote();
    if (prosent === 0) {
        return null;
    }
    const style = { width: `${prosent - 1.5}%` };

    if (kontoType === 'MØDREKVOTE' || kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        if (forelder === 'MOR') {
            return (
                <div
                    className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-data-surface-1' : 'bg-bg-default'} border-data-surface-1`}
                    style={style}
                />
            );
        }
        return (
            <div
                className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-data-surface-2-subtle' : 'bg-bg-default'} border-data-surface-2-subtle`}
                style={style}
            />
        );
    }
    if (kontoType === 'FEDREKVOTE') {
        if (forelder === 'MOR') {
            return (
                <div
                    className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-data-surface-5-subtle' : 'bg-bg-default'} border-data-surface-5-subtle`}
                    style={style}
                />
            );
        }
        return (
            <div
                className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-green-400' : 'bg-bg-default'} border-green-400`}
                style={style}
            />
        );
    }

    return <div className="rounded-full h-4 border-2 bg-bg-default border-surface-neutral-hover" style={style} />;
};

const finnVisningsnavForKvote = (kontoType: StønadskontoType) => {
    switch (kontoType) {
        case StønadskontoType.AktivitetsfriKvote:
            return 'Aktivitetsfrikvote';
        case StønadskontoType.Fedrekvote:
            return 'Fedrekvote';
        case StønadskontoType.Mødrekvote:
            return 'Mødrekvote';
        case StønadskontoType.ForeldrepengerFørFødsel:
            return 'Foreldrepenger før fødsel';
        case StønadskontoType.Foreldrepenger:
            return 'Foreldrepenger';
        case StønadskontoType.Fellesperiode:
            return 'Fellesperioder';
    }
};
