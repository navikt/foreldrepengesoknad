import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { TypedFormComponents } from '@navikt/sif-common-formik/lib';
import { intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';

interface Props {
    FormKomponent: TypedFormComponents<any, any, any>;
    dekningsgradFeltNavn: string;
    tilgjengeligeStønadskontoer: {
        [Dekningsgrad.ÅTTI_PROSENT]: TilgjengeligStønadskonto[];
        [Dekningsgrad.HUNDRE_PROSENT]: TilgjengeligStønadskonto[];
    };
    erDeltUttak: boolean;
}

const DekningsgradSpørsmål: FunctionComponent<Props> = ({
    FormKomponent,
    dekningsgradFeltNavn,
    tilgjengeligeStønadskontoer,
    erDeltUttak,
}) => {
    const intl = useIntl();
    const spørsmålTekst = erDeltUttak
        ? 'uttaksplaninfo.dekningsgrad.label.deltUttak'
        : 'uttaksplaninfo.dekningsgrad.label.ikkeDeltUttak';
    return (
        <FormKomponent.RadioPanelGroup
            name={dekningsgradFeltNavn}
            radios={[
                {
                    label: intlUtils(intl, 'uttaksplaninfo.49Uker', {
                        antallUker: getAntallUker(tilgjengeligeStønadskontoer[Dekningsgrad.HUNDRE_PROSENT]),
                    }),
                    value: Dekningsgrad.HUNDRE_PROSENT,
                },
                {
                    label: intlUtils(intl, 'uttaksplaninfo.59Uker', {
                        antallUker: getAntallUker(tilgjengeligeStønadskontoer[Dekningsgrad.ÅTTI_PROSENT]),
                    }),
                    value: Dekningsgrad.ÅTTI_PROSENT,
                },
            ]}
            legend={intlUtils(intl, spørsmålTekst)}
            description={
                <UtvidetInformasjon apneLabel="Les mer om lengden på foreldrepengeperioden">
                    Den totale utbetalingen blir høyere hvis du velger 100 prosent. Valget gjelder dere begge, og kan
                    ikke endres senere.
                </UtvidetInformasjon>
            }
            useTwoColumns={true}
        />
    );
};

export default DekningsgradSpørsmål;
