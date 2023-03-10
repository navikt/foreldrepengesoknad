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
                ...foreldrepengesøknadInitialState,
                søkerinfo: state.søkerinfo,
                saker: state.saker,
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
        case ForeldrepengesøknadContextActionKeys.SET_EKSISTERENDE_SAK:
            return {
                ...state,
                eksisterendeSak: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_BARN_FRA_NESTE_SAK:
            return {
                ...state,
                barnFraNesteSak: action.payload,
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
        case ForeldrepengesøknadContextActionKeys.SET_PERIODER_SOM_SKAL_SENDES_INN:
            return {
                ...state,
                perioderSomSkalSendesInn: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKNAD:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    ...action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKNAD_GJELDER_ET_NYTT_BARN:
            return {
                ...state,
                søknadGjelderEtNyttBarn: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_GODKJENT_OPPSUMMERING:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    harGodkjentOppsummering: action.payload,
                },
            };

        case ForeldrepengesøknadContextActionKeys.SET_TILLEGGSOPPLYSNINGER:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    tilleggsopplysninger: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_KVITTERING:
            return {
                ...state,
                kvittering: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_ANTALL_UKER_I_UTTAKSPLAN:
            return {
                ...state,
                antallUkerIUttaksplan: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_ENDRINGSTIDSPUNKT:
            return {
                ...state,
                endringstidspunkt: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_SPRÅKKODE:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    søker: {
                        ...state.søknad.søker,
                        språkkode: action.payload,
                    },
                },
            };
        case ForeldrepengesøknadContextActionKeys.SLETT_UTTAKSPLAN:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    uttaksplan: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN_SLETTET:
            return {
                ...state,
                harUttaksplanBlittSlettet: action.uttaksplanHarBlittSlettet,
            };
        case ForeldrepengesøknadContextActionKeys.SET_ØNSKER_JUSTERT_UTTAK_VED_FØDSEL:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    ønskerJustertUttakVedFødsel: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_BRUKER_SVARTE_JA_PÅ_AUTO_JUSTERING:
            return {
                ...state,
                brukerSvarteJaPåAutoJustering: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_ANNEN_PARTS_UTTAK_ER_LAGT_TIL_I_PLAN:
            return {
                ...state,
                annenPartsUttakErLagtTilIPlan: action.payload,
            };
        default:
            return state;
    }
};

export default foreldrepengesøknadReducer;
