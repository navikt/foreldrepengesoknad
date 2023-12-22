import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import { ArbeidsforholdForTilrettelegging, Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { useIntl } from 'react-intl';
import './bedriftsbanner.css';
import { Buldings3Icon } from '@navikt/aksel-icons';

interface Props {
    arbeid: ArbeidsforholdForTilrettelegging;
}

const Bedriftsbanner: React.FunctionComponent<Props> = ({ arbeid }) => {
    const bem = bemUtils('bedriftsbanner');
    const intl = useIntl();
    const navn =
        arbeid.type !== Arbeidsforholdstype.FRILANSER
            ? arbeid.navn
            : intlUtils(intl, 'bedriftsbanner.tittel.frilansarbeid');
    const detailTekst =
        arbeid.type !== Arbeidsforholdstype.FRILANSER
            ? intlUtils(intl, 'bedriftsbanner.detail')
            : intlUtils(intl, 'bedriftsbanner.detail.frilans');
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
