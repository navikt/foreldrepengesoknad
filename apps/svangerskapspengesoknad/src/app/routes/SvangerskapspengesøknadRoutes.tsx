import { Loader } from '@navikt/ds-react';
import { ApiAccessError, ApiGeneralError, createApi } from '@navikt/fp-api';
import { Kvittering, LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ErrorPage } from '@navikt/fp-ui';
import { redirect, redirectToLogin } from '@navikt/fp-utils';
import Environment from 'app/Environment';
import { ContextDataType } from 'app/context/SvpDataContext';
import useAvbrytSøknad from 'app/context/useAvbrytSøknad';
import useMellomlagreSøknad, { SvpDataMapAndMetaData } from 'app/context/useMellomlagreSøknad';
import useSendSøknad from 'app/context/useSendSøknad';
import Forside from 'app/pages/forside/Forside';
import ArbeidIUtlandetStep from 'app/steps/arbeid-i-utlandet/ArbeidIUtlandetStep';
import Barnet from 'app/steps/barnet/Barnet';
import EgenNæringStep from 'app/steps/egen-næring/EgenNæringStep';
import FrilansStep from 'app/steps/frilans/FrilansStep';
import InntektsinformasjonSteg from 'app/steps/inntektsinformasjon/InntektsinformasjonSteg';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import PerioderStep from 'app/steps/perioder/PerioderStep';
import SkjemaSteg from 'app/steps/skjema/SkjemaSteg';
import TilretteleggingStep from 'app/steps/tilrettelegging/TilretteleggingStep';
import UtenlandsoppholdSteg from 'app/steps/utenlandsopphold/UtenlandsoppholdSteg';
import SenereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import VelgArbeid from 'app/steps/velg-arbeidsforhold/VelgArbeid';
import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SøknadRoutes from './routes';

export const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const svpApi = createApi(Environment.REST_API_URL);

export const ApiErrorHandler: React.FunctionComponent<{ error: ApiAccessError | ApiGeneralError }> = ({ error }) => {
    if (error instanceof ApiAccessError) {
        redirectToLogin(Environment.LOGIN_URL);
        return <Spinner />;
    }
    return (
        <ErrorPage appName="Svangerskapspenger" errorMessage={error.message} retryCallback={() => location.reload()} />
    );
};

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>,
) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.FORSIDE} />} />;
    }
    return (
        <>
            <Route
                path={SøknadRoutes.BARNET}
                element={
                    <Barnet
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.UTENLANDSOPPHOLD}
                element={
                    <UtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.HAR_BODD_I_UTLANDET}
                element={
                    <TidligereUtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.SKAL_BO_I_UTLANDET}
                element={
                    <SenereUtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ARBEID}
                element={
                    <InntektsinformasjonSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.FRILANS}
                element={
                    <FrilansStep
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.NÆRING}
                element={
                    <EgenNæringStep
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ARBEID_I_UTLANDET}
                element={
                    <ArbeidIUtlandetStep
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.VELG_ARBEID}
                element={
                    <VelgArbeid
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.SKJEMA}
                element={
                    <SkjemaSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.TILRETTELEGGING}
                element={
                    <TilretteleggingStep
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.PERIODER}
                element={
                    <PerioderStep
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.OPPSUMMERING}
                element={
                    <Oppsummering
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

const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({
    søkerInfo,
    locale,
    onChangeLocale,
    mellomlagretData,
}) => {
    const navigate = useNavigate();

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(false);
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { sendSøknad, errorSendSøknad } = useSendSøknad(svpApi, setKvittering, locale);
    const mellomlagreOgNaviger = useMellomlagreSøknad(svpApi, locale, setHarGodkjentVilkår);
    const avbrytSøknad = useAvbrytSøknad(svpApi, setHarGodkjentVilkår);

    useEffect(() => {
        if (mellomlagretData && mellomlagretData[ContextDataType.APP_ROUTE]) {
            setHarGodkjentVilkår(true);
            if (mellomlagretData.locale) {
                onChangeLocale(mellomlagretData.locale);
            }
            navigate(mellomlagretData[ContextDataType.APP_ROUTE]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                path={SøknadRoutes.FORSIDE}
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

export default SvangerskapspengesøknadRoutes;
