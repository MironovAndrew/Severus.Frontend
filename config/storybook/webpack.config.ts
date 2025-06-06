import path from "path";
import webpack, { RuleSetRule } from "webpack";
import { buildCSSLoader } from "../build/loaders/buildCSSLoader";

export default ({ config }: { config: webpack.Configuration }) => {
  config.resolve?.modules?.push(path.resolve(__dirname, "../../src"));
  config.resolve?.extensions?.push(".ts", ".tsx");

  config.plugins?.push(
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(false),
      __API__: JSON.stringify("http://localhost:28532"),
      __IS_STORYBOOK__: JSON.stringify(true),
    })
  );

  config.module!.rules = config.module?.rules
    ?.filter(
      (rule): rule is RuleSetRule =>
        rule !== false && rule !== null && rule !== undefined
    )
    .map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    });

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });

  config.module?.rules?.push(buildCSSLoader(true));

  return config;
};
