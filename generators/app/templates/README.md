## Installation

There are two ways to install: as a submodule or a microserver.

#### 1. As submodule
```bash
npm install --save <%- name %>
```

#### 2. As microservice
```bash
git clone http://github.com/<%- ghOrg %>/<%- name %>
cd <%- name %>
npm start
```

#### Running Microservice with PM2

PM2 is recommended. Here is an example `pm2.json` 

```json
{
  "name"        : "<%- name %>",
  "script"      : "bin/www.js",
  "args"        : [],
  "watch"       : true,
  "node_args"   : "",
  "cwd"         : "/root/path/to/<%- name %>",
  "env": {
    "NODE_ENV": "production",
    "PORT": "6000",
    "NODE_DEBUG": ""
  }
}
```

More `pm2.json` documentation available [here](http://pm2.keymetrics.io/docs/usage/application-declaration/)

## Usage

```javascript
/* Add usage for submodule */
```

```javascript
/* Add usage for microservice */
```

