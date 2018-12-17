import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import PeriodelisteToggleItem from '../elements/PeriodelisteToggleItem';
import getMessage from 'common/util/i18nUtils';
import PeriodelisteItemHeader from '../elements/PeriodelisteItemHeader';
import PeriodelisteItemWrapper from '../elements/PeriodelisteItemWrapper';

interface Props extends PeriodelisteInfoItemData {
    isExpanded: boolean;
    onToggle: onToggleItemProp;
}

export interface PeriodelisteInfoItemData {
    id: string;
    tittel: string;
    ikon: JSX.Element;
    renderContent: () => JSX.Element;
}

const PeriodelisteInfoItem: React.StatelessComponent<Props & InjectedIntlProps> = ({
    id,
    isExpanded,
    onToggle,
    renderContent,
    ikon,
    tittel,
    intl
}) => {
    return (
        <PeriodelisteItemWrapper key={id} farge="yellow" isExpanded={isExpanded}>
            <PeriodelisteToggleItem
                id={id}
                ariaLabel={getMessage(intl, 'periodeliste.hullMellomPerioder.aria-label')}
                isExpanded={isExpanded}
                onToggle={onToggle}
                renderHeader={() => <PeriodelisteItemHeader type="info" ikon={ikon} tittel={tittel} />}
                renderContent={renderContent}
            />
        </PeriodelisteItemWrapper>
    );
};

export default injectIntl(PeriodelisteInfoItem);
