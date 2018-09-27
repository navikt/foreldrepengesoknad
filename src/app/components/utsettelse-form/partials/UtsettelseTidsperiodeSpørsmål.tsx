import * as React from 'react';
import { Tidsperiode } from 'common/types';
import TidsperiodeBolk from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';

export interface Props {
    tidsperiode: Partial<Tidsperiode>;
    familiehendelsesdato: Date;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
}

const UtsettelseTidsperiodeSpørsmål: React.StatelessComponent<Props> = ({
    onChange,
    familiehendelsesdato,
    tidsperiode
}) => (
    <TidsperiodeBolk
        onChange={(t: Partial<Tidsperiode>) => onChange(t)}
        tidsperiode={tidsperiode ? (tidsperiode as Partial<Tidsperiode>) : {}}
        datoAvgrensninger={{
            fra: {
                minDato: familiehendelsesdato,
                maksDato: tidsperiode ? (tidsperiode.tom as Date) : undefined
            },
            til: {
                minDato: tidsperiode ? (tidsperiode.fom as Date) : undefined
            }
        }}
        visVarighet={true}
    />
);

export default UtsettelseTidsperiodeSpørsmål;
