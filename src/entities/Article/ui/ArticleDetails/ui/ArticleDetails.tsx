import { useArticle } from "entities/Article/model/hooks/useArticle";
import { ArticleBlock } from "entities/Article/model/types/BlockManagement/ArticleBlock";
import { ArticleBlockType } from "entities/Article/model/types/BlockManagement/ArticleBlockType";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "shared/assets/icons/theme/eye.svg";
import { errorArticleImg } from "shared/const/plugFiles";
import { classNames } from "shared/lib/classNames/classNames";
import { Avatar, AvatarSize } from "shared/ui/Avatar";
import { Icon, IconSize } from "shared/ui/Icon";
import { Skeleton } from "shared/ui/Skeleton";
import { Text, TextSize, TextThemes } from "shared/ui/Text/ui/Text";
import { ArticleCodeBlockComponent } from "../../ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../../ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ui/ArticleTextBlockComponent";
import cls from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
  articleId: string;
  className?: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const { articleData, error, isLoading, getArticleById } = useArticle();

  useEffect(() => {
    getArticleById(articleId);
  }, [articleId]);

  const getArticleBlock = (article: ArticleBlock) => {
    switch (article.type) {
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent article={article} />;
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent article={article} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent article={article} />;
      default:
        break;
    }
  };

  if (isLoading)
    return (
      <div className={cls.skeletons}>
        <Skeleton width={400} height={24} />
        <Skeleton width={200} height={200} border="90%" />
        <Skeleton width={600} height={24} />
        <Skeleton width={600} height={24} />
        <Skeleton width={"100%"} height={200} />
        <Skeleton width={"100%"} height={200} />
        <Skeleton width={"100%"} height={200} />
        <Skeleton width={"100%"} height={200} />
      </div>
    );

  if (error)
    return (
      <Text
        text=" Article doesn't exist"
        textTheme={TextThemes.ERROR}
        isCenter
      />
    );

  return (
    <div className={classNames(cls.ArticleDetails, {}, [className])}>
      <Text
        text={`Article ID: ${articleData?.id}`}
        size={TextSize.XL}
        isCenter
      />
      <Text
        title={articleData?.title}
        text={articleData?.subtitle ?? ""}
        size={TextSize.XL}
        isCenter
      />
      <Avatar
        img={articleData?.img || errorArticleImg}
        isRound={false}
        alt={articleData?.title}
        key={articleData?.id}
        size={AvatarSize.XL}
      />

      <Icon
        text={`${articleData?.views}`}
        iconSize={IconSize.L}
        textSize={TextSize.S}
        Svg={EyeIcon}
      />
      <Text
        text={`Created at: ${articleData?.createdAt}`}
        size={TextSize.XS}
        isCenter
      />
      <Text
        text={`Tags: ${articleData?.type.join(" | ")}`}
        size={TextSize.XS}
        isCenter
      />

      {articleData?.blocks.map(getArticleBlock)}
    </div>
  );
});
