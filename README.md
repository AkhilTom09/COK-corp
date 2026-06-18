






| Layer    | Technology                              | Choice                                                                                                                                          |
| -------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | **Next.js (React)** or **Vite + React** | Highly component-based, perfect for dynamic dashboards, filters, and modals. And completely free                                                |
| Hosting  | **Vercel** or **Netlify**               | Connects to GitHub. Deployments are completely hands-off. Generous free bandwidth.                                                              |
| Database | **Supabase**                            | A managed backend-as-a-service. It gives you a real SQL database, built-in Auth, and file storage. 2 free projects, 500MB database, 1GB storage |



Instead of building a separate Python/Node.js backend API from scratch, Supabase gives you instant API endpoints, handles your User Roles (Admin vs. Viewer), and handles PDF/image uploads right out of the box. If your MVP gets approved, you just upgrade your Supabase plan from Free to $25/month, and you're ready for heavy production.



### MVP Features

- **Authentication & Role-Based Access Control (RBAC):** Users log in. If role = `admin`, show a "Create Project" button. If role = `viewer`, hide editing/creation capabilities entirely.
- **Project Cards:** Title, description, overall progress percentage, status dropdown.
- **Basic Filters:** Filter by project status or search by project title.
- **Attachments & Links:** A list where admins can paste URLs or upload PDFs.
- **Nested Comments:** A simple chronological chat log inside each project. ==Comments should allow mentions==. maybe search as well. 
- Person View: projects assigned to each person 
- Instant deploys without downtime



### Additional Features
- **Activity Logs:** A mini feed saying _"Adith changed status to 'In Progress' 2 hours ago"_ or _"New PDF uploaded by Admin"_. This makes the app feel alive.
- **Export to CSV:** A single button on the dashboard allowing viewers to download the filtered project list as an Excel/CSV sheet. Managers _love_ spreadsheets.
- Notification to Manager
- Calendar view 
- Executive summary-> summarize threads using AI. 


## Rough DB plan 
https://docs.google.com/spreadsheets/d/1HeTotDJzJxeqHAho2XwRQqPyvYlmfHLrc6jJMgXgpsg/edit?gid=0#gid=0


## Main Page 

list of projects
my projects 
filters 
activity feed 
search bar


## Analytics 

Department-wise expenditure
Project-wise expenditure
Fund utilization %
Budget variance analysis


## Each Project 

each project has around 10 people, eg, engineer, contractor, clerk etc. some people will not be staff ( still would need some write access ), 


Name of the project, category, create_date, status ( planning, ongoing, done, cancelled , delayed(?) ), project_incharge, budget, live_status_of_project ( is it going as planned?), resources_required, priority , department, location, end_date, contractor, project_manager, ward_number(?)

user should be able to log usages of budget, and show the usage+ leftover in the UI. 
should log date of change of status, so we can show progress bar in UI. ![[Pasted image 20260616231019.png]]
^maybe somethign that looks like this. 


==members tab in the right. ==
**members** can be assigned in a tree/level format, any approval from any higher person woudl work. 

gallery for each project for all the images in that project. 


Nested comments, comments could have a category ( update, problem, blcoker, etc)

















