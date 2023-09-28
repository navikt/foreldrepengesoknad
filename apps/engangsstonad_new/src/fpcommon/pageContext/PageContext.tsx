import { createContext, useReducer, FunctionComponent, ReactNode, useContext, useCallback } from 'react';

const defaultInitialState = {
    visitedPages: [] as string[],
    pagesAddedByVisitedPages: {} as Record<string, string[]>,
};

type Action =
    | { type: 'addVisitedPage'; page: string }
    | { type: 'removeVisitedPage'; page: string; shouldRemovePaths?: boolean }
    | { type: 'addAdditionalPages'; pageData: Record<string, string[]> }
    | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = {
    visitedPages: string[];
    pagesAddedByVisitedPages: Record<string, string[]>;
};

const PageStateContext = createContext<State>(defaultInitialState);
const PageDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: State;
}

export const PageContext: FunctionComponent<OwnProps> = ({ children, initialState }): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: State, action: Action) => {
        switch (action.type) {
            case 'addVisitedPage':
                return {
                    ...oldState,
                    visitedPages: oldState.visitedPages.concat(action.page),
                };
            case 'removeVisitedPage':
                return {
                    pagesAddedByVisitedPages: action.shouldRemovePaths
                        ? Object.keys(oldState.pagesAddedByVisitedPages).reduce((acc, page) => {
                              if (action.page !== page) {
                                  return {
                                      ...acc,
                                      [page]: oldState.pagesAddedByVisitedPages[page],
                                  };
                              }
                              return acc;
                          }, {})
                        : oldState.pagesAddedByVisitedPages,
                    visitedPages: oldState.visitedPages.filter((p) => p !== action.page),
                };
            case 'addAdditionalPages':
                return {
                    ...oldState,
                    pagesAddedByVisitedPages: {
                        ...oldState.pagesAddedByVisitedPages,
                        ...action.pageData,
                    },
                };
            case 'reset': {
                return defaultInitialState;
            }
            default:
                throw new Error();
        }
    }, initialState || defaultInitialState);

    return (
        <PageStateContext.Provider value={state}>
            <PageDispatchContext.Provider value={dispatch}>{children}</PageDispatchContext.Provider>
        </PageStateContext.Provider>
    );
};

export const usePageRegister = () => {
    const dispatch = useContext(PageDispatchContext);
    return useCallback(
        (page: string) => {
            if (dispatch) {
                dispatch({ type: 'addVisitedPage', page });
            }
        },
        [dispatch],
    );
};

export const usePageUnregister = () => {
    const dispatch = useContext(PageDispatchContext);
    return useCallback(
        (page: string, shouldRemovePaths?: boolean) => {
            if (dispatch) {
                dispatch({ type: 'removeVisitedPage', page, shouldRemovePaths });
            }
        },
        [dispatch],
    );
};

export const useResetPages = () => {
    const dispatch = useContext(PageDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, [dispatch]);
};

export const useVisitedPages = () => {
    const state = useContext(PageStateContext);
    return state.visitedPages;
};

export const useAdditionalPagesRegister = () => {
    const dispatch = useContext(PageDispatchContext);
    return useCallback(
        (page: string, addAdditionalPages: string[]) => {
            if (dispatch) {
                dispatch({ type: 'addAdditionalPages', pageData: { [page]: addAdditionalPages } });
            }
        },
        [dispatch],
    );
};

export const usePagesAddedByVisitedPages = () => {
    const state = useContext(PageStateContext);
    return Object.values(state.pagesAddedByVisitedPages).flat();
};
