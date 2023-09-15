import { Label } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    typeArbeid: Arbeidsforholdstype;
}
const SkjemaopplastningTekstFrilansSN: React.FunctionComponent<Props> = ({ typeArbeid }) => {
    const intl = useIntl();
    const labelId = `skjema.vedlegg.label.${typeArbeid}`;
    return (
        <div style={{ marginBottom: '1rem' }}>
            <div>
                <Label>{intlUtils(intl, labelId)}</Label>
            </div>
            <FormattedMessage id="skjema.vedlegg.description.frilansSN" />
        </div>
    );
};

export default SkjemaopplastningTekstFrilansSN;
