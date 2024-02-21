import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import Oppsummering from './Oppsummering';
import { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Søker } from '@navikt/fp-types';

const defaultExport = {
    title: 'steps/Oppsummering',
    component: Oppsummering,
};

export default defaultExport;

const søkerinfo = {
    arbeidsforhold: [
        {
            id: '1669400414-9409-3313-0700-3334116100409',
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2014-05-22T00:00:00.000Z',
            stillingsprosent: 32.63,
            tom: '2019-05-31T00:00:00.000Z',
        },
        {
            id: '149599873-5769-19110-21897-6184606004018',
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2018-04-09T00:00:00.000Z',
            stillingsprosent: 0,
            tom: '2018-09-09T00:00:00.000Z',
        },
        {
            id: '86832061-1118-9701-6179-20647729409710',
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2018-06-25T00:00:00.000Z',
            stillingsprosent: 80,
            tom: '2018-08-05T00:00:00.000Z',
        },
        {
            id: '186699244-06994-0884-1562-860234771205',
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2019-06-01T00:00:00.000Z',
            stillingsprosent: 85.09,
        },
        {
            id: '263929546-6215-9868-5127-161910165730101',
            arbeidsgiverId: '990322244',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
            fom: '2017-04-05T00:00:00.000Z',
            stillingsprosent: 100,
        },
        {
            id: '0132715641-23932-19917-03900-809964087910',
            arbeidsgiverId: '995090910',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Re Kommune',
            fom: '2018-06-01T00:00:00.000Z',
            stillingsprosent: 0,
        },
    ],
    søker: {
        etternavn: 'Oravakangas',
        fornavn: 'Erlinga-Mask',
        fnr: '30088930610',
        fødselsdato: '1989-08-30',
        kjønn: 'K',
        barn: [],
    } as Søker,
};

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
    sendSøknad: () => Promise<any>;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide = action('button-click'),
    sendSøknad = () => Promise.resolve(),
}) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.TILRETTELEGGINGER]: [
                    {
                        id: '263929546-6215-9868-5127-161910165730101',
                        arbeidsforhold: {
                            arbeidsgiverId: '990322244',
                            type: Arbeidsforholdstype.VIRKSOMHET,
                            navn: 'Omsorgspartner Vestfold AS',
                            stillinger: [],
                            startdato: '2023-01-01',
                        },
                        varierendePerioder: [],
                        behovForTilretteleggingFom: '2023-01-01',
                        type: TilretteleggingstypeOptions.DELVIS,
                        vedlegg: [
                            {
                                id: 'V134300149934973076055420920289127108',
                                file: {} as any,
                                filename: 'vedlegg – Kopi (7).png',
                                filesize: 7477,
                                uploaded: true,
                                pending: false,
                                type: AttachmentType.TILRETTELEGGING,
                                skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                                url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                                uuid: 'Created',
                            },
                        ],
                    },
                ],
                [ContextDataType.INNTEKTSINFORMASJON]: {
                    harHattArbeidIUtlandet: false,
                    harJobbetSomFrilans: false,
                    harJobbetSomSelvstendigNæringsdrivende: false,
                },
                [ContextDataType.OM_BARNET]: {
                    erBarnetFødt: false,
                    termindato: '2024-02-18',
                    fødselsdato: '2024-02-18',
                },
                [ContextDataType.UTENLANDSOPPHOLD]: {
                    iNorgeNeste12Mnd: true,
                    iNorgeSiste12Mnd: true,
                },
            }}
        >
            <Oppsummering
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={søkerinfo}
                sendSøknad={sendSøknad}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
