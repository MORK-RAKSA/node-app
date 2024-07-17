## Introduction

This guide details the process of setting up a basic service folder for a nodejs application using Express and TypeScript. This setup will include live reloading with nodemon, API specification generation with tsoa, and automated builds using esbuild.

## Prerequisites

Before beginning, ensure you have the following installed on your system:

- Node.js
- Yarn package manager

## Step-by-Step Guide

1. Create and Initialize a Project Directory
    
    Run the commands below:
    
    - `mkdir project-name`
    - `cd project-name`
    - `yarn init -y`
    
    Overall Folder Structure:
    
    ```markup
    Project Folder Structure
    ├── build/                  # Compiled files from TypeScript to 
    														# JavaScript for production
    ├── node_modules/           # Project dependencies
    ├── src/                    # Source files
    │   ├── configs/            # Configuration files for the application
    │   ├── controllers/        # Handles incoming requests and send responses
    │   ├── database/           # Database connection logic, models 
                                # and repositories
    │   ├── docs/               # Swagger/OpenAPI documentation files
    │   ├── middlewares/        # Express middleware for request processing
    │   ├── routes/             # Route definitions linking requests to controllers
    │   ├── services/           # Business logic and data access code
    │   └── utils/              # Utility functions and helpers
    │   ├── app.ts              # Initializes and configures the application
    │   └── server.ts           # Entry point for the application, starts the server
    ├── build-script.js         # Script for compiling TypeScript using esbuild
    ├── nodemon.json            # Nodemon configuration for development
    ├── package.json            # Manages dependencies and project metadata
    ├── tsconfig.json           # TypeScript compiler configuration
    └── tsoa.json               # tsoa configuration for routes and documentation 
                                # generation
    ```
    

1. Install Express & Configure Typescript
    
    Run the commands below:
    
    ```jsx
    yarn add express
    ```
    
    ```jsx
    yarn add typescript @types/express @types/node ts-node --dev
    ```
    
    <aside>
    💡 ts-node: a package or library that allow to run typescript files
    
    </aside>
    
    Setup TypeScript Configuration
    
    - Create a ``tsconfig.json`` file in the root of your project
        
        ```json
        {
          "compilerOptions": {
            "module": "commonjs",
            "esModuleInterop": true,
            "target": "es6", // compile to es6
            "moduleResolution": "node",
            "sourceMap": true,
            "rootDir": "./src", // location of where it started to compile
            "outDir": "./build",
            "strict": true,
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            "resolveJsonModule": true,
            "noImplicitAny": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "alwaysStrict": true,
            "pretty": true,
          },
          "include": [
            "src/**/*"
          ],
          "exclude": [
        	    "node_modules",
            "**/*.spec.ts"
          ],
        }
        ```
        

1. Create a Basic Express Server
    
    Create a folder called src and create a file inside called ``server.ts`` and include the code below:
    
    ```tsx
    import express from 'express'
    
    const app = express();
    
    app.listen(3000, ()=> {console.log(`server is running on port: `, 3000)})
    ```
    
2. Run the Express Server
    
    Include the following scripts:
    
    ```tsx
    {
      "name": "user-service",
      "version": "1.0.0",
      "main": "src/server.ts",
      "license": "MIT",
      "scripts": {
        "dev": "ts-node src/server.ts",
      },
      "dependencies": {
        "express": "^4.19.2",
        ...
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^20.14.7",
        "ts-node": "^10.9.2",
        "typescript": "^5.5.2",
        ...
      }
    }
    ```
    
    go to terminal and run: `yarn dev`
    
3. Live Reloading Code
    
    Install ``nodemon`` for watching file changes: `yarn add nodemon —dev`
    
    Configuration: create a ``nodemon.json`` file to configure nodemon:
    
    ```tsx
    {
      "watch": [
        "src"
      ],
      "ext": "ts",
      "exec": "ts-node src/server.ts"
    }
    ```
    
    Change the script in the `package.json`
    
    ```tsx
    {
      "name": "user-service",
      "version": "1.0.0",
      "main": "src/server.ts",
      "license": "MIT",
      "scripts": {
        "dev": "nodemon src/server.ts",
      },
      "dependencies": {
        "express": "^4.19.2",
        ...
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^20.14.7",
        "ts-node": "^10.9.2",
        "typescript": "^5.5.2",
        ...
      }
    }
    ```
    
