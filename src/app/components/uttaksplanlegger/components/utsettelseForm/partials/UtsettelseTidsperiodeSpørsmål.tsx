import * as React from 'react';
import { Tidsperiode } from 'common/types';
import TidsperiodeBolk from '../../../../skjema/tidsperiodeBolk/TidsperiodeBolk';
import { getUtsettelseTidsperiodeValidatorer } from 'app/util/validation/uttaksplan/uttaksplanTidsperiodeValidation';
import { SkjemaelementFeil } from 'common/lib/validation/types';

export interface Props {
    tidsperiode: Partial<Tidsperiode>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    feil?: SkjemaelementFeil;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
}

const UtsettelseTidsperiodeSpørsmål: React.StatelessComponent<Props> = ({
    onChange,
    familiehendelsesdato,
    tidsperiode,
    feil,
    ugyldigeTidsperioder
}) => {
    const datoValidatorer = getUtsettelseTidsperiodeValidatorer(tidsperiode, familiehendelsesdato);
    return (
        <TidsperiodeBolk
            onChange={(t: Partial<Tidsperiode>) => onChange(t)}
            tidsperiode={tidsperiode ? (tidsperiode as Partial<Tidsperiode>) : {}}
            datoAvgrensninger={{
                fra: {
                    minDato: familiehendelsesdato,
                    maksDato: tidsperiode ? (tidsperiode.tom as Date) : undefined,
                    ugyldigeTidsperioder,
                    helgedagerIkkeTillatt: true
                },
                til: {
                    minDato: tidsperiode ? (tidsperiode.fom as Date) : undefined,
                    ugyldigeTidsperioder,
                    helgedagerIkkeTillatt: true
                }
            }}
            datoValidatorer={datoValidatorer}
            feil={feil}
            visVarighet={true}
        />
    );
};

export default UtsettelseTidsperiodeSpørsmål;
