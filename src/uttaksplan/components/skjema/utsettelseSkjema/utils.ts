import {
    UtsettelseÅrsakType,
    Forelder,
    Tidsperiode,
    Utsettelsesperiode,
    UttaksplanSøker
} from 'uttaksplan/types';
import { Tidsperioden, Uttaksdagen } from 'uttaksplan/utils';
import { getAntallFeriedagerForForelder } from 'uttaksplan/utils/permisjonUtils';
import { isAfter, isBefore } from 'date-fns';

import { State as SkjemaState, Props as SkjemaProps } from './UtsettelseSkjema';
import { erFridag } from 'common/util/fridagerUtils';
import { Valideringsfeil } from 'uttaksplan/components/skjema/utsettelseSkjema/types';
import { validerDato } from 'uttaksplan/utils/validerDatoUtils';
import { Uttaksgrunnlag } from 'uttaksplan/utils/uttak/uttaksgrunnlag';

export function getDefaultState(
    søker: UttaksplanSøker,
    utsettelse?: Utsettelsesperiode
): SkjemaState {
    return utsettelse
        ? {
              valideringsfeil: new Map(),
              årsak: utsettelse.årsak,
              forelder:
                  utsettelse.forelder || søker.erAleneOmOmsorg
                      ? 'forelder1'
                      : undefined,
              startdato: utsettelse.tidsperiode
                  ? utsettelse.tidsperiode.fom
                  : undefined,
              sluttdato: utsettelse.tidsperiode
                  ? utsettelse.tidsperiode.tom
                  : undefined
          }
        : {
              valideringsfeil: new Map(),
              forelder: søker.erAleneOmOmsorg ? 'forelder1' : undefined
          };
}

export function validerUtsettelseskjema(
    state: SkjemaState,
    props: SkjemaProps,
    uttaksgrunnlag: Uttaksgrunnlag
): Valideringsfeil {
    const {
        familiehendelsedato,
        tidsperiode,
        permisjonsregler,
        registrerteUtsettelser,
        utsettelse,
        intl
    } = props;
    const andreUtsettelser = utsettelse
        ? registrerteUtsettelser.filter((u) => u.id !== utsettelse.id)
        : registrerteUtsettelser;
    const { årsak, forelder, startdato, sluttdato } = state;
    const valideringsfeil: Valideringsfeil = new Map();
    const ugyldigeTidsrom = getUgyldigeTidsrom(andreUtsettelser, utsettelse);

    if (!startdato) {
        valideringsfeil.set('startdato', {
            feilmelding: intl.formatMessage({
                id: 'uttaksplan.utsettelseskjema.feil.startdatoMangler'
            })
        });
    } else {
        const datoValideringsfeil = validerDato(
            startdato,
            tidsperiode,
            ugyldigeTidsrom,
            familiehendelsedato
        );
        if (datoValideringsfeil) {
            valideringsfeil.set('startdato', {
                feilmelding: intl.formatMessage(
                    {
                        id: `uttaksplan.uttaksplan.datovalidering.${datoValideringsfeil}`
                    },
                    {
                        datonavn: intl.formatMessage({
                            id: 'uttaksplan.uttaksplan.startdato'
                        })
                    }
                )
            });
        }
    }
    if (!sluttdato) {
        valideringsfeil.set('sluttdato', {
            feilmelding: intl.formatMessage({
                id: 'uttaksplan.utsettelseskjema.feil.sluttdatoMangler'
            })
        });
    } else {
        const datoValideringsfeil = validerDato(
            sluttdato,
            {
                ...tidsperiode,
                tom: getTilTidsromSluttdato(
                    startdato || tidsperiode.fom,
                    andreUtsettelser,
                    uttaksgrunnlag
                )
            },
            ugyldigeTidsrom
        );
        if (datoValideringsfeil) {
            valideringsfeil.set('sluttdato', {
                feilmelding: intl.formatMessage(
                    {
                        id: `uttaksplan.uttaksplan.datovalidering.${datoValideringsfeil}`
                    },
                    {
                        datonavn: intl.formatMessage({
                            id: 'uttaksplan.uttaksplan.sluttdato'
                        })
                    }
                )
            });
        } else if (startdato && isBefore(sluttdato, startdato)) {
            valideringsfeil.set('sluttdato', {
                feilmelding: intl.formatMessage({
                    id:
                        'uttaksplan.utsettelseskjema.feil.sluttdatoEtterStartdato'
                })
            });
        }
    }
    if (
        årsak === UtsettelseÅrsakType.Ferie &&
        getAntallFeriedager(
            årsak,
            forelder,
            startdato,
            sluttdato,
            registrerteUtsettelser,
            utsettelse
        ) > permisjonsregler.maksFeriedagerMedOverføring
    ) {
        valideringsfeil.set('feriedager', {
            feilmelding: intl.formatMessage({
                id: 'uttaksplan.utsettelseskjema.feil.ugyldigAntallFeriedager'
            })
        });
    }
    let helligdagFeilErRegistrert = false;
    if (
        årsak === UtsettelseÅrsakType.Ferie &&
        startdato &&
        erFridag(startdato)
    ) {
        helligdagFeilErRegistrert = true;
        valideringsfeil.set('startdato', {
            feilmelding: intl.formatMessage({
                id: 'uttaksplan.utsettelseskjema.feil.startdatoErHelligdag'
            })
        });
    }

    if (
        årsak === UtsettelseÅrsakType.Ferie &&
        sluttdato &&
        erFridag(sluttdato)
    ) {
        helligdagFeilErRegistrert = true;
        valideringsfeil.set('sluttdato', {
            feilmelding: intl.formatMessage({
                id: 'uttaksplan.utsettelseskjema.feil.sluttdatoErHelligdag'
            })
        });
    }
    if (
        !helligdagFeilErRegistrert &&
        årsak === UtsettelseÅrsakType.Ferie &&
        startdato &&
        sluttdato &&
        Tidsperioden({
            fom: startdato,
            tom: sluttdato
        }).getAntallFridager() > 0
    ) {
        valideringsfeil.set('tidsperiode', {
            feilmelding: intl.formatMessage({
                id: 'uttaksplan.utsettelseskjema.feil.helligdagIPeriode'
            })
        });
    }
    return valideringsfeil;
}

