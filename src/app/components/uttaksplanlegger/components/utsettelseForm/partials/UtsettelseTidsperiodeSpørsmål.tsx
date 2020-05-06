import * as React from 'react';
import { Tidsperiode, Feil } from 'common/types';
import TidsperiodeBolk from '../../../../skjema/tidsperiodeBolk/TidsperiodeBolk';
import { getUtsettelseTidsperiodeValidatorer } from 'app/util/validation/uttaksplan/uttaksplanTidsperiodeValidation';

export interface Props {
    tidsperiode: Partial<Tidsperiode>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    feil?: Feil;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
}

const UtsettelseTidsperiodeSpørsmål: React.StatelessComponent<Props> = ({
    onChange,
    familiehendelsesdato,
    tidsperiode,
    feil,
    ugyldigeTidsperioder,
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
                    helgedagerIkkeTillatt: true,
                },
                til: {
                    minDato: tidsperiode ? (tidsperiode.fom as Date) : undefined,
                    ugyldigeTidsperioder,
                    helgedagerIkkeTillatt: true,
                },
            }}
            datoValidatorer={datoValidatorer}
            feil={feil}
            ukerOgDagerVelgerEnabled={true}
        />
    );
};

export default UtsettelseTidsperiodeSpørsmål;
