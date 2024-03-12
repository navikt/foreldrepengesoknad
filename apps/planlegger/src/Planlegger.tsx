import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent, useMemo } from 'react';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';

import { createApi, useRequest } from '@navikt/fp-api';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorPage } from '@navikt/fp-ui';

import PlanleggerRouter from './PlanleggerRouter';
import Environment from './appData/Environment';

export const planleggerApi = createApi(Environment.REST_API_URL);

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const Planlegger: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const søkersituasjon = useContextGetData(ContextDataType.SØKERSITUASJON);

    // TODO Bruk ny tjeneste som hentar alt i eitt kall

    const params80 = useMemo(
        () => ({
            antallBarn: omBarnet?.antallBarn,
            morHarRett: arbeidssituasjon?.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER,
            farHarRett: arbeidssituasjon?.arbeidssituasjonAnnenPart,
            morHarAleneomsorg: søkersituasjon?.situasjon === SøkersituasjonEnum.MOR,
            farHarAleneomsorg: søkersituasjon?.situasjon === SøkersituasjonEnum.FAR,
            fødselsdato: omBarnet && erBarnetFødt(omBarnet) ? omBarnet.fødselsdato : undefined,
            termindato: omBarnet && erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : undefined,
            omsorgsovertakelseDato: omBarnet && erBarnetAdoptert(omBarnet) ? omBarnet.adopsjonsdato : undefined,
            dekningsgrad: 80,
            morHarUføretrygd: arbeidssituasjon?.arbeidssituasjon === ArbeidssituasjonEnum.UFØR,
        }),
        [omBarnet, arbeidssituasjon, søkersituasjon],
    );

    const options80 = useMemo(
        () => ({
            isSuspended: arbeidssituasjon === undefined,
            params: params80,
            withCredentials: false,
        }),
        [params80, arbeidssituasjon],
    );
    const params100 = useMemo(
        () => ({
            antallBarn: omBarnet?.antallBarn,
            morHarRett: arbeidssituasjon?.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER,
            farHarRett: arbeidssituasjon?.arbeidssituasjonAnnenPart,
            morHarAleneomsorg: søkersituasjon?.situasjon === SøkersituasjonEnum.MOR,
            farHarAleneomsorg: søkersituasjon?.situasjon === SøkersituasjonEnum.FAR,
            fødselsdato: omBarnet && erBarnetFødt(omBarnet) ? omBarnet.fødselsdato : undefined,
            termindato: omBarnet && erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : undefined,
            omsorgsovertakelseDato: omBarnet && erBarnetAdoptert(omBarnet) ? omBarnet.adopsjonsdato : undefined,
            dekningsgrad: 100,
            morHarUføretrygd: arbeidssituasjon?.arbeidssituasjon === ArbeidssituasjonEnum.UFØR,
        }),
        [omBarnet, arbeidssituasjon, søkersituasjon],
    );

    const options100 = useMemo(
        () => ({
            isSuspended: arbeidssituasjon === undefined,
            params: params100,
            withCredentials: false,
        }),
        [params100, arbeidssituasjon],
    );

    const requestData100 = useRequest<TilgjengeligeStønadskontoerDTO>(
        planleggerApi,
        'https://foreldrepengesoknad-api.nav.no/rest/konto',
        options100,
    );
    const requestData80 = useRequest<TilgjengeligeStønadskontoerDTO>(
        planleggerApi,
        'https://foreldrepengesoknad-api.nav.no/rest/konto',
        options80,
    );

    if (requestData80.error || requestData100.error) {
        return (
            <ErrorPage
                appName="Foreldrepengeplanlegger"
                errorMessage={requestData80?.error?.message || requestData100?.error?.message || ''}
                retryCallback={() => location.reload()}
            />
        );
    }

    return (
        <PlanleggerRouter
            locale={locale}
            changeLocale={changeLocale}
            stønadskontoer80={requestData80.data}
            stønadskontoer100={requestData100.data}
        />
    );
};

export default Planlegger;