/**
 * Finner tidsrom som ikke kan velges gitt registrerte
 * utsettelser og aktiv utsettelse
 * @param registrerteUtsettelser
 * @param utsettelse
 */
export function getUgyldigeTidsrom(
    registrerteUtsettelser: Utsettelsesperiode[],
    utsettelse?: Utsettelsesperiode
): Tidsperiode[] | undefined {
    const ugyldigeTidsrom =
        registrerteUtsettelser &&
        registrerteUtsettelser
            .filter((u) => !utsettelse || utsettelse.id !== u.id)
            .map((u) => ({
                fom: u.tidsperiode.fom,
                tom: u.tidsperiode.tom
            }));
    return ugyldigeTidsrom;
}

/**
 * Finner siste gyldige sluttdato for en utsettelse
 * @param familiehendelsedato
 * @param permisjonsregler
 * @param tilTidsromFom
 * @param registrerteUtsettelser
 */
export function getTilTidsromSluttdato(
    tilTidsromFom: Date,
    registrerteUtsettelser: Utsettelsesperiode[],
    uttaksgrunnlag: Uttaksgrunnlag
) {
    if (registrerteUtsettelser.length > 0) {
        const pafolgendeUtsettelser = registrerteUtsettelser.filter((u) =>
            isAfter(u.tidsperiode.fom, tilTidsromFom)
        );
        if (pafolgendeUtsettelser.length > 0) {
            return Uttaksdagen(
                pafolgendeUtsettelser[0].tidsperiode.fom
            ).forrige();
        }
    }
    return uttaksgrunnlag.datoer.sisteMuligeUttaksdag;
}

/**
 * Henter ut antall feriedager som er registrert for en forelder, inkludert
 * ny utsettelse
 * @param årsak
 * @param forelder
 * @param fom
 * @param tom
 * @param registrerteUtsettelser
 * @param utsettelse
 */
export function getAntallFeriedager(
    årsak: UtsettelseÅrsakType | undefined,
    forelder: Forelder | undefined,
    fom: Date | undefined,
    tom: Date | undefined,
    registrerteUtsettelser: Utsettelsesperiode[],
    utsettelse: Utsettelsesperiode | undefined
) {
    let registrerteFeriedager = 0;
    let nyeFeriedager = 0;
    let feriedagerDenneUtsettelsen = 0;

    if (forelder && årsak === UtsettelseÅrsakType.Ferie) {
        registrerteFeriedager = getAntallFeriedagerForForelder(
            registrerteUtsettelser,
            forelder
        );
    }

    let fridager = 0;
    if (fom && tom) {
        const tidsperiode: Tidsperiode = {
            fom,
            tom
        };
        nyeFeriedager = Tidsperioden(tidsperiode).getAntallUttaksdager();
        fridager = Tidsperioden(tidsperiode).getAntallFridager();
    }

    if (utsettelse) {
        feriedagerDenneUtsettelsen = Tidsperioden(
            utsettelse.tidsperiode
        ).getAntallUttaksdager();
    }

    return (
        registrerteFeriedager +
        nyeFeriedager -
        feriedagerDenneUtsettelsen -
        fridager
    );
}
