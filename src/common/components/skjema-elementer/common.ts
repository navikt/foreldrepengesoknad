import { ValiderbartSkjemaelementProps } from 'common/lib/validation/ValiderbartSkjemaelement';

export interface CommonSkjemaelementProps {
    infotekst: string;
}

export type SkjemaelementProps = CommonSkjemaelementProps &
    ValiderbartSkjemaelementProps;
