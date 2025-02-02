const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const express = require('express');
const FAQ = require('./models/faq'); 
const mongoose = require('mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    resources: [FAQ], 
    rootPath: '/admin',
});

const router = AdminBroExpressjs.buildRouter(adminBro);

module.exports = router;
