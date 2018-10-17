import * as React from 'react';
import { Tidsperiode } from 'common/types';
import TidsperiodeBolk from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
    Periode,
    isForeldrepengerFørFødselUttaksperiode,
    ForeldrepengerFørFødselUttaksperiode
} from '../../../types/uttaksplan/periodetyper';
import { getDatoavgrensningerForStønadskonto } from '../../../util/uttaksplan/uttaksperiodeUtils';
import { UttakFormPeriodeType } from '../UttakForm';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';
import { getUttakTidsperiodeValidatorer } from '../../../util/validation/uttaksplan/uttakTidsperiodeValidation';
import { getVarighetString } from 'common/util/intlUtils';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';

export interface Props {
    periode: UttakFormPeriodeType;
    tidsperiode: Partial<Tidsperiode>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[];
    feil?: Feil;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
}

const getTidsperiodeDisabledProps = (
    periode: UttakFormPeriodeType,
    familiehendelsesdato: Date
): { startdatoDisabled?: boolean; sluttdatoDisabled?: boolean } | undefined => {
    if (isForeldrepengerFørFødselUttaksperiode(periode as Periode)) {
        const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;
        return {
            startdatoDisabled: skalIkkeHaUttak,
            sluttdatoDisabled: true
        };
    } else if (
        periode.id &&
        periode.tidsperiode &&
        Tidsperioden(periode.tidsperiode as Tidsperiode).erFørDato(familiehendelsesdato)
    ) {
        return {
            sluttdatoDisabled: true
        };
    }
    return undefined;
};

const UttakTidsperiodeSpørsmål: React.StatelessComponent<Props & InjectedIntlProps> = ({
    onChange,
    periode,
    familiehendelsesdato,
    tidsperiode,
    ugyldigeTidsperioder,
    feil,
    intl
}) => {
    const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;
    const initialMonth = isForeldrepengerFørFødselUttaksperiode(periode) ? familiehendelsesdato : undefined;
    return (
        <TidsperiodeBolk
            onChange={(t: Partial<Tidsperiode>) => onChange(t)}
            tidsperiode={tidsperiode ? (tidsperiode as Partial<Tidsperiode>) : {}}
            datoAvgrensninger={
                periode.konto
                    ? getDatoavgrensningerForStønadskonto(
                          periode.konto,
                          familiehendelsesdato,
                          tidsperiode as Tidsperiode,
                          ugyldigeTidsperioder
                      )
                    : {
                          fra: {
                              minDato: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
                              ugyldigeTidsperioder,
                              helgedagerIkkeTillatt: true
                          },
                          til: {
                              minDato:
                                  tidsperiode !== undefined && tidsperiode.fom
                                      ? (tidsperiode.fom as Date)
                                      : Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
                              ugyldigeTidsperioder,
                              helgedagerIkkeTillatt: true
                          }
                      }
            }
            datoValidatorer={getUttakTidsperiodeValidatorer(skalIkkeHaUttak, tidsperiode)}
            visVarighet={true}
            varighetRenderer={(dager) =>
                intl.formatMessage({ id: 'uttaksplan.varighet.uttak' }, { varighet: getVarighetString(dager, intl) })
            }
            feil={feil}
            defaultMånedFom={initialMonth}
            defaultMånedTom={initialMonth}
            {...getTidsperiodeDisabledProps(periode, familiehendelsesdato)}
        />
    );
};

export default injectIntl(UttakTidsperiodeSpørsmål);
