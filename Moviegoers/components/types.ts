export type Movie = {
    id: number;
    imdbId: string;
    title: string;
    posterURL?: string | null;
    year?: string | null;
    type?: "movie" | "series" | "episode" | string | null;
    plot?: string | null;
    releaseDate?: string | null;
};

export type Review = {
    id: number;
    movieId: number;
    userId?: number | null;
    rating: number;
    body?: string | null;
    createdAt: string;
}

export type Genre = { 
    id: number;
    name: string
};