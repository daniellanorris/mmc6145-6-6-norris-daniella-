import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
    // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)
    // TODO: Respond with 404 for all other requests
    // User info can be accessed with req.session
    // No user info on the session means the user is not logged in 
    if(!req.session.user) {
      return res.status(401).end()
    }
    switch(req.method) {
      case 'POST':
        return addBook(req,res)
      case 'DELETE':
        return removeBook(req,res)
    }
    
    return res.status(404).end()
  },
  sessionOptions
)

const addBook = async (req, res) => {
  const book = await JSON.parse(req.body)
  try {
    const response = await db.book.add(req.session.user.id, book)
    if(response) {
      res.status(200).end()
    } else {
      req.session.destroy()
      res.status(401).end()
    }
  } catch(err) {
    res.status(400).json({error:err.message})
  }
}

const removeBook =async(req, res) => {
  const book = await JSON.parse(req.body)
  try {
    const response = await db.book.remove(req.session.user.id, book.id)
    if(response) {
      res.status(200).end()
    } else {
      req.session.destroy()
      res.status(401).end()
    }
  } catch(err) {
    res.status(400).json({error:err.message})
  }
}