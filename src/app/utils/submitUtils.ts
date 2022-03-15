import Api from 'app/api/api';
import { getSøknadsdataForInnsending } from 'app/api/apiUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';

import { AxiosResponse } from 'axios';

import dayjs from 'dayjs';
import {
    isOppholdsperiode,
    isOverføringsperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
    Periode,
} from 'uttaksplan/types/Periode';
import { dateIsWithinRange } from './dateUtils';

export const storeAppState = (state: ForeldrepengesøknadContextState): Promise<AxiosResponse<any>> => {
    return Api.storeAppState(state, state.søkerinfo.person.fnr);
};

export const erPeriodeSomSkalSendesInn = (periode: Periode): boolean => {
    return (
        isUttaksperiode(periode) ||
        isOverføringsperiode(periode) ||
        isUtsettelsesperiode(periode) ||
        isOppholdsperiode(periode)
    );
};

export const getPerioderSomSkalSendesInn = (
    nyPlan: Periode[],
    erEndringssøknad: boolean,
    opprinneligPlan?: Periode[],
    endringstidspunkt?: Date
): Periode[] => {
    if (opprinneligPlan) {
        return erEndringssøknad
            ? getEndretUttaksplanForInnsending(nyPlan, endringstidspunkt)
            : nyPlan.filter(erPeriodeSomSkalSendesInn);
    }
    return nyPlan;
};

const finnEndringerIUttaksplan = (nyPlan: Periode[], endringstidspunkt: Date): Periode[] => {
    return nyPlan.filter(
        (p) =>
            dateIsWithinRange(endringstidspunkt, p.tidsperiode.fom, p.tidsperiode.tom) ||
            dayjs(p.tidsperiode.fom).isSameOrAfter(dayjs(endringstidspunkt))
    );
};

const getEndretUttaksplanForInnsending = (nyPlan: Periode[], endringstidspunkt: Date | undefined): Periode[] => {
    if (endringstidspunkt === undefined) {
        return [];
    }

    return finnEndringerIUttaksplan(nyPlan, endringstidspunkt).filter(erPeriodeSomSkalSendesInn);
};

export const sendInnSøknad = (state: ForeldrepengesøknadContextState): Promise<AxiosResponse<any>> => {
    const cleanedSøknad = getSøknadsdataForInnsending(
        state.søknad,
        //action.missingAttachments,
        state.perioderSomSkalSendesInn,
        state.endringstidspunkt
    );

    return Api.sendSøknad(cleanedSøknad, state.søkerinfo.person.fnr);
};
