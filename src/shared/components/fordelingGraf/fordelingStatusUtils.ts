import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import { MorsForbruk, ForelderForbruk, Forbruk, OmForeldre } from 'shared/types';

export type FordelingStatusVerdi = 'suksess' | 'advarsel' | 'feil';

export interface FordelingStatus {
    status: FordelingStatusVerdi;
    tittel: {
        key: string;
        values?: any;
    };
}

const feil = (key: string, values?: {}): FordelingStatus => {
    return {
        status: 'feil',
        tittel: {
            key: `fordeling.status.${key}`,
            values
        }
    };
};

const advarsel = (key: string, values?: {}): FordelingStatus => {
    return {
        status: 'advarsel',
        tittel: {
            key: `fordeling.status.${key}`,
            values
        }
    };
};

const ok = (key: string, values?: {}): FordelingStatus => {
    return {
        status: 'suksess',
        tittel: {
            key: `fordeling.status.${key}`,
            values
        }
    };
};

function getFordelingStatusDeltOmsorg(
    dagerGjenstående: number,
    mor: MorsForbruk,
    farMedmor: ForelderForbruk,
    navnMor: string,
    navnFarMedmor: string,
    intl: InjectedIntl
): FordelingStatus {
    const totalOk = dagerGjenstående === 0;
    const forMangeDagerTotalt = dagerGjenstående < 0;
    const forFåDagerTotalt = dagerGjenstående > 0;

    if (totalOk && mor.dagerErOk && farMedmor.dagerErOk) {
        return ok('altOk');
    }

    if (forMangeDagerTotalt) {
        if (mor.dagerForMye > 0 && farMedmor.dagerForMye > 0) {
            return feil('forMangeDagerTotalt', { dager: getVarighetString(Math.abs(dagerGjenstående), intl) });
        }
        if (mor.dagerForMye > 0) {
            return feil('dagerForMyePerson', {
                navn: navnMor,
                dager: getVarighetString(mor.dagerForMye, intl)
            });
        }
        if (farMedmor.dagerForMye > 0) {
            return feil('dagerForMyePerson', {
                navn: navnFarMedmor,
                dager: getVarighetString(farMedmor.dagerForMye, intl)
            });
        }
        return feil('forMangeDagerTotalt', { dager: getVarighetString(Math.abs(dagerGjenstående), intl) });
    }

    if (
        (forFåDagerTotalt && mor.dagerErOk && farMedmor.dagerErOk) ||
        (mor.dagerForLite > 0 && farMedmor.dagerForLite > 0)
    ) {
        return advarsel('dagerIkkeBrukt', { dager: getVarighetString(dagerGjenstående, intl) });
    }

    if (mor.dagerForMye > 0 || farMedmor.dagerForMye > 0) {
        const erMor = mor.dagerForMye > 0;
        const { dagerForMye } = erMor ? mor : farMedmor;
        return feil('dagerForMyePerson', {
            navn: erMor ? navnMor : navnFarMedmor,
            dager: getVarighetString(dagerForMye, intl)
        });
    }

    if (mor.dagerForLite > 0 || farMedmor.dagerForLite > 0) {
        const erMor = mor.dagerForLite > 0;
        const { dagerForLite } = erMor ? mor : farMedmor;
        return advarsel('dagerIkkeBruktPerson', {
            navn: erMor ? navnMor : navnFarMedmor,
            dager: getVarighetString(dagerForLite, intl)
        });
    }

    return advarsel('Dine dager');
}

function getFordelingStatusAleneomsorg(forbruk: Forbruk, intl: InjectedIntl): FordelingStatus {
    const { dagerGjenstående } = forbruk;
    const forMangeDagerTotalt = dagerGjenstående < 0;
    const forFåDagerTotalt = dagerGjenstående > 0;

    if (forMangeDagerTotalt) {
        return feil('forMangeDagerTotalt', { dager: getVarighetString(Math.abs(dagerGjenstående), intl) });
    }
    if (forFåDagerTotalt) {
        return advarsel('dagerIkkeBrukt', { dager: getVarighetString(dagerGjenstående, intl) });
    }
    return ok('altOk');
}

export function getFordelingStatus(forbruk: Forbruk, omForeldre: OmForeldre, intl: InjectedIntl): FordelingStatus {
    const { dagerGjenstående, mor, farMedmor } = forbruk;
    if (omForeldre.erDeltOmsorg && omForeldre.farMedmor && farMedmor && forbruk.farMedmor) {
        return getFordelingStatusDeltOmsorg(
            dagerGjenstående,
            mor,
            farMedmor,
            omForeldre.mor.navn,
            omForeldre.farMedmor.navn,
            intl
        );
    }
    return getFordelingStatusAleneomsorg(forbruk, intl);
}
