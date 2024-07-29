import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { Accordion } from '@navikt/ds-react';

import { UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from '@navikt/fp-types';

import OppsummeringPanel from './OppsummeringPanel';
import BoIUtlandetOppsummeringspunkt from './utenlandsopphold/BoIUtlandetOppsummeringspunkt';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'OppsummeringPanel',
    component: OppsummeringPanel,
};

const Template: StoryFn<{
    sendSøknad: () => Promise<void>;
    cancelApplication: () => void;
    onContinueLater: () => void;
    goToPreviousStep: () => void;
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
}> = ({
    sendSøknad = promiseAction(),
    cancelApplication = action('button-click'),
    onContinueLater = action('button-click'),
    goToPreviousStep = action('button-click'),
    tidligereUtenlandsopphold,
    senereUtenlandsopphold,
}) => {
    return (
        <OppsummeringPanel
            sendSøknad={sendSøknad}
            cancelApplication={cancelApplication}
            onContinueLater={onContinueLater}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
                {
                    id: '1',
                    label: 'Oppsummering',
                    isSelected: true,
                },
            ]}
            appName="Engangsstønad"
        >
            <Accordion indent={false}>
                <BoIUtlandetOppsummeringspunkt
                    onVilEndreSvar={() => {}}
                    senereUtenlandsopphold={senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd ?? []}
                    tidligereUtenlandsopphold={tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd ?? []}
                />
            </Accordion>
        </OppsummeringPanel>
    );
};

export const HarBoddIUtlandetOgFødt = Template.bind({});
HarBoddIUtlandetOgFødt.args = {
    senereUtenlandsopphold: {
        utenlandsoppholdNeste12Mnd: [{ fom: '2022-10-10', tom: '2023-05-05', landkode: 'SE' }],
    },
    tidligereUtenlandsopphold: {
        utenlandsoppholdSiste12Mnd: [{ fom: '2023-06-06', tom: '2023-10-10', landkode: 'DE' }],
    },
};

export const HarIkkeBoddIUtlandetOgIkkeFødt = Template.bind({});
HarIkkeBoddIUtlandetOgIkkeFødt.args = {};
