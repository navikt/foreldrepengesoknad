import { useQuery } from '@tanstack/react-query';
import Environment from 'appData/Environment';
import dayjs from 'dayjs';
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

const getStønadskontoer = async () => {
    const response = await fetch(`${Environment.PUBLIC_PATH}/rest/konto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30 * 1000),
        body: JSON.stringify(STØNADSKONTO_PARAMS),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as TilgjengeligeStønadskontoer;
};

const getSatser = async () => {
    const response = await fetch(`${Environment.PUBLIC_PATH}/rest/satser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30 * 1000),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Satser;
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const HvorMyeVeiviser: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const satserData = useQuery({
        queryKey: ['SATSER'],
        queryFn: getSatser,
    });

    const stønadskontoerData = useQuery({
        queryKey: ['KONTOER'],
        queryFn: getStønadskontoer,
    });

    if (satserData.error || stønadskontoerData.error) {
        return <SimpleErrorPage />;
    }

    if (!satserData.data) {
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
