import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { RouteParams, SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { PeriodeMedVariasjon } from 'types/Tilrettelegging';
import { getKanHaSvpFremTilTreUkerFørTermin } from 'utils/dateUtils';
import {
    getArbeidsgiverNavnForTilrettelegging,
    getNesteTilretteleggingId,
    getTypeArbeidForTilrettelegging,
} from 'utils/tilretteleggingUtils';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { Bedriftsbanner } from '../Bedriftsbanner';
import { NEW_PERIODE, PerioderFieldArray } from './PerioderFieldArray';

type TilretteleggingPerioderFormValues = {
    varierendePerioder: PeriodeMedVariasjon[];
};

export interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
}

export const PerioderSteg: FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const params = useParams<RouteParams>();
    const valgtTilretteleggingId = notEmpty(params.tilretteleggingId);

    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);

    const oppdaterTilretteleggingerPerioder = useContextSaveData(ContextDataType.TILRETTELEGGINGER_PERIODER);

    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barnet);

    const typeArbeidsgiver = getTypeArbeidForTilrettelegging(valgtTilretteleggingId, arbeidsforhold);
    const navnArbeidsgiver = getArbeidsgiverNavnForTilrettelegging(intl, valgtTilretteleggingId, arbeidsforhold);
    const valgtTilrettelegging = tilrettelegginger[valgtTilretteleggingId];

    const onSubmit = (values: TilretteleggingPerioderFormValues) => {
        oppdaterTilretteleggingerPerioder({
            ...tilretteleggingerPerioder,
            [valgtTilretteleggingId]: values.varierendePerioder,
        });

        // Bare virksomheter eller private skal oppgi ferie.
        if (typeArbeidsgiver === 'virksomhet' || typeArbeidsgiver === 'privat') {
            return navigator.goToStep(addTilretteleggingIdToRoute(SøknadRoute.FERIE, valgtTilretteleggingId));
        }

        const nesteTilretteleggingId = getNesteTilretteleggingId(valgtTilretteleggingId, valgteArbeidsforhold);

        return navigator.goToStep(
            nesteTilretteleggingId
                ? addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, nesteTilretteleggingId)
                : SøknadRoute.OPPSUMMERING,
        );
    };

    const formMethods = useForm<TilretteleggingPerioderFormValues>({
        shouldUnregister: true,
        defaultValues: { varierendePerioder: tilretteleggingerPerioder?.[valgtTilretteleggingId] ?? [NEW_PERIODE] },
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
            onStepChange={navigator.goToStep}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {!!valgteArbeidsforhold && valgteArbeidsforhold.length > 1 && (
                        <Bedriftsbanner arbeidsforholdType={typeArbeidsgiver} arbeidsforholdNavn={navnArbeidsgiver} />
                    )}
                    <div>
                        <Heading size="small">
                            <FormattedMessage id="perioder.varierende.heading"></FormattedMessage>
                        </Heading>
                        <BodyShort>
                            {kanHaSVPFremTilTreUkerFørTermin ? (
                                <FormattedMessage id="perioder.varierende.description.termin" />
                            ) : (
                                <FormattedMessage id="perioder.varierende.description.fødsel" />
                            )}
                        </BodyShort>
                    </div>
                    <PerioderFieldArray
                        valgtTilretteleggingId={valgtTilretteleggingId}
                        barn={barnet}
                        kanHaSVPFremTilTreUkerFørTermin={kanHaSVPFremTilTreUkerFørTermin}
                        arbeidsforhold={arbeidsforhold}
                        egenNæring={egenNæring}
                        frilans={frilans}
                        behovForTilretteleggingFom={valgtTilrettelegging.behovForTilretteleggingFom}
                    />
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </RhfForm>
        </Step>
    );
};
