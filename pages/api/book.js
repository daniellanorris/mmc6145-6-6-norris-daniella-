import { withIronSessionApiRoute } from "iron-session/next";
import { userInfo } from "os";
import { runInNewContext } from "vm";
import sessionOptions from "../../config/session"
import db from '../../db'
import user from "../../db/models/user";

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {
    // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
    // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)
    const bodyParsed = JSON.parse(req.body)
      switch(bodyParsed) {
        case 'POST' :
          return db.book.add()
        case 'DELETE' : 
          return db.book.remove()
      }
      if(req.session(user) == null)
    // TODO: Respond with 404 for all other requests
    // User info can be accessed with req.session
    // No user info on the session means the user is not logged in
    return res.status(404).end()
  },
  sessionOptions
)