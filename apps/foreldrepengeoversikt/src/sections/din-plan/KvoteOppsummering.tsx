import { useQuery } from '@tanstack/react-query';
import { sum, sumBy } from 'lodash';

import { BodyShort, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, Stønadskonto, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Tidsperioden } from '@navikt/fp-utils';

import { hentUttaksKontoOptions } from '../../api/api';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { DekningsgradDTO } from '../../types/DekningsgradDTO';
import { Foreldrepengesak } from '../../types/Foreldrepengesak';
import { Sak } from '../../types/Sak';
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
    const familiehendelse = sak.familiehendelse;
    const sakTilhørerMor = sak.sakTilhørerMor;
    const gjelderAdopsjon = sak.gjelderAdopsjon;
    const rettighetType = sak.rettighetType;

    const relevantePerioder = søkersPerioder ?? perioderSomErSøktOm ?? [];

    const b = finnUbrukteDager({ perioder: relevantePerioder, konto });

    return (
        <>
            {sak.rettighetType === 'ALENEOMSORG' && <AleneOmsorgKvote kvoter={b} konto={konto} />}
            {sak.rettighetType === 'BARE_SØKER_RETT' && null}
            {sak.rettighetType === 'BEGGE_RETT' && (
                <BeggeRettKvote kvoter={b} konto={konto} perioder={relevantePerioder} />
            )}
        </>
    );
};

const FARGEKART = {
    MØDREKVOTE: { farge: 'bg-data-surface-1', border: 'border-data-surface-1' },
    FORELDREPENGER_FØR_FØDSEL: { farge: 'bg-data-surface-1', border: 'border-data-surface-1' },
    FEDREKVOTE: { farge: 'bg-data-surface-5-subtle', border: 'border-data-surface-5-subtle' },
};

const AleneOmsorgKvote = ({
    kvoter,
    konto,
}: {
    kvoter: ReturnType<typeof finnUbrukteDager>;
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
}) => {
    const antallUbrukteDager = sumBy(kvoter, (k) => k.ubrukteDager);

    if (antallUbrukteDager > 0) {
        return (
            <ExpansionCard aria-label="TODO" size="small">
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">All tid er i planen</ExpansionCard.Title>
                    <ExpansionCard.Description>TODODODODOD</ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    {konto.kontoer.map((k) => {
                        const matchendeKvote = kvoter.find((kvote) => kvote.kontoType === k.konto);
                        const bruktProsent = Math.floor((matchendeKvote?.brukteDager / k.dager) * 100);

                        return (
                            <VStack gap="1">
                                <BodyShort weight="semibold">{k.konto}</BodyShort>
                                <FordelingsBar
                                    fordelinger={[
                                        {
                                            ...FARGEKART[k.konto],
                                            prosent: bruktProsent,
                                        },
                                        {
                                            ...FARGEKART[k.konto],
                                            prosent: 100 - bruktProsent,
                                        },
                                    ]}
                                />
                                <BodyShort>
                                    {matchendeKvote?.brukteDager} er lagt til, {matchendeKvote?.ubrukteDager} gjenstår
                                </BodyShort>
                            </VStack>
                        );
                    })}
                </ExpansionCard.Content>
            </ExpansionCard>
        );
    }

    return <div>Det er {antallUbrukteDager} igjen</div>;
};

