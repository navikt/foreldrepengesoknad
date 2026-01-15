import { useQuery } from '@tanstack/react-query';
import { tilgjengeligeStønadskontoerOptions } from 'appData/queries';
import dayjs from 'dayjs';

import { DEFAULT_SATSER, ISO_DATE_FORMAT } from '@navikt/fp-constants';
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
    const stønadskontoerData = useQuery(tilgjengeligeStønadskontoerOptions(STØNADSKONTO_PARAMS));

    if (stønadskontoerData.error) {
        return <SimpleErrorPage />;
    }

    if (!stønadskontoerData.data) {
        return <Spinner />;
    }

    return <HvorMyeRouter satser={DEFAULT_SATSER} stønadskontoer={stønadskontoerData.data} />;
};
