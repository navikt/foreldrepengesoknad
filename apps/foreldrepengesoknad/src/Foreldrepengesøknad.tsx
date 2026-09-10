import { useQuery } from '@tanstack/react-query';
import {
    API_URLS,
    mellomlagretInfoOptions,
    sakerOptions,
    søkerinfoOptions,
    useAnnenPartVedtakOptions,
} from 'api/queries';
import { ContextDataMap, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import { usePlanleggerDataFromUrl } from 'appData/usePlanleggerDataFromUrl';
import ky from 'ky';
import { ReactNode, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { shouldApplyStorage } from 'utils/mellomlagringUtils';

import { erUmyndigFeil } from '@navikt/fp-app-shell';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { ErrorBoundary, RegisterdataUtdatert, Spinner, Umyndig } from '@navikt/fp-ui';
import { erLikUansettRekkefølge, omitMany, useDocumentTitle } from '@navikt/fp-utils';
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

    const søkerinfoQuery = useQuery(søkerinfoOptions());

    const sakerQuery = useQuery(sakerOptions());

    const mellomlagretInfoQuery = useQuery(mellomlagretInfoOptions());
    const mellomlagretInfoData = mellomlagretInfoQuery.data;

    const planleggerData = usePlanleggerDataFromUrl(søkerinfoQuery.data?.kjønn);

    const harUmyndigFeil = erUmyndigFeil(søkerinfoQuery.error) || erUmyndigFeil(sakerQuery.error);

    useEffect(() => {
        if (harUmyndigFeil || !(søkerinfoQuery.error || sakerQuery.error)) {
            return;
        }

        const error = new Error(intl.formatMessage({ id: 'Foreldrepengesøknad.FeilVedHentingAvInformasjon' }));
        throw error;
    }, [søkerinfoQuery.error, sakerQuery.error, harUmyndigFeil, intl]);

    if (harUmyndigFeil) {
        return <Umyndig appName="foreldrepengesoknad" />;
    }

    if (!sakerQuery.data || !søkerinfoQuery.data || mellomlagretInfoQuery.isPending) {
        return <Spinner />;
    }

    const skalBrukeMellomlagretData = mellomlagretInfoData !== undefined && shouldApplyStorage(mellomlagretInfoData);
    const mellomlagretData = skalBrukeMellomlagretData ? mellomlagretInfoData : undefined;
    const lagretAppRoute = mellomlagretData?.[ContextDataType.APP_ROUTE];

    const initialState: ContextDataMap | undefined = planleggerData
        ? { ...mellomlagretData, ...planleggerData, [ContextDataType.KOMMER_FRA_PLANLEGGER]: true }
        : mellomlagretData;

    return (
        <ErrorBoundary appName="foreldrepengesoknad" retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}>
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
        </ErrorBoundary>
    );
};

// Sjekkar om registerdata (søkerInfo, saker, annenpartsvedtak) har endra seg
// sidan mellomlagring. Renderast inne i FpDataContext slik at
// useAnnenPartVedtakOptions kan lesa annenForelder/barn frå context og sjølv
// styra om kallet skal gjerast.
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
    const annenPartVedtakQuery = useQuery(useAnnenPartVedtakOptions());

    if (!mellomlagretData) {
        return <>{children}</>;
    }

    const harLagretAnnenPartVedtak = mellomlagretData.annenPartVedtak !== undefined;

    if (harLagretAnnenPartVedtak && annenPartVedtakQuery.isPending && annenPartVedtakQuery.fetchStatus !== 'idle') {
        return <Spinner />;
    }

    const annenPartVedtakErEndret =
        harLagretAnnenPartVedtak &&
        annenPartVedtakQuery.isSuccess &&
        !erLikUansettRekkefølge(annenPartVedtakQuery.data, mellomlagretData.annenPartVedtak);

    const søkerInfoErEndret = !erLikUansettRekkefølge(
        // frilansoppdrag/selvstendigNæring kan mangle på lagret søkerInfo dersom mellomlagringen ble gjort
        // før disse feltene fantes i kontrakten. Da faller vi tilbake på ferske data i stedet for å be brukeren
        // starte på nytt bare fordi den lagrede søknaden mangler felt hun aldri fikk mulighet til å ha.
        {
            ...mellomlagretData.søkerInfo,
            frilansoppdrag: mellomlagretData.søkerInfo.frilansoppdrag ?? søkerInfo.frilansoppdrag ?? [],
            selvstendigNæring: mellomlagretData.søkerInfo.selvstendigNæring ?? søkerInfo.selvstendigNæring ?? [],
        },
        søkerInfo,
    );

    const sakerErEndret = !erLikUansettRekkefølge(
        relevanteSaker(mellomlagretData.foreldrepengerSaker),
        relevanteSaker(foreldrepengerSaker),
    );

    const registerdataErEndret = søkerInfoErEndret || sakerErEndret || annenPartVedtakErEndret;

    if (registerdataErEndret) {
        const avvik = [
            søkerInfoErEndret ? 'søkerInfo' : undefined,
            sakerErEndret ? 'saker' : undefined,
            annenPartVedtakErEndret ? 'annenPartVedtak' : undefined,
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

// Samanliknar berre felt som faktisk gjer ei mellomlagra søknad ugyldig.
// Volatile felt frå backend som ikkje seier noko om søknadsgrunnlaget er endra,
// blir fjerna: oppdatertTidspunkt er eit reint tidsstempel, og åpenBehandling er
// behandlingsstatus (berre brukt til statustekst på forsida, ikkje i sjølve
// søknadsflyten). I gjeldendeVedtak er det berre periodane som blir brukte i
// søknadsflyten; beregningsgrunnlag og tilkjentYtelse høyrer til oversikta og
// skal ikkje gjera ei mellomlagring utdatert. Slik unngår vi falske positive
// utdatert-varsel.
const relevanteSaker = (saker: FpSak_fpoversikt[]) =>
    saker.map((sak) => ({
        ...omitMany(sak, ['oppdatertTidspunkt', 'åpenBehandling', 'gjeldendeVedtak']),
        ...(sak.gjeldendeVedtak && {
            gjeldendeVedtak: omitMany(sak.gjeldendeVedtak, ['beregningsgrunnlag', 'tilkjentYtelse']),
        }),
    }));
