# Full Stack Developer/Engineer Coding Exercise

## Getting Started

### Prerequisites

- ASP.NET Core 3.1
- Git
- Dev environment beyond that is your choice, but Visual Studio Code or Visual Studio are recommended.
- Node LTS (12.16.x or greater)

### Building the project

Use Git to clone the following GitHub repo: https://github.com/MedStudy/Interview.

The project is a basic .NET Core/Angular project, with very few dependencies. It should build and run out of the box on either Mac, Linux or Windows.

In the `/FullStackDevExercise/ClientApp` folder run `npm install`. When finished use `ng serve -o` to serve and open the client.

## Coding Exercise

The sample app is the default Angular version 9 starter project page. The sample is left as-is so that you can verify that the app builds and runs as-is in your local environment before you start coding. If you have problems getting things to run, let us know. Or, for bonus points, if something is broken, fix it and then let us know.

Your task is to use the existing skeleton app to create simple scheduling functionality for an imaginary veterinary clinic called "Dr. Dolittle's Veterinary Clinic".

1. We've included a small SQLite database that's composed of three tables: Owners, Pets. These tables are bootstrapped in Program.cs. Populate these two tables with some sample data.
2. The above tables are bootstrapped in Program.cs. Add a table called Appointments.
3. Create API endpoints that allow basic CRUD operations on all three kinds of objects.
   3a) Bonus points for using dependency injection to establish a singleton database connection in Startup.cs that can be injected where you need it.
4. Rework the Angular app to have:
   a) a decent-looking home page that reflects the app's purpose, including some menu items or links that navigate to b), below.
   b) pages to manage Owners, Pets and Appointments
5. Bonus points if you add some unit tests for the functionality you develop.

The instructions here are deliberately vague in terms of specific requirements. We're trying to make as few assumptions about your skillset and your imagination as possible. So do what you are able to do; use this assignment to show off what you're good at. This is a vehicle for you to impress us, and also for you to see what it's like to work with us.

We don't expect you to spend weeks doing this, but expect a little back and forth after your initial submission. Again, this is not only to see whether you can write clean code, but it's also an audition for both of us to get a feel for how it would be to work together. Both things are important to us.

## When You're Done

- Submit a PR against this repository; alternatively, you can fork this repo and just send us a link to your fork when you're done.
- Before you submit, please make sure your app builds and runs. It seems weird to say that, but you'd be surprised how many submissions we get that simply don't run at all.

Good luck, and don't be afraid to reach out to us and ask questions of any kind.
