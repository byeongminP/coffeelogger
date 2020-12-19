const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const pool = require('../config/db')

router.post('/', ensureAuth, async (req, res) => {
	try {
		const {
			coffee_name,
			coffee_roaster,
			coffee_date,
			brew_date,
			brew_method,
			brew_grind,
			brew_dose,
			brew_yield,
			brew_temp,
			brew_time,
			description,
			taste,
			comments,
		} = req.body
		await pool.query(
			'INSERT INTO coffeelog (author, coffee_name,  coffee_roaster, coffee_date, brew_date, brew_method, brew_grind, brew_dose, brew_yield, brew_temp, brew_time, description, taste, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
			[
				req.user,
				coffee_name,
				coffee_roaster,
				coffee_date,
				brew_date,
				brew_method,
				brew_grind,
				brew_dose,
				brew_yield,
				brew_temp,
				brew_time,
				description,
				taste,
				comments,
			]
		)
		res.redirect('/entries')
	} catch (err) {
		console.error(err)
		res.render('error/500')
	}
})

router.get('/', ensureAuth, async (req, res) => {
	try {
		const entries = await pool.query('SELECT * FROM coffeelog WHERE author = $1', [req.user])
		res.render('entries', {
			title: 'Your Journal...',
			user: req.user,
			entries: entries.rows,
		})
	} catch (err) {
		console.error(err)
		res.render('error/500')
	}
})

router.delete('/:id', ensureAuth, async (req, res) => {
	try {
		let entry = await pool.query('SELECT * FROM coffeelog WHERE author = $1 AND log_id = $2 LIMIT 1', [
			req.user,
			req.params.id,
		])
		if (!entry) {
			return res.render('error/404')
		}
		await pool.query('DELETE FROM coffeelog WHERE author = $1 AND log_id = $2', [req.user, req.params.id])
		res.redirect('/entries')
	} catch (err) {
		console.error(err)
		res.render('error/500')
	}
})

router.get('/create', ensureAuth, async (req, res) => {
	try {
		res.render('addentry', {
			title: 'Add an Entry',
		})
	} catch (err) {
		console.error(err)
		res.render('error/500')
	}
})

module.exports = router
