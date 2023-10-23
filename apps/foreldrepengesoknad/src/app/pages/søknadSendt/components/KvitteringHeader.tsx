import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { Kvittering } from 'app/types/Kvittering';
import { bemUtils, Block, VedleggIkon } from '@navikt/fp-common';
import { openPdfPreview } from 'app/utils/pdfUtils';
import SpotlightLetter from 'app/assets/SpotlightLetter';
import { BodyShort, Heading, Link } from '@navikt/ds-react';
import Person from '@navikt/fp-common/src/common/types/Person';

import './kvitteringHeader.less';

interface Props {
    søker: Person;
    kvittering: Kvittering;
}

const KvitteringHeader: React.FunctionComponent<Props> = ({ søker, kvittering }) => {
    const bem = bemUtils('kvitteringHeader');
    const { pdf, mottattDato } = kvittering;

    return (
        <div className={bem.block}>
            <Block padBottom="l">
                <SpotlightLetter className={bem.element('spotlightLetter')} />
            </Block>

            <Block padBottom="l">
                <Heading size="xlarge">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            name: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Heading>
            </Block>

            <Block padBottom="l" visible={pdf !== undefined}>
                <div className={bem.element('vedleggWrapper')}>
                    <VedleggIkon className={bem.element('vedleggIkon')} width={20} height={20} />
                    <Link
                        className={bem.element('vedleggLink')}
                        href={'#'}
                        onClick={(e: any) => {
                            e.preventDefault();
                            openPdfPreview(pdf);
                        }}
                    >
                        <FormattedMessage id={'søknadSendt.pdf'} />
                    </Link>
                </div>
            </Block>

            <Block padBottom="l">
                <div className={bem.element('sendtInnTid')}>
                    <BodyShort>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                    </BodyShort>
                    <span style={{ width: '0.25rem' }} />
                    {dayjs(mottattDato).format('D. MMMM YYYY')}, kl. {dayjs(mottattDato).format('HH:mm')}
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
