import { useQuery } from '@tanstack/react-query';
import { sum } from 'lodash';
import { createContext, useContext } from 'react';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Tidsperioden } from '@navikt/fp-utils';

import { hentUttaksKontoOptions } from '../../api/api';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { DekningsgradDTO } from '../../types/DekningsgradDTO';
import { Foreldrepengesak } from '../../types/Foreldrepengesak';
import { Ytelse } from '../../types/Ytelse';

// TODO: relevant for vedtatte planer
type Props = {
    annenPartsPerioder: SaksperiodeNy[];
};

const KvoteContext = createContext<{
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
    sak: Foreldrepengesak;
} | null>(null);

export const useKvote = () => {
    const context = useContext(KvoteContext);
    if (!context) {
        throw new Error('useKvote må brukes i en KvoteContext.Provider');
    }

    return context;
};

export const KvoteOppsummering = () => {
    const gjeldendeSak = useGetSelectedSak();

    if (!gjeldendeSak || gjeldendeSak.ytelse !== Ytelse.FORELDREPENGER) {
        return null;
    }

    return <KvoteOppsummeringInner sak={gjeldendeSak} />;
};

const KvoteOppsummeringInner = ({ sak }: { sak: Foreldrepengesak }) => {
    const kontoQuery = useQuery(
        hentUttaksKontoOptions({
            antallBarn: sak.familiehendelse.antallBarn,
            brukerrolle: sak.forelder === 'MOR' ? 'MOR' : 'FAR',
            morHarUføretrygd: false,
            rettighetstype: sak.rettighetType,
            termindato: sak.familiehendelse.termindato, //TODO: hvilken dato å bruke
        }),
    );

    const konto =
        sak.dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT ? kontoQuery.data?.['100'] : kontoQuery.data?.['80'];

    if (!konto) {
        return null;
    }
    const søkersPerioder = sak.gjeldendeVedtak?.perioder;
    const perioderSomErSøktOm = sak.åpenBehandling?.søknadsperioder;

    const perioder = søkersPerioder ?? perioderSomErSøktOm ?? [];

    return (
        <KvoteContext.Provider value={{ konto, perioder, sak }}>
            {sak.rettighetType === 'ALENEOMSORG' && (
                <ExpansionCard aria-label="TODO" size="small">
                    <KvoteTittelAleneOmsorg />
                    <ExpansionCard.Content>
                        <VStack gap="4">
                            <AleneOmsorgKvoter />
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            )}
            {sak.rettighetType === 'BARE_SØKER_RETT' && null}
            {sak.rettighetType === 'BEGGE_RETT' && <BeggeRettKvote />}
        </KvoteContext.Provider>
    );
};

