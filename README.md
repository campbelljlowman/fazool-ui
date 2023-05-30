UI for fazool music sharing service

# Running locally
1. Install node
2. Add environment variables 
3. run `make run`

# Environment Variables
The UI needs the following environment variables to run
## VITE_BACKEND_HTTP_SERVER
- The address of the server running the UI. This is used for callbacks for registering spotify accounts. This address must also be added
to the authorized addresses in the spotify project
## VITE_GRAPHQL_HTTP_SERVER
- The address of the graphql backend server that the UI can make requests to
## VITE_GRAPHQL_WS_SERVER
- The address of the websockets backend the UI can open subscriptions to