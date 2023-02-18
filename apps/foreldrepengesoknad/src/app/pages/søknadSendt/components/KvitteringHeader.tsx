import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import Person from 'app/types/Person';
import { Kvittering } from 'app/types/Kvittering';
import { bemUtils, Block, VedleggIkon } from '@navikt/fp-common';
import { openPdfPreview } from 'app/utils/pdfUtils';
import SpotlightLetter from 'app/assets/SpotlightLetter';

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
                <Sidetittel tag="h1">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            name: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Sidetittel>
            </Block>

            <Block padBottom="l" visible={pdf !== undefined}>
                <div className={bem.element('vedleggWrapper')}>
                    <VedleggIkon className={bem.element('vedleggIkon')} width={20} height={20} />
                    <Lenke
                        className={bem.element('vedleggLink')}
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            openPdfPreview(pdf);
                        }}
                    >
                        <FormattedMessage id={'søknadSendt.pdf'} />
                    </Lenke>
                </div>
            </Block>

            <Block padBottom="l">
                <div className={bem.element('sendtInnTid')}>
                    <Normaltekst>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                    </Normaltekst>
                    <span style={{ width: '0.25rem' }} />
                    {dayjs(mottattDato).format('D. MMMM YYYY')}, kl. {dayjs(mottattDato).format('HH:mm')}
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
