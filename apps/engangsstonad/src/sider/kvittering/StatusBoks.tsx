import { FormattedMessage } from 'react-intl';
import { HStack, Heading, Ingress, Label, LinkPanel, Tag, VStack } from '@navikt/ds-react';
import { lenker } from 'fpcommon/util/lenker';

interface Props {
    saksNr: string;
}

const StatusBoks: React.FunctionComponent<Props> = ({ saksNr }) => {
    return (
        <VStack gap="4">
            <Heading size="medium">
                <FormattedMessage id="søknadSendt.status.tittel" />
            </Heading>
            <LinkPanel href={lenker.innsyn} border={true} className="statusBoks__lenkepanel">
                <HStack gap="10" justify="space-between">
                    <VStack gap="4">
                        <Heading size="small">
                            <FormattedMessage id="søknadSendt.status.undertittel" />
                        </Heading>
                        <Tag variant="warning">
                            <FormattedMessage id="søknadSendt.status.status" />
                        </Tag>
                    </VStack>
                    {saksNr && (
                        <VStack gap="4">
                            <Label>
                                <FormattedMessage id="søknadSendt.status.saksnummer" />
                            </Label>
                            <Ingress>{saksNr}</Ingress>
                        </VStack>
                    )}
                </HStack>
            </LinkPanel>
        </VStack>
    );
};

export default StatusBoks;
