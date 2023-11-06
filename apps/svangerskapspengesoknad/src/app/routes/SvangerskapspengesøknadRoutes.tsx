import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SøknadRoutes from './routes';
import isAvailable from './isAvailable';
import Forside from 'app/pages/forside/Forside';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import Barnet from 'app/steps/barnet/Barnet';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import Utenlandsopphold from 'app/steps/utenlandsopphold/Utenlandsopphold';
import TilretteleggingStep from 'app/steps/tilrettelegging/TilretteleggingStep';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import Skjema from 'app/steps/skjema/Skjema';
import Tilrettelegging, { TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import useSøknad from 'app/utils/hooks/useSøknad';
import FrilansStep from 'app/steps/frilans/FrilansStep';
import ArbeidIUtlandetStep from 'app/steps/arbeid-i-utlandet/ArbeidIUtlandetStep';
import VelgArbeid from 'app/steps/velg-arbeidsforhold/VelgArbeid';
import EgenNæringStep from 'app/steps/egen-næring/EgenNæringStep';
import BoIUtlandet from 'app/steps/bo-i-utlandet/BoIUtlandet';
import SøknadSendt from 'app/pages/søknad-sendt/SøknadSendt';
import { DelivisTilretteleggingPeriodeType } from 'app/steps/tilrettelegging/tilretteleggingStepFormConfig';
import PerioderStep from 'app/steps/perioder/PerioderStep';
import { LocaleNo } from '@navikt/fp-types';
interface Props {
    currentRoute: SøknadRoutes;
    locale: LocaleNo;
    onChangeLocale: (locale: LocaleNo) => void;
}

export const getForrigeTilrettelegging = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
) => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[tilretteleggingBehov.length - 1];
    }
    const forrigeTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) - 1;
    if (forrigeTilretteleggingIndex < 0) {
        return undefined;
    }
    return tilretteleggingBehov[forrigeTilretteleggingIndex];
};

export const getNesteTilretteleggingId = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
) => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[0].id;
    }
    const nesteTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) + 1;
    if (nesteTilretteleggingIndex === tilretteleggingBehov.length) {
        return undefined;
    }
    return tilretteleggingBehov[nesteTilretteleggingIndex].id;
};

export const findNextRoute = (
    currentRoute: SøknadRoutes,
    nextRoute: SøknadRoutes,
    currentTilretteleggingId: string | undefined,
    tilretteleggingBehov: Tilrettelegging[],
): any => {
    if (currentRoute !== SøknadRoutes.SKJEMA && currentRoute !== SøknadRoutes.TILRETTELEGGING) {
        return nextRoute;
    }

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingBehov, currentTilretteleggingId);

    if (nesteTilretteleggingId) {
        return `${SøknadRoutes.TILRETTELEGGING}/${nesteTilretteleggingId}`;
    } else {
        return SøknadRoutes.OPPSUMMERING;
    }
};

const getSkjemaRoutes = (tilretteleggingValg: Tilrettelegging[] | undefined) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                key={tilrettelegging.id}
                path={`${SøknadRoutes.SKJEMA}/${tilrettelegging.id}`}
                element={
                    <Skjema
                        key={tilrettelegging.id}
                        id={tilrettelegging.id}
                        typeArbeid={tilrettelegging.arbeidsforhold.type}
                        navn={tilrettelegging.arbeidsforhold.navn}
                    />
                }
            />
        );
    });
};

const getPerioderRoutes = (tilretteleggingValg: Tilrettelegging[] | undefined) => {
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
                        />
                    }
                />
            );
        });
};

const getTilretteleggingRoutes = (tilretteleggingValg: Tilrettelegging[] | undefined) => {
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
                    />
                }
            />
        );
    });
};

const renderSøknadRoutes = (harGodkjentVilkår: boolean, tilretteleggingBehov: Tilrettelegging[]) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.FORSIDE} />} />;
    }
    return (
        <>
            <Route path={SøknadRoutes.BARNET} element={<Barnet />} />
            <Route path={SøknadRoutes.UTENLANDSOPPHOLD} element={<Utenlandsopphold />} />
            <Route
                path={SøknadRoutes.HAR_BODD_I_UTLANDET}
                element={<BoIUtlandet key={'iFortid'} oppgirIFortid={true} />}
            />
            <Route
                path={SøknadRoutes.SKAL_BO_I_UTLANDET}
                element={<BoIUtlandet key={'iFremtid'} oppgirIFortid={false} />}
            />
            <Route path={SøknadRoutes.UTENLANDSOPPHOLD} element={<Utenlandsopphold />} />
            <Route path={SøknadRoutes.ARBEID} element={<Inntektsinformasjon />} />
            <Route path={SøknadRoutes.FRILANS} element={<FrilansStep />} />
            <Route path={SøknadRoutes.NÆRING} element={<EgenNæringStep />} />
            <Route path={SøknadRoutes.ARBEID_I_UTLANDET} element={<ArbeidIUtlandetStep />} />
            <Route path={SøknadRoutes.VELG_ARBEID} element={<VelgArbeid />} />
            {getSkjemaRoutes(tilretteleggingBehov)}
            {getTilretteleggingRoutes(tilretteleggingBehov)}
            {getPerioderRoutes(tilretteleggingBehov)}
            <Route path={SøknadRoutes.OPPSUMMERING} element={<Oppsummering />} />
            <Route path={SøknadRoutes.SØKNAD_SENDT} element={<SøknadSendt />} />
        </>
    );
};

const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({ currentRoute, locale, onChangeLocale }) => {
    const { state } = useSvangerskapspengerContext();
    const { tilrettelegging } = useSøknad();
    const navigate = useNavigate();
    const harGodkjentVilkår = state.søknad.harGodkjentVilkår;
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    useEffect(() => {
        if (currentRoute && harGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isAvailable(currentRoute, harGodkjentVilkår)) {
                navigate(currentRoute);
            }
        }
    }, [currentRoute, harGodkjentVilkår, navigate, isFirstTimeLoadingApp]);

    return (
        <Routes>
            <Route path={SøknadRoutes.FORSIDE} element={<Forside locale={locale} onChangeLocale={onChangeLocale} />} />

            {renderSøknadRoutes(harGodkjentVilkår, tilrettelegging)}
        </Routes>
    );
};

export default SvangerskapspengesøknadRoutes;
