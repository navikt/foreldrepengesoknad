import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import {
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';
import { søkerHarKunEtAktivtArbeid } from 'utils/arbeidsforholdUtils';
import { getTilretteleggingId } from 'utils/tilretteleggingUtils';

import { Arbeidsforhold } from '@navikt/fp-types';
import { ProgressStep } from '@navikt/fp-ui';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

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

const createTilretteleggingSteps = (
    currentPath: SøknadRoutes,
    erValgtTilrettelegging: boolean,
    labels: Record<SøknadRoutes, string>,
    tilrettelegging?: DelvisTilrettelegging | IngenTilrettelegging,
): Array<ProgressStep<SøknadRoutes>> => {
    const steps = new Array<ProgressStep<SøknadRoutes>>();
    steps.push({
        id: SøknadRoutes.SKJEMA,
        label: labels[SøknadRoutes.SKJEMA],
        isSelected: currentPath === SøknadRoutes.SKJEMA && erValgtTilrettelegging,
    });
    steps.push({
        id: SøknadRoutes.TILRETTELEGGING,
        label: labels[SøknadRoutes.TILRETTELEGGING],
        isSelected: currentPath === SøknadRoutes.TILRETTELEGGING && erValgtTilrettelegging,
    });
    if (
        tilrettelegging?.type === Tilretteleggingstype.DELVIS &&
        tilrettelegging.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        steps.push({
            id: SøknadRoutes.PERIODER,
            label: labels[SøknadRoutes.PERIODER],
            isSelected: currentPath === SøknadRoutes.PERIODER && erValgtTilrettelegging,
        });
    }
    return steps;
};

const getTilretteleggingLabels = (
    intl: IntlShape,
    erFlereTilrettelegginger: boolean,
    arbeidsforhold: Arbeidsforhold[],
    id: string,
) => {
    const valgtArbeidsforhold = arbeidsforhold.find((a) => a.arbeidsgiverId === id);
    const navn = capitalizeFirstLetterInEveryWordOnly(valgtArbeidsforhold?.arbeidsgiverNavn);
    return getStepLabels(intl, erFlereTilrettelegginger, navn);
};

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
    const arbeidsforholdOgInntekt = getStateData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const tilrettelegginger = getStateData(ContextDataType.TILRETTELEGGINGER);
    const valgteArbeidsforhold = getStateData(ContextDataType.VALGTE_ARBEIDSFORHOLD);
    const barn = getStateData(ContextDataType.OM_BARNET);
    const utenlandsopphold = getStateData(ContextDataType.UTENLANDSOPPHOLD);
    const valgtTId = getStateData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const valgtTilretteleggingId =
        valgtTId ||
        (barn &&
            arbeidsforholdOgInntekt &&
            getTilretteleggingId(arbeidsforhold, barn, arbeidsforholdOgInntekt, valgteArbeidsforhold));

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

    if (arbeidsforholdOgInntekt?.harJobbetSomFrilans) {
        steps.push(createStep(SøknadRoutes.FRILANS, intl, currentPath));
    }

    if (arbeidsforholdOgInntekt?.harJobbetSomSelvstendigNæringsdrivende) {
        steps.push(createStep(SøknadRoutes.NÆRING, intl, currentPath));
    }

    if (arbeidsforholdOgInntekt?.harHattArbeidIUtlandet) {
        steps.push(createStep(SøknadRoutes.ARBEID_I_UTLANDET, intl, currentPath));
    }

    const harKunEttArbeid = barn?.termindato
        ? søkerHarKunEtAktivtArbeid(
              barn.termindato,
              arbeidsforhold,
              arbeidsforholdOgInntekt?.harJobbetSomFrilans || false,
              arbeidsforholdOgInntekt?.harJobbetSomSelvstendigNæringsdrivende || false,
          )
        : true;

    if (!harKunEttArbeid) {
        steps.push(createStep(SøknadRoutes.VELG_ARBEID, intl, currentPath));
    }

    const erFlereTilrettelegginger =
        !!valgteArbeidsforhold && valgteArbeidsforhold?.arbeidMedTilrettelegging?.length > 1;
    if (erFlereTilrettelegginger) {
        valgteArbeidsforhold.arbeidMedTilrettelegging.forEach((id) => {
            const labels = getTilretteleggingLabels(intl, erFlereTilrettelegginger, arbeidsforhold, id);
            steps.push(
                ...createTilretteleggingSteps(
                    currentPath,
                    id === valgtTilretteleggingId,
                    labels,
                    tilrettelegginger?.[id],
                ),
            );
        });
    } else if (valgtTilretteleggingId) {
        const labels = getTilretteleggingLabels(intl, erFlereTilrettelegginger, arbeidsforhold, valgtTilretteleggingId);
        steps.push(
            ...createTilretteleggingSteps(currentPath, true, labels, tilrettelegginger?.[valgtTilretteleggingId]),
        );
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
