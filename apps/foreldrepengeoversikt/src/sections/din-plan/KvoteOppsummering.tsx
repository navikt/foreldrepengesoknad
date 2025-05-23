import { useQuery } from '@tanstack/react-query';

import { NavnPåForeldre } from '@navikt/fp-common';
import { SaksperiodeNy } from '@navikt/fp-types';
import { KvoteOppsummering } from '@navikt/fp-uttaksplan-ny';

import { hentUttaksKontoOptions } from '../../api/api';
import { useAnnenPartsVedtak } from '../../hooks/useAnnenPartsVedtak';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { Foreldrepengesak } from '../../types/Sak';

export const KvoteOversikt = ({ navnPåForeldre }: { navnPåForeldre: NavnPåForeldre }) => {
    const gjeldendeSak = useGetSelectedSak();

    const harFpSak = gjeldendeSak && gjeldendeSak.ytelse === 'FORELDREPENGER';

    if (!harFpSak) {
        return null;
    }

    return <KvoterOversiktInner sak={gjeldendeSak} navnPåForeldre={navnPåForeldre} />;
};

const KvoterOversiktInner = ({ sak, navnPåForeldre }: { sak: Foreldrepengesak; navnPåForeldre: NavnPåForeldre }) => {
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
    const konto = sak.dekningsgrad === 'HUNDRE' ? kontoQuery.data?.['100'] : kontoQuery.data?.['80'];

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
            brukesIHvilkenApp="INNSYN"
            navnPåForeldre={navnPåForeldre}
            familiehendelse={sak.familiehendelse}
            konto={konto}
            perioder={aktuellePerioder as SaksperiodeNy[]}
            rettighetType={sak.rettighetType}
            forelder={sak.forelder}
            visStatusIkoner={false}
        />
    );
};
