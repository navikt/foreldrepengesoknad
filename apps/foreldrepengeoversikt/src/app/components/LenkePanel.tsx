import { ArrowRightIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router-dom';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

type Props = {
    tittel: string;
    to: string;
    undertittel?: string;
    Ikon?: typeof ArrowRightIcon; // TODO: hacky?
};
export const LenkePanel = ({ to, tittel, undertittel, Ikon }: Props) => {
    return (
        <Link
            to={to}
            className="flex text-text-default shadow-small justify-between items-center rounded-large p-4 bg-white mb-12 w-[50%] hover:bg-deepblue-100 hover:shadow-none"
        >
            <HStack gap="4" align="center">
                {Ikon && (
                    <Ikon
                        className="p-1 rounded-[50%] bg-deepblue-100 text-icon-info"
                        width={32}
                        height={32}
                        aria-hidden={true}
                    />
                )}
                <VStack gap="0">
                    <BodyShort size="medium" weight="semibold">
                        {tittel}
                    </BodyShort>
                    {undertittel && (
                        <BodyShort size="small" textColor="subtle">
                            {undertittel}
                        </BodyShort>
                    )}
                </VStack>
            </HStack>
            <ArrowRightIcon className="text-icon-info" fontSize="24" aria-hidden />
        </Link>
    );
};
