import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
} from 'types/Tilrettelegging';
import { søkerHarKunEtAktivtArbeid } from 'utils/arbeidsforholdUtils';
import { getTilretteleggingId, getTypeArbeidForTilrettelegging } from 'utils/tilretteleggingUtils';

import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import { EksternArbeidsforholdDto_fpoversikt, FRILANS_ID } from '@navikt/fp-types';
import { ProgressStep } from '@navikt/fp-ui';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from './routes';

const getStepLabels = (
    intl: IntlShape,
    erFlereTilrettelegginger?: boolean,
    navn?: string,
): Record<SøknadRoute, string> => ({
    [SøknadRoute.FORSIDE]: '',
    [SøknadRoute.BARNET]: intl.formatMessage({ id: 'steps.label.barnet' }),
    [SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT]: intl.formatMessage({ id: 'steps.label.arbeid' }),
    [SøknadRoute.ARBEID_I_UTLANDET]: intl.formatMessage({ id: 'steps.label.arbeidIUtlandet' }),
    [SøknadRoute.FRILANS]: intl.formatMessage({ id: 'steps.label.frilans' }),
    [SøknadRoute.HAR_BODD_I_UTLANDET]: intl.formatMessage({ id: 'steps.label.boIUtlandetIFortid' }),
    [SøknadRoute.NÆRING]: intl.formatMessage({ id: 'steps.label.næring' }),
    [SøknadRoute.OPPSUMMERING]: intl.formatMessage({ id: 'steps.label.oppsummering' }),
    [SøknadRoute.PERIODER]: erFlereTilrettelegginger
        ? intl.formatMessage({ id: 'steps.label.periode.flere' }, { navn })
        : intl.formatMessage({ id: 'steps.label.periode.en' }),
    [SøknadRoute.SKAL_BO_I_UTLANDET]: intl.formatMessage({ id: 'steps.label.boIUtlandetIFremtid' }),
    [SøknadRoute.SKJEMA]: erFlereTilrettelegginger
        ? intl.formatMessage({ id: 'steps.label.skjema.flere' }, { navn })
        : intl.formatMessage({ id: 'steps.label.skjema.en' }),
    [SøknadRoute.TILRETTELEGGING]: erFlereTilrettelegginger
        ? intl.formatMessage({ id: 'steps.label.tilrettelegging.flere' }, { navn })
        : intl.formatMessage({ id: 'steps.label.tilrettelegging.en' }),
    [SøknadRoute.UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold' }),
    [SøknadRoute.VELG_ARBEID]: intl.formatMessage({ id: 'steps.label.velgArbeid' }),
    [SøknadRoute.FERIE]: erFlereTilrettelegginger
        ? intl.formatMessage({ id: 'steps.label.ferie.flere' }, { navn })
        : intl.formatMessage({ id: 'steps.label.ferie.en' }),
    [SøknadRoute.KVITTERING]: '',
});

const createTilretteleggingSteps = ({
    currentPath,
    labels,
    tilrettelegging,
    tilretteleggingId,
    typeArbeidsgiver,
}: {
    currentPath: SøknadRoute | string;
    labels: Record<SøknadRoute, string>;
    tilretteleggingId: string;
    tilrettelegging?: DelvisTilrettelegging | IngenTilrettelegging;
    typeArbeidsgiver: Arbeidsforholdstype;
}) => {
    const steps = new Array<ProgressStep<string>>();

    const skjemaPath = addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, tilretteleggingId);
    steps.push({
        id: skjemaPath,
        label: labels[SøknadRoute.SKJEMA],
        isSelected: currentPath === skjemaPath,
    });

    const tilretteleggingPath = addTilretteleggingIdToRoute(SøknadRoute.TILRETTELEGGING, tilretteleggingId);
    steps.push({
        id: tilretteleggingPath,
        label: labels[SøknadRoute.TILRETTELEGGING],
        isSelected: currentPath === tilretteleggingPath,
    });

    if (
        tilrettelegging?.type === 'delvis' &&
        tilrettelegging.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        const perioderPath = addTilretteleggingIdToRoute(SøknadRoute.PERIODER, tilretteleggingId);
        steps.push({
            id: perioderPath,
            label: labels[SøknadRoute.PERIODER],
            isSelected: currentPath === perioderPath,
        });
    }

    if (typeArbeidsgiver === 'virksomhet' || typeArbeidsgiver === 'privat') {
        const feriePath = addTilretteleggingIdToRoute(SøknadRoute.FERIE, tilretteleggingId);
        steps.push({
            id: feriePath,
            label: labels[SøknadRoute.FERIE],
            isSelected: currentPath === feriePath,
        });
    }

    return steps;
};

const getTilretteleggingLabels = (
    intl: IntlShape,
    erFlereTilrettelegginger: boolean,
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    id?: string,
): Record<SøknadRoute, string> => {
    if (id === FRILANS_ID || id === EGEN_NÆRING_ID) {
        return getStepLabels(
            intl,
            erFlereTilrettelegginger,
            id === FRILANS_ID ? intl.formatMessage({ id: 'frilans' }) : intl.formatMessage({ id: 'egenNæring' }),
        );
    }

    const valgtArbeidsforhold = arbeidsforhold.find((a) => a.arbeidsgiverId === id);
    const navn = capitalizeFirstLetterInEveryWordOnly(valgtArbeidsforhold?.arbeidsgiverNavn);
    return getStepLabels(intl, erFlereTilrettelegginger, navn);
};

