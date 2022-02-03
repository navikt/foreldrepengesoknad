import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { ForeldrepengesøknadContextAction, ForeldrepengesøknadContextActionKeys } from '../action/actionCreator';
import { ForeldrepengesøknadContextState, foreldrepengesøknadInitialState } from '../ForeldrepengesøknadContextConfig';

const finnVedleggAvType = (type: AttachmentType, alleVedlegg: Attachment[]): Attachment[] | undefined => {
    const vedleggAvType = alleVedlegg.filter((v) => v.type === type);
    return vedleggAvType.length > 0 ? vedleggAvType : undefined;
};

const foreldrepengesøknadReducer = (
    state: ForeldrepengesøknadContextState,
    action: ForeldrepengesøknadContextAction
): ForeldrepengesøknadContextState => {
    switch (action.type) {
        case ForeldrepengesøknadContextActionKeys.SET_HARGODKJENTVILKÅR:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    harGodkjentVilkår: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_ER_ENDRINGSSØKNAD:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    erEndringssøknad: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    søkersituasjon: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_OMBARNET:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    barn: {
                        ...action.payload,
                    },
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_ANNENFORELDER:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    annenForelder: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_INFORMASJON_OM_UTENLANDSOPPHOLD:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    informasjonOmUtenlandsopphold: {
                        ...state.søknad.informasjonOmUtenlandsopphold,
                        ...action.payload,
                    },
                },
            };
        case ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknad: {
                    ...foreldrepengesøknadInitialState.søknad,
                },
                uttaksplanInfo: undefined,
            };
        case ForeldrepengesøknadContextActionKeys.UPDATE_CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.APPLY_STORED_STATE:
            return {
                ...state,
                ...action.payload,
            };

        case ForeldrepengesøknadContextActionKeys.SET_SAKER:
            return {
                ...state,
                saker: [...action.payload],
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKERINFO:
            return {
                ...state,
                søkerinfo: { ...action.payload },
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKER:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    søker: {
                        ...action.payload,
                    },
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN_INFO:
            return {
                ...state,
                uttaksplanInfo: { ...action.payload },
            };
        case ForeldrepengesøknadContextActionKeys.SET_DEKNINGSGRAD:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    dekningsgrad: action.dekningsgrad,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_VEDLEGG:
            //TODO Legg til håndtering av fleire vedlegg
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    barn: {
                        ...state.søknad.barn,
                        dokumentasjonAvAleneomsorg:
                            finnVedleggAvType(AttachmentType.ALENEOMSORG, action.vedlegg) ||
                            state.søknad.barn.dokumentasjonAvAleneomsorg,
                    },
                },
            };
        case ForeldrepengesøknadContextActionKeys.LAG_UTTAKSPLANFORSLAG:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    uttaksplan: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    uttaksplan: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKNAD:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default foreldrepengesøknadReducer;
