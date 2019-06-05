import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { Utenlandsopphold } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import InteractiveListElement, {
    InteractiveListElementProps
} from '../../../components/skjema/interactive-list-element/InteractiveListElement';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { prettifyTidsperiode } from '../../../util/dates/dates';

interface OppholdListeElementProps extends InteractiveListElementProps {
    opphold: Utenlandsopphold;
}
type Props = OppholdListeElementProps & InjectedIntlProps;

const OppholdListElement: React.StatelessComponent<Props> = ({ opphold, intl, ...rest }) => {
    const deleteLinKText = getMessage(intl, 'slett.utenlandsopphold');
    return (
        <InteractiveListElement
            title={countries.getName(opphold.land, 'nb')}
            text={prettifyTidsperiode(opphold.tidsperiode)}
            deleteLinkText={deleteLinKText}
            {...rest}
        />
    );
};

export default injectIntl(OppholdListElement);
