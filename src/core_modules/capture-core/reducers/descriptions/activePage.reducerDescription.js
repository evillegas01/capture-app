// @flow
import { createReducerDescription } from '../../trackerRedux';
import { lockedSelectorActionTypes } from '../../components/LockedSelector/LockedSelector.actions';
import {
    actionTypes as viewEventActionTypes,
    actionTypes as viewEventPageActionTypes,
} from '../../components/Pages/ViewEvent/ViewEventComponent/viewEvent.actions';
import { dataEntryActionTypes as newEventDataEntryActionTypes } from '../../components/DataEntries/SingleEventRegistrationEntry';
import { actionTypes as viewEventDataEntryActionTypes } from '../../components/Pages/ViewEvent/EventDetailsSection/ViewEventDataEntry/viewEventDataEntry.actions';
import { eventWorkingListsActionTypes } from '../../components/Pages/MainPage/EventWorkingLists';

export const activePageDesc = createReducerDescription({
    [lockedSelectorActionTypes.CURRENT_SELECTIONS_UPDATE]: state => ({
        ...state,
        lockedSelectorLoads: true,
    }),
    [lockedSelectorActionTypes.FETCH_ORG_UNIT_ERROR]: (state, action) => ({
        ...state,
        lockedSelectorLoads: false,
        selectionsError: action.payload,
    }),
    [lockedSelectorActionTypes.FETCH_ORG_UNIT_SUCCESS]: state => ({
        ...state,
        lockedSelectorLoads: false,
    }),
    [lockedSelectorActionTypes.CURRENT_SELECTIONS_VALID]: state => ({
        ...state,
        selectionsError: null,
        lockedSelectorLoads: false,
        isDataEntryLoading: false,
    }),
    [lockedSelectorActionTypes.CURRENT_SELECTIONS_INVALID]: (state, action) => ({
        ...state,
        lockedSelectorLoads: false,
        selectionsError: action.payload,
    }),


    [viewEventPageActionTypes.VIEW_EVENT_FROM_URL]: state => ({
        ...state,
        isDataEntryLoading: true,
        lockedSelectorLoads: true,
    }),
    [viewEventDataEntryActionTypes.PREREQUISITES_ERROR_LOADING_VIEW_EVENT_DATA_ENTRY]: (state, action) => ({
        ...state,
        isDataEntryLoading: false,
        viewEventLoadError: action.payload,
    }),
    [viewEventDataEntryActionTypes.VIEW_EVENT_DATA_ENTRY_LOADED]: state => ({
        ...state,
        isDataEntryLoading: false,
    }),

    [eventWorkingListsActionTypes.VIEW_EVENT_PAGE_OPEN]: state => ({
        ...state,
        isDataEntryLoading: true,
    }),
    [viewEventPageActionTypes.OPEN_VIEW_EVENT_PAGE_FAILED]: (state, action) => ({
        ...state,
        viewEventLoadError: action.payload.error,
    }),
    [viewEventPageActionTypes.ORG_UNIT_RETRIEVED_ON_URL_UPDATE]: state => ({
        ...state,
        isDataEntryLoading: true,
        lockedSelectorLoads: false,
    }),
    [viewEventActionTypes.ORG_UNIT_RETRIEVAL_FAILED_ON_URL_UPDATE]: state => ({
        ...state,
        isDataEntryLoading: true,
        lockedSelectorLoads: false,
    }),
    [viewEventPageActionTypes.EVENT_FROM_URL_COULD_NOT_BE_RETRIEVED]: (state, action) => ({
        ...state,
        viewEventLoadError: action.payload,
        lockedSelectorLoads: false,
    }),

    [newEventDataEntryActionTypes.OPEN_NEW_EVENT_IN_DATA_ENTRY]: state => ({
        ...state,
        isDataEntryLoading: false,
    }),
    [newEventDataEntryActionTypes.NEW_EVENT_IN_DATAENTRY_OPENING_CANCEL]: state => ({
        ...state,
        isDataEntryLoading: false,
    }),
}, 'activePage', {
    selectionsError: null,
    lockedSelectorLoads: false,
    isDataEntryLoading: false,
    viewEventLoadError: false,
});
