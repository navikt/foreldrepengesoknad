import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import SkjemaSteg from './SkjemaSteg';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _context from 'storybook/storydata/soknad/soknad.json';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { attachmentApi } from '@navikt/fp-api';

const defaultExport = {
    title: 'steps/SkjemaSteg',
    component: SkjemaSteg,
    decorators: [withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

const defaultContext = _context as any;

interface TilretteleggingStepStoryProps {
    context: SvangerskapspengerContextState;
    skalFeileOpplasting: boolean;
    maxAntallVedlegg: number;
}

const Template: StoryFn<TilretteleggingStepStoryProps> = ({ context, skalFeileOpplasting, maxAntallVedlegg = 40 }) => {
    const apiMock = new MockAdapter(attachmentApi);
    if (!skalFeileOpplasting) {
        apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
        apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
    }
    return (
        <SvangerskapspengerStateMock context={context}>
            <SkjemaSteg id={'263929546-6215-9868-5127-161910165730101'} maxAntallVedlegg={maxAntallVedlegg} />
        </SvangerskapspengerStateMock>
    );
};

export const SkalIkkeFeileOpplasting = Template.bind({});
SkalIkkeFeileOpplasting.args = {
    context: {
        ...defaultContext,
        søknad: {
            ...defaultContext.søknad,
            tilrettelegging: [
                {
                    ...defaultContext.søknad.tilrettelegging[0],
                    vedlegg: [],
                },
            ],
        },
    },
    skalFeileOpplasting: false,
};

export const SkalFeileOpplasting = Template.bind({});
SkalFeileOpplasting.args = {
    context: {
        ...defaultContext,
        søknad: {
            ...defaultContext.søknad,
            tilrettelegging: [
                {
                    ...defaultContext.søknad.tilrettelegging[0],
                    vedlegg: [],
                },
            ],
        },
    },
    skalFeileOpplasting: true,
};

export const MedVedlegg = Template.bind({});
MedVedlegg.args = {
    context: defaultContext,
    skalFeileOpplasting: false,
};

export const MedToTilrettelegginger = Template.bind({});
MedToTilrettelegginger.args = {
    context: {
        ...defaultContext,
        søknad: {
            ...defaultContext.søknad,
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
        },
    },
    skalFeileOpplasting: false,
};

export const ErTypeFrilans = Template.bind({});
ErTypeFrilans.args = {
    context: {
        ...defaultContext,
        søknad: {
            ...defaultContext.søknad,
            tilrettelegging: [
                {
                    ...defaultContext.søknad.tilrettelegging[0],
                    arbeidsforhold: {
                        ...defaultContext.søknad.tilrettelegging[0].arbeidsforhold,
                        type: Arbeidsforholdstype.FRILANSER,
                    },
                },
            ],
        },
    },
    skalFeileOpplasting: false,
};

export const KanMaxHaToVedlegg = Template.bind({});
KanMaxHaToVedlegg.args = {
    context: defaultContext,
    skalFeileOpplasting: false,
    maxAntallVedlegg: 2,
};