const createStep = (route: SøknadRoute, intl: IntlShape, currentPath: string): ProgressStep<SøknadRoute | string> => ({
    id: route,
    label: getStepLabels(intl)[route],
    isSelected: currentPath === route.toString(),
});

const getStepConfig = (
    intl: IntlShape,
    currentPath: SøknadRoute | string,
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    getStateData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
): Array<ProgressStep<SøknadRoute | string>> => {
    const arbeidsforholdOgInntekt = getStateData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const tilrettelegginger = getStateData(ContextDataType.TILRETTELEGGINGER);
    const valgteArbeidsforhold = getStateData(ContextDataType.VALGTE_ARBEIDSFORHOLD);
    const barn = getStateData(ContextDataType.OM_BARNET);
    const utenlandsopphold = getStateData(ContextDataType.UTENLANDSOPPHOLD);

    const steps = [
        createStep(SøknadRoute.BARNET, intl, currentPath),
        createStep(SøknadRoute.UTENLANDSOPPHOLD, intl, currentPath),
    ];

    if (utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd) {
        steps.push(createStep(SøknadRoute.HAR_BODD_I_UTLANDET, intl, currentPath));
    }
    if (utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd) {
        steps.push(createStep(SøknadRoute.SKAL_BO_I_UTLANDET, intl, currentPath));
    }

    steps.push(createStep(SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT, intl, currentPath));

    if (arbeidsforholdOgInntekt?.harJobbetSomFrilans) {
        steps.push(createStep(SøknadRoute.FRILANS, intl, currentPath));
    }

    if (arbeidsforholdOgInntekt?.harJobbetSomSelvstendigNæringsdrivende) {
        steps.push(createStep(SøknadRoute.NÆRING, intl, currentPath));
    }

    if (arbeidsforholdOgInntekt?.harHattArbeidIUtlandet) {
        steps.push(createStep(SøknadRoute.ARBEID_I_UTLANDET, intl, currentPath));
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
        steps.push(createStep(SøknadRoute.VELG_ARBEID, intl, currentPath));
    }

    const harValgtFlereTilrettelegginger = !!valgteArbeidsforhold && valgteArbeidsforhold.length > 1;
    const harValgtEnTilrettelegging = !!valgteArbeidsforhold && valgteArbeidsforhold.length === 1;
    if (harValgtFlereTilrettelegginger) {
        for (const tilretteleggingId of valgteArbeidsforhold) {
            const typeArbeidsgiver = getTypeArbeidForTilrettelegging(tilretteleggingId, arbeidsforhold);
            const labels = getTilretteleggingLabels(
                intl,
                harValgtFlereTilrettelegginger,
                arbeidsforhold,
                tilretteleggingId,
            );
            steps.push(
                ...createTilretteleggingSteps({
                    currentPath,
                    labels,
                    tilretteleggingId,
                    tilrettelegging: tilrettelegginger?.[tilretteleggingId],
                    typeArbeidsgiver,
                }),
            );
        }
    } else if ((harValgtEnTilrettelegging || harKunEttArbeid) && barn && arbeidsforholdOgInntekt) {
        const tilretteleggingId = harValgtEnTilrettelegging
            ? valgteArbeidsforhold[0]
            : getTilretteleggingId(arbeidsforhold, barn.termindato, arbeidsforholdOgInntekt);
        const labels = getTilretteleggingLabels(intl, false, arbeidsforhold, tilretteleggingId);
        const typeArbeidsgiver = getTypeArbeidForTilrettelegging(tilretteleggingId!, arbeidsforhold);

        steps.push(
            ...createTilretteleggingSteps({
                currentPath,
                labels,
                tilretteleggingId: tilretteleggingId!,
                tilrettelegging: tilrettelegginger?.[tilretteleggingId!],
                typeArbeidsgiver,
            }),
        );
    } else {
        steps.push(
            createStep(SøknadRoute.SKJEMA, intl, currentPath),
            createStep(SøknadRoute.TILRETTELEGGING, intl, currentPath),
        );

        if (
            !arbeidsforholdOgInntekt?.harJobbetSomSelvstendigNæringsdrivende &&
            !arbeidsforholdOgInntekt?.harJobbetSomFrilans
        ) {
            steps.push(createStep(SøknadRoute.FERIE, intl, currentPath));
        }
    }

    steps.push(createStep(SøknadRoute.OPPSUMMERING, intl, currentPath));

    return steps;
};

export const useStepConfig = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
): Array<ProgressStep<SøknadRoute | string>> => {
    const intl = useIntl();

    const location = useLocation();
    const getStateData = useContextGetAnyData();

    return getStepConfig(intl, location.pathname, arbeidsforhold, getStateData);
};
