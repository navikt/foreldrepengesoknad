import { useQuery, useSuspenseQueries } from '@tanstack/react-query';
import { API_URLS, mellomlagretInfoOptions, sakerOptions, søkerinfoOptions, useUttaksplanOptions } from 'api/queries';
import { ContextDataMap, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import { usePlanleggerDataFromUrl } from 'appData/usePlanleggerDataFromUrl';
import ky from 'ky';
import { ReactNode, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';
import { shouldApplyStorage } from 'utils/mellomlagringUtils';
import { erFellesUttaksplanEndret, erSakerEndret, erSøkerInfoEndret } from 'utils/registerdataUtils';

import { erUmyndigFeil } from '@navikt/fp-app-shell';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { ErrorBoundary, ErrorPage, RegisterdataUtdatert, Spinner, Umyndig } from '@navikt/fp-ui';
import { useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ForeldrepengesøknadRoutes } from './ForeldrepengesøknadRoutes';

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(API_URLS.mellomlagring);
    } catch {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

export const Foreldrepengesøknad = () => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    return (
        <ErrorBoundary
            appName="foreldrepengesoknad"
            retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
            getErrorPage={getForeldrepengesøknadErrorPage}
        >
            <Suspense fallback={<Spinner />}>
                <ForeldrepengesøknadInnhold />
            </Suspense>
        </ErrorBoundary>
    );
};

const ForeldrepengesøknadErrorPage = ({ error }: { error: Error }) => {
    const intl = useIntl();

    if (erUmyndigFeil(error)) {
        return <Umyndig appName="foreldrepengesoknad" />;
    }

    return (
        <ErrorPage
            appName="foreldrepengesoknad"
            errorMessage={intl.formatMessage({ id: 'Foreldrepengesøknad.FeilVedHentingAvInformasjon' })}
            retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
        />
    );
};

const getForeldrepengesøknadErrorPage = (error: Error) => <ForeldrepengesøknadErrorPage error={error} />;

// useSuspenseQueries i staden for to useSuspenseQuery-kall, for å unngå at kalla blir sekvensielle.
// mellomlagretInfo held fram som useQuery: ein feil her skal ikkje kaste heile appen til feilsida.
const ForeldrepengesøknadInnhold = () => {
    const [søkerinfoQuery, sakerQuery] = useSuspenseQueries({
        queries: [søkerinfoOptions(), sakerOptions()],
    });

    const mellomlagretInfoQuery = useQuery(mellomlagretInfoOptions());
    const mellomlagretInfoData = mellomlagretInfoQuery.data;

    const planleggerDataFraUrl = usePlanleggerDataFromUrl(søkerinfoQuery.data?.kjønn);
    // Forsiden fjerner URL-parameteren, men importen skal fortsatt holdes adskilt fra lagret utkast.
    const [planleggerData] = useState(planleggerDataFraUrl);

    if (mellomlagretInfoQuery.isPending) {
        return <Spinner />;
    }

    const skalBrukeMellomlagretData =
        !planleggerData && mellomlagretInfoData !== undefined && shouldApplyStorage(mellomlagretInfoData);
    const mellomlagretData = skalBrukeMellomlagretData ? mellomlagretInfoData : undefined;
    const lagretAppRoute = mellomlagretData?.[ContextDataType.APP_ROUTE];

    const initialState: ContextDataMap | undefined = planleggerData
        ? { ...planleggerData, [ContextDataType.KOMMER_FRA_PLANLEGGER]: true }
        : mellomlagretData;

    return (
        <FpDataContext initialState={initialState}>
            <RegisterdataSjekk
                mellomlagretData={mellomlagretData}
                søkerInfo={søkerinfoQuery.data}
                foreldrepengerSaker={sakerQuery.data.foreldrepenger}
            >
                <ForeldrepengesøknadRoutes
                    søkerInfo={søkerinfoQuery.data}
                    foreldrepengerSaker={sakerQuery.data.foreldrepenger}
                    currentRoute={skalBrukeMellomlagretData ? notEmpty(lagretAppRoute) : SøknadRoutes.VELKOMMEN}
                    lagretErEndringssøknad={mellomlagretData?.erEndringssøknad ?? false}
                    lagretHarGodkjentVilkår={!!lagretAppRoute}
                    lagretSøknadGjelderNyttBarn={mellomlagretData?.søknadGjelderEtNyttBarn ?? false}
                />
            </RegisterdataSjekk>
        </FpDataContext>
    );
};

// Renderes inne i FpDataContext slik at useUttaksplanOptions kan lese annenForelder/barn fra context.
const RegisterdataSjekk = ({
    mellomlagretData,
    søkerInfo,
    foreldrepengerSaker,
    children,
}: {
    mellomlagretData: FpMellomlagretData | undefined;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    children: ReactNode;
}) => {
    const uttaksplanOptions = useUttaksplanOptions();
    // Felles uttaksplan sammenlignes bare ved oppstart, med lagret plan og grunnlag fra oppstart. Ellers ville
    // spørringen fått ny nøkkel når brukeren endrer den andre forelderen eller barnet senere, og spinneren under
    // ville avmontert rutene og sendt brukeren til lagret steg. Mellomlagringen hentes også på nytt ved vindusfokus,
    // og planen den inneholder kan da gjelde et annet grunnlag enn det som ble sjekket.
    const [oppstart] = useState(() => ({
        uttaksplanOptions,
        lagretFellesUttaksplan: mellomlagretData?.fellesUttaksplan,
    }));
    const [fellesUttaksplanErEndret, setFellesUttaksplanErEndret] = useState<boolean>();
    const skalSjekkeFellesUttaksplan =
        oppstart.lagretFellesUttaksplan !== undefined && fellesUttaksplanErEndret === undefined;
    const uttaksplanQuery = useQuery({
        ...oppstart.uttaksplanOptions,
        enabled: skalSjekkeFellesUttaksplan && oppstart.uttaksplanOptions.enabled,
    });

    if (skalSjekkeFellesUttaksplan && uttaksplanQuery.isSuccess) {
        setFellesUttaksplanErEndret(
            erFellesUttaksplanEndret(notEmpty(oppstart.lagretFellesUttaksplan), uttaksplanQuery.data),
        );
    }

    if (!mellomlagretData) {
        return <>{children}</>;
    }

    if (skalSjekkeFellesUttaksplan && uttaksplanQuery.isPending && uttaksplanQuery.fetchStatus !== 'idle') {
        return <Spinner />;
    }

    const søkerInfoErEndret = erSøkerInfoEndret(mellomlagretData.søkerInfo, søkerInfo);
    const sakerErEndret = erSakerEndret(mellomlagretData.foreldrepengerSaker, foreldrepengerSaker);

    const registerdataErEndret = søkerInfoErEndret || sakerErEndret || fellesUttaksplanErEndret === true;

    if (registerdataErEndret) {
        const avvik = [
            søkerInfoErEndret ? 'søkerInfo' : undefined,
            sakerErEndret ? 'saker' : undefined,
            fellesUttaksplanErEndret ? 'fellesUttaksplan' : undefined,
        ]
            .filter(Boolean)
            .join(',');

        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="foreldrepengesoknad"
                avvik={avvik}
            />
        );
    }

    return <>{children}</>;
};
