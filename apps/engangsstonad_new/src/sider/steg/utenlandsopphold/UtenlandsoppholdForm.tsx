import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step, StepButtonWrapper } from '@navikt/fp-common';
import { Link, Button, VStack, Radio, ExpansionCard, BodyLong, Heading, HStack } from '@navikt/ds-react';

import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import stepConfig, { getPreviousStepHref } from '../stepConfig';
import { PageKeys } from '../../PageKeys';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import { isRequired } from 'fpcommon/validering/valideringsregler';

export type FormValues = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
};

interface OwnProps {
    lagretUtenlandsopphold?: FormValues;
    lagreUtenlandsopphold: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const UtenlandsoppholdForm: React.FunctionComponent<OwnProps> = ({
    lagretUtenlandsopphold,
    lagreUtenlandsopphold,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Utenlandsopphold,
    });

    const formMethods = useForm<FormValues>({
        defaultValues: lagretUtenlandsopphold,
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="utenlandsopphold"
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagreUtenlandsopphold)}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <RadioGroupPanel
                            name="harBoddUtenforNorgeSiste12Mnd"
                            label={<FormattedMessage id="utenlandsopphold.siste12Måneder.spørsmål" />}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'utenlandsopphold.siste12Måneder.isRequired' })),
                            ]}
                        >
                            <Radio value={false}>
                                <FormattedMessage id="utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge" />
                            </Radio>
                            <Radio value={true}>
                                <FormattedMessage id="utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet" />
                            </Radio>
                        </RadioGroupPanel>
                        <RadioGroupPanel
                            name="skalBoUtenforNorgeNeste12Mnd"
                            label={<FormattedMessage id="utenlandsopphold.neste12Måneder.spørsmål" />}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'utenlandsopphold.neste12Måneder.isRequired' })),
                            ]}
                        >
                            <Radio value={false}>
                                <FormattedMessage id="utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge" />
                            </Radio>
                            <Radio value={true}>
                                <FormattedMessage id="utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet" />
                            </Radio>
                        </RadioGroupPanel>

                        <ExpansionCard
                            size="small"
                            aria-label={intl.formatMessage({ id: 'utenlandsopphold.stotteFraNav' })}
                        >
                            <ExpansionCard.Header>
                                <ExpansionCard.Title>
                                    <FormattedMessage id="utenlandsopphold.stotteFraNav" />
                                </ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <VStack gap="10">
                                    <VStack gap="5">
                                        <BodyLong>
                                            <FormattedMessage id="utenlandsopphold.info.del1" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage id="utenlandsopphold.info.del2" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage id="utenlandsopphold.info.del3" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage id="utenlandsopphold.info.del4" />
                                        </BodyLong>
                                    </VStack>
                                    <VStack gap="5">
                                        <Heading size="small">
                                            <FormattedMessage id="utenlandsopphold.info.undertittel" />
                                        </Heading>
                                        <BodyLong>
                                            <FormattedMessage id="utenlandsopphold.info.del5" />
                                        </BodyLong>
                                        <BodyLong>
                                            <HStack gap="1">
                                                <FormattedMessage id="utenlandsopphold.info.del6" />
                                                <Link href="https://www.nav.no/foreldrepenger#utland">
                                                    nav.no/foreldrepenger#utland
                                                </Link>
                                            </HStack>
                                        </BodyLong>
                                    </VStack>
                                </VStack>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                        <StepButtonWrapper>
                            <Button variant="secondary" as={Link} to={getPreviousStepHref('utenlandsopphold')}>
                                <FormattedMessage id="backlink.label" />
                            </Button>
                            <Button type="submit">
                                <FormattedMessage id="søknad.gåVidere" />
                            </Button>
                        </StepButtonWrapper>
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default UtenlandsoppholdForm;
