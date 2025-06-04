import { useQuery } from '@tanstack/react-query';

import { NavnPåForeldre } from '@navikt/fp-common';
import { KvoteOppsummering, Planperiode } from '@navikt/fp-uttaksplan-ny';

import { hentUttaksKontoOptions } from '../../api/api';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { Foreldrepengesak } from '../../types/Sak';

export const KvoteOversikt = (props: { navnPåForeldre: NavnPåForeldre; perioder: Planperiode[] }) => {
    const gjeldendeSak = useGetSelectedSak();

    const harFpSak = gjeldendeSak && gjeldendeSak.ytelse === 'FORELDREPENGER';

    if (!harFpSak) {
        return null;
    }

    return <KvoterOversiktInner sak={gjeldendeSak} {...props} />;
};

const KvoterOversiktInner = ({
    sak,
    ...props
}: {
    sak: Foreldrepengesak;
    navnPåForeldre: NavnPåForeldre;
    perioder: Planperiode[];
}) => {
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

    return (
        <KvoteOppsummering
            {...props}
            modus="innsyn"
            familiehendelse={sak.familiehendelse}
            konto={konto}
            rettighetType={sak.rettighetType}
            forelder={sak.forelder}
            visStatusIkoner={false}
        />
    );
};
