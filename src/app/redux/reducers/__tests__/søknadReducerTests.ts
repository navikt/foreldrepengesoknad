import { default as reducer, getDefaultSøknadState } from '../søknadReducer';
import actions from '../../actions/søknad/søknadActionCreators';
import { SøkerRolle } from '../../../types/søknad/Søknad';

const defaultState = getDefaultSøknadState();

const stringify = (someObject: any) => JSON.stringify(someObject);

describe('søknadReducer', () => {
    it('should initially set the correct default state', () => {
        const {
            type,
            harGodkjentOppsummering,
            harGodkjentVilkår,
            annenForelder,
            barn,
            informasjonOmUtenlandsopphold,
            søker,
            ekstrainfo,
            sensitivInfoIkkeLagre,
            uttaksplan
        } = defaultState;

        expect(type).toEqual('foreldrepenger');
        expect(harGodkjentVilkår).toBe(false);
        expect(harGodkjentOppsummering).toBe(false);
        expect(annenForelder.kanIkkeOppgis).toBe(false);
        expect(barn).toBeDefined();
        expect(ekstrainfo).toBeDefined();
        expect(ekstrainfo.uttaksplanSkjema).toBeDefined();
        expect(informasjonOmUtenlandsopphold.tidligereOpphold).toBeInstanceOf(Array);
        expect(informasjonOmUtenlandsopphold.tidligereOpphold).toHaveLength(0);
        expect(informasjonOmUtenlandsopphold.senereOpphold).toBeInstanceOf(Array);
        expect(informasjonOmUtenlandsopphold.senereOpphold).toHaveLength(0);
        expect(søker.andreInntekterSiste10Mnd).toBeInstanceOf(Array);
        expect(søker.andreInntekterSiste10Mnd).toHaveLength(0);
        expect(uttaksplan).toBeInstanceOf(Array);
        expect(uttaksplan).toHaveLength(0);
        expect(sensitivInfoIkkeLagre).toBeDefined();
        expect(sensitivInfoIkkeLagre.søknadenGjelderBarnValg).toBeDefined();
        expect(sensitivInfoIkkeLagre.søknadenGjelderBarnValg.valgteBarn).toBeInstanceOf(Array);
        expect(sensitivInfoIkkeLagre.søknadenGjelderBarnValg.valgteBarn).toHaveLength(0);
    });

    it('should set søknad-state to its default state when AVBRYT_SØKNAD-action is dispatched', () => {
        const someAlteredState = reducer(defaultState, actions.updateBarn({ antallBarn: 2 }));
        const cancelledSøknad = reducer(someAlteredState, actions.avbrytSøknad());
        expect(stringify(cancelledSøknad)).not.toEqual(stringify(someAlteredState));
        expect(stringify(cancelledSøknad)).toEqual(stringify(defaultState));
    });

    it('should update specified properties on søknad-state when UPDATE_SØKNAD-action is dispatched', () => {
        const someProperties = { harGodkjentVilkår: true };
        const updatedState = reducer(defaultState, actions.updateSøknad(someProperties));
        expect(updatedState.harGodkjentVilkår).toBe(true);
    });

    it('should set søknad-state back to default state, and set new specified properties from payload, when SET_SØKNAD-action is dispatched', () => {
        const someAlteredState = reducer(defaultState, actions.updateBarn({ antallBarn: 5 }));
        const someProperties = { harGodkjentVilkår: true };
        const newSøknadState = reducer(someAlteredState, actions.setSøknad(someProperties) as any);
        expect(newSøknadState.harGodkjentVilkår).toBe(true);
        expect(newSøknadState.barn.antallBarn).not.toBe(5);
    });

    it('should update specified properties of søknad.barn when UPDATE_BARN-action is dispatched', () => {
        const someAlteredState = reducer(defaultState, actions.updateBarn({ antallBarn: 3 }));
        expect(someAlteredState.barn.antallBarn).toBe(3);
    });

    it('should update specified properties of søknad.annenForelder when UPDATE_ANNEN_FORELDER-action is dispatched', () => {
        const someAlteredState = reducer(defaultState, actions.updateAnnenForelder({
            fornavn: 'Ola'
        }) as any);
        expect(someAlteredState.annenForelder.fornavn).toBe('Ola');
    });

    it('should update specified properties of søknad.informasjonOmUtenlandsopphold when UPDATE_UTENLANDSOPPHOLD-action is dispatched', () => {
        const someAlteredState = reducer(defaultState, actions.updateUtenlandsopphold({ iNorgeNeste12Mnd: true }));
        expect(someAlteredState.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd).toBe(true);
    });

    it('should update specified properties of søknad.søker when UPDATE_SØKER-action is dispatched', () => {
        const someAlteredState = reducer(defaultState, actions.updateSøker({ rolle: SøkerRolle.MOR }));
        expect(someAlteredState.søker.rolle).toBe(SøkerRolle.MOR);
    });
});
