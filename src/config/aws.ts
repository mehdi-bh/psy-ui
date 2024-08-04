import { ResourcesConfig } from "aws-amplify";

const AWS_CONFIG: ResourcesConfig = {
  Auth: {
    Cognito: {
      loginWith: {
        oauth: {
          redirectSignIn: ["https://psy-ui.vercel.app"],
          redirectSignOut: ["https://psy-ui.vercel.app"],
          domain: "psy-platform.auth.eu-west-3.amazoncognito.com",
          providers: ["Google"],
          scopes: ["email", "openid", "aws.cognito.signin.user.admin"],
          responseType: "code",
        },
      },
      userPoolId: "eu-west-3_ANrSXG6D8",
      userPoolClientId: "3o3vqv5efsplnon60f0d65gnkd",
    },
  },
};

export default AWS_CONFIG;
