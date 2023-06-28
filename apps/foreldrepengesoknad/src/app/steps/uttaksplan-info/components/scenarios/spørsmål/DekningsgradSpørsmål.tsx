import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, intlUtils } from '@navikt/fp-common';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { TypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ReadMore } from '@navikt/ds-react';

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
        <Block padBottom="l">
            <FormKomponent.RadioGroup
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
            />
            <ReadMore header="Les mer om lengden på foreldrepengeperioden">
                <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad80" />
            </ReadMore>
        </Block>
    );
};

export default DekningsgradSpørsmål;
