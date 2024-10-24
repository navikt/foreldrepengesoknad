import Environment from 'appData/Environment';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, TILRETTELEGGING_PARAM } from 'appData/routes';
import { useAvbrytSøknad } from 'appData/useAvbrytSøknad';
import { useSendSøknad } from 'appData/useSendSøknad';
import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { Kvittering, LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ErrorPage } from '@navikt/fp-ui';
import { redirect } from '@navikt/fp-utils';

import { SvpDataMapAndMetaData, useMellomlagreSøknad } from './app-data/useMellomlagreSøknad';
import { Forside } from './pages/forside/Forside';
import { ArbeidIUtlandetSteg } from './steps/arbeid-i-utlandet/ArbeidIUtlandetSteg';
import { ArbeidsforholdOgInntektSteg } from './steps/arbeidsforhold-og-inntekt/ArbeidsforholdOgInntektSteg';
import { BarnetSteg } from './steps/barnet/BarnetSteg';
import { EgenNæringSteg } from './steps/egen-næring/EgenNæringSteg';
import { FrilansSteg } from './steps/frilans/FrilansSteg';
import { OppsummeringSteg } from './steps/oppsummering/OppsummeringSteg';
import { PerioderSteg } from './steps/perioder/PerioderSteg';
import { SkjemaSteg } from './steps/skjema/SkjemaSteg';
import { TilretteleggingSteg } from './steps/tilrettelegging/TilretteleggingSteg';
import { SenereUtenlandsoppholdSteg } from './steps/utenlandsopphold-senere/SenereUtenlandsoppholdSteg';
import { TidligereUtenlandsoppholdSteg } from './steps/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg';
import { UtenlandsoppholdSteg } from './steps/utenlandsopphold/UtenlandsoppholdSteg';
import { VelgArbeidSteg } from './steps/velg-arbeidsforhold/VelgArbeidSteg';

export const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const ApiErrorHandler: React.FunctionComponent<{ error: Error }> = ({ error }) => {
    return (
        <ErrorPage appName="Svangerskapspenger" errorMessage={error.message} retryCallback={() => location.reload()} />
    );
};

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    sendSøknad: () => Promise<void>,
) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoute.FORSIDE} />} />;
    }
    return (
        <>
            <Route
                path={SøknadRoute.BARNET}
                element={
                    <BarnetSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.UTENLANDSOPPHOLD}
                element={
                    <UtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.HAR_BODD_I_UTLANDET}
                element={
                    <TidligereUtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.SKAL_BO_I_UTLANDET}
                element={
                    <SenereUtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT}
                element={
                    <ArbeidsforholdOgInntektSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.FRILANS}
                element={
                    <FrilansSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.NÆRING}
                element={
                    <EgenNæringSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.ARBEID_I_UTLANDET}
                element={
                    <ArbeidIUtlandetSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.VELG_ARBEID}
                element={
                    <VelgArbeidSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={`${SøknadRoute.SKJEMA}/${TILRETTELEGGING_PARAM}`}
                element={
                    <SkjemaSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={`${SøknadRoute.TILRETTELEGGING}/${TILRETTELEGGING_PARAM}`}
                element={
                    <TilretteleggingSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={`${SøknadRoute.PERIODER}/${TILRETTELEGGING_PARAM}`}
                element={
                    <PerioderSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoute.OPPSUMMERING}
                element={
                    <OppsummeringSteg
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                        sendSøknad={sendSøknad}
                    />
                }
            />
        </>
    );
};

interface Props {
    locale: LocaleNo;
    onChangeLocale: (locale: LocaleNo) => void;
    søkerInfo: Søkerinfo;
    mellomlagretData?: SvpDataMapAndMetaData;
}

export const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({
    søkerInfo,
    locale,
    onChangeLocale,
    mellomlagretData,
}) => {
    const navigate = useNavigate();

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(false);
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { sendSøknad, errorSendSøknad } = useSendSøknad(setKvittering, locale, søkerInfo.arbeidsforhold);
    const mellomlagreOgNaviger = useMellomlagreSøknad(locale, setHarGodkjentVilkår);
    const avbrytSøknad = useAvbrytSøknad(setHarGodkjentVilkår);

    useEffect(() => {
        if (mellomlagretData?.[ContextDataType.APP_ROUTE]) {
            setHarGodkjentVilkår(true);
            if (mellomlagretData.locale) {
                onChangeLocale(mellomlagretData.locale);
            }
            navigate(mellomlagretData[ContextDataType.APP_ROUTE]);
        }
    }, [mellomlagretData]);

    if (kvittering) {
        if (Environment.INNSYN) {
            redirect(
                kvittering.saksNr
                    ? `${Environment.INNSYN}/sak/${kvittering.saksNr}/redirectFromSoknad`
                    : `${Environment.INNSYN}/redirectFromSoknad`,
            );
            return <Spinner />;
        }
        return <div>Redirected to Innsyn</div>;
    }

    if (errorSendSøknad) {
        return <ApiErrorHandler error={errorSendSøknad} />;
    }

    return (
        <Routes>
            <Route
                path={SøknadRoute.FORSIDE}
                element={
                    <Forside
                        mellomlagreSøknadOgNaviger={mellomlagreOgNaviger}
                        setHarGodkjentVilkår={setHarGodkjentVilkår}
                        harGodkjentVilkår={harGodkjentVilkår}
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                    />
                }
            />

            {renderSøknadRoutes(harGodkjentVilkår, søkerInfo, mellomlagreOgNaviger, avbrytSøknad, sendSøknad)}
        </Routes>
    );
};
