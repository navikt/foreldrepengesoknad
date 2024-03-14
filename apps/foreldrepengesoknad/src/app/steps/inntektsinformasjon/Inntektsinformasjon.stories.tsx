import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';

import { BarnType } from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import { Opphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import SøknadRoutes from 'app/routes/routes';

import Inntektsinformasjon from './Inntektsinformasjon';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultUtenlandsopphold = {
    iNorgeNeste12Mnd: false,
    iNorgeSiste12Mnd: false,
};

export default {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
};

interface Props {
    arbeidsforhold?: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsopphold: Opphold;
}

const Template: StoryFn<Props> = ({
    arbeidsforhold = [],
    gåTilNesteSide,
    mellomlagreSøknadOgNaviger = promiseAction(),
    utenlandsopphold = defaultUtenlandsopphold,
}) => {
    initAmplitude();

    return (
        <MemoryRouter initialEntries={[SøknadRoutes.INNTEKTSINFORMASJON]}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.SØKERSITUASJON]: {
                        situasjon: 'fødsel',
                        rolle: 'mor',
                    },
                    [ContextDataType.OM_BARNET]: {
                        type: BarnType.FØDT,
                        fødselsdatoer: [dayjs().format(ISO_DATE_FORMAT)],
                        antallBarn: 1,
                    },
                    [ContextDataType.SØKER_DATA]: {
                        // @ts-ignore FIX
                        harJobbetSomFrilansSiste10Mnd: undefined,
                        // @ts-ignore FIX
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
                        // @ts-ignore FIX
                        harHattAnnenInntektSiste10Mnd: undefined,
                    },
                    [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <Inntektsinformasjon
                    arbeidsforhold={arbeidsforhold}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={action('button-click')}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};

export const HarIkkeArbeidsforhold = Template.bind({});

export const HarArbeidsforhold = Template.bind({});
HarArbeidsforhold.args = {
    arbeidsforhold: [
        {
            arbeidsgiverId: '1',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Auto Joachim Bilpleie',
            stillingsprosent: 80,
            fom: '2015-01-01',
        },
        {
            arbeidsgiverId: '2',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Taco Express',
            stillingsprosent: 20,
            fom: '2019-01-01',
            tom: '2021-01-01',
        },
    ],
};
