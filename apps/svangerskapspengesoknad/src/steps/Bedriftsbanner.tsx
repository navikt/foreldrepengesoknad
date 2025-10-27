import { Buildings3Icon } from '@navikt/aksel-icons';
import { IntlShape, useIntl } from 'react-intl';
import { Arbeidsforholdstype } from 'types/Tilrettelegging';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

interface Props {
    arbeidsforholdType: Arbeidsforholdstype;
    arbeidsforholdNavn?: string;
}

const getNavn = (type: Arbeidsforholdstype, intl: IntlShape, navn?: string) => {
    if (type === 'frilanser') {
        return intl.formatMessage({ id: 'bedriftsbanner.tittel.frilansarbeid' });
    }
    if (type === 'selvstendig' && (!navn || navn.trim().length === 0)) {
        return intl.formatMessage({ id: 'egenNæring' });
    }
    return capitalizeFirstLetterInEveryWordOnly(navn);
};

export const Bedriftsbanner = ({ arbeidsforholdType, arbeidsforholdNavn }: Props) => {
    const intl = useIntl();
    const navn = getNavn(arbeidsforholdType, intl, arbeidsforholdNavn);

    const detailTekst =
        arbeidsforholdType === 'frilanser'
            ? intl.formatMessage({ id: 'bedriftsbanner.detail.frilans' })
            : intl.formatMessage({ id: 'bedriftsbanner.detail' });
    return (
        <div className="bg-ax-accent-200 border-ax-accent-400 rounded-[2px] border-2 p-4">
            <HStack gap="space-20" align="center">
                <Buildings3Icon aria-hidden={true} height="24px" width="24px" className="text-ax-accent-600" />
                <VStack gap="space-4">
                    <BodyShort size="small" className="font-bold">
                        {detailTekst}
                    </BodyShort>
                    <BodyShort size="medium" className="font-bold">
                        {navn}
                    </BodyShort>
                </VStack>
            </HStack>
        </div>
    );
};
