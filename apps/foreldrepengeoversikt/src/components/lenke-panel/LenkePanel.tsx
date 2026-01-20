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
            <HStack gap="space-16" align="center" justify="space-between">
                <HStack gap="space-16" align="center" wrap={false}>
                    {Ikon && (
                        <Ikon
                            className="bg-ax-brand-blue-200 text-ax-text-info-decoration rounded-[50%] p-1"
                            width={32}
                            height={32}
                            aria-hidden
                        />
                    )}
                    <VStack gap="space-0" className="flex-1">
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
            <ArrowRightIcon className="text-ax-text-info-decoration" fontSize="24" aria-hidden />
        </Link>
    );
};
