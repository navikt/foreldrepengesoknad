import countries from 'i18n-iso-countries';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import InteractiveListElement, {
    InteractiveListElementProps,
} from 'common/components/interactive-list-element/InteractiveListElement';
import { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import { prettifyTidsperiode } from 'app/utils/formatDate';

interface OppholdListeElementProps extends InteractiveListElementProps {
    opphold: Utenlandsopphold;
}

type Props = OppholdListeElementProps;

const OppholdListElement: React.FunctionComponent<Props> = ({ opphold, ...rest }) => {
    const intl = useIntl();

    return (
        <InteractiveListElement
            title={countries.getName(opphold.land, intl.locale)}
            text={prettifyTidsperiode(opphold.tidsperiode)}
            deleteLinkText={getMessage(intl, 'utenlandsopphold.land.slett')}
            {...rest}
        />
    );
};

export default OppholdListElement;
