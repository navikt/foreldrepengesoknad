import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import PlussMinusTeller from 'app/components/pluss-minus-teller/PlussMinusTeller';
import { Element } from 'nav-frontend-typografi';

type Props = UttaksplanSkjemaspørsmålProps;

const AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål: React.StatelessComponent<Props> = ({ visible }) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <>
                <Element>
                    <FormattedMessage id="spørsmål.farFellesperiode.label" />
                </Element>
                <PlussMinusTeller
                    name="antallDagerFellesperiodeFarMedmor"
                    label="spørsmål.farFellesperiode.dager.label"
                />
                <PlussMinusTeller
                    name="antallUkerFellesperiodeFarMedmor"
                    label="spørsmål.farFellesperiode.dager.label"
                />
                <PlussMinusTeller
                    name="antallDagerFellesperiodeFarMedmor"
                    label="spørsmål.farFellesperiode.dager.label"
                />
            </>
        )}
    />
);

export default AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål;
