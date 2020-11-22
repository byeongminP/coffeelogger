const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const pool = require('../config/db')

router.post('/', ensureAuth, async (req, res) => {
	try {
    let numEntries = await pool.query('SELECT COUNT(*) FROM coffeelog WHERE author = $1', [req.user])
		const logNum = parseInt(numEntries.rows[0].count) + 1
		const { description } = req.body
		await pool.query('INSERT INTO coffeelog (log_num, author, description) VALUES ($1, $2, $3)', [logNum, req.user, description])
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
      entries: entries.rows
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.delete('/:id', ensureAuth, async (req, res) => {
	try {
		let entry = await pool.query('SELECT * FROM coffeelog WHERE author = $1 AND log_num = $2 LIMIT 1', [
			req.user,
			req.params.id,
		])
		if (!entry) {
			return res.render('error/404')
		}
		await pool.query('DELETE FROM coffeelog WHERE author = $1 AND log_num = $2', [req.user, req.params.id])
		res.redirect('/entries')
	} catch (err) {
		console.error(err)
		res.render('error/500')
	}
})

router.get('/create', ensureAuth, async (req, res) => {
  try {
    res.render('addentry', {
      title: 'Add an Entry'
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
