import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MockAdapter from 'axios-mock-adapter';
import SkjemaSteg from './SkjemaSteg';
import _context from 'storybook/storydata/soknad/soknad.json';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { attachmentApi } from '@navikt/fp-api';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';

const defaultExport = {
    title: 'steps/SkjemaSteg',
    component: SkjemaSteg,
};

export default defaultExport;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultContext = _context as any;

interface TilretteleggingStepStoryProps {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
    skalFeileOpplasting: boolean;
    maxAntallVedlegg: number;
    tilrettelegging: Tilrettelegging[];
}

const Template: StoryFn<TilretteleggingStepStoryProps> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    skalFeileOpplasting,
    maxAntallVedlegg = 40,
    tilrettelegging,
}) => {
    const apiMock = new MockAdapter(attachmentApi);
    if (!skalFeileOpplasting) {
        apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
        apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
    }
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.INNTEKTSINFORMASJON]: {
                    harHattAnnenInntekt: false,
                    harJobbetSomFrilans: false,
                    harJobbetSomSelvstendigNæringsdrivende: false,
                },
                [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
                [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
                [ContextDataType.OM_BARNET]: defaultContext.søknad.barn,
            }}
        >
            <SkjemaSteg
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={defaultContext.søkerinfo}
                maxAntallVedlegg={maxAntallVedlegg}
            />
        </SvpDataContext>
    );
};

export const SkalIkkeFeileOpplasting = Template.bind({});
SkalIkkeFeileOpplasting.args = {
    tilrettelegging: [
        {
            ...defaultContext.søknad.tilrettelegging[0],
            vedlegg: [],
        },
    ],
    skalFeileOpplasting: false,
};

export const SkalFeileOpplasting = Template.bind({});
SkalFeileOpplasting.args = {
    tilrettelegging: [
        {
            ...defaultContext.søknad.tilrettelegging[0],
            vedlegg: [],
        },
    ],
    skalFeileOpplasting: true,
};

export const MedVedlegg = Template.bind({});
MedVedlegg.args = {
    tilrettelegging: defaultContext.søknad.tilrettelegging,
    skalFeileOpplasting: false,
};

export const MedToTilrettelegginger = Template.bind({});
MedToTilrettelegginger.args = {
    tilrettelegging: [
        {
            ...defaultContext.søknad.tilrettelegging[0],
            vedlegg: [],
        },
        {
            ...defaultContext.søknad.tilrettelegging[0],
            vedlegg: [],
        },
    ],
    skalFeileOpplasting: false,
};

export const ErTypeFrilans = Template.bind({});
ErTypeFrilans.args = {
    tilrettelegging: [
        {
            ...defaultContext.søknad.tilrettelegging[0],
            arbeidsforhold: {
                ...defaultContext.søknad.tilrettelegging[0].arbeidsforhold,
                type: Arbeidsforholdstype.FRILANSER,
            },
        },
    ],
    skalFeileOpplasting: false,
};

export const KanMaxHaToVedlegg = Template.bind({});
KanMaxHaToVedlegg.args = {
    tilrettelegging: defaultContext.søknad.tilrettelegging,
    skalFeileOpplasting: false,
    maxAntallVedlegg: 2,
};
