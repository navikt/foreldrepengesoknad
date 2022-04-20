import { SøknadAction, SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { SøknadPartial } from '../../types/søknad/Søknad';
import { addAttachmentToState, editAttachmentInState, removeAttachmentFromState } from '../util/attachmentStateUpdates';
import { Periode } from '../../types/uttaksplan/periodetyper';
import {
    getBarnInfoFraRegistrertBarnValg,
    getUniqueRegistrertAnnenForelderFromBarn,
} from '../../util/validation/steg/barn';
import { RegistrertAnnenForelder } from '../../types/Person';
import AnnenForelder from '../../types/søknad/AnnenForelder';

export const getDefaultSøknadState = (): SøknadPartial => {
    return {
        type: 'foreldrepenger',
        saksnummer: undefined,
        annenForelder: {
            kanIkkeOppgis: false,
        },
        barn: {},
        informasjonOmUtenlandsopphold: {
            tidligereOpphold: [],
            senereOpphold: [],
        },
        søker: {
            erAleneOmOmsorg: undefined,
            andreInntekterSiste10Mnd: [],
        },
        harGodkjentVilkår: false,
        harGodkjentOppsummering: false,
        ekstrainfo: {
            erEnkelEndringssøknad: false,
            uttaksplanSkjema: {
                startdatoPermisjon: undefined,
                ønskerTomPlan: false,
            },
            currentStegID: undefined,
            søknadenGjelderBarnValg: {
                valgteBarn: [],
                gjelderAnnetBarn: undefined,
            },
            eksisterendeSak: undefined,
        },
        vedleggForSenEndring: undefined,
        tilleggsopplysninger: {},
        sensitivInfoIkkeLagre: {},
        uttaksplan: [],
    };
};

const getAnnenForelderFromRegistrertForelder = (registertForelder: RegistrertAnnenForelder): Partial<AnnenForelder> => {
    return {
        fnr: registertForelder.fnr,
        fornavn: registertForelder.fornavn,
        etternavn: registertForelder.etternavn,
    };
};

const cloneUttaksplan = (uttaksplan: Periode[] | undefined): Periode[] => {
    if (!uttaksplan || uttaksplan.length === 0) {
        return [];
    }
    return uttaksplan.map((periode) => ({
        ...periode,
        tidsperiode: { ...periode.tidsperiode },
    }));
};

const søknadReducer = (state = getDefaultSøknadState(), action: SøknadAction): SøknadPartial => {
    switch (action.type) {
        case SøknadActionKeys.AVBRYT_SØKNAD:
            return {
                ...getDefaultSøknadState(),
            };
        case SøknadActionKeys.UPDATE_SØKNAD:
            return {
                ...state,
                ...action.payload,
            };
        case SøknadActionKeys.UPDATE_EKSTRAINFO:
            return {
                ...state,
                ekstrainfo: { ...state.ekstrainfo, ...action.payload },
            };
        case SøknadActionKeys.SET_SØKNAD:
            return {
                ...getDefaultSøknadState(),
                ...action.payload,
            };
        case SøknadActionKeys.UPDATE_BARN:
            return {
                ...state,
                barn: { ...state.barn, ...action.payload },
            };
        case SøknadActionKeys.UPDATE_ANNEN_FORELDER:
            return {
                ...state,
                annenForelder: { ...state.annenForelder, ...action.payload },
            };
        case SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD:
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...state.informasjonOmUtenlandsopphold,
                    ...action.payload,
                },
            };
        case SøknadActionKeys.UPDATE_SØKER:
            return {
                ...state,
                søker: {
                    ...state.søker,
                    ...action.payload,
                },
            };
        case SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN: {
            const { gjelderAnnetBarn, valgteBarn, termindato } = action.payload;
            const barn = { ...getBarnInfoFraRegistrertBarnValg(gjelderAnnetBarn, valgteBarn), termindato };
            const registrertAnnenForelder = getUniqueRegistrertAnnenForelderFromBarn(valgteBarn);

            return {
                ...state,
                barn,
                annenForelder: registrertAnnenForelder
                    ? {
                          ...state.annenForelder,
                          ...getAnnenForelderFromRegistrertForelder(registrertAnnenForelder),
                          kanIkkeOppgis: getDefaultSøknadState().annenForelder.kanIkkeOppgis,
                      }
                    : gjelderAnnetBarn
                    ? { ...state.annenForelder, fnr: undefined, fornavn: undefined, etternavn: undefined }
                    : state.annenForelder,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    søknadenGjelderBarnValg: action.payload,
                },
                sensitivInfoIkkeLagre: {
                    registrertAnnenForelder,
                },
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_SET_PERIODER:
            return {
                ...state,
                uttaksplan: cloneUttaksplan(action.perioder),
                ekstrainfo: {
                    ...state.ekstrainfo,
                    endringstidspunkt: action.endringstidspunkt,
                    lastAddedPeriodeId: action.lastAddedPeriodeId,
                },
            };

        case SøknadActionKeys.UTTAKSPLAN_RESET_ENDRINGER:
            return {
                ...state,
                uttaksplan:
                    state.ekstrainfo.eksisterendeSak !== undefined
                        ? cloneUttaksplan(state.ekstrainfo.eksisterendeSak.uttaksplan || [])
                        : [],
                ekstrainfo: {
                    ...state.ekstrainfo,
                    uttaksplanSkjema: {
                        ...state.ekstrainfo.uttaksplanSkjema,
                        ønskerTomPlan: false,
                    },
                    endringstidspunkt: undefined,
                },
            };

        case SøknadActionKeys.UTTAKSPLAN_SET_FORSLAG:
            return {
                ...state,
                uttaksplan: action.uttaksplan,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    uttaksplanSkjema: {
                        ...state.ekstrainfo.uttaksplanSkjema,
                        forslagLaget: true,
                    },
                },
            };

        case SøknadActionKeys.UTTAKSPLAN_UPDATE_SKJEMADATA: {
            return {
                ...state,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    uttaksplanSkjema: {
                        ...state.ekstrainfo.uttaksplanSkjema,
                        ...action.payload,
                    },
                },
            };
        }

        case SøknadActionKeys.SET_VEDLEGG_FOR_SEN_ENDRING: {
            return {
                ...state,
                vedleggForSenEndring: action.payload,
            };
        }

        case SøknadActionKeys.SET_TILLEGGSOPPLYSNING: {
            const { opplysning, tekst, ekstraInformasjon } = action.payload;
            return {
                ...state,
                tilleggsopplysninger: {
                    ...state.tilleggsopplysninger,
                    [opplysning]: {
                        ekstraInformasjon,
                        tekst,
                    },
                },
            };
        }

        case SøknadActionKeys.SET_ENDRINGSTIDSPUNKT: {
            const { endringstidspunkt } = action;
            return {
                ...state,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    endringstidspunkt,
                },
            };
        }

        case SøknadActionKeys.SET_CURRENT_STEG:
            const currentStegID = state.harGodkjentVilkår ? action.stegID : undefined;
            return {
                ...state,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    lastAddedPeriodeId: undefined,
                    currentStegID,
                },
            };

        case SøknadActionKeys.UPLOAD_ATTACHMENT:
            const pendingAttachment = action.payload;
            pendingAttachment.pending = true;
            return addAttachmentToState(pendingAttachment, state);

        case SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS:
            const uploadedAttachment = action.attachment;
            const url = action.url;
            const uuid = action.uuid;
            uploadedAttachment.url = url;
            uploadedAttachment.uuid = uuid;
            uploadedAttachment.pending = false;
            uploadedAttachment.uploaded = true;
            return editAttachmentInState(uploadedAttachment, state);

        case SøknadActionKeys.UPLOAD_ATTACHMENT_FAILED:
            const failedAttachment = action.attachment;
            failedAttachment.pending = false;
            failedAttachment.uploaded = false;
            failedAttachment.error = action.error;
            return editAttachmentInState(failedAttachment, state);
        case SøknadActionKeys.DELETE_ATTACHMENT:
            return removeAttachmentFromState(action.attachment, state);
        case SøknadActionKeys.SET_INFORMASJON_OM_UTENLANDSOPPHOLD:
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default søknadReducer;
