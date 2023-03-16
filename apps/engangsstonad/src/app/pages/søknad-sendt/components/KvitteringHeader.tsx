import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Sidetittel, Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import Person from 'app/types/domain/Person';
import Kvittering from 'app/types/services/Kvittering';
import { bemUtils, Block, VedleggIkon } from '@navikt/fp-common';
import { openPdfPreview } from 'app/util/pdfUtils';
import SpotlightLetter from '../assets/SpotlightLetter';

import './kvitteringHeader.less';

interface Props {
    søker: Person;
    kvittering: Kvittering | undefined;
}

const KvitteringHeader: React.FunctionComponent<Props> = ({ søker, kvittering }) => {
    if (!kvittering) {
        return null;
    }

    const { pdf, mottattDato } = kvittering;
    const bem = bemUtils('kvitteringHeader');

    return (
        <div className={bem.block}>
            <Block margin="m">
                <SpotlightLetter className={bem.element('spotlightLetter')} />
            </Block>

            <Block margin="l">
                <Sidetittel tag="h1">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            navn: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Sidetittel>
            </Block>

            {pdf && (
                <Block margin="l">
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
            )}

            <Block margin="l">
                <div className={bem.element('sendtInnTid')}>
                    <Element>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                        <span style={{ width: '0.25rem' }} />
                        {dayjs(mottattDato).format('D MMMM YYYY')}, kl. {dayjs(mottattDato).format('HH:mm')}
                    </Element>
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
