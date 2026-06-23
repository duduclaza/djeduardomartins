export default function SoundCloudEmbed({
  url,
  visual = true,
  height = 300,
}: {
  url: string;
  visual?: boolean;
  height?: number;
}) {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23ff2bd6&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=${visual}`;

  return (
    <iframe
      width="100%"
      height={height}
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={src}
      className="rounded-xl"
      loading="lazy"
    />
  );
}
