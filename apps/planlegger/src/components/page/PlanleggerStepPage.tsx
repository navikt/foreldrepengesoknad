import { PlanleggerRoutes } from 'appData/routes';
import { Ref } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import { BlueHeading, Page, ProgressStep, ProgressStepper, useStegSidetittel } from '@navikt/fp-ui';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    goToStep: (nextPath: PlanleggerRoutes) => void;
    children: React.ReactElement | React.ReactElement[];
    ref?: Ref<HTMLDivElement>;
}

export const PlanleggerStepPage = ({ steps, children, goToStep, ref }: Props) => {
    const selectedStepIndex = steps.findIndex((step) => step.isSelected);
    const selectedStep = steps[selectedStepIndex];

    return (
        <>
            {selectedStepIndex !== -1 && selectedStep && (
                <PlanleggerStepSidetittel
                    stegnavn={selectedStep.label}
                    stegnummer={selectedStepIndex + 1}
                    antallSteg={steps.length}
                />
            )}
            <Page
                header={
                    <BlueHeading>
                        <VStack gap="space-16">
                            <Heading size="large">
                                <FormattedMessage id="PlanleggerStepPage.Tittel" />
                            </Heading>
                            <ProgressStepper steps={steps} onStepChange={goToStep} hideHeader />
                        </VStack>
                    </BlueHeading>
                }
            >
                {children}
            </Page>
            <div ref={ref} />
        </>
    );
};

const PlanleggerStepSidetittel = ({
    stegnavn,
    stegnummer,
    antallSteg,
}: {
    stegnavn: string;
    stegnummer: number;
    antallSteg: number;
}) => {
    useStegSidetittel(stegnavn, stegnummer, antallSteg);

    return null;
};
