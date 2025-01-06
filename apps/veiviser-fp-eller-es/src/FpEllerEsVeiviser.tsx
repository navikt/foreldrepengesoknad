import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import { Loader } from '@navikt/ds-react';

import { LocaleAll, Satser } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import { FpEllerEsRouter } from './FpEllerEsRouter';

const Spinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const FpEllerEsVeiviser = ({ locale, changeLocale }: Props) => {
    const satserData = useQuery({
        queryKey: ['SATSER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/satser`).json<Satser>(),
    });

    if (satserData.error) {
        return <SimpleErrorPage />;
    }

    if (!satserData.data) {
        return <Spinner />;
    }

    return <FpEllerEsRouter locale={locale} changeLocale={changeLocale} satser={satserData.data} />;
};
