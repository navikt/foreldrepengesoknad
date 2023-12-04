import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Link, VStack, Radio, ExpansionCard, BodyLong, Heading, HStack, BodyShort } from '@navikt/ds-react';
import { Form, ErrorSummaryHookForm, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Step } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import { isRequired } from '@navikt/fp-validation';
import { StepConfig, Utenlandsopphold } from '@navikt/fp-types';
import useUtenlandsoppholdIntl from '../intl/useUtenlandsoppholdIntl';
import UtenlandsoppholdIntlProvider from '../intl/UtenlandsoppholdIntlProvider';

export interface Props {
    utenlandsopphold?: Utenlandsopphold;
    saveOnNext: (formValues: Utenlandsopphold) => void;
    saveOnPrevious: (formValues: Utenlandsopphold | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    goToPreviousStep: () => void;
    stepConfig: StepConfig[];
    stønadstype: 'Engangsstønad' | 'Foreldrepenger' | 'Svangerskapspenger';
    supportsTempSaving?: boolean;
}

const UtenlandsoppholdPanel: React.FunctionComponent<Props> = ({
    utenlandsopphold,
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    stepConfig,
    stønadstype,
    supportsTempSaving = false,
}) => {
    const { i18n } = useUtenlandsoppholdIntl();

    const formMethods = useForm<Utenlandsopphold>({
        defaultValues: utenlandsopphold,
    });

    return (
        <UtenlandsoppholdIntlProvider>
            <Step
                steps={stepConfig}
                onCancel={cancelApplication}
                onContinueLater={onContinueLater}
                useNoTempSavingText={!supportsTempSaving}
            >
                <Form formMethods={formMethods} onSubmit={saveOnNext}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <RadioGroup
                            name="harBoddUtenforNorgeSiste12Mnd"
                            label={<FormattedMessage id="UtenlandsoppholdSteg.Siste12Måneder.Spørsmål" />}
                            validate={[isRequired(i18n('UtenlandsoppholdSteg.Siste12Måneder.IsRequired'))]}
                        >
                            <Radio value={false}>
                                <FormattedMessage id="UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge" />
                            </Radio>
                            <Radio value={true}>
                                <FormattedMessage id="UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet" />
                            </Radio>
                        </RadioGroup>
                        <RadioGroup
                            name="skalBoUtenforNorgeNeste12Mnd"
                            label={<FormattedMessage id="UtenlandsoppholdSteg.Neste12Måneder.Spørsmål" />}
                            validate={[isRequired(i18n('UtenlandsoppholdSteg.Neste12Måneder.IsRequired'))]}
                        >
                            <Radio value={false}>
                                <FormattedMessage id="UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge" />
                            </Radio>
                            <Radio value={true}>
                                <FormattedMessage id="UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet" />
                            </Radio>
                        </RadioGroup>
                        <ExpansionCard size="small" aria-label={i18n('UtenlandsoppholdSteg.StotteFraNav')}>
                            <ExpansionCard.Header>
                                <ExpansionCard.Title size="small">
                                    <FormattedMessage id="UtenlandsoppholdSteg.StotteFraNav" />
                                </ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <VStack gap="10">
                                    <VStack gap="5">
                                        <BodyLong>
                                            <FormattedMessage id="UtenlandsoppholdSteg.Info.Del1" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage id="UtenlandsoppholdSteg.Info.Del2" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage id="UtenlandsoppholdSteg.Info.Del3" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage id="UtenlandsoppholdSteg.Info.Del4" />
                                        </BodyLong>
                                    </VStack>
                                    <VStack gap="5">
                                        <Heading size="small">
                                            <FormattedMessage id="UtenlandsoppholdSteg.Info.Undertittel" />
                                        </Heading>
                                        <BodyLong>
                                            <FormattedMessage id="UtenlandsoppholdSteg.Info.Del5" />
                                        </BodyLong>
                                        <HStack gap="1">
                                            <BodyShort>
                                                <FormattedMessage id="UtenlandsoppholdSteg.Info.Del6" />
                                            </BodyShort>
                                            <BodyShort>
                                                {stønadstype === 'Engangsstønad' && (
                                                    <Link href={links.engangsstonadHvem}>
                                                        nav.no/engangsstonad#hvem
                                                    </Link>
                                                )}
                                                {stønadstype === 'Foreldrepenger' && (
                                                    <Link href={links.foreldrepengerUtland}>
                                                        nav.no/foreldrepenger#utland
                                                    </Link>
                                                )}
                                            </BodyShort>
                                        </HStack>
                                    </VStack>
                                </VStack>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                        <StepButtonsHookForm<Utenlandsopphold>
                            goToPreviousStep={goToPreviousStep}
                            saveDataOnPreviousClick={saveOnPrevious}
                        />
                    </VStack>
                </Form>
            </Step>
        </UtenlandsoppholdIntlProvider>
    );
};

export default UtenlandsoppholdPanel;
