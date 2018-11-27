import * as React from 'react';
import { Søkersituasjon } from '../../types/s\u00F8knad/S\u00F8knad';
import { InjectedIntlProps } from 'react-intl';
import InfoBlock from 'common/components/info-block/InfoBlock';

export interface OwnProps {
    situasjon: Søkersituasjon;
}

type Props = OwnProps & InjectedIntlProps;

const EksisterendeSak: React.StatelessComponent<Props> = (props) => <InfoBlock>Informasjon om sak</InfoBlock>;

export default EksisterendeSak;
