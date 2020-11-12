import * as React from 'react';
import moment from 'moment';
import { Tidsperiode, Feil, TidsperiodeString } from 'common/types';
import TidsperiodeBolk from '../../../../skjema/tidsperiodeBolk/TidsperiodeBolk';
import { injectIntl, IntlShape } from 'react-intl';
import {
    Periode,
    isForeldrepengerFørFødselUttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode,
} from '../../../../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from '../UttakForm';
import { getUttakTidsperiodeValidatorer } from '../../../../../util/validation/uttaksplan/uttaksplanTidsperiodeValidation';
import {
    Tidsperioden,
    isValidTidsperiode,
    resetTidsperiodeTomIfBeforeFom,
} from '../../../../../util/uttaksplan/Tidsperioden';
import { getDatoavgrensningerForStønadskonto } from 'app/util/uttaksplan/uttaksperiodeUtils';
import {
    mapTidsperiodeStringToTidsperiode,
    mapTidsperiodeToTidsperiodeString,
} from '../../../../../util/tidsperiodeUtils';

export interface Props {
    periode: UttakFormPeriodeType;
    tidsperiode: Partial<TidsperiodeString>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[];
    feil?: Feil;
    onChange: (tidsperiode: Partial<TidsperiodeString>) => void;
    intl: IntlShape;
}

const getTidsperiodeDisabledProps = (
    periode: UttakFormPeriodeType,
    familiehendelsesdato: Date
): { startdatoDisabled?: boolean; sluttdatoDisabled?: boolean } | undefined => {
    if (isForeldrepengerFørFødselUttaksperiode(periode as Periode)) {
        const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;
        return {
            startdatoDisabled: skalIkkeHaUttak,
            sluttdatoDisabled: true,
        };
    } else if (
        periode.id &&
        isValidTidsperiode(periode.tidsperiode) &&
        Tidsperioden(periode.tidsperiode as Tidsperiode).erFørDato(familiehendelsesdato)
    ) {
        return {
            sluttdatoDisabled: true,
        };
    }
    return undefined;
};

const UttakTidsperiodeSpørsmål: React.FunctionComponent<Props> = ({
    onChange,
    periode,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
    feil,
}) => {
    const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;
    const erForeldrepengerFørFødsel = isForeldrepengerFørFødselUttaksperiode(periode);

    const erUttakFørForeldrepengerFørFødsel =
        !erForeldrepengerFørFødsel &&
        isValidTidsperiode(tidsperiode) &&
        moment(tidsperiode.fom).isBefore(familiehendelsesdato);

    const datoAvgrensninger = getDatoavgrensningerForStønadskonto(
        isUttaksperiode(periode) ? periode.konto : undefined,
        familiehendelsesdato,
        mapTidsperiodeStringToTidsperiode(tidsperiode),
        ugyldigeTidsperioder
    );

    const datoValidatorer = getUttakTidsperiodeValidatorer(
        skalIkkeHaUttak,
        mapTidsperiodeStringToTidsperiode(tidsperiode),
        familiehendelsesdato
    );
    const initialMonth = erForeldrepengerFørFødsel ? familiehendelsesdato : undefined;

    return (
        <TidsperiodeBolk
            onChange={(t) => {
                onChange(
                    mapTidsperiodeToTidsperiodeString(
                        resetTidsperiodeTomIfBeforeFom(mapTidsperiodeStringToTidsperiode(t))
                    )
                );
            }}
            tidsperiode={tidsperiode ? tidsperiode : {}}
            datoAvgrensninger={datoAvgrensninger}
            datoValidatorer={datoValidatorer}
            allowInvalidDateSelection={erUttakFørForeldrepengerFørFødsel}
            feil={feil}
            defaultMånedFom={initialMonth}
            defaultMånedTom={initialMonth}
            ukerOgDagerVelgerEnabled={true}
            {...getTidsperiodeDisabledProps(periode, familiehendelsesdato)}
        />
    );
};

export default injectIntl(UttakTidsperiodeSpørsmål);
