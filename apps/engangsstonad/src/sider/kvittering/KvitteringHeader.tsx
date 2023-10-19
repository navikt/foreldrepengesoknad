import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { HStack, Heading, Label, Link, VStack } from '@navikt/ds-react';
import { bemUtils, VedleggIkon } from '@navikt/fp-common';

import Person from 'types/Person';
import Kvittering from 'types/Kvittering';
import SpotlightLetter from './ikon/SpotlightLetter';
import { openPdfPreview } from '@navikt/fp-utils';

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
        <VStack gap="5" align="center">
            <SpotlightLetter className={bem.element('spotlightLetter')} />
            <Heading size="xlarge">
                <FormattedMessage
                    id="søknadSendt.tittel"
                    values={{
                        navn: `${søker.fornavn} ${søker.etternavn}`,
                    }}
                />
            </Heading>
            {pdf && (
                <HStack gap="2">
                    <VedleggIkon width={20} height={20} />
                    <Link
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            openPdfPreview(pdf);
                        }}
                    >
                        <FormattedMessage id={'søknadSendt.pdf'} />
                    </Link>
                </HStack>
            )}
            <Label>
                <HStack gap="2">
                    <FormattedMessage id="søknadSendt.sendtInn" />
                    {dayjs(mottattDato).format('D MMMM YYYY')}, kl. {dayjs(mottattDato).format('HH:mm')}
                </HStack>
            </Label>
        </VStack>
    );
};

export default KvitteringHeader;
