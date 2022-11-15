import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SøknadRoutes from './routes';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import ForeldrepengesøknadRoutes from './ForeldrepengesøknadRoutes';
import { Søknad } from 'app/context/types/Søknad';
import { Søkerinfo } from 'app/types/Søkerinfo';
import IntlProvider from '../intl/IntlProvider';
import Person from 'app/types/Person';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';

describe('<ForeldrepengesøknadRoutes>', () => {
    const state: ForeldrepengesøknadContextState = {
        version: 4,
        currentRoute: SøknadRoutes.VELKOMMEN,
        søkerinfo: {
            arbeidsforhold: [],
            person: {
                fornavn: 'Ola',
            } as Person,
            registrerteBarn: [],
        } as Søkerinfo,
        søknad: {
            søker: {
                språkkode: 'nb',
            },
        } as Søknad,
        saker: [],
        sakerv2: [],
        kvittering: undefined!,
        antallUkerIUttaksplan: undefined!,
        endringstidspunkt: undefined,
        perioderSomSkalSendesInn: [],
        harUttaksplanBlittSlettet: false,
        brukerSvarteJaPåAutoJustering: undefined,
        søknadGjelderEtNyttBarn: undefined!,
        familieHendelseDatoNesteSak: undefined,
    };

    it('skal vise velkommen-side når denne ruten er valgt', async () => {
        jest.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: () => jest.fn(),
        }));
        render(
            <BrowserRouter>
                <IntlProvider locale="nb">
                    <ForeldrepengesøknadRoutes
                        fornavn="Espen"
                        locale="nb"
                        onChangeLocale={() => ({})}
                        currentRoute={SøknadRoutes.VELKOMMEN}
                    />
                </IntlProvider>
            </BrowserRouter>
        );

        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(await screen.findByText('Jeg vil hjelpe deg med å fylle ut søknaden.')).toBeInTheDocument();
    });

    it('skal vise om-barnet-side når denne ruten er valgt', async () => {
        jest.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state: {
                ...state,
                currentRoute: SøknadRoutes.OM_BARNET,
                søknad: {
                    harGodkjentVilkår: true,
                    søkersituasjon: {
                        situasjon: 'fødsel',
                        rolle: 'mor',
                    },
                    søker: {
                        språkkode: 'nb',
                    },
                } as Søknad,
                søkerinfo: {
                    person: {
                        erMyndig: true,
                        fornavn: 'Ola',
                    } as Person,
                    arbeidsforhold: [],
                    registrerteBarn: [],
                } as Søkerinfo,
                saker: [],
                sakerv2: [],
            },
            dispatch: () => jest.fn(),
        }));
        render(
            <BrowserRouter>
                <IntlProvider locale="nb">
                    <ForeldrepengesøknadRoutes
                        fornavn="Espen"
                        locale="nb"
                        onChangeLocale={() => ({})}
                        currentRoute={SøknadRoutes.OM_BARNET}
                    />
                </IntlProvider>
            </BrowserRouter>
        );

        expect(await screen.findByText('Om barnet')).toBeInTheDocument();
        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
    });
});
