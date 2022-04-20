import React from 'react';
import InteractiveListElement, {
    InteractiveListElementProps,
} from '../../../../common/components/skjema/elements/interactive-list-element/InteractiveListElement';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../../../types/søknad/AnnenInntekt';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { prettifyTidsperiode } from '../../../util/dates/dates';
import { mapTidsperiodeStringToTidsperiode } from '../../../util/tidsperiodeUtils';

interface AndreInntekterListElementProps extends InteractiveListElementProps {
    annenInntekt: AnnenInntekt;
}

type Props = AndreInntekterListElementProps;

const AndreInntekterListElement: React.FunctionComponent<Props> = ({ annenInntekt, ...rest }) => {
    const intl = useIntl();
    const { type, tidsperiode, vedlegg } = annenInntekt;
    const inntektstypeSkalHaVedlegg = type !== AnnenInntektType.JOBB_I_UTLANDET;
    const harVedlegg = vedlegg !== undefined && vedlegg.length > 0;
    const intlKey = 'inntektstype.';

    let title;
    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        const arbeidsgiver = (annenInntekt as JobbIUtlandetInntekt).arbeidsgiverNavn;
        title = `${getMessage(intl, `${intlKey}${type.toLowerCase()}`)} (${arbeidsgiver})`;
    } else {
        title = getMessage(intl, `${intlKey}${type.toLowerCase()}`);
    }

    const deleteLinkText = getMessage(intl, 'slett.periode');
    const dokVedlagt = getMessage(intl, 'dokumentasjon.vedlagt');
    const dokMangler = getMessage(intl, 'dokumentasjon.mangler');

    return (
        <InteractiveListElement
            title={title}
            text={prettifyTidsperiode(mapTidsperiodeStringToTidsperiode(tidsperiode))}
            deleteLinkText={deleteLinkText}
            etikettProps={
                inntektstypeSkalHaVedlegg
                    ? {
                          type: harVedlegg ? 'suksess' : 'fokus',
                          children: harVedlegg ? dokVedlagt : dokMangler,
                      }
                    : undefined
            }
            {...rest}
        />
    );
};

export default AndreInntekterListElement;
