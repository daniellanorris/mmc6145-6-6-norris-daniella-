import { withIronSessionApiRoute } from "iron-session/next";
import { userInfo } from "os";
import { runInNewContext } from "vm";
import sessionOptions from "../../config/session"
import db from '../../db'
import user from "../../db/models/user";

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(

  async function handler(req, res) {
    const user = req.session.user;
    const props = {}
    if(user) {
      props.user = req.session.user;
      props.isLoggedIn = true
    } else {
      props.isLoggedIn = false
    }

    if(props.isLoggedIn) {
      res.status(200)
    } else {
      req.session.destroy()
      res.status(401).end()
    } 

    console.log(props.user.id)

    // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
    // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)
    const bodyParsed = req.body ? JSON.parse(req.body) : null
      switch(req.method) {
        case 'POST' :
          if(!bodyParsed) {
            return res.status(400).json({error: error.message})
          }
          try  {
          await db.book.add(props.user.id, bodyParsed);
          return res.status(200).json({message: 'book added', method: 'POST'})
          } catch (error) {
            return res.status(400).json({error: error.message})
          }
          case 'DELETE':
            if (!bodyParsed) {
              return res.status(400).json({ error: error.message});
            }
            try {
              const bookDelete = await db.book.remove(req.session.user.id, bodyParsed.id);
              if (bookDelete === null) {
                await req.session.destroy()
                res.status(401).end()
              } if(bookDelete !== null) {
              return res.status(200).json({ message: 'Book deleted', method: 'DELETE' });
              }
            } catch (error) {
              return res.status(400).json({ error: error.message });
            }
            default: 
            return res.status(401).end()
        
      }
    // TODO: Respond with 404 for all other requests
    // User info can be accessed with req.session
    // No user info on the session means the user is not logged in
  },
  sessionOptions
)