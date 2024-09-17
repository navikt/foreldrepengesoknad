import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '@navikt/ds-react';

import OppsummeringPanel from './OppsummeringPanel';
import BoIUtlandetOppsummeringspunkt from './utenlandsopphold/BoIUtlandetOppsummeringspunkt';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const meta = {
    component: OppsummeringPanel,
} satisfies Meta<typeof OppsummeringPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const HarBoddIUtlandetOgFødt: Story = {
    args: {
        appName: 'Engangsstønad',
        sendSøknad: promiseAction(),
        cancelApplication: action('button-click'),
        onContinueLater: action('button-click'),
        goToPreviousStep: action('button-click'),
        onStepChange: action('button-click'),
        stepConfig: [
            {
                id: 'SKAL_BO_I_UTLANDET_PATH',
                label: 'Skal bo i utlandet',
                isSelected: false,
            },
            {
                id: 'OPPSUMMERING_PATH',
                label: 'Oppsummering',
                isSelected: true,
            },
        ],
        children: (
            <Accordion indent={false}>
                <BoIUtlandetOppsummeringspunkt
                    onVilEndreSvar={() => {}}
                    senereUtenlandsopphold={[{ fom: '2022-10-10', tom: '2023-05-05', landkode: 'SE' }]}
                    tidligereUtenlandsopphold={[{ fom: '2023-06-06', tom: '2023-10-10', landkode: 'DE' }]}
                />
            </Accordion>
        ),
    },
};

export const HarIkkeBoddIUtlandetOgIkkeFødt: Story = {
    args: {
        ...HarBoddIUtlandetOgFødt.args,
        children: (
            <Accordion indent={false}>
                <BoIUtlandetOppsummeringspunkt
                    onVilEndreSvar={() => {}}
                    senereUtenlandsopphold={[]}
                    tidligereUtenlandsopphold={[]}
                />
            </Accordion>
        ),
    },
};
