import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Overføringsperiode } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface OverføringsperiodedetaljerProps {
    periode: Overføringsperiode;
}

type Props = OverføringsperiodedetaljerProps & InjectedIntlProps;

const Overføringsperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    const { årsak, vedlegg } = periode;
    return (
        <>
            <Feltoppsummering feltnavn="Årsak" verdi={årsak} />
            <OppsummeringAvDokumentasjon vedlegg={vedlegg || []} />
        </>
    );
};

export default injectIntl(Overføringsperiodedetaljer);
