import { BodyLong } from '@navikt/ds-react';
import ContentSection from '../content-section/ContentSection';

interface Props {
    arbeidsgiver: string;
    fra: string;
    til: string;
    type: string;
}

const PeriodeKort: React.FunctionComponent<Props> = ({ arbeidsgiver, fra, til, type }: Props) => {
    return (
        <ContentSection>
            <BodyLong>
                <p>
                    <b>
                        {fra} {til}
                    </b>{' '}
                    jobber du hos {arbeidsgiver} og mottar {type} svangerskapspenger
                </p>
            </BodyLong>
        </ContentSection>
    );
};
export default PeriodeKort;
