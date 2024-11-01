import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import ky from 'ky';
import { FunctionComponent } from 'react';

import { Loader } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import { HvorMyeRouter } from './HvorMyeRouter';

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const STØNADSKONTO_PARAMS = {
    rettighetstype: 'BEGGE_RETT',
    brukerrolle: 'MOR',
    antallBarn: 1,
    fødselsdato: dayjs().format(ISO_DATE_FORMAT),
    morHarUføretrygd: false,
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const HvorMyeVeiviser: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const satserData = useQuery({
        queryKey: ['SATSER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/satser`).json<Satser>(),
    });

    const stønadskontoerData = useQuery({
        queryKey: ['KONTOER'],
        queryFn: () =>
            ky
                .post(`${import.meta.env.BASE_URL}/rest/konto`, {
                    json: STØNADSKONTO_PARAMS,
                })
                .json<TilgjengeligeStønadskontoer>(),
    });

    if (satserData.error || stønadskontoerData.error) {
        return <SimpleErrorPage />;
    }

    if (!satserData.data || !stønadskontoerData.data) {
        return <Spinner />;
    }

    return (
        <HvorMyeRouter
            locale={locale}
            changeLocale={changeLocale}
            satser={satserData.data}
            stønadskontoer={stønadskontoerData.data}
        />
    );
};
