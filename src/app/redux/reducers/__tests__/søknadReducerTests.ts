import { default as reducer, getDefaultSøknadState } from '../søknadReducer';
import actions from '../../actions/søknad/søknadActionCreators';
import { Skjemanummer, SøkerRolle } from '../../../types/søknad/Søknad';
import { StegID } from '../../../util/routing/stegConfig';
import * as attachmentReducerUtils from './../../util/attachmentStateUpdates';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';

const defaultState = getDefaultSøknadState();

const stringify = (someObject: any) => JSON.stringify(someObject);

const mockedAttachment: Attachment = {
    pending: false,
    id: '1',
    filename: 'asdf',
    filesize: 1,
    file: new File(['aasdfsdf'], 'asdf'),
    uploaded: false,
    type: AttachmentType.ADOPSJONSVEDTAK,
    skjemanummer: Skjemanummer.OMSORGSOVERTAKELSESDATO
};

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

    it('should update currentStegID in ekstrainfo with specified ID when SET_CURRENT_STEG-action is dispatched and user has godkjentVilkår', () => {
        const someAlteredState = reducer(
            { ...defaultState, harGodkjentVilkår: true },
            actions.setCurrentSteg(StegID.INNGANG)
        );
        expect(someAlteredState.ekstrainfo.currentStegID).toBe(StegID.INNGANG);
    });

    it('should clear currentStegID in ekstrainfo when SET_CURRENT_STEG-action is dispatched and user has not godkjentVilkår', () => {
        const someAlteredState = reducer(defaultState, actions.setCurrentSteg(StegID.INNGANG));
        expect(someAlteredState.ekstrainfo.currentStegID).toBe(undefined);
    });

    it('should set attachment.pending to true and call addAttachmentToState when UPLOAD_ATTACHMENT-action is dispatched', () => {
        mockedAttachment.pending = false;
        (attachmentReducerUtils as any).addAttachmentToState = jest.fn((attachment, state) => {
            state.vedlegg = [attachment];
            return state;
        });
        const newSøknadState = reducer(defaultState, actions.uploadAttachment(mockedAttachment) as any);
        expect(attachmentReducerUtils.addAttachmentToState).toHaveBeenCalledWith(mockedAttachment, defaultState);
        expect(newSøknadState.vedlegg![0].pending).toBe(true);
    });

    it('should set attachment.pending to false, attachment.uploaded to true and call editAttachmentInState when UPLOAD_ATTACHMENT_SUCCESS-action is dispatched', () => {
        mockedAttachment.pending = true;
        mockedAttachment.uploaded = false;
        (attachmentReducerUtils as any).editAttachmentInState = jest.fn((attachment, state) => {
            state.vedlegg = [attachment];
            return state;
        });
        const newSøknadState = reducer(
            defaultState,
            actions.uploadAttachmentSuccess(mockedAttachment, 'someUrl', 'uuid')
        );
        expect(attachmentReducerUtils.editAttachmentInState).toHaveBeenCalledWith(mockedAttachment, defaultState);
        expect(newSøknadState.vedlegg![0].pending).toBe(false);
        expect(newSøknadState.vedlegg![0].uploaded).toBe(true);
        expect(newSøknadState.vedlegg![0].url).toBe('someUrl');
    });

    it('should set attachment.pending to false, attachment.uploaded to false and call editAttachmentInState when UPLOAD_ATTACHMENT_FAILED-action is dispatched', () => {
        mockedAttachment.pending = true;
        mockedAttachment.uploaded = false;
        (attachmentReducerUtils as any).editAttachmentInState = jest.fn((attachment, state) => {
            state.vedlegg = [attachment];
            return state;
        });
        const newSøknadState = reducer(defaultState, actions.uploadAttachmentFailed('someError', mockedAttachment));
        expect(attachmentReducerUtils.editAttachmentInState).toHaveBeenCalledWith(mockedAttachment, defaultState);
        expect(newSøknadState.vedlegg![0].pending).toBe(false);
        expect(newSøknadState.vedlegg![0].uploaded).toBe(false);
        expect(newSøknadState.vedlegg![0].error).toBe('someError');
    });
});
