import axios from "axios";
import cheerio from "cheerio";

import express from "express";;
const PORT = process.env.PORT || 8000

const app = express()

const words = [
    {
        name: 'adda247',
        address: 'https://www.adda247.com/school/english-vocabulary-words/',
        base: ''
    },
    {
        name: 'ischool',
        address: 'https://ischoolconnect.com/blog/60-new-words-in-english-with-meanings/',
        base: ''
    },
    


   
]

const articles = [];
let tdWord=''
let tdMeaning=''
let tdMeaning1=''
words.forEach(word => {
    axios.get(word.address)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('tr').each(function () {
              if(word.name === 'cityam'){

                 tdWord = $(this).find('td:eq(0)').text(); // Assuming the word is in the first td
                 tdMeaning = $(this).find('td:eq(1)').text(); //  the meaning is in the second td
                articles.push({
                  word: tdWord,
                  meaning: tdMeaning,
                  
                });
              }else{
                tdWord = $(this).find('td:eq(1)').text(); // meaning is in the second td
                tdMeaning1 = $(this).find('td:eq(2)').text(); //meaning is in the second td
                articles.push({
                  word: tdWord,
                   meaning: tdMeaning1,
                });

              }

            });
        })
        .catch(error => {
            res.json(`Error fetching data from ${word.address}: ${error}`);
        });
});


app.get('/', (req, res) => {
    res.json('Welcome to Dictionary')
})

app.get('/meaning', (req, res) => {
    res.json(articles)
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))