import * as React from 'react';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Feil, Tidsperiode, TidsperiodeString } from 'common/types';
import { getUtsettelseTidsperiodeValidatorer } from 'app/util/validation/uttaksplan/uttaksplanTidsperiodeValidation';
import { mapTidsperiodeStringToTidsperiode } from '../../../../../util/tidsperiodeUtils';
import TidsperiodeBolk from '../../../../skjema/tidsperiodeBolk/TidsperiodeBolk';

export interface Props {
    tidsperiodeDatoInput: Partial<TidsperiodeString>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    feil?: Feil;
    onChange: (tidsperiode: Partial<TidsperiodeString>) => void;
}

const UtsettelseTidsperiodeSpørsmål: React.FunctionComponent<Props> = ({
    onChange,
    familiehendelsesdato,
    tidsperiodeDatoInput,
    feil,
    ugyldigeTidsperioder,
}) => {
    const datoValidatorer = getUtsettelseTidsperiodeValidatorer(
        mapTidsperiodeStringToTidsperiode(tidsperiodeDatoInput),
        familiehendelsesdato
    );
    const datoAvgrensninger = {
        fra: {
            minDato: familiehendelsesdato,
            maksDato: tidsperiodeDatoInput ? ISOStringToDate(tidsperiodeDatoInput.tom) : undefined,
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: tidsperiodeDatoInput ? ISOStringToDate(tidsperiodeDatoInput.fom) : undefined,
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
    };

    return (
        <TidsperiodeBolk
            onChange={(t) => onChange(t)}
            tidsperiode={tidsperiodeDatoInput ? (tidsperiodeDatoInput as Partial<TidsperiodeString>) : {}}
            datoAvgrensninger={datoAvgrensninger}
            datoValidatorer={datoValidatorer}
            feil={feil}
            ukerOgDagerVelgerEnabled={true}
        />
    );
};

export default UtsettelseTidsperiodeSpørsmål;
