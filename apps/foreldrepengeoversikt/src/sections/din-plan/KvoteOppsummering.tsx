import { useQuery } from '@tanstack/react-query';

import { KvoteOppsummering } from '@navikt/fp-uttaksplan-ny';

import { hentUttaksKontoOptions } from '../../api/api';
import { useAnnenPartsVedtak } from '../../hooks/useAnnenPartsVedtak';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { DekningsgradDTO } from '../../types/DekningsgradDTO';
import { Foreldrepengesak } from '../../types/Foreldrepengesak';
import { Ytelse } from '../../types/Ytelse';

export const KvoteOversikt = () => {
    const gjeldendeSak = useGetSelectedSak();

    const harFpSak = gjeldendeSak && gjeldendeSak.ytelse === Ytelse.FORELDREPENGER;

    if (!harFpSak) {
        return null;
    }

    return <KvoterOversiktInner sak={gjeldendeSak} />;
};

const KvoterOversiktInner = ({ sak }: { sak: Foreldrepengesak }) => {
    const annenPartsPerioder = useAnnenPartsVedtak(sak).data?.perioder ?? [];
    const kontoQuery = useQuery(
        hentUttaksKontoOptions({
            brukerrolle: sak.forelder === 'MOR' ? 'MOR' : 'FAR',
            morHarUføretrygd: sak.morUføretrygd,
            rettighetstype: sak.rettighetType,
            omsorgsovertakelseDato: sak.familiehendelse.omsorgsovertakelse,
            antallBarn: sak.familiehendelse.antallBarn,
            termindato: sak.familiehendelse.termindato,
            // Fødselsdato trumfer omsorgsovertakelseDato i APIet
            fødselsdato: sak.familiehendelse.omsorgsovertakelse ? undefined : sak.familiehendelse.fødselsdato,
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
    const aktuellePerioder = [...perioder, ...annenPartsPerioder].filter((p) => {
        const erBehandlet = !!p.resultat;
        if (!erBehandlet) {
            // Hvis den ikke er behandlet skal perioden vises
            return true;
        }
        // Hvis behandlet skal vi kunne vise innvilget perioder
        return p.resultat?.innvilget;
    });

    return (
        <KvoteOppsummering
            konto={konto}
            perioder={aktuellePerioder}
            rettighetType={sak.rettighetType}
            forelder={sak.forelder}
        />
    );
};
