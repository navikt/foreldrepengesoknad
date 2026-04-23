import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Adopsjon, Fødsel } from 'types/OmBarnet';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { BarnDto, Kjønn_fpoversikt, Søkersituasjon } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { FormValues as AdopsjonFormValues, AdopsjonPanel } from './AdopsjonPanel';
import { FødselPanel, FormValues as FødtFormValues } from './FødselPanel';

type FormValues = FødtFormValues & AdopsjonFormValues;

interface Props {
    kjønn: Kjønn_fpoversikt;
    mellomlagreOgNaviger: () => Promise<void>;
}

export const OmBarnetSteg = ({ kjønn, mellomlagreOgNaviger }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const barn = useContextGetData(ContextDataType.OM_BARNET);
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterDokumentasjon = useContextSaveData(ContextDataType.DOKUMENTASJON);

    const mapOgLagreOmBarnet = (formValues: FormValues) =>
        oppdaterOmBarnet(mapBarnFraFormTilDto(formValues, søkersituasjon.situasjon));

    const onSubmit = (formValues: FormValues) => {
        mapOgLagreOmBarnet(formValues);
        if (formValues.erBarnetFødt === true) {
            oppdaterDokumentasjon(undefined);
        }
        return navigator.goToNextStep(utledNesteSteg(formValues, søkersituasjon));
    };

    const formMethods = useForm<FormValues>({
        defaultValues: barn ? mapBarnFraDtoTilForm(barn) : {},
    });

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}>
            <Step onStepChange={navigator.goToNextStep} steps={stepConfig}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        {søkersituasjon?.situasjon === 'adopsjon' && <AdopsjonPanel kjønn={kjønn} />}
                        {søkersituasjon?.situasjon === 'fødsel' && <FødselPanel />}
                        <StepButtonsHookForm<FormValues>
                            onAvsluttOgSlett={navigator.avbrytSøknad}
                            onFortsettSenere={navigator.fortsettSøknadSenere}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            saveDataOnPreviousClick={mapOgLagreOmBarnet}
                        />
                    </VStack>
                </RhfForm>
            </Step>
        </SkjemaRotLayout>
    );
};

const utledNesteSteg = (formValues: FormValues, søkersituasjon: Søkersituasjon) => {
    if (søkersituasjon.situasjon === 'adopsjon') {
        return Path.ADOPSJONSBEKREFTELSE;
    }
    if (!formValues.erBarnetFødt && formValues.termindato !== undefined) {
        return Path.TERMINBEKREFTELSE;
    }
    return Path.UTENLANDSOPPHOLD;
};

const resolveAntallBarn = (formValues: FormValues) =>
    formValues.antallBarn > 2 && formValues.antallBarnDropDown
        ? Number.parseInt(formValues.antallBarnDropDown, 10)
        : formValues.antallBarn;

const mapBarnFraFormTilDto = (formValues: FormValues, situasjon: Søkersituasjon['situasjon']): BarnDto => {
    const antallBarn = resolveAntallBarn(formValues);
    if (situasjon === 'adopsjon') {
        return {
            type: 'adopsjon' as const,
            antallBarn,
            adopsjonAvEktefellesBarn: formValues.adopsjonAvEktefellesBarn,
            adopsjonsdato: formValues.adopsjonsdato,
            søkerAdopsjonAlene: formValues.søkerAdopsjonAlene,
            fødselsdatoer: formValues.fødselsdatoer.map((f) => f.dato),
        };
    }
    if (formValues.erBarnetFødt) {
        return {
            type: 'fødsel' as const,
            antallBarn,
            fødselsdato: formValues.fødselsdato,
            termindato: formValues.termindato,
        };
    }
    return {
        type: 'termin' as const,
        antallBarn,
        termindato: formValues.termindato,
    };
};

const mapBarnFraDtoTilForm = (barn: BarnDto): Partial<FormValues> => {
    const antallBarn = barn.antallBarn ?? 1;
    const base = {
        antallBarn: antallBarn > 2 ? 3 : antallBarn,
        antallBarnDropDown: antallBarn > 2 ? antallBarn.toString() : undefined,
    };
    if (barn.type === 'adopsjon') {
        return {
            ...base,
            adopsjonAvEktefellesBarn: barn.adopsjonAvEktefellesBarn,
            adopsjonsdato: barn.adopsjonsdato,
            søkerAdopsjonAlene: barn.søkerAdopsjonAlene,
            fødselsdatoer: (barn.fødselsdatoer ?? []).map((dato) => ({ dato })),
        } satisfies Partial<Adopsjon & { antallBarnDropDown?: string }>;
    }
    if (barn.type === 'fødsel') {
        return {
            ...base,
            erBarnetFødt: true,
            fødselsdato: barn.fødselsdato,
            termindato: barn.termindato,
        } satisfies Partial<Fødsel & { antallBarnDropDown?: string }>;
    }
    if (barn.type === 'termin') {
        return {
            ...base,
            erBarnetFødt: false,
            termindato: barn.termindato,
        } satisfies Partial<Fødsel & { antallBarnDropDown?: string }>;
    }
    throw new Error(`Ukjent barn-type: ${barn.type}`);
};
