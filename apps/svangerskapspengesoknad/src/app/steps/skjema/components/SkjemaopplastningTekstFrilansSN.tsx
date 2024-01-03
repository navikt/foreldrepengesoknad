import { BodyShort, VStack } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

const finnLabel = (intl: IntlShape, typeArbeid: Arbeidsforholdstype) => {
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'skjema.vedlegg.label.frilanser');
    }
    if (typeArbeid === Arbeidsforholdstype.SELVSTENDIG) {
        return intlUtils(intl, 'skjema.vedlegg.label.selvstendig');
    }
    throw Error('Har ingen tekst for kode: ' + typeArbeid);
};

interface Props {
    typeArbeid: Arbeidsforholdstype;
}
const SkjemaopplastningTekstFrilansSN: React.FunctionComponent<Props> = ({ typeArbeid }) => {
    const intl = useIntl();
    const label = finnLabel(intl, typeArbeid);
    return (
        <VStack>
            <BodyShort style={{ fontWeight: 'bold' }}>{label}</BodyShort>
            <FormattedMessage id="skjema.vedlegg.description.frilansSN" />
        </VStack>
    );
};

export default SkjemaopplastningTekstFrilansSN;
