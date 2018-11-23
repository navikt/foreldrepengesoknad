import { Validator } from 'common/lib/validation/types';
import { UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { erUtsettelseÅrsakTypeGyldigForStartdato } from '../../uttaksplan/regler/erUtsettelseÅrsakGyldigForStartdato';
import { InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export const getUtsettelseÅrsakTypeValidators = (
    årsak: UtsettelseÅrsakType | undefined,
    startdato: Date | undefined,
    intl: InjectedIntl
): Validator[] => {
    if (!årsak || !startdato) {
        return [];
    }
    return [
        {
            test: () => erUtsettelseÅrsakTypeGyldigForStartdato(årsak, startdato),
            failText: getMessage(intl, 'utsettelse.validering.feil.ugyldigÅrsakPgaDatoFørDagensDato', {
                årsak: getMessage(intl, `utsettelsesårsak.${årsak}`).toLowerCase()
            })
        }
    ];
};
