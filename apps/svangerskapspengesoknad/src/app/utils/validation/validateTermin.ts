import moment from 'moment';
import { isEmpty } from 'lodash';
import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import {
    dagenEtter,
    niMånederFremITid,
    etÅrSiden,
    enMånedSiden,
    halvannetÅrSiden,
    isInvalidDateString,
} from '../../../common/util/datoUtils';

const validateTermin = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};
    let barn = {};
    let fødselsdatoFeil = {};
    let termindatoFeil = {};

    if (søknad.barn.fødselsdato) {
        if (isInvalidDateString(søknad.barn.fødselsdato)) {
            fødselsdatoFeil = {
                fødselsdato: { intlKey: 'valideringsfeil.ugyldigDato', values: { feltNavn: 'Fødselsdato' } },
            };
        } else {
            if (!moment(søknad.barn.fødselsdato).isBefore(dagenEtter(new Date()))) {
                fødselsdatoFeil = {
                    fødselsdato: 'valideringsfeil.fødselsdatoMåVæreTilbakeITid',
                };
            }
            if (moment(søknad.barn.fødselsdato).isBefore(halvannetÅrSiden(new Date()))) {
                fødselsdatoFeil = {
                    fødselsdato: 'valideringsfeil.forLangtTilbakeITid',
                };
            }
        }
    }

    if (søknad.barn.termindato === undefined) {
        termindatoFeil = {
            termindato: 'valideringsfeil.termindatoErPåkrevd',
        };
    }

    if (søknad.barn.termindato) {
        if (isInvalidDateString(søknad.barn.termindato)) {
            termindatoFeil = {
                termindato: { intlKey: 'valideringsfeil.ugyldigDato', values: { feltNavn: 'Termindato' } },
            };
        } else {
            if (moment(søknad.barn.termindato).isSameOrAfter(niMånederFremITid(new Date()))) {
                termindatoFeil = {
                    termindato: 'valideringsfeil.forLangtFremITid',
                };
            }
            if (moment(søknad.barn.termindato).isBefore(etÅrSiden(new Date()))) {
                termindatoFeil = {
                    termindato: 'valideringsfeil.forLangtTilbakeITid',
                };
            }
            if (
                moment(søknad.barn.termindato).isBefore(enMånedSiden(new Date())) &&
                søknad.barn.fødselsdato === undefined
            ) {
                termindatoFeil = {
                    fødselsdato: 'valideringsfeil.vennligstOppgiBarnetsFødselsDato',
                };
            }
        }
    }

    barn = { ...termindatoFeil, ...fødselsdatoFeil };

    if (!isEmpty(barn)) {
        errors.barn = barn;
    }

    return errors;
};

export default validateTermin;
