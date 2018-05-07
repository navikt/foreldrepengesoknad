import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';

export function getPerson(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_PERSON
    };
}
export default { getPerson };
