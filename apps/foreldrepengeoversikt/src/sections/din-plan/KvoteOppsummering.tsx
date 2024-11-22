import { useQuery } from '@tanstack/react-query';
import { sum } from 'lodash';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { SaksperiodeNy, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Tidsperioden } from '@navikt/fp-utils';

import { hentUttaksKontoOptions } from '../../api/api';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { DekningsgradDTO } from '../../types/DekningsgradDTO';
import { Foreldrepengesak } from '../../types/Foreldrepengesak';
import { Ytelse } from '../../types/Ytelse';

type Props = {
    annenPartsPerioder: SaksperiodeNy[];
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
            brukerrolle: sak.forelder, //TODO: ikke konsekvent
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

    const relevantePerioder = søkersPerioder ?? perioderSomErSøktOm ?? [];

    return (
        <>
            {sak.rettighetType === 'ALENEOMSORG' && (
                <ExpansionCard aria-label="TODO" size="small">
                    <KvoteTittelAleneOmsorg konto={konto} perioder={relevantePerioder} />
                    <ExpansionCard.Content>
                        <VStack gap="4">
                            <AleneOmsorgKvoter konto={konto} perioder={relevantePerioder} />
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            )}
            {sak.rettighetType === 'BARE_SØKER_RETT' && null}
            {sak.rettighetType === 'BEGGE_RETT' && <BeggeRettKvote konto={konto} perioder={relevantePerioder} />}
        </>
    );
};

const FARGEKART = {
    MØDREKVOTE: { farge: 'bg-data-surface-1', border: 'border-data-surface-1' },
    FORELDREPENGER_FØR_FØDSEL: { farge: 'bg-data-surface-1', border: 'border-data-surface-1' },
    FEDREKVOTE: { farge: 'bg-data-surface-5-subtle', border: 'border-data-surface-5-subtle' },
};

const BeggeRettKvote = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
    return (
        <ExpansionCard aria-label="TODO" size="small">
            <KvoteTittel konto={konto} perioder={perioder} />
            <ExpansionCard.Content>
                <VStack gap="4">
                    <MødreKvoter konto={konto} perioder={perioder} />
                    <div className="h-[2px] bg-gray-300 w-full" />
                    <FedreKvoter konto={konto} perioder={perioder} />
                    <div className="h-[2px] bg-gray-300 w-full" />
                    <FellesKvoter konto={konto} perioder={perioder} />
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

const KvoteTittelAleneOmsorg = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
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

const KvoteTittel = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
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

const AleneOmsorgKvoter = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
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
                                    ...FARGEKART.FORELDREPENGER_FØR_FØDSEL,
                                    prosent: prosentBruktAvTreUkerFørFødsel,
                                },
                                {
                                    ...FARGEKART.FORELDREPENGER_FØR_FØDSEL,
                                    ikkeBrukt: true,
                                    prosent: 100 - prosentBruktAvTreUkerFørFødsel,
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
                                ...FARGEKART.MØDREKVOTE,
                                prosent: prosentBruktAvFpkvote,
                            },
                            {
                                ...FARGEKART.MØDREKVOTE,
                                ikkeBrukt: true,
                                prosent: 100 - prosentBruktAvFpkvote,
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

const FedreKvoter = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
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
                            ...FARGEKART.FEDREKVOTE,
                            prosent: prosentBruktAvFedrekvote,
                        },
                        {
                            ...FARGEKART.FEDREKVOTE,
                            ikkeBrukt: true,
                            prosent: 100 - prosentBruktAvFedrekvote,
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

const MødreKvoter = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
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
            <BodyShort weight="semibold">16 + 3 uker til deg</BodyShort>
            <VStack gap="6" className="ml-4">
                <VStack gap="1">
                    <BodyShort weight="semibold">Forldrepenger før fødsel - {treUkerFørFødselKonto.dager}</BodyShort>
                    <FordelingsBar
                        fordelinger={[
                            {
                                ...FARGEKART.FORELDREPENGER_FØR_FØDSEL,
                                prosent: prosentBruktAvTreUkerFørFødsel,
                            },
                            {
                                ...FARGEKART.FORELDREPENGER_FØR_FØDSEL,
                                ikkeBrukt: true,
                                prosent: 100 - prosentBruktAvTreUkerFørFødsel,
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
                                ...FARGEKART.MØDREKVOTE,
                                prosent: prosentBruktAvMødrekvote,
                            },
                            {
                                ...FARGEKART.MØDREKVOTE,
                                ikkeBrukt: true,
                                prosent: 100 - prosentBruktAvMødrekvote,
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

const FellesKvoter = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    if (!fellesKonto) {
        return null;
    }

    const dagerBruktAvDeg = summerDagerIPerioder(perioder.filter((p) => p.kontoType === 'FELLESPERIODE'));
    const dagerBruktAvAnnenPart = summerDagerIPerioder(
        perioder.filter((p) => p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER'),
    );
    const ubrukteDager = fellesKonto.dager - (dagerBruktAvDeg + dagerBruktAvAnnenPart);

    const prosentBruktAvDeg = Math.floor((dagerBruktAvDeg / fellesKonto.dager) * 100);
    const prosentBruktAvMødrekvote = Math.floor((dagerBruktAvAnnenPart / fellesKonto.dager) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">{fellesKonto.dager} dager for å dele, fellesperiode</BodyShort>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            ...FARGEKART.MØDREKVOTE,
                            prosent: prosentBruktAvDeg, //TODO: må se på hvem du er
                        },
                        {
                            ...FARGEKART.FEDREKVOTE,
                            prosent: prosentBruktAvMødrekvote,
                        },
                        {
                            farge: '',
                            border: 'border-surface-neutral-hover',
                            ikkeBrukt: true,
                            prosent: 100 - (prosentBruktAvMødrekvote + prosentBruktAvDeg),
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

const FordelingsBar = ({
    fordelinger,
}: {
    fordelinger: { farge: string; border: string; prosent: number; ikkeBrukt?: boolean }[];
}) => {
    return (
        <HStack gap="2">
            {fordelinger.map(
                ({ farge, prosent, border, ikkeBrukt }) =>
                    prosent > 0 && (
                        <div
                            className={`rounded-full h-4 ${ikkeBrukt ? 'bg-bg-default' : farge} border-2 ${border}`}
                            style={{ width: `${prosent - 1}%` }}
                        />
                    ),
            )}
        </HStack>
    );
};

//TODO: util
function formatOppramsing(strenger: string[]) {
    const formatterer = new Intl.ListFormat('no', {
        style: 'long',
        type: 'conjunction',
    });
    return formatterer.format(strenger);
}
