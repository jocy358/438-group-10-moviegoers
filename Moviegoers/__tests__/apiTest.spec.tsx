import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
// the tests are not working. i dont know why they arent working. ive imported like 1 million packages and they still arent working
// it could be the code itself. it could be dependencies. idk. 
// the tests exist. im going to go work on something else.
import ApiTest from "../app/apiTest";
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            imdbID: "tt1661199",
            Title: "Cinderella",
            Poster:"https://m.media-amazon.com/images/M/MV5BMjMxODYyODEzN15BMl5BanBnXkFtZTgwMDk4OTU0MzE@._V1_SX300.jpg",
            Type:"movie",
            Plot:"When her father unexpectedly dies, young Ella finds herself at the mercy of her cruel stepmother and her scheming stepsisters. Never one to give up hope, Ella's fortunes begin to change after meeting a dashing stranger.",            // Type:"movie"
            Released: "13 Mar 2015",

            // other fields not used ATM:
            // Year: "2015",
            // Rated: "PG",
            // Runtime: "105 min",
            // Genre: "Adventure, Drama, Family",
            // Director: "Kenneth Branagh",
            // Writer: "Chris Weitz, Charles Perrault",
            // Actors: "Lily James, Cate Blanchett, Richard Madden",
        }),
    })
 ) as jest.Mock;

it('fetches and displays movie data', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<ApiTest />);
    fireEvent.changeText(getByPlaceholderText('Enter movie title'), 'Cinderella');
    fireEvent.press(getByText('Search'));

    const title = await findByText('Cinderella');
    const plot = await findByText(/When her father unexpectedly dies/i);

    // Print results to console
    console.log('Title:', title.props.children);
    console.log('Plot:', plot.props.children);

    expect(title).toBeTruthy();
    expect(plot).toBeTruthy();
});