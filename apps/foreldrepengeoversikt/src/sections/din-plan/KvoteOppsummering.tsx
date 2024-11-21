import { useQuery } from '@tanstack/react-query';
import { sum, sumBy } from 'lodash';

import { BodyShort, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Tidsperioden } from '@navikt/fp-utils';

import { hentUttaksKontoOptions } from '../../api/api';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { DekningsgradDTO } from '../../types/DekningsgradDTO';
import { Ytelse } from '../../types/Ytelse';

type Props = {
    annenPartsPerioder: SaksperiodeNy[];
};
export const KvoteOppsummering = ({ annenPartsPerioder }: Props) => {
    const gjeldendeSak = useGetSelectedSak();

    const kontoQuery = useQuery(
        hentUttaksKontoOptions({
            antallBarn: 1,
            brukerrolle: 'MOR',
            morHarUføretrygd: false,
            rettighetstype: 'ALENEOMSORG',
            termindato: '2024-12-05',
        }),
    );

    if (!gjeldendeSak || gjeldendeSak.ytelse !== Ytelse.FORELDREPENGER) {
        return null;
    }

    const konto =
        gjeldendeSak.dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT
            ? kontoQuery.data?.['100']
            : kontoQuery.data?.['80'];

    if (!konto) {
        return null;
    }
    const søkersPerioder = gjeldendeSak.gjeldendeVedtak?.perioder;
    const perioderSomErSøktOm = gjeldendeSak.åpenBehandling?.søknadsperioder;
    const familiehendelse = gjeldendeSak.familiehendelse;
    const sakTilhørerMor = gjeldendeSak.sakTilhørerMor;
    const gjelderAdopsjon = gjeldendeSak.gjelderAdopsjon;
    const rettighetType = gjeldendeSak.rettighetType;

    const relevantePerioder = søkersPerioder ?? perioderSomErSøktOm ?? [];

    const b = finnUbrukteDager({ perioder: relevantePerioder, konto });
    console.log('RES', b);

    return (
        <>
            <AleneOmsorgKvote kvoter={b} konto={konto} />
        </>
    );
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
                                            farge: 'bg-data-surface-1',
                                            border: 'border-data-surface-1',
                                            prosent: bruktProsent,
                                        },
                                        {
                                            border: 'border-data-surface-1',
                                            farge: 'bg-bg-default',
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
    const kontoTyper = [...new Set(perioder.map((p) => p.kontoType).filter((p) => p !== undefined))];

    kontoTyper.forEach((kontoType) => {
        const maksAntallDager = konto.kontoer.find((k) => k.konto === kontoType)?.dager;

        if (maksAntallDager === undefined) {
            return;
        }
        const matchendePerioder = perioder
            .filter((p) => p.kontoType === kontoType)
            .map((p) => Tidsperioden({ fom: new Date(p.fom), tom: new Date(p.tom) }).getAntallUttaksdager());
        const brukteDager = sum(matchendePerioder);

        res.push({ ubrukteDager: maksAntallDager - brukteDager, brukteDager, kontoType });
    });

    return res;
};