const BeggeRettKvote = () => {
    return (
        <ExpansionCard aria-label="TODO" size="small">
            <KvoteTittel />
            <ExpansionCard.Content>
                <VStack gap="4">
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

const KvoteTittelAleneOmsorg = () => {
    const { konto, perioder } = useKvote();

    const dagerBrukt = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' || p.kontoType === 'FORELDREPENGER'),
    );

    const fpKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const førFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');

    const antallUbrukteDager = fpKonto && førFødselKonto ? fpKonto.dager + førFødselKonto.dager - dagerBrukt : 0;

    if (antallUbrukteDager === 0) {
        const tittel = 'All tid er i planen';
        const beskrivelse = `Du har lagt til ${dagerBrukt} dager i planen.`;
        return (
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
                <ExpansionCard.Description>{beskrivelse}</ExpansionCard.Description>
            </ExpansionCard.Header>
        );
    }

    const tittel = `Det er ${antallUbrukteDager} dager igjen som kan legges til i planen`;
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

    const mødreKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const førFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const fedreKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    const ubrukteDagerMor =
        mødreKonto && førFødselKonto ? mødreKonto.dager + førFødselKonto.dager - dagerBruktAvMor : 0;
    const ubrukteDagerFar = fedreKonto ? fedreKonto.dager - dagerBruktAvFar : 0;
    const ubrukteDagerFelles = fellesKonto ? fellesKonto.dager - dagerFellesBrukt : 0;

    const antallUbrukteDager = sum([ubrukteDagerFar, ubrukteDagerMor, ubrukteDagerFelles]);

    if (antallUbrukteDager === 0) {
        const tittel = 'All tid er i planen';
        const beskrivelseMor = dagerBruktAvMor > 0 ? `${dagerBruktAvMor} dager til mor` : '';
        const beskrivelseFelles = dagerFellesBrukt > 0 ? `${ubrukteDagerFelles} dager av fellesperioden` : '';
        const beskrivelseFar = dagerBruktAvFar > 0 ? `${ubrukteDagerFar} dager til far` : '';

        const beskrivelse = `${formatOppramsing([beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean))} er lagt til i planen`;
        return (
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
                <ExpansionCard.Description>{beskrivelse}</ExpansionCard.Description>
            </ExpansionCard.Header>
        );
    }

    const tittel = `Det er ${antallUbrukteDager} dager igjen som kan legges til i planen`;
    const beskrivelseMor = ubrukteDagerMor > 0 ? `${ubrukteDagerMor} dager til mor` : '';
    const beskrivelseFelles = ubrukteDagerFelles > 0 ? `${ubrukteDagerFelles} dager av fellesperioden` : '';
    const beskrivelseFar = ubrukteDagerFar > 0 ? `${ubrukteDagerFar} dager til far` : '';
    const beskrivelse = `${formatOppramsing([beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean))} ligger ikke i planen. `;
    return (
        <ExpansionCard.Header>
            <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
            <ExpansionCard.Description>
                {beskrivelse}
                Hvis du ønsker å bruke mer foreldrepenger enn det som ligger i planen nå, kan du sende en
                endringssøknad.
                {ubrukteDagerFar > 0 ? 'Far må sende søknad selv for å bruke sine uker med foreldrepenger' : ''}
            </ExpansionCard.Description>
        </ExpansionCard.Header>
    );
};

const AleneOmsorgKvoter = () => {
    const { konto, perioder } = useKvote();
    // Denne kontoen finnes kun for mor
    const treUkerFørFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const fpKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER');

    if (!fpKonto) {
        return null;
    }

    const dagerBruktTreUkerFørFødsel = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FORELDREPENGER_FØR_FØDSEL'),
    );
    const dagerBruktFpKvote = summerDagerIPerioder(perioder.filter((p) => p.kontoType === 'FORELDREPENGER'));
    const ubrukteDagerFørFødsel = treUkerFørFødselKonto?.dager
        ? treUkerFørFødselKonto?.dager - dagerBruktTreUkerFørFødsel
        : 0;
    const prosentBruktAvTreUkerFørFødsel = Math.floor(
        (dagerBruktTreUkerFørFødsel / (treUkerFørFødselKonto?.dager ?? 1)) * 100,
    );
    const ubrukteDagerMødreKvote = fpKonto.dager - dagerBruktFpKvote;
    const prosentBruktAvFpkvote = Math.floor((dagerBruktFpKvote / fpKonto.dager) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">
                {fpKonto.dager} dager {treUkerFørFødselKonto ? ` + ${treUkerFørFødselKonto.dager} dager` : ''} til deg
            </BodyShort>
            <VStack gap="6" className="ml-4">
                {treUkerFørFødselKonto && (
                    <VStack gap="1">
                        <BodyShort weight="semibold">
                            Forldrepenger før fødsel - {treUkerFørFødselKonto.dager}
                        </BodyShort>
                        <FordelingsBar
                            fordelinger={[
                                {
                                    kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                                    prosent: prosentBruktAvTreUkerFørFødsel,
                                },
                                {
                                    kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                                    prosent: 100 - prosentBruktAvTreUkerFørFødsel,
                                    erFyllt: false,
                                },
                            ]}
                        />
                        <BodyShort>
                            {dagerBruktTreUkerFørFødsel} er lagt til
                            {ubrukteDagerFørFødsel > 0 ? `, ${ubrukteDagerFørFødsel} gjenstår` : ''}
                        </BodyShort>
                    </VStack>
                )}
                <VStack gap="1">
                    <BodyShort weight="semibold">Mødrekvote - {fpKonto.dager}</BodyShort>
                    <FordelingsBar
                        fordelinger={[
                            {
                                kontoType: StønadskontoType.Mødrekvote,
                                prosent: prosentBruktAvFpkvote,
                            },
                            {
                                kontoType: StønadskontoType.Mødrekvote,
                                prosent: 100 - prosentBruktAvFpkvote,
                                erFyllt: false,
                            },
                        ]}
                    />
                    <BodyShort>
                        {dagerBruktTreUkerFørFødsel} er lagt til
                        {ubrukteDagerMødreKvote > 0 ? `, ${ubrukteDagerMødreKvote} gjenstår` : ''}
                    </BodyShort>
                </VStack>
            </VStack>
        </VStack>
    );
};

