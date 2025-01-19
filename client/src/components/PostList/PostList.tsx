import { Box, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll, { Props as InfiniteScrollProps } from 'react-infinite-scroll-component';
import { useAPI } from '../../hooks';
import { Loader } from '../Loader';
import { Post } from '../Post';
import { postListContainerStyle } from './styles';

export const PostList = () => {
    const API = useAPI();
    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => API.post.getPosts(pageParam),
        getNextPageParam: ({ metadata: { hasNext, nextPage } }) => (hasNext ? nextPage : undefined),
        initialPageParam: 1,
    });

    if (isLoading || !data) {
        return <Loader />;
    }

    const posts = data.pages.flatMap(({ posts }) => posts);

    const infiniteScrollProps: Omit<InfiniteScrollProps, 'children'> = {
        dataLength: posts.length,
        next: fetchNextPage,
        hasMore: hasNextPage,
        loader: <Loader />,
        endMessage: (
            <Typography align="center" color="textSecondary" paddingY={2} paddingRight={25}>
                No more posts to show
            </Typography>
        ),
        height: '100vh',
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <InfiniteScroll {...infiniteScrollProps}>
                <Box sx={postListContainerStyle}>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </Box>
            </InfiniteScroll>
        </Box>
    );
};
