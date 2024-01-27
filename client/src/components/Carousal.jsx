import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

function CarouselCom(props) {
    var items = [
        {
            name: "DAIRY SYNC",
            description: "GOODNESS KERALA WAKES TO",
            image: 'https://png.pngtree.com/background/20230611/original/pngtree-dairy-products-in-bottles-picture-image_3166537.jpg'
        },
        {
            name: "DAIRY SYNC",
            description: "GOODNESS KERALA WAKES TO",
            image: 'https://www.shutterstock.com/image-photo/dairy-products-bottles-milk-cheese-600nw-2252350435.jpg'
        },
        {
            name: "DAIRY SYNC",
            description: "GOODNESS KERALA WAKES TO",
            image: 'https://c0.wallpaperflare.com/preview/462/721/223/new-hampshire-new-england-america-farm.jpg'
        }
    ];

    return (
        <Carousel>
            {items.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
    );
}

export default CarouselCom;

function Item(props) {
    const paperStyle = {
        backgroundImage: `url(${props.item.image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '400px', // Adjust the height as needed
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        color: 'white',
    };
    const headingStyle = {
        fontSize: '2rem', // Adjust the font size as needed
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333', // Dark color for better visibility on a white background
        backgroundColor: 'white', // Blue background for the text
        padding: '10px', // Add padding for better visibility
        borderTopRightRadius: '8px', // Add border radius to the top right corner
        borderBottomRightRadius: '8px',
    };

    const descriptionStyle = {
        fontSize: '1.2rem', // Adjust the font size as needed
        textAlign: 'center',
        maxWidth: '80%', // Limit the width for better readability
        lineHeight: '1.5',
        color: '#333', // Dark color for better visibility on a white background
        backgroundColor: 'grey', // Blue background for the text
        padding: '10px', // Add padding for better visibility
        borderTopRightRadius: '8px', // Add border radius to the top right corner
        borderBottomRightRadius: '8px',
    };

    return (
        <Paper style={paperStyle}>
              <h2 style={headingStyle}>{props.item.name}</h2>
            <p style={descriptionStyle}>{props.item.description}</p>
           
        </Paper>
    );
}
