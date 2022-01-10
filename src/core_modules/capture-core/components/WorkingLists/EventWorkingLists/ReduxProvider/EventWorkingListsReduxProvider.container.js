// @flow
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    openViewEventPage,
    requestDeleteEvent,
} from '../eventWorkingLists.actions';
import { EventWorkingListsColumnSetup } from '../ColumnSetup';
import { useWorkingListsCommonStateManagement } from '../../WorkingListsCommon';
import { SINGLE_EVENT_WORKING_LISTS_TYPE } from '../constants';
import type { Props } from './eventWorkingListsReduxProvider.types';
import { useProgramInfo } from '../../../../hooks/useProgramInfo';
import { useOrganisationUnit } from '../../../../dataQueries';

export const EventWorkingListsReduxProvider = ({ storeId, programId, programStageId, orgUnitId }: Props) => {
    const dispatch = useDispatch();
    const { program } = useProgramInfo(programId);
    const { orgUnit } = useOrganisationUnit(orgUnitId);
    const { currentTemplateId, templates, ...commonStateManagementRestProps }
        = useWorkingListsCommonStateManagement(storeId, SINGLE_EVENT_WORKING_LISTS_TYPE, program);

    const currentTemplate = currentTemplateId && templates &&
    templates.find(template => template.id === currentTemplateId);

    const lastEventIdDeleted = useSelector(({ workingListsUI }) =>
        workingListsUI[storeId] && workingListsUI[storeId].lastEventIdDeleted);

    const downloadRequest = useSelector(({ workingLists }) =>
        workingLists[storeId] && workingLists[storeId].currentRequest); // TODO: Remove when DownloadDialog is rewritten

    const onSelectListRow = useCallback(({ id }) => {
        window.scrollTo(0, 0);
        dispatch(openViewEventPage(id, orgUnit));
    }, [dispatch, orgUnit]);

    const onDeleteEvent = useCallback((eventId: string) => {
        dispatch(requestDeleteEvent(eventId, storeId));
    }, [dispatch, storeId]);

    return (
        <EventWorkingListsColumnSetup
            {...commonStateManagementRestProps}
            program={program}
            programStageId={programStageId}
            orgUnitId={orgUnitId}
            currentTemplate={currentTemplate}
            templates={templates}
            lastIdDeleted={lastEventIdDeleted}
            onSelectListRow={onSelectListRow}
            onDeleteEvent={onDeleteEvent}
            downloadRequest={downloadRequest}
        />
    );
};
