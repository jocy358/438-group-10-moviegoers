import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import ApiTest from "./apiTest";
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            Title: "Inception",
            Year: "2010",
            Rated: "PG-13",
            Released: "16 Jul 2010",
            Runtime: "148 min",
            Genre: "Action, Adventure, Sci-Fi",
            Director: "Christopher Nolan",
            Writer: "Christopher Nolan",
            Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
            Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", 
            Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        }),
    })
) as jest.Mock;

it('fetches and displays movie data', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<ApiTest />);
    fireEvent.changeText(getByPlaceholderText('Enter movie title'), 'Inception');
    fireEvent.press(getByText('Search'));

    const title = await findByText('Inception');
    const plot = await findByText(/dream-sharing technology/);

    // Print results to console
    console.log('Title:', title.props.children);
    console.log('Plot:', plot.props.children);

    expect(title).toBeTruthy();
    expect(plot).toBeTruthy();
});
