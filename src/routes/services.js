const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data.js');

// In app.js locate the transfer and payment post and get routes, cut and paste these routes to services.js below the require statements. Now in services.js update the routes to be part of the router by replacing app.get with router.get and app.post with router.post.

router.get('/transfer', (req, res) => res.render('transfer'));
router.post('/transfer', (req, res) => {
	// New balances for accounts that user would transfer into && out of:
	accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
	accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
	writeJSON();
	res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }));
router.post('/payment', (req, res) => {
	accounts.credit.balance -= req.body.amount;
	accounts.credit.availables += parseInt(req.body.amount, 10);
	writeJSON();
	res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;
