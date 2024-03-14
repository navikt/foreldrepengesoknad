import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { Utenlandsopphold, UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import OppsummeringPanel from './OppsummeringPanel';
import SøkerOppsummeringspunkt from './søker/SøkerOppsummeringspunkt';
import BoIUtlandetOppsummeringspunkt, { HendelseType } from './utenlandsopphold/BoIUtlandetOppsummeringspunkt';

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
            <SøkerOppsummeringspunkt
                søker={{
                    fornavn: 'Henrikke',
                    fnr: '01018823234',
                    etternavn: 'Ibsen',
                    kjønn: 'K',
                    fødselsdato: '1988-01-01',
                    barn: [],
                }}
            />
            <BoIUtlandetOppsummeringspunkt
                familiehendelseDato={notEmpty(fødselsdato || termindato)}
                hendelseType={fødselsdato ? HendelseType.FØDSEL : HendelseType.TERMIN}
                utenlandsopphold={utenlandsopphold}
                senereUtenlandsopphold={senereUtenlandsopphold}
                tidligereUtenlandsopphold={tidligereUtenlandsopphold}
            />
        </OppsummeringPanel>
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
