const express = require('express');
const FAQ = require('../models/faq');
const router = express.Router();

const supportedLanguages = ['en', 'hi', 'bn', 'es', 'fr', 'de'];


const attachRedisClient = (redisClient) => {
    return (req, res, next) => {
        req.redisClient = redisClient;
        next();
    };
};


const getAllFAQs = async (req, res) => {
    try {
        const cache = req.redisClient;
        const cacheKey = 'all_faqs';
        const cachedData = await cache.get(cacheKey);
        let faqs
        if (cachedData) {
            faqs = JSON.parse(cachedData);
        }
        else{
            faqs = await FAQ.find();
            // Cache the data
            await cache.set(cacheKey, JSON.stringify(faqs), {
                EX: 60, // Expiration time in seconds
            });
        }

        
        res.render('index', { faqs, supportedLanguages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching FAQs');
    }
};


const renderAddFAQPage = (req, res) => {
    res.render('add-faq');
};


const addFAQ = async (req, res) => {
    const { question, answer } = req.body;
    const newFaq = new FAQ({ question, answer });

    try {
        await newFaq.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving FAQ');
    }
};


const translateFAQ = async (req, res) => {
    const { faqId } = req.params;
    const { lang } = req.query;

    if (!supportedLanguages.includes(lang)) {
        return res.status(400).send('Unsupported language');
    }

    try {
        const cache = req.redisClient;
        const cacheKey = `faq_${faqId}_${lang}`;
        const cachedData = await cache.get(cacheKey);
        let faq
        if (cachedData) {
            faq = JSON.parse(cachedData);
        }
        else{
            faq = await FAQ.findById(faqId);
            const translatedQuestion = await translateText(faq.question, lang);
            const translatedAnswer = await translateText(faq.answer, lang);
            faq = { translatedQuestion, translatedAnswer};

            // Cache the data
            await cache.set(cacheKey, JSON.stringify(faq), {
                EX: 3600, // Expiration time in seconds
            });
        }
        
        
       
        res.json({
            question: faq.translatedQuestion,
            answer: faq.translatedAnswer,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error during translation');
    }
};


async function translateText(text, lang) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Translation API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error('Translation service failed');
    }
}


module.exports = (redisClient) => {
    router.use(attachRedisClient(redisClient));
    router.get('/', getAllFAQs);
    router.get('/add-faq', renderAddFAQPage);
    router.post('/add-faq', addFAQ);
    router.get('/translate/:faqId', translateFAQ);
    return router;
};


module.exports.getAllFAQs = getAllFAQs;
module.exports.renderAddFAQPage = renderAddFAQPage;
module.exports.addFAQ = addFAQ;
module.exports.translateFAQ = translateFAQ;
module.exports.translateText = translateText;