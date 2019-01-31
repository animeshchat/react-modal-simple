# To run example demo locally -
npm start
localhost:3001

# To build and deply demo
1. To build dist of demo - npm run build
2. To deploy demo to ghpages - npm run deploy
OR
npm run publish-demo (combines above steps)

# To publish again
Whenever you are ready to publish a new version, simply increment the version in package.json, and then run npm publish and npm run publish-demo

# Resources
Step by step instruction to publish component to npm from scratch
https://medium.com/dailyjs/building-a-react-component-with-webpack-publish-to-npm-deploy-to-github-guide-6927f60b3220

Additionally, 
1. Install as dev dependency - npm install prop-types -D
2. Install as dev dependency - npm install babel-preset-stage-2 -D
// babel-preset-stage-2 will help run es6
3. Update .babelrc config, add plugins
.babelrc
{
  "presets": ["env", "react"],
  "plugins":
	[
		"transform-object-rest-spread",
		"transform-class-properties",
	]
}
