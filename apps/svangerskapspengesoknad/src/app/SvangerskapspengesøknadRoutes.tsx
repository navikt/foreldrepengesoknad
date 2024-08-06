import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { ApiAccessError, ApiGeneralError, getAxiosInstance } from '@navikt/fp-api';
import { Kvittering, LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ErrorPage } from '@navikt/fp-ui';
import { redirect } from '@navikt/fp-utils';

import { FerieStep } from 'app/steps/ferie/FerieStep';

import Environment from './appData/Environment';
import { ContextDataType } from './appData/SvpDataContext';
import SøknadRoutes from './appData/routes';
import useAvbrytSøknad from './appData/useAvbrytSøknad';
import useMellomlagreSøknad, { SvpDataMapAndMetaData } from './appData/useMellomlagreSøknad';
import useSendSøknad from './appData/useSendSøknad';
import Forside from './pages/forside/Forside';
import ArbeidIUtlandetStep from './steps/arbeid-i-utlandet/ArbeidIUtlandetStep';
import Barnet from './steps/barnet/Barnet';
import EgenNæringStep from './steps/egen-næring/EgenNæringStep';
import FrilansStep from './steps/frilans/FrilansStep';
import InntektsinformasjonSteg from './steps/inntektsinformasjon/InntektsinformasjonSteg';
import Oppsummering from './steps/oppsummering/Oppsummering';
import PerioderStep from './steps/perioder/PerioderStep';
import SkjemaSteg from './steps/skjema/SkjemaSteg';
import TilretteleggingStep from './steps/tilrettelegging/TilretteleggingStep';
import UtenlandsoppholdSteg from './steps/utenlandsopphold/UtenlandsoppholdSteg';
import SenereUtenlandsoppholdSteg from './steps/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from './steps/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import VelgArbeid from './steps/velg-arbeidsforhold/VelgArbeid';

export const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const svpApi = getAxiosInstance();

export const ApiErrorHandler: React.FunctionComponent<{ error: ApiAccessError | ApiGeneralError }> = ({ error }) => {
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
                path={SøknadRoutes.INNTEKTSINFORMASJON}
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
                path={SøknadRoutes.FERIE}
                element={
                    <FerieStep
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
