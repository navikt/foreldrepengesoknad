import { PlanleggerRoutes } from 'appData/routes';
import { Ref } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import { BlueHeading, Page, ProgressStep, ProgressStepper, useFokusVedNavigasjon } from '@navikt/fp-ui';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    goToStep: (nextPath: PlanleggerRoutes) => void;
    children: React.ReactElement | React.ReactElement[];
    ref?: Ref<HTMLDivElement>;
}

// Tittelen i headeren er lik på alle steg, så stegoverskriften i innholdet foretrekkes.
const finnStegoverskrift = (tittel: HTMLHeadingElement) =>
    tittel.closest('main')?.querySelector<HTMLHeadingElement>('h2') ?? tittel;

export const PlanleggerStepPage = ({ steps, children, goToStep, ref }: Props) => {
    const overskriftRef = useFokusVedNavigasjon<HTMLHeadingElement>(
        steps.find((s) => s.isSelected)?.id,
        finnStegoverskrift,
    );
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
