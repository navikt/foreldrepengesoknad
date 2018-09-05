import { SøknadAction, SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { SøknadPartial } from '../../types/søknad/Søknad';
import { addAttachmentToState, editAttachmentInState, removeAttachmentFromState } from '../util/attachmentStateUpdates';
import {
    getUniqeRegistrertAnnenForelderFromBarn,
    getBarnInfoFraRegistrertBarnValg
} from '../../util/validation/steg/barn';
import { RegistrertAnnenForelder } from '../../types/Person';
import { AnnenForelderPartial } from '../../types/søknad/AnnenForelder';
import { formaterNavn } from '../../util/domain/personUtil';
import { guid } from 'nav-frontend-js-utils';

const getDefaultState = (): SøknadPartial => {
    return {
        type: 'foreldrepenger',
        annenForelder: {},
        barn: {
            fødselsdatoer: []
        },
        informasjonOmUtenlandsopphold: {
            tidligereOpphold: [],
            senereOpphold: []
        },
        søker: {
            erAleneOmOmsorg: undefined,
            andreInntekterSiste10Mnd: []
        },
        harGodkjentVilkår: false,
        harGodkjentOppsummering: false,
        temp: {
            søknadenGjelderBarnValg: {
                valgteBarn: [],
                gjelderAnnetBarn: undefined
            }
        },
        uttaksplan: []
    };
};

const getAnnenForelderFromRegistrertForelder = (registertForelder: RegistrertAnnenForelder): AnnenForelderPartial => {
    return {
        fnr: registertForelder.fnr,
        navn: formaterNavn(registertForelder.fornavn, registertForelder.etternavn, registertForelder.mellomnavn)
    };
};

const søknadReducer = (state = getDefaultState(), action: SøknadAction): SøknadPartial => {
    switch (action.type) {
        case SøknadActionKeys.UPDATE_BARN:
            return {
                ...state,
                barn: { ...state.barn, ...action.payload }
            };
        case SøknadActionKeys.UPDATE_ANNEN_FORELDER:
            return {
                ...state,
                annenForelder: { ...state.annenForelder, ...action.payload }
            };
        case SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD:
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...state.informasjonOmUtenlandsopphold,
                    ...action.payload
                }
            };
        case SøknadActionKeys.UPDATE_SØKER:
            return {
                ...state,
                søker: {
                    ...state.søker,
                    ...action.payload
                }
            };
        case SøknadActionKeys.UPDATE_SØKNAD:
            return {
                ...state,
                ...action.payload
            };
        case SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN: {
            const registrertAnnenForelder = getUniqeRegistrertAnnenForelderFromBarn(action.payload.valgteBarn);
            const barn = getBarnInfoFraRegistrertBarnValg(action.payload.gjelderAnnetBarn, action.payload.valgteBarn);
            return {
                ...state,
                barn,
                annenForelder: registrertAnnenForelder
                    ? getAnnenForelderFromRegistrertForelder(registrertAnnenForelder)
                    : state.annenForelder,
                temp: {
                    ...state.temp,
                    søknadenGjelderBarnValg: action.payload,
                    registrertAnnenForelder
                }
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_SET_PERIODER:
            return {
                ...state,
                uttaksplan: action.perioder
            };

        case SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE: {
            return {
                ...state,
                uttaksplan: [...state.uttaksplan, { ...action.periode, id: guid() }]
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE: {
            return {
                ...state,
                uttaksplan: state.uttaksplan.filter((periode) => periode.id !== action.periode.id)
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE: {
            return {
                ...state,
                uttaksplan: [...state.uttaksplan.filter((periode) => periode.id !== action.periode.id), action.periode]
            };
        }

        case SøknadActionKeys.UPLOAD_ATTACHMENT:
            const pendingAttachment = action.payload;
            pendingAttachment.pending = true;
            return addAttachmentToState(pendingAttachment, state);

        case SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS:
            const uploadedAttachment = action.attachment;
            const url = action.url;
            uploadedAttachment.url = url;
            uploadedAttachment.pending = false;
            uploadedAttachment.uploaded = true;
            return editAttachmentInState(uploadedAttachment, state);

        case SøknadActionKeys.UPLOAD_ATTACHMENT_FAILED:
            const failedAttachment = action.attachment;
            failedAttachment.pending = false;
            failedAttachment.uploaded = false;
            return editAttachmentInState(failedAttachment, state);

        case SøknadActionKeys.DELETE_ATTACHMENT:
            const attachmentToDelete = action.attachment;
            attachmentToDelete.pending = true;
            return editAttachmentInState(attachmentToDelete, state);

        case SøknadActionKeys.DELETE_ATTACHMENT_SUCCESS:
            const deletedAttachment = action.attachment;
            return removeAttachmentFromState(deletedAttachment, state);

        case SøknadActionKeys.DELETE_ATTACHMENT_FAILED:
            const attachmentFailedToDelete = action.attachment;
            return removeAttachmentFromState(attachmentFailedToDelete, state);
    }
    return state;
};

export default søknadReducer;
