import * as React from 'react';
import { Tidsperiode } from 'common/types';
import TidsperiodeBolk from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import {
    Periode,
    isForeldrepengerFørFødselUttaksperiode,
    ForeldrepengerFørFødselUttaksperiode
} from '../../../types/uttaksplan/periodetyper';
import { getDatoavgrensningerForStønadskonto } from '../../../util/uttaksplan/uttaksperiodeUtils';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { UttaksFormPeriodeType } from '../uttakFormConfig';

export interface Props {
    periode: UttaksFormPeriodeType;
    tidsperiode: Partial<Tidsperiode>;
    familiehendelsesdato: Date;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
}

const getTidsperiodeDisabledProps = (
    periode: UttaksFormPeriodeType
): { startdatoDisabled?: boolean; sluttdatoDisabled?: boolean } | undefined => {
    if (isForeldrepengerFørFødselUttaksperiode(periode as Periode)) {
        const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;
        return {
            startdatoDisabled: skalIkkeHaUttak,
            sluttdatoDisabled: skalIkkeHaUttak
        };
    }
    return undefined;
};

const UttakTidsperiodeSpørsmål: React.StatelessComponent<Props & InjectedIntlProps> = ({
    onChange,
    periode,
    familiehendelsesdato,
    tidsperiode,
    intl
}) => {
    const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;

    return (
        <TidsperiodeBolk
            onChange={(t: Partial<Tidsperiode>) => onChange(t)}
            tidsperiode={tidsperiode ? (tidsperiode as Partial<Tidsperiode>) : {}}
            datoAvgrensninger={
                periode.konto
                    ? getDatoavgrensningerForStønadskonto(periode.konto, familiehendelsesdato, getPermisjonsregler())
                    : undefined
            }
            datoValidatorer={{
                fra: [
                    {
                        test: () => (skalIkkeHaUttak === true ? true : tidsperiode.fom !== undefined),
                        failText: getMessage(intl, 'påkrevd')
                    }
                ],
                til: [
                    {
                        test: () => (skalIkkeHaUttak === true ? true : tidsperiode.tom !== undefined),
                        failText: getMessage(intl, 'påkrevd')
                    }
                ]
            }}
            {...getTidsperiodeDisabledProps(periode)}
            visVarighet={true}
        />
    );
};

export default injectIntl(UttakTidsperiodeSpørsmål);
