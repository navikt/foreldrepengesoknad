import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import { Sidetittel, EtikettLiten } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Person from 'app/types/Person';
import { Kvittering } from 'app/types/Kvittering';
import { openPdfPreview } from 'common/util/pdfUtils';

import './kvitteringHeader.less';
import VedleggIkon from 'common/components/ikoner/VedleggIkon';

interface Props {
    søker: Person;
    kvittering: Kvittering;
}

const cls = BEMHelper('kvitteringHeader');

const KvitteringHeader: React.FunctionComponent<Props> = ({ søker, kvittering }) => {
    const { pdf, mottattDato } = kvittering;
    return (
        <div className={cls.block}>
            <Block margin="m">
                <SpotlightLetter className={cls.element('spotlightLetter')} />
            </Block>

            <Block margin="s">
                <Sidetittel tag="h1">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            name: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Sidetittel>
            </Block>

            <Block visible={pdf !== undefined}>
                <div className={cls.element('vedleggWrapper')}>
                    <VedleggIkon className={cls.element('vedleggIkon')} width={20} height={20} />
                    <Lenke
                        className={cls.element('vedleggLink')}
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

            <Block>
                <div className={cls.element('sendtInnTid')}>
                    <EtikettLiten>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                    </EtikettLiten>
                    <span style={{ width: '0.25rem' }} />
                    {moment(mottattDato).format('Do MMMM YYYY')}, kl. {moment(mottattDato).format('HH:mm')}
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
