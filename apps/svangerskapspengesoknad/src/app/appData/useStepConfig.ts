import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { Arbeidsforhold } from '@navikt/fp-types';
import { ProgressStep } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { DelivisTilretteleggingPeriodeType } from 'app/types/DelivisTilretteleggingPeriodeType';
import Tilrettelegging, { TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './SvpDataContext';
import SøknadRoutes from './routes';

const getStepLabels = (
    intl: IntlShape,
    erFlereTilrettelegginger?: boolean,
    navn?: string,
): Record<SøknadRoutes, string> => ({
    [SøknadRoutes.BARNET]: intl.formatMessage({ id: 'steps.label.barnet' }),
    [SøknadRoutes.INNTEKTSINFORMASJON]: intl.formatMessage({ id: 'steps.label.arbeid' }),
    [SøknadRoutes.ARBEID_I_UTLANDET]: intl.formatMessage({ id: 'steps.label.arbeidIUtlandet' }),
    [SøknadRoutes.FORSIDE]: '',
    [SøknadRoutes.FRILANS]: intl.formatMessage({ id: 'steps.label.frilans' }),
    [SøknadRoutes.HAR_BODD_I_UTLANDET]: intl.formatMessage({ id: 'steps.label.boIUtlandetIFortid' }),
    [SøknadRoutes.NÆRING]: intl.formatMessage({ id: 'steps.label.næring' }),
    [SøknadRoutes.OPPSUMMERING]: intl.formatMessage({ id: 'steps.label.oppsummering' }),
    [SøknadRoutes.PERIODER]: erFlereTilrettelegginger
        ? intl.formatMessage({ id: 'steps.label.periode.flere' }, { navn })
        : intl.formatMessage({ id: 'steps.label.periode.en' }),
    [SøknadRoutes.SKAL_BO_I_UTLANDET]: intl.formatMessage({ id: 'steps.label.boIUtlandetIFremtid' }),
    [SøknadRoutes.SKJEMA]: erFlereTilrettelegginger
        ? intl.formatMessage({ id: 'steps.label.skjema.flere' }, { navn })
        : intl.formatMessage({ id: 'steps.label.skjema.en' }),
    [SøknadRoutes.TILRETTELEGGING]: erFlereTilrettelegginger
        ? intl.formatMessage({ id: 'steps.label.tilrettelegging.flere' }, { navn })
        : intl.formatMessage({ id: 'steps.label.tilrettelegging.en' }),
    [SøknadRoutes.UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold' }),
    [SøknadRoutes.VELG_ARBEID]: intl.formatMessage({ id: 'steps.label.velgArbeid' }),
});

const createStep = (route: SøknadRoutes, intl: IntlShape, currentPath: string) => ({
    id: route,
    label: getStepLabels(intl)[route],
    isSelected: currentPath === route,
});

const getStepConfig = (
    intl: IntlShape,
    currentPath: SøknadRoutes,
    arbeidsforhold: Arbeidsforhold[],
    getStateData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
): Array<ProgressStep<SøknadRoutes>> => {
    const inntektsinformasjon = getStateData(ContextDataType.INNTEKTSINFORMASJON);
    const tilrettelegginger = getStateData(ContextDataType.TILRETTELEGGINGER);
    const barn = getStateData(ContextDataType.OM_BARNET);
    const utenlandsopphold = getStateData(ContextDataType.UTENLANDSOPPHOLD);
    const valgtTilretteleggingId = getStateData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const steps = [
        createStep(SøknadRoutes.BARNET, intl, currentPath),
        createStep(SøknadRoutes.UTENLANDSOPPHOLD, intl, currentPath),
    ];

    if (utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd) {
        steps.push(createStep(SøknadRoutes.HAR_BODD_I_UTLANDET, intl, currentPath));
    }
    if (utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd) {
        steps.push(createStep(SøknadRoutes.SKAL_BO_I_UTLANDET, intl, currentPath));
    }

    steps.push(createStep(SøknadRoutes.INNTEKTSINFORMASJON, intl, currentPath));

    if (inntektsinformasjon?.harJobbetSomFrilans) {
        steps.push(createStep(SøknadRoutes.FRILANS, intl, currentPath));
    }

    if (inntektsinformasjon?.harJobbetSomSelvstendigNæringsdrivende) {
        steps.push(createStep(SøknadRoutes.NÆRING, intl, currentPath));
    }

    if (inntektsinformasjon?.harHattArbeidIUtlandet) {
        steps.push(createStep(SøknadRoutes.ARBEID_I_UTLANDET, intl, currentPath));
    }

    const harKunEtArbeid = barn?.termindato
        ? søkerHarKunEtAktivtArbeid(
              barn.termindato,
              arbeidsforhold,
              inntektsinformasjon?.harJobbetSomFrilans || false,
              inntektsinformasjon?.harJobbetSomSelvstendigNæringsdrivende || false,
          )
        : true;

    if (!harKunEtArbeid) {
        steps.push(createStep(SøknadRoutes.VELG_ARBEID, intl, currentPath));
    }

    if (tilrettelegginger && tilrettelegginger.length > 0) {
        const erFlereTilrettelegginger = tilrettelegginger.length > 1;
        tilrettelegginger.forEach((tilrettelegging: Tilrettelegging) => {
            const navn = tilrettelegging.arbeidsforhold.navn;
            const labels = getStepLabels(intl, erFlereTilrettelegginger, navn);
            steps.push({
                id: SøknadRoutes.SKJEMA,
                label: labels[SøknadRoutes.SKJEMA],
                isSelected: currentPath === SøknadRoutes.SKJEMA && tilrettelegging.id === valgtTilretteleggingId,
            });
            steps.push({
                id: SøknadRoutes.TILRETTELEGGING,
                label: labels[SøknadRoutes.TILRETTELEGGING],
                isSelected:
                    currentPath === SøknadRoutes.TILRETTELEGGING && tilrettelegging.id === valgtTilretteleggingId,
            });
            if (
                tilrettelegging.type === TilretteleggingstypeOptions.DELVIS &&
                tilrettelegging.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
            ) {
                steps.push({
                    id: SøknadRoutes.PERIODER,
                    label: labels[SøknadRoutes.PERIODER],
                    isSelected: currentPath === SøknadRoutes.PERIODER && tilrettelegging.id === valgtTilretteleggingId,
                });
            }
        });
    } else {
        steps.push(createStep(SøknadRoutes.SKJEMA, intl, currentPath));
        steps.push(createStep(SøknadRoutes.TILRETTELEGGING, intl, currentPath));
    }

    steps.push(createStep(SøknadRoutes.OPPSUMMERING, intl, currentPath));

    return steps;
};

const useStepConfig = (arbeidsforhold: Arbeidsforhold[]): Array<ProgressStep<SøknadRoutes>> => {
    const intl = useIntl();

    const location = useLocation();
    const getStateData = useContextGetAnyData();

    const currentPath = useMemo(
        () => notEmpty(Object.values(SøknadRoutes).find((v) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );
    return getStepConfig(intl, currentPath, arbeidsforhold, getStateData);
};

export default useStepConfig;
