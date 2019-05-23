import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import PeriodelisteToggleItem from '../elements/PeriodelisteToggleItem';
import PeriodelisteItemHeader from '../elements/PeriodelisteItemHeader';
import PeriodelisteItemWrapper from '../elements/PeriodelisteItemWrapper';
import { UttaksplanColor } from 'app/types/uttaksplan/colors';
import { Tidsperiode } from 'common/types';

interface Props extends PeriodelisteInformasjon {
    isExpanded: boolean;
    onToggle: onToggleItemProp;
}

export interface PeriodelisteInformasjon {
    id: string;
    tittel: string;
    beskrivelse?: React.ReactNode;
    tidsperiode?: Tidsperiode;
    ikon: React.ReactNode;
    renderContent: () => JSX.Element;
    farge?: UttaksplanColor;
}

const PeriodelisteInfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    id,
    isExpanded,
    onToggle,
    renderContent,
    ikon,
    tittel,
    beskrivelse,
    tidsperiode,
    farge = 'yellow',
    intl
}) => {
    return (
        <PeriodelisteItemWrapper key={id} farge={farge} isExpanded={isExpanded}>
            <PeriodelisteToggleItem
                id={id}
                isExpanded={isExpanded}
                onToggle={onToggle}
                renderHeader={() => (
                    <PeriodelisteItemHeader
                        type="info"
                        ikon={ikon}
                        tittel={tittel}
                        beskrivelse={beskrivelse}
                        tidsperiode={tidsperiode}
                    />
                )}
                renderContent={renderContent}
            />
        </PeriodelisteItemWrapper>
    );
};

export default injectIntl(PeriodelisteInfo);
