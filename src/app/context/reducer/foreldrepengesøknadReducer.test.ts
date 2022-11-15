import SøknadRoutes from 'app/routes/routes';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Sak } from 'app/types/Sak';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { ForeldrepengesøknadContextActionKeys } from '../action/actionCreator';
import { ForeldrepengesøknadContextState, foreldrepengesøknadInitialState } from '../ForeldrepengesøknadContextConfig';
import { AnnenForelderOppgitt } from '../types/AnnenForelder';
import Barn from '../types/Barn';
import InformasjonOmUtenlandsopphold from '../types/InformasjonOmUtenlandsopphold';
import Søker from '../types/Søker';
import Søkersituasjon from '../types/Søkersituasjon';
import { Tilleggsopplysning, Tilleggsopplysninger } from '../types/Tilleggsopplysninger';
import UttaksplanInfo from '../types/UttaksplanInfo';
import foreldrepengesøknadReducer from './foreldrepengesøknadReducer';

describe('<foreldrepengesøknadReducer>', () => {
    const leggTil = (data: any) => {
        return {
            ...foreldrepengesøknadInitialState,
            søknad: {
                ...foreldrepengesøknadInitialState.søknad,
                ...data,
            },
        };
    };

    it('skal legge til har godkjent vilkår i state', () => {
        const payload = true;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_HARGODKJENTVILKÅR,
            payload,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                harGodkjentVilkår: payload,
            })
        );
    });

    it('skal legge til er endringssøknad i state', () => {
        const payload = true;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_ER_ENDRINGSSØKNAD,
            payload,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                erEndringssøknad: payload,
            })
        );
    });

    it('skal legge til søkersituasjon i state', () => {
        const payload = {
            situasjon: 'fødsel',
        } as Søkersituasjon;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON,
            payload,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                søkersituasjon: payload,
            })
        );
    });

    it('skal legge til barn i state', () => {
        const payload = {
            antallBarn: 1,
        } as Barn;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_OMBARNET,
            payload,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                barn: payload,
            })
        );
    });

    it('skal legge annen forelder til state', () => {
        const payload = {
            fornavn: 'Espen',
        } as AnnenForelderOppgitt;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_ANNENFORELDER,
            payload,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                annenForelder: payload,
            })
        );
    });

    it('skal legge informasjon om utenlandsopphold state', () => {
        const payload = {
            iNorgeSiste12Mnd: false,
        } as InformasjonOmUtenlandsopphold;

        const customState = {
            ...foreldrepengesøknadInitialState,
            søknad: {
                ...foreldrepengesøknadInitialState.søknad,
                informasjonOmUtenlandsopphold: {
                    iNorgeNeste12Mnd: true,
                } as InformasjonOmUtenlandsopphold,
            },
        };

        const resultState = foreldrepengesøknadReducer(customState, {
            type: ForeldrepengesøknadContextActionKeys.SET_INFORMASJON_OM_UTENLANDSOPPHOLD,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...customState,
            søknad: {
                ...customState.søknad,
                informasjonOmUtenlandsopphold: {
                    ...customState.søknad.informasjonOmUtenlandsopphold,
                    ...payload,
                } as InformasjonOmUtenlandsopphold,
            },
        });
    });

    it('skal nullstille søknad og uttaksplanInfo når en avbryter', () => {
        const endretState = {
            ...foreldrepengesøknadInitialState,
            version: 4,
            søknad: {
                ...foreldrepengesøknadInitialState.søknad,
                annenForelder: {
                    fornavn: 'Espen',
                },
            },
            uttaksplanInfo: {},
        } as ForeldrepengesøknadContextState;

        const resultState = foreldrepengesøknadReducer(endretState, {
            type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            version: 4,
        });
    });

    it('skal oppdatere rute i state', () => {
        const payload = SøknadRoutes.ANNEN_FORELDER;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.UPDATE_CURRENT_ROUTE,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            currentRoute: payload,
        });
    });

    it('skal legge lagret data i state', () => {
        const payload = {
            version: 4,
        } as ForeldrepengesøknadContextState;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.APPLY_STORED_STATE,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            ...payload,
        });
    });

    it('skal legge søkerinfo i state', () => {
        const payload = {
            person: {
                fornavn: 'Espen',
            },
        } as Søkerinfo;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_SØKERINFO,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            søkerinfo: payload,
        });
    });

    it('skal legge søker i state', () => {
        const payload = {
            erAleneOmOmsorg: true,
        } as Søker;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_SØKER,
            payload,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                søker: payload,
            })
        );
    });

    it('skal legge saker i state', () => {
        const sak = {
            saksnummer: '1234',
        } as Sak;
        const payload = [sak];

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_SAKER,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            saker: payload,
        });
    });

    it('skal legge uttaksplan info i state', () => {
        const payload = {
            test: '100',
        } as UttaksplanInfo;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN_INFO,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            uttaksplanInfo: payload,
        });
    });

    it('skal sette dekningsgrad i state', () => {
        const dekningsgrad = Dekningsgrad.HUNDRE_PROSENT;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_DEKNINGSGRAD,
            dekningsgrad,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                dekningsgrad: dekningsgrad,
            })
        );
    });
    it('skal sette eksisterendeSak i state', () => {
        const payload = {
            erAnnenPartsSak: true,
            uttaksplan: [] as Periode[],
        } as EksisterendeSak;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_EKSISTERENDE_SAK,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            eksisterendeSak: payload,
        });
    });
    it('skal sette tilleggsopplysninger i søknad i state', () => {
        const payload = {
            begrunnelseForSenEndring: {
                tekst: 'test',
            } as Tilleggsopplysning,
        } as Tilleggsopplysninger;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_TILLEGGSOPPLYSNINGER,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            søknad: {
                ...foreldrepengesøknadInitialState.søknad,
                tilleggsopplysninger: payload,
            },
        });
    });
    it('skal sette antallUker i state', () => {
        const payload = 50;

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_ANTALL_UKER_I_UTTAKSPLAN,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            antallUkerIUttaksplan: payload,
        });
    });
    it('skal sette endringstidspunkt i state', () => {
        const payload = new Date('2021-03-01');

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_ENDRINGSTIDSPUNKT,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            endringstidspunkt: payload,
        });
    });
    it('skal sette perioderSomSkalSendes inn i state', () => {
        const payload = [
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2021-10-10'),
                    tom: new Date('2021-10-31'),
                },
                type: Periodetype.Utsettelse,
            },
            {
                id: '3',
                tidsperiode: {
                    fom: new Date('2022-11-01'),
                    tom: new Date('2022-2-13'),
                },
                type: Periodetype.Uttak,
            },
        ] as Periode[];

        const resultState = foreldrepengesøknadReducer(foreldrepengesøknadInitialState, {
            type: ForeldrepengesøknadContextActionKeys.SET_PERIODER_SOM_SKAL_SENDES_INN,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...foreldrepengesøknadInitialState,
            perioderSomSkalSendesInn: payload,
        });
    });
});
