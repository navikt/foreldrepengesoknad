import Environment from 'appData/Environment';
import { FunctionComponent } from 'react';

import { Loader } from '@navikt/ds-react';

import { getAxiosInstance, useRequest } from '@navikt/fp-api';
import { LocaleAll, Satser } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import VeiviserRouter from './VeiviserRouter';

export const veivisereApi = getAxiosInstance();

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const Veiviser: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const satserData = useRequest<Satser>(veivisereApi, `${Environment.PUBLIC_PATH}/rest/satser`);

    if (satserData.error) {
        return <SimpleErrorPage />;
    }

    if (!satserData.data) {
        return <Spinner />;
    }

    return <VeiviserRouter locale={locale} changeLocale={changeLocale} satser={satserData.data} />;
};

export default Veiviser;
