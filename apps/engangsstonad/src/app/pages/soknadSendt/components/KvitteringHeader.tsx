import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { Heading, Label, Link } from '@navikt/ds-react';
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
                <Heading size="xlarge">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            navn: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Heading>
            </Block>

            {pdf && (
                <Block margin="l">
                    <div className={bem.element('vedleggWrapper')}>
                        <VedleggIkon className={bem.element('vedleggIkon')} width={20} height={20} />
                        <Link
                            className={bem.element('vedleggLink')}
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                openPdfPreview(pdf);
                            }}
                        >
                            <FormattedMessage id={'søknadSendt.pdf'} />
                        </Link>
                    </div>
                </Block>
            )}

            <Block margin="l">
                <div className={bem.element('sendtInnTid')}>
                    <Label>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                        <span style={{ width: '0.25rem' }} />
                        {dayjs(mottattDato).format('D MMMM YYYY')}, kl. {dayjs(mottattDato).format('HH:mm')}
                    </Label>
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