//TODO: vurder om kan være samme komponent
const BeggeRettKvote = ({
    kvoter,
    konto,
    perioder,
}: {
    kvoter: ReturnType<typeof finnUbrukteDager>;
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
    const antallUbrukteDager = sumBy(kvoter, (k) => k.ubrukteDager);
    console.log('KVOTER', kvoter);
    console.log('KONTO', konto);
    if (antallUbrukteDager === 0) {
        return (
            <ExpansionCard aria-label="TODO" size="small">
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">All tid er i planen</ExpansionCard.Title>
                    <ExpansionCard.Description>TODODODODOD</ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <MødreKvoter konto={konto} perioder={perioder} />
                    <FedreKvoter konto={konto} perioder={perioder} />
                    {sorterKontoer(konto.kontoer).map((k, index) => {
                        const matchendeKvote = kvoter.find((kvote) => kvote.kontoType === k.konto);

                        let fordelinger = [];
                        if (matchendeKvote?.kontoType === 'FELLESPERIODE') {
                            // TODO: hva med når flere disjunkte perioder
                            const a = finnFellesperiodeFordeling(perioder);
                            //TODO: avhenger av hvem som er innlogget.
                            fordelinger = a.map((b) => ({
                                ...FARGEKART[b.type === 'FELLESPERIODE' ? 'MØDREKVOTE' : 'FEDREKVOTE'],
                                prosent: (b.brukteDager / k.dager) * 100,
                            }));
                        } else {
                            const bruktProsent = Math.floor((matchendeKvote?.brukteDager / k.dager) * 100);
                            fordelinger = [
                                {
                                    ...FARGEKART[k.konto],
                                    prosent: bruktProsent,
                                },
                                {
                                    ...FARGEKART[k.konto],
                                    prosent: 100 - bruktProsent,
                                },
                            ];
                        }

                        return (
                            <>
                                {index > 0 && <div className="h-[2px] w-full bg-gray-300" />}
                                <VStack gap="1">
                                    <BodyShort weight="semibold">{k.konto}</BodyShort>
                                    <FordelingsBar fordelinger={fordelinger} />
                                    <BodyShort>
                                        {matchendeKvote?.brukteDager} er lagt til, {matchendeKvote?.ubrukteDager}{' '}
                                        gjenstår
                                    </BodyShort>
                                </VStack>
                            </>
                        );
                    })}
                </ExpansionCard.Content>
            </ExpansionCard>
        );
    }

    return <div>Det er {antallUbrukteDager} igjen</div>;
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

const summerDagerIPerioder = (perioder: SaksperiodeNy[]) => {
    return sum(
        perioder.map((p) => Tidsperioden({ fom: new Date(p.fom), tom: new Date(p.tom) }).getAntallUttaksdager()),
    );
};

// const FordelingTekst = ({
//     dagerTilDeg,
//     dagerTilAnnenPart,
//     ubrukteDager,
// }: {
//     dagerTilDeg?: number;
//     dagerTilAnnenPart?: number;
//     ubrukteDager?: number;
// }) => {
//     const ubrukteDagerTekst = ubrukteDager ? `${ubrukteDager} gjenstår` : "";
//     const dagerTilDegTekst = dagerTilDeg ? `${dagerTilDeg} er lagt til for `
//
// };

const finnFellesperiodeFordeling = (perioder: SaksperiodeNy[]) => {
    let res: { type: 'FELLESPERIODE' | 'FELLESPERIODE_ANNEN_FORELDER'; brukteDager: number }[] = [];

    perioder.forEach((p) => {
        const brukteDager = Tidsperioden({ fom: new Date(p.fom), tom: new Date(p.tom) }).getAntallUttaksdager();
        if (p.kontoType === 'FELLESPERIODE') {
            return res.push({ type: 'FELLESPERIODE', brukteDager });
        }
        if (p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER') {
            return res.push({ type: 'FELLESPERIODE_ANNEN_FORELDER', brukteDager });
        }
        return;
    });

    return res;
};

/**
 * Sorter kontoene etter ønsket visuell rekkefølge
 */
const sorterKontoer = (kontoer: Stønadskonto[]) => {
    const rekkefølge = [
        StønadskontoType.ForeldrepengerFørFødsel,
        StønadskontoType.Mødrekvote,
        StønadskontoType.Fedrekvote,
        StønadskontoType.Fellesperiode,
        StønadskontoType.Foreldrepenger,
        StønadskontoType.AktivitetsfriKvote,
    ];

    return kontoer.sort((a, b) => rekkefølge.indexOf(a.konto) - rekkefølge.indexOf(b.konto));
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

const finnUbrukteDager = ({
    konto,
    perioder,
}: {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
}) => {
    const res: { ubrukteDager: number; brukteDager: number; kontoType: StønadskontoType }[] = [];

    konto.kontoer.forEach((k) => {
        const maksAntallDager = k.dager;

        if (maksAntallDager === undefined) {
            return;
        }

        // TODO: dette ble hårete og dekker på langt nær alle cases
        const matchendePerioder = perioder
            .filter((p) => {
                if (k.konto === p.kontoType) {
                    return true;
                }
                // Hvis det er fellesperiode vil vi summere inn kvote brukt av annen forelder.
                if (k.konto === 'FELLESPERIODE') {
                    return p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER';
                }

                if (k.konto === 'FEDREKVOTE') {
                    return p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER';
                }
                if (k.konto === 'MØDREKVOTE') {
                    return p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER';
                }

                return false;
            })
            .map((p) => Tidsperioden({ fom: new Date(p.fom), tom: new Date(p.tom) }).getAntallUttaksdager());
        const brukteDager = sum(matchendePerioder);

        res.push({ ubrukteDager: maksAntallDager - brukteDager, brukteDager, kontoType: k.konto });
    });

    return res;
};
