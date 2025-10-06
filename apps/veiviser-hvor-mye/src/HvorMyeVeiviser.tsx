import { useQuery } from '@tanstack/react-query';
import { hentSatserOptions, tilgjengeligeStønadskontoerOptions } from 'appData/queries';
import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { SimpleErrorPage, Spinner } from '@navikt/fp-ui';

import { HvorMyeRouter } from './HvorMyeRouter';

const STØNADSKONTO_PARAMS = {
    rettighetstype: 'BEGGE_RETT',
    brukerrolle: 'MOR',
    antallBarn: '1',
    fødselsdato: dayjs().format(ISO_DATE_FORMAT),
    morHarUføretrygd: false,
};

export const HvorMyeVeiviser = () => {
    const satserData = useQuery(hentSatserOptions());

    const stønadskontoerData = useQuery(tilgjengeligeStønadskontoerOptions(STØNADSKONTO_PARAMS));

    if (satserData.error || stønadskontoerData.error) {
        return <SimpleErrorPage />;
    }

    if (!satserData.data || !stønadskontoerData.data) {
        return <Spinner />;
    }

    return <HvorMyeRouter satser={satserData.data} stønadskontoer={stønadskontoerData.data} />;
};
