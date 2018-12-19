import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import PeriodelisteToggleItem from '../elements/PeriodelisteToggleItem';
import PeriodelisteItemHeader from '../elements/PeriodelisteItemHeader';
import PeriodelisteItemWrapper from '../elements/PeriodelisteItemWrapper';

interface Props extends PeriodelisteInformasjon {
    isExpanded: boolean;
    onToggle: onToggleItemProp;
}

export interface PeriodelisteInformasjon {
    id: string;
    tittel: string;
    beskrivelse?: React.ReactNode;
    ikon: React.ReactNode;
    renderContent: () => JSX.Element;
}

const PeriodelisteInfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    id,
    isExpanded,
    onToggle,
    renderContent,
    ikon,
    tittel,
    beskrivelse,
    intl
}) => {
    return (
        <PeriodelisteItemWrapper key={id} farge="yellow" isExpanded={isExpanded}>
            <PeriodelisteToggleItem
                id={id}
                isExpanded={isExpanded}
                onToggle={onToggle}
                renderHeader={() => (
                    <PeriodelisteItemHeader type="info" ikon={ikon} tittel={tittel} beskrivelse={beskrivelse} />
                )}
                renderContent={renderContent}
            />
        </PeriodelisteItemWrapper>
    );
};

export default injectIntl(PeriodelisteInfo);
