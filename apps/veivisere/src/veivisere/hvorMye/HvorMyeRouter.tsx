import Environment from 'appData/Environment';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { getAxiosInstance, usePostRequest } from '@navikt/fp-api';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import ArbeidssituasjonSide, { Arbeidssituasjon } from './arbeidssituasjon/ArbeidssituasjonSide';
import HvorMyeForside from './forside/HvorMyeForside';
import OppsummeringSide from './oppsummering/OppsummeringSide';

export const veivisereApi = getAxiosInstance();

const STØNADSKONTO_PARAMS = {
    rettighetstype: 'BEGGE_RETT',
    brukerrolle: 'MOR',
    antallBarn: 1,
    fødselsdato: dayjs().format(ISO_DATE_FORMAT),
    morHarUføretrygd: false,
};

const STØNADSKONTO_OPTIONS = {
    isSuspended: false,
    withCredentials: false,
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvorMyeRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Arbeidssituasjon>();

    const requestData = usePostRequest<TilgjengeligeStønadskontoer>(
        veivisereApi,
        `${Environment.PUBLIC_PATH}/rest/konto`,
        STØNADSKONTO_PARAMS,
        STØNADSKONTO_OPTIONS,
    );
    console.log(`${Environment.PUBLIC_PATH}/rest/konto`);
    if (requestData.error) {
        return <SimpleErrorPage />;
    }

    return (
        <Routes>
            <Route path={HvorMyeRoutes.OM} element={<HvorMyeForside locale={locale} changeLocale={changeLocale} />} />
            <Route
                path={HvorMyeRoutes.ARBEIDSSITUASJON}
                element={
                    <ArbeidssituasjonSide
                        arbeidssituasjon={arbeidssituasjon}
                        setArbeidssituasjon={setArbeidssituasjon}
                    />
                }
            />
            {arbeidssituasjon && requestData.data && (
                <Route
                    path={HvorMyeRoutes.OPPSUMMERING}
                    element={<OppsummeringSide arbeidssituasjon={arbeidssituasjon} stønadskontoer={requestData.data} />}
                />
            )}
            <Route path="*" element={<Navigate to={ContextRoutes.HVOR_MYE + HvorMyeRoutes.OM} />} />
        </Routes>
    );
};

export default HvorMyeRouter;
