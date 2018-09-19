import { SøknadAction, SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import Søknad, { SøknadPartial } from '../../types/søknad/Søknad';
import { addAttachmentToState, editAttachmentInState, removeAttachmentFromState } from '../util/attachmentStateUpdates';
import {
    getUniqeRegistrertAnnenForelderFromBarn,
    getBarnInfoFraRegistrertBarnValg
} from '../../util/validation/steg/barn';
import { RegistrertAnnenForelder } from '../../types/Person';
import { AnnenForelderPartial } from '../../types/søknad/AnnenForelder';
import { guid } from 'nav-frontend-js-utils';
import { lagMockUttaksplan } from '../../util/uttaksplan/forslag/mockUttaksplan';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';

const getDefaultState = (): SøknadPartial => {
    return {
        type: 'foreldrepenger',
        annenForelder: {},
        barn: {},
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
        ekstrainfo: {
            uttaksplanSkjema: {
                startdatoPermisjon: undefined
            }
        },
        sensitivInfoIkkeLagre: {
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
        fornavn: registertForelder.fornavn,
        etternavn: registertForelder.etternavn
    };
};

const søknadReducer = (state = getDefaultState(), action: SøknadAction): SøknadPartial => {
    switch (action.type) {
        case SøknadActionKeys.AVBRYT_SØKNAD:
            return {
                ...getDefaultState()
            };
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
            const updatedState: SøknadPartial = {
                ...state,
                barn,
                annenForelder: registrertAnnenForelder
                    ? getAnnenForelderFromRegistrertForelder(registrertAnnenForelder)
                    : state.annenForelder,
                sensitivInfoIkkeLagre: {
                    ...state.sensitivInfoIkkeLagre,
                    søknadenGjelderBarnValg: action.payload,
                    registrertAnnenForelder
                }
            };
            return updatedState;
        }

        case SøknadActionKeys.UTTAKSPLAN_SET_PERIODER:
            return {
                ...state,
                uttaksplan: action.perioder
            };

        case SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG:
            return {
                ...state,
                uttaksplan: lagMockUttaksplan(state as Søknad, action.tilgjengeligeStønadskontoer).sort(sorterPerioder),
                ekstrainfo: {
                    ...state.ekstrainfo,
                    uttaksplanSkjema: {
                        ...state.ekstrainfo.uttaksplanSkjema,
                        forslagLaget: true
                    }
                }
            };

        case SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE: {
            return {
                ...state,
                uttaksplan: [...state.uttaksplan, { ...action.periode, id: guid() }].sort(sorterPerioder)
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE: {
            return {
                ...state,
                uttaksplan: state.uttaksplan.filter((periode) => periode.id !== action.periode.id).sort(sorterPerioder)
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE: {
            const filteredPerioder = state.uttaksplan.filter((periode) => periode.id !== action.periode.id);
            return {
                ...state,
                uttaksplan: [...filteredPerioder, action.periode].sort(sorterPerioder)
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_UPDATE_SKJEMADATA: {
            return {
                ...state,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    uttaksplanSkjema: {
                        ...state.ekstrainfo.uttaksplanSkjema,
                        ...action.payload
                    }
                }
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
