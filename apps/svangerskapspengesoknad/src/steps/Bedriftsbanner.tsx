import { Buildings3Icon } from '@navikt/aksel-icons';
import { IntlShape, useIntl } from 'react-intl';
import { Arbeidsforholdstype } from 'types/Tilrettelegging';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import styles from './bedriftsbanner.module.css';

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

export const Bedriftsbanner = ({ arbeidsforholdType, arbeidsforholdNavn }: Props) => {
    const intl = useIntl();
    const navn = getNavn(arbeidsforholdType, intl, arbeidsforholdNavn);

    const detailTekst =
        arbeidsforholdType === Arbeidsforholdstype.FRILANSER
            ? intl.formatMessage({ id: 'bedriftsbanner.detail.frilans' })
            : intl.formatMessage({ id: 'bedriftsbanner.detail' });
    return (
        <div className={styles.bedriftsbanner}>
            <HStack gap="space-20" align="center">
                <Buildings3Icon aria-hidden={true} height="24px" width="24px" className={styles.ikon} />
                <VStack gap="space-4">
                    <BodyShort size="small" className={styles.bold}>
                        {detailTekst}
                    </BodyShort>
                    <BodyShort size="medium" className={styles.bold}>
                        {navn}
                    </BodyShort>
                </VStack>
            </HStack>
        </div>
    );
};
