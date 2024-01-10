import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, redirect, useNavigate } from 'react-router-dom';
import { Kvittering, LocaleNo } from '@navikt/fp-types';
import Forside from 'app/pages/forside/Forside';
import Barnet from 'app/steps/barnet/Barnet';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import UtenlandsoppholdSteg from 'app/steps/utenlandsopphold/UtenlandsoppholdSteg';
import TilretteleggingStep from 'app/steps/tilrettelegging/TilretteleggingStep';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import SkjemaSteg from 'app/steps/skjema/SkjemaSteg';
import Tilrettelegging, { TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import FrilansStep from 'app/steps/frilans/FrilansStep';
import ArbeidIUtlandetStep from 'app/steps/arbeid-i-utlandet/ArbeidIUtlandetStep';
import VelgArbeid from 'app/steps/velg-arbeidsforhold/VelgArbeid';
import EgenNæringStep from 'app/steps/egen-næring/EgenNæringStep';
import { DelivisTilretteleggingPeriodeType } from 'app/steps/tilrettelegging/tilretteleggingStepFormConfig';
import PerioderStep from 'app/steps/perioder/PerioderStep';
import { Søkerinfo } from 'app/types/Søkerinfo';
import useMellomlagreSøknad, { SvpDataMapAndMetaData } from 'app/context/useMellomlagreSøknad';
import useAvbrytSøknad from 'app/context/useAvbrytSøknad';
import TidligereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import SenereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import useSendSøknad from 'app/context/useSendSøknad';
import SøknadRoutes from './routes';
import Environment from 'app/Environment';
import { Loader } from '@navikt/ds-react';
import { ApiAccessError, ApiGeneralError, createApi } from '@navikt/fp-api';
import { redirectToLogin } from '@navikt/fp-utils';
import { ErrorPage } from '@navikt/fp-ui';
import { ContextDataType, useContextGetData } from 'app/context/SvpDataContext';
import { notEmpty } from '@navikt/fp-validation';

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

const getSkjemaRoutes = (
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    tilretteleggingValg: Tilrettelegging[] | undefined,
) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                key={tilrettelegging.id}
                path={`${SøknadRoutes.SKJEMA}/${tilrettelegging.id}`}
                element={
                    <SkjemaSteg
                        key={tilrettelegging.id}
                        id={tilrettelegging.id}
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
        );
    });
};

const getPerioderRoutes = (
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    tilretteleggingValg: Tilrettelegging[] | undefined,
) => {
    return tilretteleggingValg
        ?.filter(
            (t) =>
                t.type === TilretteleggingstypeOptions.DELVIS &&
                t.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        )
        .map((tilrettelegging) => {
            return (
                <Route
                    key={tilrettelegging.id}
                    path={`${SøknadRoutes.PERIODER}/${tilrettelegging.id}`}
                    element={
                        <PerioderStep
                            key={tilrettelegging.id}
                            id={tilrettelegging.id}
                            navn={tilrettelegging.arbeidsforhold.navn}
                            søkerInfo={søkerInfo}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                        />
                    }
                />
            );
        });
};

const getTilretteleggingRoutes = (
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    tilretteleggingValg: Tilrettelegging[] | undefined,
) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                key={tilrettelegging.id}
                path={`${SøknadRoutes.TILRETTELEGGING}/${tilrettelegging.id}`}
                element={
                    <TilretteleggingStep
                        key={tilrettelegging.id}
                        id={tilrettelegging.id}
                        typeArbeid={tilrettelegging.arbeidsforhold.type}
                        navn={tilrettelegging.arbeidsforhold.navn}
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
        );
    });
};

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    tilretteleggingBehov: Tilrettelegging[],
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
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.UTENLANDSOPPHOLD}
                element={
                    <UtenlandsoppholdSteg
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.HAR_BODD_I_UTLANDET}
                element={
                    <TidligereUtenlandsoppholdSteg
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.SKAL_BO_I_UTLANDET}
                element={
                    <SenereUtenlandsoppholdSteg
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ARBEID}
                element={
                    <Inntektsinformasjon
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.FRILANS}
                element={
                    <FrilansStep
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.NÆRING}
                element={
                    <EgenNæringStep
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ARBEID_I_UTLANDET}
                element={
                    <ArbeidIUtlandetStep
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.VELG_ARBEID}
                element={
                    <VelgArbeid
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            {getSkjemaRoutes(søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad, tilretteleggingBehov)}
            {getTilretteleggingRoutes(søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad, tilretteleggingBehov)}
            {getPerioderRoutes(søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad, tilretteleggingBehov)}
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

const EMPTY_ARRAY = [] as Tilrettelegging[];

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
    const tilrettelegging = useContextGetData(ContextDataType.TILRETTELEGGING) || EMPTY_ARRAY;

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(false);
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { sendSøknad, errorSendSøknad } = useSendSøknad(svpApi, setKvittering, locale);
    const { mellomlagreOgNaviger, errorMellomlagre } = useMellomlagreSøknad(svpApi, locale, setHarGodkjentVilkår);
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

    if (errorSendSøknad || errorMellomlagre) {
        return <ApiErrorHandler error={notEmpty(errorSendSøknad || errorMellomlagre)} />;
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

            {renderSøknadRoutes(
                harGodkjentVilkår,
                tilrettelegging,
                søkerInfo,
                mellomlagreOgNaviger,
                avbrytSøknad,
                sendSøknad,
            )}
        </Routes>
    );
};

export default SvangerskapspengesøknadRoutes;
