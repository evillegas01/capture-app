// @flow
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { buildUrlQueryString } from '../../../utils/routing';
import { getUrlQueries } from '../../../utils/url';

export const useResetEventId = () => {
    const history = useHistory();
    const pathname: string = useSelector(({ router: { location } }) => location.pathname);

    const resetEventId = (pageToPush: string = pathname) => {
        const { programId, orgUnitId, teiId, enrollmentId } = getUrlQueries();
        history.push(`${pageToPush}?${buildUrlQueryString({ programId, orgUnitId, teiId, enrollmentId })}`);
    };

    return { resetEventId };
};
