import express from 'express';

import axios from 'axios';

let cocktails = null;


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');


app.get('/',async (req, res) => {
    try {
        await getDrinks();
        const randomCocktail = cocktails[Math.floor(Math.random() * cocktails.length)];
        const cocktailInfo = {
            name:randomCocktail.name,
            imageURL:randomCocktail.image,
            isAlcoholic: randomCocktail.alcoholic,
            category: randomCocktail.category.label,
            glass: randomCocktail.glass_type.label,
            ingredients: randomCocktail.ingredients,
            instructions:randomCocktail.instructions,

        };

        res.render('pages/index.ejs', {data: cocktailInfo});
    }catch (e) {
        console.log(e);
        res.send('Error 404: We seem to have returned to the prohibition era.')
    }

    async function getDrinks() {
        if (!cocktails){
            await newDrinks();
        }
    }
    async function newDrinks() {
        try {
            const result = await axios.get('https://boozeapi.com/api/v1/cocktails', {params: {page: Math.floor(Math.random() * 60)}});
            cocktails = result.data.data;
        }catch (e) {
            console.log(e);
            throw "Error: Could not get drinks from API.";
        }
    }
    setInterval(newDrinks, 60_000);


})








app.listen(3000, () => {
    console.log('Server is running on port 3000');
});