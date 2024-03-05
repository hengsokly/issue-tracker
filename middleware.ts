// import middleware from "next-auth/middleware";
// export default middleware;
export { default } from 'next-auth/middleware';

// Config matcher here to restrict the route that require authentication.
export const config = {
  matcher: [
    '/issues/new',
    '/issues/:id/edit'
  ]
}