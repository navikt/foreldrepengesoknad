import { useQuery } from '@tanstack/react-query';
import { sum, sumBy } from 'lodash';

import { HStack } from '@navikt/ds-react';

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
            <AleneOmsorgKvote kvoter={b} />
            <FordelingsBar
                fordelinger={[
                    { farge: 'bg-data-surface-1', prosent: 49 },
                    { farge: 'bg-data-surface-5-subtle', prosent: 49 },
                ]}
            />
        </>
    );
};

const AleneOmsorgKvote = ({ kvoter }: { kvoter: ReturnType<typeof finnUbrukteDager> }) => {
    const antallUbrukteDager = sumBy(kvoter, (k) => k.ubrukteDager);

    if (antallUbrukteDager === 0) {
        return <div>All tid er i planen</div>;
    }

    return <div>Det er {antallUbrukteDager} igjen</div>;
};

const FordelingsBar = ({ fordelinger }: { fordelinger: { farge: string; prosent: number }[] }) => {
    return (
        <HStack gap="2">
            {fordelinger.map(({ farge, prosent }) => (
                <div className={`rounded-full h-4 ${farge}`} style={{ width: `${prosent}%` }} />
            ))}
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
    const res = [];
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

        res.push({ ubrukteDager: maksAntallDager - brukteDager, kontoType });
    });

    return res;
};
