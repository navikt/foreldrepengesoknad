import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import OppsummeringIndex from './OppsummeringIndex';
import BoIUtlandetOppsummeringspunkt from './utenlandsopphold/BoIUtlandetOppsummeringspunkt';
import { Utenlandsopphold, UtenlandsoppholdTidligere, UtenlandsoppholdSenere } from '@navikt/fp-types';
import DegOppsummeringspunkt from './deg/DegOppsummeringspunkt';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'OppsummeringIndex',
    component: OppsummeringIndex,
};

const Template: StoryFn<{
    sendSøknad: () => Promise<void>;
    cancelApplication: () => void;
    onContinueLater: () => void;
    goToPreviousStep: () => void;
    utenlandsopphold: Utenlandsopphold;
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
    fødselsdato?: string;
    termindato?: string;
}> = ({
    sendSøknad = promiseAction(),
    cancelApplication = action('button-click'),
    onContinueLater = action('button-click'),
    goToPreviousStep = action('button-click'),
    utenlandsopphold,
    tidligereUtenlandsopphold,
    senereUtenlandsopphold,
    fødselsdato,
    termindato,
}) => {
    return (
        <OppsummeringIndex
            sendSøknad={sendSøknad}
            cancelApplication={cancelApplication}
            onContinueLater={onContinueLater}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
                {
                    id: '1',
                    index: 1,
                    label: 'Oppsummering',
                    isSelected: true,
                },
            ]}
            appName="Engangsstønad"
        >
            <DegOppsummeringspunkt
                person={{
                    fornavn: 'Henrikke',
                    fnr: '01018823234',
                    etternavn: 'Ibsen',
                    kjønn: 'K',
                    fødselsdato: '1988-01-01',
                }}
            />
            <BoIUtlandetOppsummeringspunkt
                fødselsdato={fødselsdato}
                termindato={termindato}
                utenlandsopphold={utenlandsopphold}
                senereUtenlandsopphold={senereUtenlandsopphold}
                tidligereUtenlandsopphold={tidligereUtenlandsopphold}
            />
        </OppsummeringIndex>
    );
};

export const HarBoddIUtlandetOgFødt = Template.bind({});
HarBoddIUtlandetOgFødt.args = {
    utenlandsopphold: { harBoddUtenforNorgeSiste12Mnd: true, skalBoUtenforNorgeNeste12Mnd: true },
    senereUtenlandsopphold: {
        utenlandsoppholdNeste12Mnd: [{ fom: '2022-10-10', tom: '2023-05-05', landkode: 'SE' }],
    },
    tidligereUtenlandsopphold: {
        utenlandsoppholdSiste12Mnd: [{ fom: '2023-06-06', tom: '2023-10-10', landkode: 'DE' }],
    },
    fødselsdato: '2023-01-01',
};

export const HarIkkeBoddIUtlandetOgIkkeFødt = Template.bind({});
HarIkkeBoddIUtlandetOgIkkeFødt.args = {
    utenlandsopphold: { harBoddUtenforNorgeSiste12Mnd: false, skalBoUtenforNorgeNeste12Mnd: false },
    termindato: '2023-01-01',
};
