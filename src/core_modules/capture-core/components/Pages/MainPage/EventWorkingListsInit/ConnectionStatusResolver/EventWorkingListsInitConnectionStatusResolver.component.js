// @flow
import React from 'react';
import { EventWorkingListsOffline } from '../../../../WorkingLists/EventWorkingListsOffline';
import { EventWorkingListsInitHeader } from '../Header';
import { EventWorkingListsInitRunningMutationsHandler } from '../RunningMutationsHandler';
import type { Props } from './eventWorkingListsInitConnectionStatusResolver.types';

export const EventWorkingListsInitConnectionStatusResolver = ({ isOnline, storeId, ...passOnProps }: Props) => (
    <EventWorkingListsInitHeader>
        {
            !isOnline ?
                <EventWorkingListsOffline
                    storeId={storeId}
                />
                :
                <EventWorkingListsInitRunningMutationsHandler
                    {...passOnProps}
                    storeId={storeId}
                />
        }

    </EventWorkingListsInitHeader>
);
