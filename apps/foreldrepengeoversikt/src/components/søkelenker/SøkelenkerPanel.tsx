import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Bleed, HGrid } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { LayoutWrapper } from '../../sections/LayoutWrapper';

const PanelBleed = ({ children, doBleed }: { children: ReactNode; doBleed: boolean }) => {
    return doBleed ? (
        <div className="pt-12">
            <Bleed marginInline="full" className="bg-ax-bg-neutral-moderate">
                <LayoutWrapper className="pt-1 pr-4 pb-1 pl-4">{children}</LayoutWrapper>
            </Bleed>
        </div>
    ) : (
        children
    );
};

interface Props {
    doBleed?: boolean;
}

export const SøkelenkerPanel = ({ doBleed = false }: Props) => {
    const intl = useIntl();
    return (
        <PanelBleed doBleed={doBleed}>
            <HGrid gap="space-16" columns={{ sm: 1, md: 2 }} className={doBleed ? 'mt-12 mb-12' : undefined}>
                <LenkePanel
                    tittel={intl.formatMessage({ id: 'SøkelenkerPanel.HarRett' })}
                    undertittel={intl.formatMessage({ id: 'SøkelenkerPanel.VenterBarn' })}
                    to={links.rettOgPlikt}
                />
                <LenkePanel
                    tittel={intl.formatMessage({ id: 'SøkelenkerPanel.SokFp' })}
                    to={links.foreldrepengesoknad}
                />
                <LenkePanel
                    tittel={intl.formatMessage({ id: 'SøkelenkerPanel.SokSvp' })}
                    to={links.svangerskapspenger}
                />
                <LenkePanel tittel={intl.formatMessage({ id: 'SøkelenkerPanel.SokEs' })} to={links.engangsstonad} />
            </HGrid>
        </PanelBleed>
    );
};
