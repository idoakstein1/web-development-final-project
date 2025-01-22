import { Box } from '@mui/material';
import { AddToWatchLater } from '../../components/AddToWatchLater';
import { ContentList } from '../../components/ContentList';
import { ContentSearch } from '../../components/ContentSearch';

export const WatchLaterPage = () => (
    <>
        <ContentList />
        <Box sx={{ width: '50%', paddingY: 5 }}>
            <ContentSearch listAction={(content) => <AddToWatchLater content={content} />} />
        </Box>
    </>
);
