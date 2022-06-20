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

describe('<ForeldrepengesøknadRoutes>', () => {
    const state = {
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
        kvittering: undefined!,
        antallUkerIUttaksplan: undefined!,
        endringstidspunkt: undefined,
        perioderSomSkalSendesInn: [],
        harUttaksplanBlittSlettet: false,
    };

    it('skal vise velkommen-side når denne ruten er valgt', () => {
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

        expect(screen.queryByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.queryByText('Jeg vil hjelpe deg med å fylle ut søknaden.')).toBeInTheDocument();
    });

    it('skal vise om-barnet-side når denne ruten er valgt', () => {
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

        expect(screen.queryByText('Om barnet')).toBeInTheDocument();
        expect(screen.queryByText('Er barnet født?')).toBeInTheDocument();
    });
});
