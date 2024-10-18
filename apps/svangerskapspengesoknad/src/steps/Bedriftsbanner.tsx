import { Buildings3Icon } from '@navikt/aksel-icons';
import { IntlShape, useIntl } from 'react-intl';
import { Arbeidsforholdstype } from 'types/Tilrettelegging';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { bemUtils, capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import './bedriftsbanner.css';

interface Props {
    arbeidsforholdType: Arbeidsforholdstype;
    arbeidsforholdNavn?: string;
}

const getNavn = (type: Arbeidsforholdstype, intl: IntlShape, navn?: string) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intl.formatMessage({ id: 'bedriftsbanner.tittel.frilansarbeid' });
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG && (!navn || navn.trim().length === 0)) {
        return intl.formatMessage({ id: 'egenNæring' });
    }
    return capitalizeFirstLetterInEveryWordOnly(navn);
};

const Bedriftsbanner: React.FunctionComponent<Props> = ({ arbeidsforholdType, arbeidsforholdNavn }) => {
    const bem = bemUtils('bedriftsbanner');
    const intl = useIntl();
    const navn = getNavn(arbeidsforholdType, intl, arbeidsforholdNavn);

    const detailTekst =
        arbeidsforholdType !== Arbeidsforholdstype.FRILANSER
            ? intl.formatMessage({ id: 'bedriftsbanner.detail' })
            : intl.formatMessage({ id: 'bedriftsbanner.detail.frilans' });
    return (
        <div className={bem.block}>
            <HStack gap="5">
                <div className={bem.element('ikon')}>
                    <Buildings3Icon aria-hidden={true} height={'24px'} width={'24px'} />
                </div>
                <div className={bem.element('tekst')}>
                    <VStack gap="1">
                        <BodyShort size="small" className={bem.modifier('bold')}>
                            {detailTekst}
                        </BodyShort>
                        <BodyShort size="medium" className={bem.modifier('bold')}>
                            {navn}
                        </BodyShort>
                    </VStack>
                </div>
            </HStack>
        </div>
    );
};

export default Bedriftsbanner;
