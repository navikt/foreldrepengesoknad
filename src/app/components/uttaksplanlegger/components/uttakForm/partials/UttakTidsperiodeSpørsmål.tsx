import * as React from 'react';
import moment from 'moment';
import { Tidsperiode, Feil } from 'common/types';
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

export interface Props {
    periode: UttakFormPeriodeType;
    tidsperiode: Partial<Tidsperiode>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[];
    feil?: Feil;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
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

const UttakTidsperiodeSpørsmål: React.StatelessComponent<Props> = ({
    onChange,
    periode,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
    feil,
    intl,
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
        tidsperiode,
        ugyldigeTidsperioder
    );

    const datoValidatorer = getUttakTidsperiodeValidatorer(skalIkkeHaUttak, tidsperiode, familiehendelsesdato);
    const initialMonth = erForeldrepengerFørFødsel ? familiehendelsesdato : undefined;

    return (
        <TidsperiodeBolk
            onChange={(t: Partial<Tidsperiode>) => onChange(resetTidsperiodeTomIfBeforeFom(t))}
            tidsperiode={tidsperiode ? (tidsperiode as Partial<Tidsperiode>) : {}}
            datoAvgrensninger={datoAvgrensninger}
            datoValidatorer={datoValidatorer}
            kanVelgeUgyldigDato={erUttakFørForeldrepengerFørFødsel}
            feil={feil}
            defaultMånedFom={initialMonth}
            defaultMånedTom={initialMonth}
            ukerOgDagerVelgerEnabled={true}
            {...getTidsperiodeDisabledProps(periode, familiehendelsesdato)}
        />
    );
};

export default injectIntl(UttakTidsperiodeSpørsmål);
