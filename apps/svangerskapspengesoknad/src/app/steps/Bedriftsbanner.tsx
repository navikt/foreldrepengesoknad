import { Buldings3Icon } from '@navikt/aksel-icons';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { ArbeidsforholdForTilrettelegging, Arbeidsforholdstype } from 'app/types/Tilrettelegging';

import './bedriftsbanner.css';

interface Props {
    arbeid: ArbeidsforholdForTilrettelegging;
}

const getNavn = (type: Arbeidsforholdstype, navn: string, intl: IntlShape) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intl.formatMessage({ id: 'bedriftsbanner.tittel.frilansarbeid' });
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG && navn.trim().length === 0) {
        return intl.formatMessage({ id: 'egenNæring' });
    }
    return navn;
};

const Bedriftsbanner: React.FunctionComponent<Props> = ({ arbeid }) => {
    const bem = bemUtils('bedriftsbanner');
    const intl = useIntl();
    const navn = getNavn(arbeid.type, arbeid.navn, intl);

    const detailTekst =
        arbeid.type !== Arbeidsforholdstype.FRILANSER
            ? intl.formatMessage({ id: 'bedriftsbanner.detail' })
            : intl.formatMessage({ id: 'bedriftsbanner.detail.frilans' });
    return (
        <div className={bem.block}>
            <HStack gap="5">
                <div className={bem.element('ikon')}>
                    <Buldings3Icon aria-hidden={true} height={'24px'} width={'24px'} />
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
