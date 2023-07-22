import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {
      if (!req.session.user) {
        return res.status(401).json({ error: "User Not Found" })
      }
  
    // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
    // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)
      switch(req.method) {
        case 'POST' :
          try  {
          const book = JSON.parse(req.body) 
          const bookAdd = await db.book.add(req.session.user.id, book);

          if(bookAdd === null) {
            req.session.destroy()
            return res.status(401).json({error: "User not found"})
          }

          return res.status(200).json(bookAdd)
          }
           catch (error) {
            return res.status(400).json({error: error.message})
          }


          case 'DELETE':
              
            try {
              const bodyParsed = await JSON.parse(req.body) 
              const bookDelete = await db.book.remove(req.session.user.id, bodyParsed.id);
              if (bookDelete === null) {
                req.session.destroy()
                return res.status(401).json({error: "User Not Found"})
              } 
              return res.status(200).json(bodyParsed);
            
            } catch (error) {
              return res.status(400).json({ error: error.message });
            }

            default: 
            return res.status(404).end()
        
      }
    // TODO: Respond with 404 for all other requests
    // User info can be accessed with req.session
    // No user info on the session means the user is not logged in
  },
  sessionOptions
)