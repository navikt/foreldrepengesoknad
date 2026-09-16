import { ComponentType, ReactNode, SVGProps } from 'react';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '../icon-circle/IconCircleWrapper';

interface Props {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    tittel: ReactNode;
    children: ReactNode;
}

export const InfoboksMedIkon = ({ icon: Icon, tittel, children }: Props) => (
    <HStack gap="space-20" wrap={false}>
        <IconCircleWrapper color="lightBlue" size="medium">
            <Icon height={22} width={22} fontSize="1.5rem" color="var(--ax-bg-accent-strong)" aria-hidden />
        </IconCircleWrapper>
        <div>
            <Heading size="small" level="4">
                {tittel}
            </Heading>
            <BodyLong>{children}</BodyLong>
        </div>
    </HStack>
);
