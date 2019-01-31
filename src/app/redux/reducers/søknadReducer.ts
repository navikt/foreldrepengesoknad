import moment from 'moment';
import { SøknadAction, SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import Søknad, { SøknadPartial } from '../../types/søknad/Søknad';
import { addAttachmentToState, editAttachmentInState, removeAttachmentFromState } from '../util/attachmentStateUpdates';
import { lagUttaksplan } from '../../util/uttaksplan/forslag/lagUttaksplan';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';
import { UttaksplanBuilder } from '../../util/uttaksplan/builder/UttaksplanBuilder';
import { isForeldrepengerFørFødselUttaksperiode, Periode } from '../../types/uttaksplan/periodetyper';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
import { Barn } from '../../types/søknad/Barn';
import { guid } from 'nav-frontend-js-utils';
import {
    getBarnInfoFraRegistrertBarnValg,
    getUniqeRegistrertAnnenForelderFromBarn
} from '../../util/validation/steg/barn';
import { RegistrertAnnenForelder } from '../../types/Person';
import AnnenForelder from '../../types/søknad/AnnenForelder';

export const getDefaultSøknadState = (): SøknadPartial => {
    return {
        type: 'foreldrepenger',
        saksnummer: undefined,
        annenForelder: {
            kanIkkeOppgis: false
        },
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
            },
            currentStegID: undefined,
            søknadenGjelderBarnValg: {
                valgteBarn: [],
                gjelderAnnetBarn: undefined
            }
        },
        vedleggForSenEndring: undefined,
        tilleggsopplysninger: {},
        sensitivInfoIkkeLagre: {},
        uttaksplan: []
    };
};

const removeEkstrauttakFørTermin = (state: SøknadPartial) => {
    return state.uttaksplan.filter(
        (periode) =>
            moment(periode.tidsperiode.fom).isSameOrAfter(
                getFamiliehendelsedato(state.barn as Barn, state.situasjon!),
                'day'
            ) || isForeldrepengerFørFødselUttaksperiode(periode)
    );
};

const getAnnenForelderFromRegistrertForelder = (registertForelder: RegistrertAnnenForelder): Partial<AnnenForelder> => {
    return {
        fnr: registertForelder.fnr,
        fornavn: registertForelder.fornavn,
        etternavn: registertForelder.etternavn
    };
};

const søknadReducer = (state = getDefaultSøknadState(), action: SøknadAction): SøknadPartial => {
    const getBuilder = (perioder?: Periode[]) => {
        return UttaksplanBuilder(
            perioder || state.uttaksplan,
            getFamiliehendelsedato(state.barn as Barn, state.situasjon!)
        );
    };
    switch (action.type) {
        case SøknadActionKeys.AVBRYT_SØKNAD:
            return {
                ...getDefaultSøknadState()
            };
        case SøknadActionKeys.UPDATE_SØKNAD:
            return {
                ...state,
                ...action.payload
            };
        case SøknadActionKeys.SET_SØKNAD:
            return {
                ...getDefaultSøknadState(),
                ...action.payload
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
        case SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN: {
            const { gjelderAnnetBarn, valgteBarn } = action.payload;
            const barn = getBarnInfoFraRegistrertBarnValg(gjelderAnnetBarn, valgteBarn);
            const registrertAnnenForelder = getUniqeRegistrertAnnenForelderFromBarn(valgteBarn);

            return {
                ...state,
                barn,
                annenForelder: registrertAnnenForelder
                    ? {
                          ...state.annenForelder,
                          ...getAnnenForelderFromRegistrertForelder(registrertAnnenForelder),
                          kanIkkeOppgis: getDefaultSøknadState().annenForelder.kanIkkeOppgis
                      }
                    : gjelderAnnetBarn
                        ? { ...state.annenForelder, fnr: undefined, fornavn: undefined, etternavn: undefined }
                        : state.annenForelder,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    søknadenGjelderBarnValg: action.payload
                },
                sensitivInfoIkkeLagre: {
                    registrertAnnenForelder
                }
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_SET_PERIODER:
            return {
                ...state,
                uttaksplan: action.perioder
            };

        case SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG:
            return {
                ...state,
                uttaksplan: lagUttaksplan(state as Søknad, action.tilgjengeligeStønadskontoer).sort(sorterPerioder),
                ekstrainfo: {
                    ...state.ekstrainfo,
                    uttaksplanSkjema: {
                        ...state.ekstrainfo.uttaksplanSkjema,
                        forslagLaget: true
                    }
                }
            };

        case SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE: {
            const id = guid();
            return {
                ...state,
                uttaksplan: getBuilder().leggTilPeriodeOgBuild({
                    ...action.periode,
                    id
                }).perioder,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    lastAddedPeriodeId: id
                }
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE: {
            return {
                ...state,
                uttaksplan: getBuilder().slettPeriodeOgBuild(action.periode).perioder
            };
        }

        case SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE: {
            const removeOtherPerioderFørTermin =
                isForeldrepengerFørFødselUttaksperiode(action.periode) &&
                action.periode.skalIkkeHaUttakFørTermin === true;

            const filteredPerioder = removeOtherPerioderFørTermin
                ? removeEkstrauttakFørTermin(state)
                : state.uttaksplan;
            return {
                ...state,
                uttaksplan: getBuilder(filteredPerioder).oppdaterPeriodeOgBuild(action.periode).perioder
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

        case SøknadActionKeys.SET_VEDLEGG_FOR_SEN_ENDRING: {
            return {
                ...state,
                vedleggForSenEndring: action.payload
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
                        tekst
                    }
                }
            };
        }

        case SøknadActionKeys.SET_CURRENT_STEG:
            return {
                ...state,
                ekstrainfo: {
                    ...state.ekstrainfo,
                    lastAddedPeriodeId: undefined,
                    currentStegID: action.stegID
                }
            };

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
            failedAttachment.error = action.error;
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
