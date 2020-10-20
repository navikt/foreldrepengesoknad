import * as React from 'react';
import { Feil, Tidsperiode, TidsperiodeDatoInputVerdi } from 'common/types';
import { getUtsettelseTidsperiodeValidatorer } from 'app/util/validation/uttaksplan/uttaksplanTidsperiodeValidation';
import TidsperiodeBolk from '../../../../skjema/tidsperiodeBolk/TidsperiodeBolk';
import { mapTidsperiodeDatoInputVerdiToTidsperiode } from '../../../../../util/tidsperiodeUtils';

export interface Props {
    tidsperiodeDatoInput: Partial<TidsperiodeDatoInputVerdi>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    feil?: Feil;
    onChange: (tidsperiode: Partial<TidsperiodeDatoInputVerdi>) => void;
}

const UtsettelseTidsperiodeSpørsmål: React.StatelessComponent<Props> = ({
    onChange,
    familiehendelsesdato,
    tidsperiodeDatoInput,
    feil,
    ugyldigeTidsperioder,
}) => {
    const datoValidatorer = getUtsettelseTidsperiodeValidatorer(
        mapTidsperiodeDatoInputVerdiToTidsperiode(tidsperiodeDatoInput),
        familiehendelsesdato
    );
    return (
        <TidsperiodeBolk
            onChange={(t) => onChange(t)}
            tidsperiode={tidsperiodeDatoInput ? (tidsperiodeDatoInput as Partial<TidsperiodeDatoInputVerdi>) : {}}
            datoAvgrensninger={{
                fra: {
                    minDato: familiehendelsesdato,
                    maksDato: tidsperiodeDatoInput ? tidsperiodeDatoInput.tom?.date : undefined,
                    ugyldigeTidsperioder,
                    helgedagerIkkeTillatt: true,
                },
                til: {
                    minDato: tidsperiodeDatoInput ? tidsperiodeDatoInput.fom?.date : undefined,
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
