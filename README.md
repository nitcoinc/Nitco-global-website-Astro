# Nitcoinc - Organizational Website with Next.js, React, and Tina CMS

This Project utilizes Next.js for frontend-development, React for building UI components, and Tina CMS as a backend for content management. It is hosted on Tina Cloud and deployed using Netlify.

## Installation

Before getting started, ensure that you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/en/download/): Make sure you have Node.js installed. You can download and install it from the [official website](https://nodejs.org/).

- [Git](https://git-scm.com/downloads): Ensure that Git is installed on your system. You can download and install it from the [official website](https://git-scm.com/downloads).

Once you have Node.js and Git installed, you can proceed with the following steps:

clone the reposiory:
```sh
git clone (https://github.com/nitcoinc/global-website.git)
```
Install the project's dependencies:

```
npm install
```

Run the project locally:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Tina CMS Configuration

Access the Tina CMS interface by navigating to [http://localhost:3000/admin](http://localhost:3000/admin) after running the project locally.

Customize your content types and fields using Tina's schema configuration.

### Building the Starter Locally (Using the hosted content API)

Before running the project locally, you need to set up the required environment variables. Follow these steps:

1. Rename `.env.example` to `.env`.

2. Open the `.env` file and replace the placeholders with the actual values:

- `NEXT_PUBLIC_TINA_CLIENT_ID`: Obtain this value from the project you create at app.tina.io.
- `TINA_TOKEN`: Obtain this value from the project you create at app.tina.io.
- `NEXT_PUBLIC_TINA_BRANCH`: Specify the branch with Tina configured.

3. Save the `.env` file.


Build the project:

```bash
npm run build
```

### Pushing Changes from VS Code to Branch and Merging with dev

If you're making changes directly in VS Code and want to push them to a branch, and then merge with the dev branch, follow these steps:

1. **Push Changes to Branch:**
   - Make your changes in VS Code.
   - Save your changes.
   - Open the terminal in VS Code.
   - Stage your changes:
     ```sh
     git add .
     ```
   - Commit your changes:
     ```sh
     git commit -m "Your commit message"
     ```
   - Push your changes to the branch:
     ```sh
     git push origin <your_branch_name>
     ```

2. **Stash Changes before Merging with dev:**
   - If you have unstaged changes that you want to stash before merging with the dev branch, use:
     ```sh
     git stash
     ```

3. **Pull Content from dev to Your Branch:**
   - Switch to your branch:
     ```sh
     git checkout <your_branch_name>
     ```
   - Pull content from the dev branch to your branch:
     ```sh
     git pull origin dev
     ```

4. **Unstash Changes:**
   - If you stashed changes earlier, unstash them:
     ```sh
     git stash apply
     ```

5. **Commit to Your Branch:**
   - Stage your changes (if needed):
     ```sh
     git add .
     ```
   - Commit your changes:
     ```sh
     git commit -m "Your commit message"
     ```

6. **Merge with dev:**
   - Once your changes are committed to your branch, you can merge it with the dev branch:
     ```sh
     git checkout dev
     git merge <your_branch_name>
     ```
   - Resolve any merge conflicts if necessary.
   - Push the changes to the dev branch:
     ```sh
     git push origin dev
     ```

This process ensures that your changes are pushed to a branch, merged with the dev branch after pulling the latest changes, and finally pushed to the dev branch. Remember to replace `<your_branch_name>` with the name of your branch.


## Learn More

To learn more about Tina, take a look at the following resources:

- [Tina Docs](https://tina.io/docs)
- [Getting starter guide](https://tina.io/guides/tina-cloud/starter/overview/)

You can check out [Tina Github repository](https://github.com/tinacms/tinacms) - your feedback and contributions are welcome!

## [Deploy on Vercel](https://tina.io/guides/tina-cloud/add-tinacms-to-existing-site/deployment/)


