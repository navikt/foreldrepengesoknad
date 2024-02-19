import { intlUtils } from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import { isRequired, isValidDate } from '@navikt/fp-validation';
import { FormattedMessage, useIntl } from 'react-intl';

const OppstartDatoInput = () => {
    const intl = useIntl();
    return (
        <Datepicker
            name="oppstartDato"
            label={<FormattedMessage id="fordeling.oppstartDato.spørsmål" />}
            description={intlUtils(intl, 'fordeling.oppstartDato.description')}
            // minDate={dayjs().subtract(6, 'month').toDate()} //TODO:  Min, max og validering.
            // maxDate={dayjs().toDate()}
            validate={[
                isRequired(intlUtils(intl, 'fordeling.oppstartDato.måOppgis')),
                isValidDate(intlUtils(intl, 'fordeling.oppstartDato.gyldig')),
            ]}
        />
    );
};

export default OppstartDatoInput;
