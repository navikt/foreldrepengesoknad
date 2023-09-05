import { Label } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    typeArbeid: Arbeidsforholdstype;
}
const SkjemaopplastningTekstFrilansSN: React.FunctionComponent<Props> = ({ typeArbeid }) => {
    const intl = useIntl();
    const labelId =
        typeArbeid === Arbeidsforholdstype.FRILANSER ? 'skjema.vedlegg.label.frilans' : 'skjema.vedlegg.label.næring';
    return (
        <div style={{ marginBottom: '1rem' }}>
            <div>
                <Label>{intlUtils(intl, labelId)}</Label>
            </div>
            <FormattedMessage id={intlUtils(intl, 'skjema.vedlegg.description.frilansSN')} />
        </div>
    );
};

export default SkjemaopplastningTekstFrilansSN;
