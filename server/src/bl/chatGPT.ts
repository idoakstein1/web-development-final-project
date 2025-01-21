import { getFavoritePosts } from '../dal';
import { searchItems, sendMessageToGPT } from '../services';

const RECOMMENDED_PROMPT = `I like the following [movies/series]: [Place holder for favorits]. Based on their genres, themes, tone, and style, recommend [12] similar titles. Provide the response in the following format, with no explanations or extra text:
        movies:name1,name2,name3
        series:name1,name2,name3`;

export const getRecommended = async (userId: string) => {
    const favorits = (await getFavoritePosts(userId)).map((post) => post.title);

    if (!favorits || favorits.length === 0) {
        return {
            movies: [],
            series: [],
        };
    }

    const completion = sendMessageToGPT(RECOMMENDED_PROMPT.replace('Place holder for favorits', favorits.join(', ')));

    return completion.then(async (result) => {
        const content = result.choices[0].message.content;
        if (content) {
            const [movies, series] = content.split('\n');
            const moviesList = movies.split(':')[1].split(',');
            const seriesList = series.split(':')[1].split(',');
            let fullDataMovies: { id: string; name: string; year: string; type: string; poster: string }[] = [];
            let fullDataSeries: { id: string; name: string; year: string; type: string; poster: string }[] = [];
            const fullDataMoviesPromise = moviesList.map((movie) => {
                return searchItems({ title: movie.trim(), type: 'movie' })
                    .then((result) => {
                        if (!result) {
                            return;
                        }
                        const movie = result.items?.[0];
                        if (!movie) {
                            return;
                        }

                        fullDataMovies.push({
                            id: movie.id,
                            name: movie.name,
                            year: movie.year,
                            type: movie.type,
                            poster: movie.poster,
                        });
                    })
                    .catch(() => {
                        return;
                    });
            });
            const fullDataSeriesPromise = seriesList.flatMap((series) => {
                return searchItems({ title: series.trim(), type: 'series' })
                    .then((result) => {
                        if (!result) {
                            return;
                        }
                        const series = result.items?.[0];
                        if (!series) {
                            return;
                        }

                        fullDataSeries.push({
                            id: series.id,
                            name: series.name,
                            year: series.year,
                            type: series.type,
                            poster: series.poster,
                        });
                    })
                    .catch(() => {
                        return;
                    });
            });

            await Promise.all([...fullDataMoviesPromise, ...fullDataSeriesPromise]);

            return {
                movies: fullDataMovies,
                series: fullDataSeries,
            };
        }
    });
};
