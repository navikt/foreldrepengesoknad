import { useQuery } from '@tanstack/react-query';
import { tilgjengeligeStønadskvoterOptions } from 'appData/queries';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { DEFAULT_SATSER, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { SidetittelProvider, SimpleErrorPage, Spinner } from '@navikt/fp-ui';

import { HvorMyeRouter } from './HvorMyeRouter';

const STØNADSKONTO_PARAMS = {
    rettighetstype: 'BEGGE_RETT',
    brukerrolle: 'MOR',
    antallBarn: '1',
    fødselsdato: dayjs().format(ISO_DATE_FORMAT),
    morHarUføretrygd: false,
};

export const HvorMyeVeiviser = () => {
    const intl = useIntl();

    return (
        <SidetittelProvider appTittel={intl.formatMessage({ id: 'HvorMyeForside.Title' })}>
            <HvorMyeVeiviserInnhold />
        </SidetittelProvider>
    );
};

const HvorMyeVeiviserInnhold = () => {
    const stønadskvoterData = useQuery(tilgjengeligeStønadskvoterOptions(STØNADSKONTO_PARAMS));

    if (stønadskvoterData.error) {
        return <SimpleErrorPage />;
    }

    if (!stønadskvoterData.data) {
        return <Spinner />;
    }

    return <HvorMyeRouter satser={DEFAULT_SATSER} stønadskvoter={stønadskvoterData.data} />;
};
