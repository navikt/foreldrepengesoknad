import { FunctionComponent } from 'react';
import { Person } from 'app/types/Søkerinfo';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { dateToHours } from 'app/utils/formatDate';

import { openPdfPreview } from '../util/pdfUtils';

import './kvitteringHeader.less';
import { BodyShort, Heading, Link } from '@navikt/ds-react';

interface Props {
    søker: Person;
    mottattDato: string;
    pdf: string;
}

const cls = BEMHelper('kvitteringHeader');

const KvitteringHeader: FunctionComponent<Props> = ({ søker, pdf }) => {
    return (
        <div className={cls.block}>
            <Block margin="m">
                <SpotlightLetter className={cls.element('spotlightLetter')} />
            </Block>

            <Block margin="s">
                <Heading size="xlarge">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            name: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Heading>
            </Block>

            <Block visible={pdf !== undefined}>
                <Link
                    href={'#'}
                    onClick={(e) => {
                        e.preventDefault();
                        openPdfPreview(pdf);
                    }}
                >
                    <FormattedMessage id={'søknadSendt.pdf'} />
                </Link>
            </Block>

            <Block>
                <div className={cls.element('sendtInnTid')}>
                    <BodyShort>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                    </BodyShort>
                    <span style={{ width: '0.25rem' }} />
                    {moment().format('Do MMMM YYYY')}, kl. {dateToHours(moment().toDate())}
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
