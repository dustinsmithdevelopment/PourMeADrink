import express from 'express';

import axios from 'axios';


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');


app.get('/',async (req, res) => {
    try {
        const result = await axios.get('https://boozeapi.com/api/v1/cocktails');
        const cocktails = result.data.data;
        const randomCocktail = cocktails[Math.floor(Math.random() * cocktails.length)];
        console.log(JSON.stringify(randomCocktail));
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


})








app.listen(3000, () => {
    console.log('Server is running on port 3000');
});