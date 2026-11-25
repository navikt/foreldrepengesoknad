import { PlanleggerRoutes } from 'appData/routes';
import { Ref } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';

import { Heading, VStack } from '@navikt/ds-react';

import { BlueHeading, Page, ProgressStep, ProgressStepper, useFokusVedNavigasjon } from '@navikt/fp-ui';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    goToStep: (nextPath: PlanleggerRoutes) => void;
    children: React.ReactElement | React.ReactElement[];
    ref?: Ref<HTMLDivElement>;
}

export const PlanleggerStepPage = ({ steps, children, goToStep, ref }: Props) => {
    const { pathname } = useLocation();
    // Reserve for steg uten PlanleggerStegTittel. Har steget en, har den allerede tatt fokus siden barnas effekter kjører først.
    const overskriftRef = useFokusVedNavigasjon<HTMLHeadingElement>(pathname);
    return (
        <>
            <Page
                header={
                    <BlueHeading>
                        <VStack gap="space-16">
                            <Heading ref={overskriftRef} size="large">
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
