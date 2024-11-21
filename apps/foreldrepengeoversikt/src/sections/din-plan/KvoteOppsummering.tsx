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
            {sak.rettighetType === 'ALENEOMSORG' && null}
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
//
// const AleneOmsorgKvote = ({
//     kvoter,
//     konto,
// }: {
//     kvoter: ReturnType<typeof finnUbrukteDager>;
//     konto: TilgjengeligeStønadskontoerForDekningsgrad;
// }) => {
//     const antallUbrukteDager = sumBy(kvoter, (k) => k.ubrukteDager);
//
//     if (antallUbrukteDager > 0) {
//         return (
//             <ExpansionCard aria-label="TODO" size="small">
//                 <ExpansionCard.Header>
//                     <ExpansionCard.Title size="small">All tid er i planen</ExpansionCard.Title>
//                     <ExpansionCard.Description>TODODODODOD</ExpansionCard.Description>
//                 </ExpansionCard.Header>
//                 <ExpansionCard.Content>
//                     {konto.kontoer.map((k) => {
//                         const matchendeKvote = kvoter.find((kvote) => kvote.kontoType === k.konto);
//                         const bruktProsent = Math.floor((matchendeKvote?.brukteDager / k.dager) * 100);
//
//                         return (
//                             <VStack gap="1">
//                                 <BodyShort weight="semibold">{k.konto}</BodyShort>
//                                 <FordelingsBar
//                                     fordelinger={[
//                                         {
//                                             ...FARGEKART[k.konto],
//                                             prosent: bruktProsent,
//                                         },
//                                         {
//                                             ...FARGEKART[k.konto],
//                                             prosent: 100 - bruktProsent,
//                                         },
//                                     ]}
//                                 />
//                                 <BodyShort>
//                                     {matchendeKvote?.brukteDager} er lagt til, {matchendeKvote?.ubrukteDager} gjenstår
//                                 </BodyShort>
//                             </VStack>
//                         );
//                     })}
//                 </ExpansionCard.Content>
//             </ExpansionCard>
//         );
//     }
//
//     return <div>Det er {antallUbrukteDager} igjen</div>;
// };

//TODO: vurder om kan være samme komponent
const BeggeRettKvote = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
    return (
        <ExpansionCard aria-label="TODO" size="small">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">All tid er i planen</ExpansionCard.Title>
                <ExpansionCard.Description>TODODODODOD</ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <MødreKvoter konto={konto} perioder={perioder} />
                <FedreKvoter konto={konto} perioder={perioder} />
                <FellesKvoter konto={konto} perioder={perioder} />
            </ExpansionCard.Content>
        </ExpansionCard>
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
    const prosentBruktAvFedrekvote = Math.floor((dagerBruktFedreKvote / fedreKonto.dager) * 100);

    return (
        <VStack gap="1">
            <VStack>
                <BodyShort weight="semibold">Fedrekvote - {fedreKonto.dager}</BodyShort>
                <FordelingsBar
                    fordelinger={[
                        {
                            ...FARGEKART.FEDREKVOTE,
                            prosent: prosentBruktAvFedrekvote,
                        },
                        {
                            ...FARGEKART.FEDREKVOTE,
                            prosent: 100 - prosentBruktAvFedrekvote,
                        },
                    ]}
                />
                <BodyShort>
                    {dagerBruktFedreKvote} er lagt til, {fedreKonto.dager - dagerBruktFedreKvote} gjenstår
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

    const prosentBruktAvTreUkerFørFødsel = Math.floor((dagerBruktTreUkerFørFødsel / treUkerFørFødselKonto.dager) * 100);
    const prosentBruktAvMødrekvote = Math.floor((dagerBruktMødrekvote / mødreKonto.dager) * 100);

    return (
        <VStack gap="1">
            <VStack>
                <BodyShort weight="semibold">Forldrepenger før fødsel {treUkerFørFødselKonto.dager}</BodyShort>
                <FordelingsBar
                    fordelinger={[
                        {
                            ...FARGEKART.FORELDREPENGER_FØR_FØDSEL,
                            prosent: prosentBruktAvTreUkerFørFødsel,
                        },
                        {
                            ...FARGEKART.FORELDREPENGER_FØR_FØDSEL,
                            prosent: 100 - prosentBruktAvTreUkerFørFødsel,
                        },
                    ]}
                />
                <BodyShort>
                    {dagerBruktTreUkerFørFødsel} er lagt til, {treUkerFørFødselKonto.dager - dagerBruktTreUkerFørFødsel}{' '}
                    gjenstår
                </BodyShort>
            </VStack>
            <VStack>
                <BodyShort weight="semibold">Mødrekvote - {mødreKonto.dager}</BodyShort>
                <FordelingsBar
                    fordelinger={[
                        {
                            ...FARGEKART.MØDREKVOTE,
                            prosent: prosentBruktAvMødrekvote,
                        },
                        {
                            ...FARGEKART.MØDREKVOTE,
                            prosent: 100 - prosentBruktAvMødrekvote,
                        },
                    ]}
                />
                <BodyShort>
                    {dagerBruktTreUkerFørFødsel} er lagt til, {mødreKonto.dager - dagerBruktMødrekvote} gjenstår
                </BodyShort>
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

    const prosentBruktAvDeg = Math.floor((dagerBruktAvDeg / fellesKonto.dager) * 100);
    const prosentBruktAvMødrekvote = Math.floor((dagerBruktAvAnnenPart / fellesKonto.dager) * 100);

    return (
        <VStack gap="1">
            <BodyShort weight="semibold">Fellesperiode {fellesKonto.dager}</BodyShort>
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
                        ...FARGEKART.MØDREKVOTE, //TODO: farge
                        prosent: 100 - (prosentBruktAvMødrekvote + prosentBruktAvDeg),
                    },
                    //TODO: må legge inn ubrukt
                ]}
            />
            <BodyShort>TODO</BodyShort>
        </VStack>
    );
};

const summerDagerIPerioder = (perioder: SaksperiodeNy[]) => {
    return sum(
        perioder.map((p) => Tidsperioden({ fom: new Date(p.fom), tom: new Date(p.tom) }).getAntallUttaksdager()),
    );
};

const FordelingsBar = ({ fordelinger }: { fordelinger: { farge: string; border: string; prosent: number }[] }) => {
    return (
        <HStack gap="2">
            {fordelinger.map(
                ({ farge, prosent, border }) =>
                    prosent > 0 && (
                        <div
                            className={`rounded-full h-4 ${farge} border-2 ${border}`}
                            style={{ width: `${prosent - 1}%` }}
                        />
                    ),
            )}
        </HStack>
    );
};