const FedreKvoter = () => {
    const { konto, perioder } = useKvote();

    const fedreKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');

    if (!fedreKonto) {
        return null;
    }

    const dagerBruktFedreKvote = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FEDREKVOTE' || p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'),
    );
    const ubrukteDager = fedreKonto.dager - dagerBruktFedreKvote;
    const prosentBruktAvFedrekvote = Math.floor((dagerBruktFedreKvote / fedreKonto.dager) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">Fedrekvote - {fedreKonto.dager}</BodyShort>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            kontoType: StønadskontoType.Fedrekvote,
                            prosent: prosentBruktAvFedrekvote,
                        },
                        {
                            kontoType: StønadskontoType.Fedrekvote,
                            prosent: 100 - prosentBruktAvFedrekvote,
                            erFyllt: false,
                        },
                    ]}
                />
                <BodyShort>
                    {dagerBruktFedreKvote} er lagt til{ubrukteDager > 0 ? `, ${ubrukteDager} gjenstår` : ''}
                </BodyShort>
            </VStack>
        </VStack>
    );
};

const MødreKvoter = () => {
    const { konto, perioder } = useKvote();

    const treUkerFørFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødreKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');

    if (!treUkerFørFødselKonto || !mødreKonto) {
        return null;
    }

    const dagerBruktTreUkerFørFødsel = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FORELDREPENGER_FØR_FØDSEL'),
    );
    const dagerBruktMødrekvote = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'MØDREKVOTE' || p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER'),
    );
    const ubrukteDagerFørFødsel = treUkerFørFødselKonto.dager - dagerBruktTreUkerFørFødsel;
    const ubrukteDagerMødreKvote = mødreKonto.dager - dagerBruktMødrekvote;
    const prosentBruktAvTreUkerFørFødsel = Math.floor((dagerBruktTreUkerFørFødsel / treUkerFørFødselKonto.dager) * 100);
    const prosentBruktAvMødrekvote = Math.floor((dagerBruktMødrekvote / mødreKonto.dager) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">
                {mødreKonto.dager} + {treUkerFørFødselKonto.dager} dager til deg
            </BodyShort>
            <VStack gap="6" className="ml-4">
                <VStack gap="1">
                    <BodyShort weight="semibold">Forldrepenger før fødsel - {treUkerFørFødselKonto.dager}</BodyShort>
                    <FordelingsBar
                        fordelinger={[
                            {
                                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                                prosent: prosentBruktAvTreUkerFørFødsel,
                            },
                            {
                                kontoType: StønadskontoType.Mødrekvote,
                                prosent: 100 - prosentBruktAvTreUkerFørFødsel,
                                erFyllt: false,
                            },
                        ]}
                    />
                    <BodyShort>
                        {dagerBruktTreUkerFørFødsel} er lagt til
                        {ubrukteDagerFørFødsel > 0 ? `, ${ubrukteDagerFørFødsel} gjenstår` : ''}
                    </BodyShort>
                </VStack>
                <VStack gap="1">
                    <BodyShort weight="semibold">Mødrekvote - {mødreKonto.dager}</BodyShort>
                    <FordelingsBar
                        fordelinger={[
                            {
                                kontoType: StønadskontoType.Mødrekvote,
                                prosent: prosentBruktAvMødrekvote,
                            },
                            {
                                kontoType: StønadskontoType.Mødrekvote,
                                prosent: 100 - prosentBruktAvMødrekvote,
                                erFyllt: false,
                            },
                        ]}
                    />
                    <BodyShort>
                        {dagerBruktTreUkerFørFødsel} er lagt til
                        {ubrukteDagerMødreKvote > 0 ? `, ${ubrukteDagerMødreKvote} gjenstår` : ''}
                    </BodyShort>
                </VStack>
            </VStack>
        </VStack>
    );
};

const FellesKvoter = () => {
    const { konto, perioder } = useKvote();
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
            <BodyShort weight="semibold">{fellesKonto.dager} dager for å dele, fellesperiode</BodyShort>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            kontoType: StønadskontoType.Mødrekvote,
                            prosent: prosentBruktAvDeg, //TODO: må se på hvem du er
                        },
                        {
                            kontoType: StønadskontoType.Fedrekvote,
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
                    {dagerBruktAvDeg} dager er lagt til for deg, {dagerBruktAvAnnenPart} dager er lagt til for annen
                    forelder {ubrukteDager > 0 ? `, ${ubrukteDager} dager gjenstår` : ''}
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
    const {
        sak: { forelder },
    } = useKvote();
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

//TODO: util
function formatOppramsing(strenger: string[]) {
    const formatterer = new Intl.ListFormat('no', {
        style: 'long',
        type: 'conjunction',
    });
    return formatterer.format(strenger);
}
