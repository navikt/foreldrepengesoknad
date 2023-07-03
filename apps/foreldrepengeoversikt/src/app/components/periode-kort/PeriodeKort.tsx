import { BodyShort } from '@navikt/ds-react';
import ContentSection from '../content-section/ContentSection';

interface Props {
    children: React.ReactNode;
}

const PeriodeKort: React.FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <ContentSection>
            <BodyShort>{children}</BodyShort>
        </ContentSection>
    );
};
export default PeriodeKort;
