
const mongoose = require('mongoose');
const FAQ = require('../models/faq');
const { getAllFAQs, renderAddFAQPage, addFAQ, translateFAQ } = require('../routes/faq'); 


beforeAll(async () => {
    await mongoose.connect('mongodb+srv://Tirumala:Tirumala02@cluster0.lnx32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});


afterEach(async () => {
    await FAQ.deleteMany({});
});


afterAll(async () => {
    await mongoose.connection.close();
});

describe('FAQ Model', () => {
    it('should create a new FAQ', async () => {
        const faqData = {
            question: 'What is your name?',
            answer: 'My name is ChatGPT.',
        };

        const faq = await FAQ.create(faqData);
        expect(faq).toBeTruthy();
        expect(faq.question).toBe(faqData.question);
        expect(faq.answer).toBe(faqData.answer);
    });

    it('should fetch all FAQs', async () => {
        await FAQ.create({
            question: 'What is your name?',
            answer: 'My name is ChatGPT.',
        });

        const faqs = await FAQ.find();
        expect(faqs.length).toBe(1);
        expect(faqs[0].question).toBe('What is your name?');
    });
});


describe('FAQ Routes', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            redisClient: {
                get: jest.fn(),
                set: jest.fn(),
            },
        };
        res = {
            redirect: jest.fn(),
            json: jest.fn(),
            render: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should handle adding a new FAQ', async () => {
        req.body = {
            question: 'What is your name?',
            answer: 'My name is ChatGPT.',
        };

        await addFAQ(req, res); 
        expect(res.redirect).toHaveBeenCalledWith('/');
        const faq = await FAQ.findOne({ question: 'What is your name?' });
        expect(faq).toBeTruthy();
    });

    it('should translate FAQ', async () => {
        const faq = await FAQ.create({
            question: 'How are you?',
            answer: 'I am fine.',
        });

        req.params = {
            faqId: faq._id,
            lang: 'hi',
        };

        await translateFAQ(req, res); 
        expect(res.json).toHaveBeenCalled();
        const responseData = res.json.mock.calls[0][0];
        expect(responseData.question).toBeDefined();
        expect(responseData.answer).toBeDefined();
    });
});