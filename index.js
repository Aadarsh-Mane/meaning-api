// const PORT = process.env.PORT || 5000;
import axios from "axios";
import cheerio from "cheerio";

import express from "express";;
const PORT = process.env.PORT || 8000

const app = express()

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.adda247.com/school/english-vocabulary-words/',
        base: ''
    },
    {
        name: 'wwe',
        address: 'https://ischoolconnect.com/blog/60-new-words-in-english-with-meanings/',
        base: ''
    },
    


   
]

const articles = [];
let tdWord=''
let tdMeaning=''
let tdMeaning1=''
newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('tr').each(function () {
              if(newspaper.name === 'cityam'){

                 tdWord = $(this).find('td:eq(0)').text(); // Assuming the word is in the first td
                 tdMeaning = $(this).find('td:eq(1)').text(); // Assuming the meaning is in the second td
                //  tdMeaning1 = $(this).find('td:eq(2)').text(); // Assuming the meaning is in the second td
                articles.push({
                  word: tdWord,
                  meaning: tdMeaning,
                  // meaning1: tdMeaning1,
                  source: newspaper.name
                });
              }else{
                tdMeaning = $(this).find('td:eq(1)').text(); // Assuming the meaning is in the second td
                tdMeaning1 = $(this).find('td:eq(2)').text(); // Assuming the meaning is in the second td
                articles.push({
                  // word: tdWord,
                  word: tdMeaning,
                   meaning: tdMeaning1,
                  source: newspaper.name
                });

              }

            });
        })
        .catch(error => {
            console.error(`Error fetching data from ${newspaper.address}: ${error}`);
        });
});


app.get('/', (req, res) => {
    res.json('Welcome to Dictionary')
})

app.get('/news', (req, res) => {
    res.json(articles)
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))