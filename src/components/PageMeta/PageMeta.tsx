import Helmet from 'react-helmet';

type PageMetaProps = {
  title?: string;
  description?: string;
  image?: string;
};

const cutTags = (text = '') => text.replace(/<\/?.+?>/gi, '');

const prepareData = (title?: string, description?: string, image?: string): PageMetaProps => ({
  title: cutTags(title),
  description: cutTags(description).substring(0, 250),
  image,
});

export default function PageMeta({
  title: _title,
  description: _desc,
  image: _img,
}: PageMetaProps) {
  const { title, description, image } = prepareData(_title, _desc, _img);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {Boolean(description) && (
        <meta name="description" content={description} />
      )}
      {Boolean(description) && (
        <meta property="og:description" content={description} />
      )}
      {Boolean(description) && (
        <meta property="twitter:description" content={description} />
      )}
      {Boolean(image) && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
