import { useQuery } from '@tanstack/react-query';

import { KvoteOppsummering } from '@navikt/fp-uttaksplan-ny';

import { hentUttaksKontoOptions } from '../../api/api';
import { useAnnenPartsVedtak } from '../../hooks/useAnnenPartsVedtak';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { DekningsgradDTO } from '../../types/DekningsgradDTO';
import { Foreldrepengesak } from '../../types/Foreldrepengesak';
import { Ytelse } from '../../types/Ytelse';

export const KvoteOppsummering1 = () => {
    const gjeldendeSak = useGetSelectedSak();

    const harFpSak = gjeldendeSak && gjeldendeSak.ytelse === Ytelse.FORELDREPENGER;

    if (!harFpSak) {
        return null;
    }

    return <KvoteOppsummering2 sak={gjeldendeSak} />;
};

const KvoteOppsummering2 = ({ sak }: { sak: Foreldrepengesak }) => {
    const annenPartsPerioder = useAnnenPartsVedtak(sak).data?.perioder ?? [];
    const kontoQuery = useQuery(
        hentUttaksKontoOptions({
            antallBarn: sak.familiehendelse.antallBarn,
            brukerrolle: sak.forelder === 'MOR' ? 'MOR' : 'FAR',
            morHarUføretrygd: sak.morUføretrygd,
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
        <KvoteOppsummering
            konto={konto}
            perioder={[...perioder, ...annenPartsPerioder.filter((p) => p.resultat?.innvilget)]}
            rettighetType={sak.rettighetType}
            forelder={sak.forelder}
        />
    );
};
