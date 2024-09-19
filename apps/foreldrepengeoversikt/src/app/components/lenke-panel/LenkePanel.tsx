import { ArrowRightIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router-dom';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import styles from './lenke-panel.module.css';

type Props = {
    tittel: string;
    to: string;
    undertittel?: string;
    Ikon?: typeof ArrowRightIcon; // TODO: hacky?
};
export const LenkePanel = ({ to, tittel, undertittel, Ikon }: Props) => {
    return (
        <Link to={to} className={styles.LenkePanel}>
            <HStack gap="4" align="center">
                {Ikon && (
                    <Ikon
                        className="p-1 rounded-[50%] bg-deepblue-100 text-icon-info"
                        width={32}
                        height={32}
                        aria-hidden
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
