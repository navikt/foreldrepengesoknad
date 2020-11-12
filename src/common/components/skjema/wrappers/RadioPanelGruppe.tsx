import * as React from 'react';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { RadioPanelGruppeResponsiveProps } from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import ValiderbarRadioPanelGruppeResponsive from 'common/lib/validation/elements/ValiderbarRadioPanelGruppeResponsive';

type OwnProps = SkjemaelementProps & RadioPanelGruppeResponsiveProps;

const RadioPanelGruppe: React.FunctionComponent<OwnProps> = (props: OwnProps) => {
    return <ValiderbarRadioPanelGruppeResponsive {...props} />;
};

export default RadioPanelGruppe;
