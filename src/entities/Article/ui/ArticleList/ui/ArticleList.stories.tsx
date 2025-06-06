import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import "app/styles/index.scss";
import { ArticleExample } from "entities/Article/model/types/ArticleManagement/ArticleExample";
import { ArticleViewType } from "entities/Article/model/types/ArticleManagement/ArticleViewType";
import { ThemeDecorator } from "shared/config/storybook/Decorators/ThemeDecorator";
import { ArticleList } from "./ArticleList";

const meta: Meta<typeof ArticleList> = {
  title: "entities/Article/ArticleList",
  component: ArticleList,
  args: {
    articles: [
      ArticleExample,
      ArticleExample,
      ArticleExample,
      ArticleExample,
      ArticleExample,
      ArticleExample,
      ArticleExample,
      ArticleExample,
    ],
    isLoading: true,
    view: ArticleViewType.GRID,
  },
  argTypes: {
    isLoading: {
      control: "boolean",
    },
    view: {
      control: "radio",
      options: [ArticleViewType.GRID, ArticleViewType.LIST],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

export const Light: Story = {};

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Cute: Story = {
  decorators: [ThemeDecorator(Theme.CUTE)],
};
