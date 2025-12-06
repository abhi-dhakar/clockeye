import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url }) => {
  const siteTitle = "ClockEye - Time Management Tools";
  const defaultDescription = "Free online Timer, Stopwatch, Alarm, and World Clock. Simple, accurate, and works offline.";
  const defaultKeywords = "timer, stopwatch, online alarm, world clock, countdown, productivity tool";
  const siteUrl = "https://clockeye.com";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | ClockEye` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

      {/* Open Graph / Facebook (Social Media) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:site_name" content="ClockEye" />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} /> 

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
    </Helmet>
  );
};

export default SEO;