import { ArrowRightIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import styles from './lenke-panel.module.css';

type Props = {
    tittel: string;
    to: string;
    undertittel?: string;
    className?: string;
    Ikon?: typeof ArrowRightIcon; // TODO: hacky?
    tag?: ReactNode;
};
export const LenkePanel = ({ to, tittel, undertittel, Ikon, className, tag }: Props) => {
    return (
        <Link to={to} className={classNames(styles.LenkePanel, className)}>
            <HStack gap="4" align="center" justify="space-between">
                <HStack gap="4" align="center" wrap={false}>
                    {Ikon && (
                        <Ikon
                            className="p-1 rounded-[50%] bg-deepblue-100 text-icon-info"
                            width={32}
                            height={32}
                            aria-hidden
                        />
                    )}
                    <VStack gap="0" className="flex-1">
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
                {tag}
            </HStack>
            <ArrowRightIcon className="text-icon-info" fontSize="24" aria-hidden />
        </Link>
    );
};
