import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { OppsummeringPanel } from './OppsummeringPanel';
import {
    ArbeidsforholdOppsummering,
    FrilansOppsummering,
    SelvstendigNæringsdrivendeOppsummering,
} from './arbeidsforhold/ArbeidsforholdOppsummering';
import { BoIUtlandetOppsummering } from './utenlandsopphold/BoIUtlandetOppsummering';

const promiseAction = () => () => {
    action('button-click')();
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
            <BoIUtlandetOppsummering
                onVilEndreSvar={() => {}}
                senereUtenlandsopphold={[{ fom: '2022-10-10', tom: '2023-05-05', landkode: 'SE' }]}
                tidligereUtenlandsopphold={[{ fom: '2023-06-06', tom: '2023-10-10', landkode: 'DE' }]}
            />
        ),
    },
};

export const HarIkkeBoddIUtlandetOgIkkeFødt: Story = {
    args: {
        ...HarBoddIUtlandetOgFødt.args,
        children: (
            <BoIUtlandetOppsummering
                onVilEndreSvar={() => {}}
                senereUtenlandsopphold={[]}
                tidligereUtenlandsopphold={[]}
            />
        ),
    },
};

export const ArbeidsforholdOgInntektOppsummering: Story = {
    args: {
        appName: 'Foreldrepenger',
        sendSøknad: promiseAction(),
        cancelApplication: action('button-click'),
        onContinueLater: action('button-click'),
        goToPreviousStep: action('button-click'),
        onStepChange: action('button-click'),
        stepConfig: [
            {
                id: 'OPPSUMMERING_PATH',
                label: 'Oppsummering',
                isSelected: true,
            },
        ],
        ekstraSamtykketekst: 'Bla bla bla',
        children: (
            <>
                <ArbeidsforholdOppsummering
                    arbeidsforhold={[]}
                    arbeidsforholdOgInntekt={{
                        harJobbetSomFrilans: true,
                        harJobbetSomSelvstendigNæringsdrivende: true,
                        harHattAndreInntektskilder: false,
                    }}
                    onVilEndreSvar={() => {}}
                />
                <SelvstendigNæringsdrivendeOppsummering
                    egenNæring={{
                        navnPåNæringen: 'Fiske',
                        fom: '2018-01-01',
                        tom: '2021-01-01',
                        næringstype: 'FISKE',
                        registrertILand: 'SE',
                        registrertINorge: false,
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
                        hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
                        varigEndringBeskrivelse: 'Beskrivelse av varig endring',
                        varigEndringDato: '2021-01-01',
                        varigEndringInntektEtterEndring: 10000,
                    }}
                    onVilEndreSvar={() => {}}
                />
                <FrilansOppsummering
                    frilans={{ jobberFremdelesSomFrilans: true, oppstart: '2019-01-01' }}
                    onVilEndreSvar={() => {}}
                />
            </>
        ),
    },
};