4. Create a Build Script for Production Mode
    
    We use `Esbuild` to compile and bundling our code into production code. 
    
    Install: `yarn add esbuild —-dev`
    
    Configuration: Create a file called [`build-script.](http://build-script.sj)js`  in the root of the project:
    
    install: `yarn add next`
    
    ```tsx
    const esbuild = require('esbuild');
    const path = require('path');
    
    esbuild.build({
      entryPoints: ['src/server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',  // Target depends on your environment
      outdir: 'build',
      external: ['express'],  // Specify Node.js packages here
      loader: {
        '.ts': 'ts',
      },
      resolveExtensions: ['.ts', '.js'],
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    }).catch(error => {
      console.error('Build failed:', error);
      process.exit(1);
    });
    
    ```
    
    Configuration: Add a script inside `package.json`
    
    ```tsx
    {
      "name": "user-service",
      "version": "1.0.0",
      "main": "src/server.ts",
      "license": "MIT",
      "scripts": {
        "dev": "nodemoon src/server.ts",
        "build": "node build-script.js", // "build": "next build",
        "start": "node ./build/server.js", //"start": "next start",
      },
      "dependencies": {
        "express": "^4.19.2",
        ...
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^20.14.7",
        "ts-node": "^10.9.2",
        "typescript": "^5.5.2",
        ...
      }
    }
    ```
    
    To run the production code: `yarn build`
    
    To run the production code: `yarn start`
    

1. Using Absolute Import
    
    Absolute imports simplify the import paths in your application, making them more readable and maintainable. You will use ``tsconfig-paths`` to enable this feature in your TypeScript configuration.
    
    Install tsconfig-paths: `yarn add tsconfig-paths —-dev`
    
    Configuration: modify `tsconfig.json`:
    
    ```tsx
    {
      "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6", // compile to es6
        "moduleResolution": "node",
        "sourceMap": true,
        "rootDir": "./src", // location of where it started to compile
        "outDir": "./build",
        "strict": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "resolveJsonModule": true,
        "noImplicitAny": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "alwaysStrict": true,
        "pretty": true,
        // Import Files From The Root Directory Using `@` prefix
        "paths": {
          "@/*": [
            "*"
          ]
        }
      },
      "include": [
        "src/**/*"
      ],
      "exclude": [
        "node_modules",
        "**/*.spec.ts"
      ],
      // Allow ts-node to run with tsconfig-paths
      "ts-node": {
        "require": [
          "tsconfig-paths/register"
        ]
      }
    }
    ```
    
    **Testing the Absolute Path** 
    
    Separate the file App Logic & Server:
    
    Create a file called `app.ts` in the `src` folder
    
    ```tsx
    import express from 'express';
    
    // ========================
    // Initialize App Express
    // ========================
    const app = express();
    
    export default app;
    ```
    
    Inside file `server.ts`
    
    Modify the existing code to this:
    
    ```tsx
    import app from "@/src/app"
    
    function run() {
       app.listen(3000, () => {
         console.log(`User Service running on Port: 3000`)
       })
    }
    
    run();
    ```
    
    Run the development mode: `yarn dev`
    
    **For Production (Esbuild):**
    
    ```tsx
    const esbuild = require('esbuild');
    const path = require('path');
    
    esbuild.build({
      entryPoints: ['src/server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',  // Target depends on your environment
      outdir: 'build',
      external: ['express'],  // Specify Node.js packages here
      loader: {
        '.ts': 'ts',
      },
      resolveExtensions: ['.ts', '.js'],
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      // Add this so that It Could Resolve the Path
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }).catch(error => {
      console.error('Build failed:', error);
      process.exit(1);
    });
    ```
    
    Run the production mode: `yarn start`
    
2. API Documentation
    
    API documentation includes detailed information about an API’s available endpoints, methods, resources, authentication protocols, parameters, and headers, as well as examples of common requests and response.
    
    We use `tsoa` library which automatically generates Swagger (OpenAPI) documentation based on TypeScript code & swagger-ui-express to render the UI from `swagger.json`.
    
      
    
    Install: 
    
    ```jsx
    yarn add tsoa swagger-ui-express --dev
    ```
    
    Configuration: create a ``tsoa.json`` file in your project root:
    
    ```json
    {
      "entryFile": "src/server.ts",
      "noImplicitAdditionalProperties": "throw-on-extras",
      "controllerPathGlobs": [
        "src/controllers/*.controller.ts"
      ],
      // Swagger.json Where TSOA generate
      "spec": {
        "outputDirectory": "src/docs",
        "specVersion": 3
      },
      // Location that TSOA generate routes
      "routes": {
        "routesDir": "src/routes/v1"
      },
      // Allow Tsoa to Recognize the Absolute Path
      "compilerOptions": {
        "baseUrl": "./",
        "paths": {
          "@/*": [
            "*"
          ]
        }
      }
    }
    ```
    
    **Setup Controllers**
    
    Organize your controllers using decorators provided by ``tsoa``. Here is an example of simple controller:
    
    ```tsx
    import { Controller, Route, Post} from 'tsoa';
    
    interface User {
    	id: number;
    	name: string;
    	email: string;
    }
    
    interface UserCreationParams {
    	name: string;
    	email: string;
    }
    
    @Route("/v1/users")
    export class UserController extends Controller {
    
        @Post("/")
        public createNewUser(@Body: requestBody: UserCreationParams): User {
            return { id: 1, name: "John Doe", email: "doe@gmail.com" };
        }
    }
    ```
    
    - `@Route("/v1/users")`: a decorator that tell our main route or API is `/v1/users`
    - `@Get("/")`: a decorator that tell our sub route from the main route (`/v1/users`) is: `/` . So the Full route is: `/v1/users`
    - `@Body`: a decorator that could catch the body from request
    - These decorator help `tsoa` understand how to document the API
    - More info: https://tsoa-community.github.io/docs/introduction.html
    
    **Generate API Specs and Routes**
    
    Configuration: add a script to your ``package.json`` to generate routes 
    
    ```markup
    {
      "name": "user-service",
      "version": "1.0.0",
      "main": "src/server.ts",
      "license": "MIT",
      "scripts": {
        "tsoa:gen": "tsoa spec && tsoa routes",
        "dev": "yarn tsoa:gen && nodemoon src/server.ts",
        "build": "node build-script.js",
        "start": "node ./build/server.js"
      },
      "dependencies": {
        "express": "^4.19.2",
        ...
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^20.14.7",
        "ts-node": "^10.9.2",
        "typescript": "^5.5.2",
        ...
      }
    }
    ```
    
    Run the command: `yarn dev` , it will generate a folder `docs` which contains `swagger.json` file
    
    **Render `swagger.json` to Interface or UI**
    
    ```tsx
    import express from 'express';
    import swaggerUi from "swagger-ui-express";
    import { RegisterRoutes } from '@/src/routes/v1/routes';
    import fs from 'fs';
    import path from 'path'
    
    // Dynamically load swagger.json
    const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));
    
    // ========================
    // Initialize App Express
    // ========================
    const app = express();
    
    // ========================
    // Global Middleware
    // ========================
    app.use(express.json())  // Help to get the json from request body
    
    // ========================
    // Global API V1
    // ========================
    RegisterRoutes(app)
    
    // ========================
    // API Documentations
    // ========================
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    // ========================
    // ERROR Handler
    // ========================
    
    export default app;
    ```
    
    Go to browser: access to `localhost:3000/api-docs`
    
    **For Productions (Esbuild)**
    
    Problems:
    
    1. folder docs contains file `swagger.json` which **esbuild** is not responsible for bundle
    
    → Solutions: copy the `docs` folder into `build` folder
    
    1. SwaggerUIBundle is not defined in production
    
    → Copy some asset file like html, css of swagger-express-ui into `build` folder
    
    Inside `build-script.js` 
    
    ```jsx
    const esbuild = require('esbuild');
    const path = require('path');
    const fs = require('fs-extra');
    const copy = require('esbuild-plugin-copy').default;
    
    // Issue 
    // 1: Esbuild could not load swagger.json
    // 2: SwaggerUIBundle is not defined in production
    
    esbuild.build({
      entryPoints: ['src/server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',  // Target depends on your environment
      outdir: 'build',
      external: ['express'],  // Specify Node.js packages here
      loader: {
        '.ts': 'ts',
      },
      plugins: [
        // (2) Solve: https://stackoverflow.com/questions/62136515/swagger-ui-express-plugin-issue-with-webpack-bundling-in-production-mode/63048697#63048697
        copy({
          assets: {
            from: [
              '../../../node_modules/swagger-ui-dist/*.css',
              '../../../node_modules/swagger-ui-dist/*.js',
              '../../../node_modules/swagger-ui-dist/*.png'
            ],
            to: ['./']
          }
        })
      ],
      resolveExtensions: ['.ts', '.js'],
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }).then(() => {
      // (1) Solve: Copy swagger.json after successful build
      fs.copySync(path.resolve(__dirname, 'src/docs/swagger.json'), path.resolve(__dirname, 'build/docs/swagger.json'));
      console.log('Swagger JSON copied successfully!');
    }).catch(error => {
      console.error('Build failed:', error);
      process.exit(1);
    });
    ```
    

1. DotEnv
    
    Some sensitive value like MONGO_URL, SECRET_KEY, etc should be store in `.env`file, to load those value we need to use `dotenv` library.
    
    Install: `yarn add dotenv yup` 
    
    Note: `yup` library is used for schema validation
    
    Configuration: 
    
    Create a file called: `.env` inside `configs` folder
    
    ```jsx
    PORT=3000
    ```
    
    Create a file called: `config.ts` inside `utils` folder
    
    ```jsx
    import dotenv from 'dotenv';
    import path from 'path';
    import * as yup from 'yup';
    
    type Config = {
      env: string;
      port: number;
      mongodbUrl: string;
    };
    
    // Function to load and validate environment variables
    function loadConfig(): Config {
      // Determine the environment and set the appropriate .env file
      const env = process.env.NODE_ENV || 'development';
      const envPath = path.resolve(__dirname, `../configs/.env.${env}`);
      dotenv.config({ path: envPath });
    
      // Define a schema for the environment variables using yup
      const envVarsSchema = yup.object().shape({
        NODE_ENV: yup.string().oneOf(['development', 'production', 'test']).default('development'),
        PORT: yup.number().default(3000),
        MONGODB_URL: yup.string().required(),
      }).required();
    
      // Validate the environment variables
      let envVars;
      try {
        envVars = envVarsSchema.validateSync(process.env, { stripUnknown: true });
      } catch (error) {
        throw new Error(`Config validation error: ${error}`);
      }
    
      return {
        env: envVars.NODE_ENV,
        port: envVars.PORT,
        mongodbUrl: envVars.MONGODB_URL,
      };
    }
    
    // Export the loaded configuration
    const configs = loadConfig();
    export default configs;
    ```
    

Call `configs` to use in `server.ts`

```jsx
import app from "@/src/app"
import configs from "@/src/utils/config";

function run() {
   app.listen(configs.port, () => {
     console.log(`User Service running on Port: ${configs.port}`)
   })
}

run();
```

**Exercise**:

- Create a file called `connection` in database folder which responsible for connecting to database of mongodb
- Create a simple CRUD operation for following API routes:
    - GET /users/1234…  : get a single user
    - POST /users : crete a new user
    - GET /users: get all users
    - PUT /users/1234… : update info of a specific user
    - DELETE /users/1234… : delete a specific user